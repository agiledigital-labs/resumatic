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

export default ({ command }: RootCommand) =>
  command(
    'encode-jwks',
    'Encodes the JWKs for the PostgresT config',
    (yargs) =>
      yargs
        .option('stage', {
          alias: 's',
          type: 'string',
          description: 'The stage for the Cognito identity pool',
          default: env.STAGE,
        })
        .option('silent', {
          type: 'boolean',
          description: 'Silences the output text other than the JWKs',
          default: false,
        }),
    async ({ stage, silent }) => {
      const userPool = await fetchUserPool(cognito, stage);

      if (userPool === undefined) {
        console.error(
          `Unable to find Cognito User Pool for stage [${stage}-postgrest]`.red
        );
        return;
      }

      const response = await axios.get<string>(
        `https://cognito-idp.${awsConfig.region}.amazonaws.com/${userPool.Id}/.well-known/jwks.json`,
        { transformResponse: (value) => value }
      );

      const encodedJwk = response.data.replace(/"/g, '\\"');

      if (silent) {
        process.stdout.write(encodedJwk);
      } else {
        console.info(
          'Below is the encoded JWKs. These are to be put in the postgrest.conf file'
            .green
        );
        console.info(encodedJwk.blue);
      }
    }
  );
