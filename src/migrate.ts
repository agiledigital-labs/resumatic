import { cleanEnv, num, str } from 'envalid';
import runner, { RunnerOption } from 'node-pg-migrate';

const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } = cleanEnv(
  process.env,
  {
    DB_HOST: str(),
    DB_PORT: num(),
    DB_NAME: str(),
    DB_USERNAME: str(),
    DB_PASSWORD: str(),
  }
);

const DATABASE_URL = `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const migrationOptions = (
  direction: RunnerOption['direction']
): RunnerOption => ({
  databaseUrl: DATABASE_URL,
  migrationsTable: 'migrations',
  dir: '/opt/',
  direction: direction,
  count: Infinity,
});

export const migrateUp = async () => {
  console.log('Running UP migrations');
  try {
    console.log('URL: ', DATABASE_URL);
    await runner(migrationOptions('up'));

    const message = 'UP Migrations ran successfully';
    console.log(message);

    return message;
  } catch (error) {
    const message = `Error running UP migrations: [${error}]`;
    console.log(message);
    throw new Error(message);
  }
};

export const migrateDown = async () => {
  console.log('Running DOWN migrations');
  try {
    console.log('URL: ', DATABASE_URL);
    await runner(migrationOptions('down'));

    const message = 'DOWN Migrations ran successfully';
    console.log(message);

    return message;
  } catch (error) {
    const message = `Error running DOWN migrations: [${error}]`;
    console.log(message);
    throw new Error(message);
  }
};
