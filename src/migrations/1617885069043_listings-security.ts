/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.sql('ALTER TABLE listings.listings_roles ENABLE ROW LEVEL SECURITY');
    pgm.createPolicy({ schema: 'listings', name: 'listings_roles' }, 'roles_policy', {
        command: 'SELECT',
        role: 'standard',
        using: 'user_id = current_setting(\'request.jwt.claim.sub\', true)'
    });
    pgm.createPolicy({ schema: 'listings', name: 'listings_roles' }, 'roles_insert_policy', {
        command: 'INSERT',
        role: 'standard',
        check: 'user_id = current_setting(\'request.jwt.claim.sub\', true)'
    });
    pgm.createPolicy({ schema: 'listings', name: 'listings_roles' }, 'roles_policy_admin', {
        role: 'admin',
        using: 'true'
    });
    pgm.createView({ schema: 'listings', name: 'user_listings' }, {

    }, 'SELECT * FROM listings.listings l JOIN listings.listings_roles r ON r.listing_id = l.id WHERE r.user_id = current_setting(\'request.jwt.claim.sub\', true)');
    pgm.sql('ALTER VIEW listings.user_listings OWNER TO standard');
    pgm.sql('GRANT SELECT on listings.user_listings TO standard');
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.sql('REVOKE SELECT on listings.user_listings FROM standard');
    
    pgm.dropView({ schema: 'listings', name: 'user_listings' }, { ifExists: true });
    pgm.dropPolicy({ schema: 'listings', name: 'listings_roles' }, 'roles_policy_admin', { ifExists: true });
    pgm.dropPolicy({ schema: 'listings', name: 'listings_roles' }, 'roles_insert_policy', { ifExists: true });
    pgm.dropPolicy({ schema: 'listings', name: 'listings_roles' }, 'roles_policy', { ifExists: true });
    pgm.sql('ALTER TABLE listings.listings_roles DISABLE ROW LEVEL SECURITY');
}
