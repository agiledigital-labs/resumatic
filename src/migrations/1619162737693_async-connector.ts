/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.addExtension('aws_commons', { ifNotExists: true, cascade: true });
  pgm.addExtension('aws_lambda', { ifNotExists: true, cascade: true });
  pgm.createTable(
    { name: 'lambda_arn', schema: 'public' },
    {
      function_name: {
        type: 'varchar',
        notNull: true,
        primaryKey: true,
      },
      arn: {
        type: 'aws_commons._lambda_function_arn_1',
        notNull: true,
      },
    }
  );
  pgm.sql(
    `INSERT INTO public.lambda_arn (function_name, arn) VALUES ('process_listing', (SELECT aws_commons.create_lambda_function_arn('${process.env.ASYNC_PROCESSING_LAMBDA_ARN}')))`
  );
  pgm.sql(
    `CREATE FUNCTION process_listing() RETURNS trigger AS
    $$
    BEGIN
        PERFORM *
        FROM aws_lambda.invoke((SELECT arn FROM public.lambda_arn WHERE function_name = 'process_listing'),
                               to_json(new)::json, 'Event');
        RETURN new;
    END;
    $$ LANGUAGE plpgsql`
  );
  pgm.createTrigger(
    { name: 'listings', schema: 'listings' },
    'listings_process_listing_post_insert',
    {
      when: 'AFTER',
      operation: 'INSERT',
      level: 'ROW',
      function: 'process_listing',
    }
  );
  pgm.sql('GRANT SELECT ON public.lambda_arn TO standard');
  pgm.sql('GRANT USAGE ON SCHEMA aws_lambda TO standard');
  pgm.sql('GRANT EXECUTE ON FUNCTION process_listing() TO standard');
  pgm.sql('GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA aws_lambda TO standard');
  pgm.sql('GRANT SELECT ON public.lambda_arn TO admin');
  pgm.sql('GRANT USAGE ON SCHEMA aws_lambda TO admin');
  pgm.sql('GRANT EXECUTE ON FUNCTION process_listing() TO admin');
  pgm.sql('GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA aws_lambda TO admin');
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.sql('REVOKE SELECT ON public.lambda_arn FROM standard');
  pgm.sql('REVOKE USAGE ON SCHEMA aws_lambda FROM standard');
  pgm.sql('REVOKE EXECUTE ON FUNCTION process_listing() FROM standard');
  pgm.sql('REVOKE EXECUTE ON ALL FUNCTIONS IN SCHEMA aws_lambda FROM standard');
  pgm.sql('REVOKE SELECT ON public.lambda_arn FROM admin');
  pgm.sql('REVOKE USAGE ON SCHEMA aws_lambda FROM admin');
  pgm.sql('REVOKE EXECUTE ON FUNCTION process_listing() FROM admin');
  pgm.sql('REVOKE EXECUTE ON ALL FUNCTIONS IN SCHEMA aws_lambda FROM admin');
  pgm.dropExtension('aws_lambda', { cascade: true });
  pgm.dropExtension('aws_commons', { cascade: true });
  pgm.dropTable({ name: 'lambda_arn', schema: 'public' });
  pgm.dropTrigger(
    { name: 'listings', schema: 'listings' },
    'listings_process_listing_post_insert'
  );
  pgm.sql(`DROP FUNCTION public.process_listing()`);
}
