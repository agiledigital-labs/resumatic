import { env } from '../common/env';
import { RootCommand } from '..';
import { CognitoIdentityServiceProvider, Config } from 'aws-sdk';
import axios from 'axios';
// @ts-ignore - Type Defs from Import
// eslint-disable-next-line unused-imports/no-unused-imports-ts
import colors from 'colors';
import { fetchUserPool } from '../common/aws';
require('colors');

const cognito = new CognitoIdentityServiceProvider();
const awsConfig = new Config();

/**
 * Fetches the App Client Id from the User Pool configured for this service
 *
 * @param stage service stage
 * @returns id of app client id
 */
const fetchUserPoolAppClientId = async (stage: string) => {
  const userPool = await fetchUserPool(cognito, stage);

  if (userPool === undefined) {
    return undefined;
  }

  const clients = await cognito
    .listUserPoolClients({ UserPoolId: userPool.Id!, MaxResults: 10 })
    .promise();

  const appClient = clients.UserPoolClients?.find(
    ({ ClientName }) => ClientName === 'CliAuth'
  );

  return appClient;
};

export default ({ command }: RootCommand) =>
  command(
    'get-token',
    'Gets a JWT token from Cognito for a user',
    (yargs) =>
      yargs
        .option('stage', {
          alias: 's',
          type: 'string',
          description: 'The stage for the Cognito user pool',
          default: env.STAGE,
        })
        .option('username', {
          alias: 'u',
          type: 'string',
          description: 'Password for the user to be created',
          demandOption: true,
        })
        .option('password', {
          alias: 'p',
          type: 'string',
          description: 'Password for the user to be created',
          demandOption: true,
        }),
    async ({ stage, username, password }) => {
      const appClient = await fetchUserPoolAppClientId(stage);

      if (appClient === undefined) {
        console.error(
          `Unable to find Cognito User Pool App Client for stage [${stage}-postgrest]`
            .red
        );
        return;
      }

      const response = await axios.post<{
        AuthenticationResult: { IdToken: string };
      }>(
        `https://cognito-idp.${(
          awsConfig.region ?? ''
        ).toLowerCase()}.amazonaws.com`,
        {
          AuthParameters: {
            USERNAME: username,
            PASSWORD: password,
          },
          AuthFlow: 'USER_PASSWORD_AUTH',
          ClientId: appClient.ClientId,
        },
        {
          headers: {
            'Content-Type': 'application/x-amz-json-1.1',
            'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
          },
          validateStatus: (status) =>
            (status >= 200 && status <= 299) || status === 404,
        }
      );

      if (response.status === 200) {
        console.info(
          `Access Token: [${response.data.AuthenticationResult.IdToken.blue}]`
            .green
        );
      } else {
        console.error('Unable to fetch tokens'.red);
        console.error(response.data);
      }
    }
  );
