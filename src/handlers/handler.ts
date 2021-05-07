import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Callback,
} from 'aws-lambda';
import { spawn } from 'child_process';
import { cleanEnv, json, num, str } from 'envalid';
import { writeFileSync } from 'fs';
import * as dedent from 'dedent-js';
import { retryAsync } from 'ts-retry';
import axios, { Method, AxiosResponse } from 'axios';

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_SCHEMA,
  DB_JWT_SECRET,
  DB_ANON_ROLE,
} = cleanEnv(process.env, {
  DB_HOST: str(),
  DB_PORT: num(),
  DB_NAME: str(),
  DB_USERNAME: str(),
  DB_PASSWORD: str(),
  DB_SCHEMA: str(),
  DB_JWT_SECRET: str(),
  DB_ANON_ROLE: str(),
});

const POSTGREST_HOST = 'http://localhost';
const POSTGREST_PORT = 3000;
// This path needs to be modified for local machine development
const POSTGREST_EXECUTABLE_PATH = `/opt/postgrest`;
const POSTGREST_CONFIG_PATH = `/tmp/postgrest.conf`;

const POSTGREST_CONFIG = dedent(`
db-uri = "postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}"
db-schema = "${DB_SCHEMA}"
db-anon-role = "${DB_ANON_ROLE}"
jwt-secret = "${DB_JWT_SECRET}"
server-port = ${POSTGREST_PORT}`);

// postgrest expects its config to live in a file
writeFileSync(POSTGREST_CONFIG_PATH, POSTGREST_CONFIG);

const serverUrl = `${POSTGREST_HOST}:${POSTGREST_PORT}`;

export const index = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  // Only start the PostgREST server if it's not up already
  axios
    .get(serverUrl, {
      validateStatus: (status) => status < 500,
    })
    .then(() => {
      console.log(
        `PostgREST server is already running on [${POSTGREST_HOST}${POSTGREST_PORT}]`
      );
    })
    .catch((error) => {
      if (error.code === 'ECONNREFUSED') {
        console.log('Starting PostgREST webserver');

        const postgrestServer = spawn(POSTGREST_EXECUTABLE_PATH, [
          POSTGREST_CONFIG_PATH,
        ]);

        postgrestServer.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
        });
        postgrestServer.stderr.on('data', (data) => {
          console.error(`stderr: ${data}`);
        });
        postgrestServer.on('close', (code) => {
          console.log(`child process exited with code ${code}`);
        });
      } else {
        const message = `Error connecting to PostgREST server: [${error}]`;
        console.log(message);
        return message;
      }
    });

  await retryAsync(
    async () =>
      axios(serverUrl, {
        validateStatus: (status) => status < 500,
      }),
    { delay: 100, maxTry: 20 }
  );

  console.log('Successfully connected to PostgREST server.');

  // Pass the request onto the PostgREST server
  const response = (await axios(
    `${serverUrl}${event.requestContext.http.path}?${Object.entries(
      event.queryStringParameters ?? {}
    )
      .map(([key, value]) => `${key}=${value}`)
      .join('&')}`,
    {
      method: event.requestContext.http.method as Method,
      headers: event.headers,
      data: event.body,
      validateStatus: () => true,
    }
  )) as AxiosResponse<unknown>;

  const formattedResponse = {
    statusCode: response.status,
    body: JSON.stringify(response.data),
    headers: response.headers,
  };

  return formattedResponse;
};
