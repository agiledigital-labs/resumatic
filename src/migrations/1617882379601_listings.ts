/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

const listingsTable = (name: string) => ({ schema: 'listings', name })

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createSchema('listings');

    pgm.createTable(listingsTable('users'),
        {
            id: {
                type: "name",
                primaryKey: true,
                default: pgm.func("current_setting('request.jwt.claim.sub', true)")
            },
            email: {
                type: "name",
                notNull: true,
                default: pgm.func("current_setting('request.jwt.claim.email', true)")
            },
            username: {
                type: "name",
                notNull: true,
                default: pgm.func("current_setting('request.jwt.claim.preferred_username', true)")
            },
        }
    );

    pgm.createTable(listingsTable('listings'),
        {
            id: {
                type: "uuid",
                primaryKey: true,
                default: pgm.func("gen_random_uuid()")
            },
            created_by_user_id: {
                type: "name",
                notNull: true,
                references: 'listings.users (id)',
                default: pgm.func("current_setting('request.jwt.claim.sub', true)")
            },
            url: {
                type: "varchar",
                notNull: true
            }
        }
    );

    pgm.createTrigger(listingsTable('listings'), 'listings_listings_pre_insert',
        {
            when: 'BEFORE',
            operation: 'INSERT',
            level: 'ROW',
            language: 'plpgsql'
        },
        `
    BEGIN
      INSERT INTO listings.users DEFAULT VALUES ON CONFLICT (id) DO NOTHING;
      NEW.created_by_user_id := current_setting('request.jwt.claim.sub', true);
      return NEW;
    END;
      `
    );

    pgm.createTrigger(listingsTable('listings'), 'listings_listings_post_insert',
    {
        when: 'AFTER',
        operation: 'INSERT',
        level: 'ROW',
        language: 'plpgsql'
    },
    `
BEGIN
  INSERT INTO listings.listings_roles (user_id, listing_id) VALUES (NEW.created_by_user_id, NEW.id);
  RETURN NEW;
END;
  `
);

    pgm.createTable(listingsTable('listings_roles'),
        {
            user_id: {
                type: "name",
                notNull: true,
                references: 'listings.users (id)'
            },
            listing_id: {
                type: 'uuid',
                notNull: true,
                references: 'listings.listings (id)'
            }
        }
    )
}

