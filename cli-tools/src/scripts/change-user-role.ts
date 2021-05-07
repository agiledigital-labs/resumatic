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
    'change-user-role',
    "Changes a user's role",
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
          description: 'Username for the user to delete',
          demandOption: true,
        })
        .option('role', {
          alias: 'r',
          type: 'string',
          description: 'Role for user to interact with database',
          default: 'user',
        }),
    async ({ stage, username, role }) => {
      const userPool = await fetchUserPool(cognito, stage);

      if (userPool === undefined) {
        console.error(
          `Unable to find Cognito User Pool for stage [${stage}-postgrest]`.red
        );
        return;
      }

      await cognito
        .adminUpdateUserAttributes({
          UserPoolId: userPool.Id!,
          Username: username,
          UserAttributes: [{ Name: 'custom:role', Value: role }],
        })
        .promise();

      console.info(
        `Successfully changed user [${username.cyan}] role to [${role.cyan}]`
      );
    }
  );
