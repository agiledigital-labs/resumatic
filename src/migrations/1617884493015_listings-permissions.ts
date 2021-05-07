/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createRole('standard', {
        login: false
    });
    pgm.sql('GRANT USAGE ON SCHEMA listings TO standard');
    pgm.sql('GRANT SELECT, INSERT ON listings.listings_roles TO standard');
    pgm.sql('GRANT ALL ON listings.listings TO standard');
    pgm.sql('GRANT INSERT ON listings.users TO standard');
    pgm.sql('GRANT SELECT ON listings.users TO standard');

    pgm.sql('grant standard to authenticator;');


    pgm.createRole('admin', {
        login: false
    });
    pgm.sql('GRANT USAGE ON SCHEMA listings TO admin');
    pgm.sql('GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA listings TO admin');
    pgm.sql('GRANT ALL ON listings.listings_roles TO admin');
    pgm.sql('GRANT ALL ON listings.listings TO admin');
    pgm.sql('GRANT INSERT ON listings.users TO admin');
    pgm.sql('GRANT SELECT ON listings.users TO admin');
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.sql('REVOKE USAGE ON SCHEMA listings FROM standard');
    pgm.sql('REVOKE ALL ON listings.listings_roles FROM standard');
    pgm.sql('REVOKE ALL ON listings.listings FROM standard');
    pgm.sql('REVOKE INSERT ON listings.users FROM standard');
    pgm.sql('REVOKE SELECT ON listings.users FROM standard');
    pgm.sql('revoke standard from authenticator;');
    pgm.dropRole('standard');

    pgm.sql('REVOKE USAGE ON SCHEMA listings FROM admin');
    pgm.sql('REVOKE USAGE, SELECT ON ALL SEQUENCES IN SCHEMA listings FROM admin');
    pgm.sql('REVOKE ALL ON listings.listings_roles FROM admin');
    pgm.sql('REVOKE ALL ON listings.listings FROM admin');
    pgm.sql('REVOKE INSERT ON listings.users FROM admin');
    pgm.sql('REVOKE SELECT ON listings.users FROM admin');
    pgm.dropRole('admin');
}
