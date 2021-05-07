import { env } from '../common/env';
import { RootCommand } from '..';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
// @ts-ignore - Type Defs from Import
// eslint-disable-next-line unused-imports/no-unused-imports-ts
import colors from 'colors';
import { fetchUserPool } from '../common/aws';
require('colors');

const cognito = new CognitoIdentityServiceProvider();

export default ({ command }: RootCommand) =>
  command(
    'add-user',
    'Adds a user to a cognito pool',
    (yargs) =>
      yargs
        .option('stage', {
          alias: 's',
          type: 'string',
          description: 'The stage for the Cognito identity pool',
          default: env.STAGE,
        })
        .option('username', {
          alias: 'u',
          type: 'string',
          description: 'Username for the user',
          demandOption: true,
        })
        .option('email', {
          alias: 'e',
          type: 'string',
          description: 'Email for the user',
          demandOption: true,
        })
        .option('password', {
          alias: 'p',
          type: 'string',
          description: 'Password for the user',
          demandOption: true,
        })
        .option('role', {
          alias: 'r',
          type: 'string',
          description: 'Role for user to interact with database',
          default: 'user',
        }),
    async ({ stage, email, password, role, username }) => {
      const userPool = await fetchUserPool(cognito, stage);

      if (userPool === undefined) {
        console.error(
          `Unable to find Cognito User Pool for stage [${stage}-postgrest]`.red
        );
        return;
      }

      await cognito
        .adminCreateUser({
          UserPoolId: userPool.Id!,
          Username: username,
          TemporaryPassword: password,
          UserAttributes: [
            { Name: 'email', Value: email },
            { Name: 'custom:role', Value: role },
            { Name: 'preferred_username', Value: username },
          ],
          MessageAction: 'SUPPRESS',
        })
        .promise();
      console.info(
        `Successfully created user [${email}] in [${stage}-postgrest]`.green
      );

      await cognito
        .adminSetUserPassword({
          Password: password,
          UserPoolId: userPool.Id!,
          Username: username,
          Permanent: true,
        })
        .promise();
      console.info(`Set password to [${password}]`.green);
    }
  );
