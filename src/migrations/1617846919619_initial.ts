/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createRole('authenticator', {
    inherit: false,
    login: true,
    password: 'mysecretpassword',
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropRole('authenticator');
}
