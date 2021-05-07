import { fetchServerlessConfig } from './../common/sls';
import { env } from '../common/env';
import { RootCommand } from '..';
import { Lambda } from 'aws-sdk';
// @ts-ignore - Type Defs from Import
// eslint-disable-next-line unused-imports/no-unused-imports-ts
import colors from 'colors';
require('colors');

const lambda = new Lambda();

export default ({ command }: RootCommand) =>
  command(
    'update-jwks-env',
    'Updates the jwt-secret environment variable on the postgrest lambda with the JWKs',
    (yargs) =>
      yargs
        .option('stage', {
          alias: 's',
          type: 'string',
          description: 'The stage for the Cognito identity pool',
          default: env.STAGE,
        })
        .option('sls-file', {
          type: 'string',
          description: 'Serverless File Location',
          default: 'serverless.yml',
        }),
    async ({ stage, ...rest }) => {
      const jwks = await new Promise<string>((resolve, reject) => {
        process.stdin.on('data', (data) => {
          resolve(data.toString('utf-8'));
        });

        process.stdin.on('error', reject);
      });

      const serverlessConfig = fetchServerlessConfig(rest['sls-file']);

      const lambdaName = `${serverlessConfig.service}-${stage}-postgrestLambda`;
      const { Environment } = await lambda
        .getFunctionConfiguration({
          FunctionName: lambdaName,
        })
        .promise();

      const response = await lambda
        .updateFunctionConfiguration({
          FunctionName: lambdaName,
          Environment: {
            Variables: {
              ...Environment?.Variables,
              DB_JWT_SECRET: jwks,
            },
          },
        })
        .promise();

      if (response.LastUpdateStatus === 'Successful') {
        console.info(
          `Successfully updated the [${'jwt-secret'.cyan}] env var`.green
        );
      } else {
        console.info(
          `Failed to updated the [${'jwt-secret'.cyan}] env var`.red
        );
      }
    }
  );
