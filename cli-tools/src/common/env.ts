import { cleanEnv, str } from 'envalid';

/**
 * Verifies all the environment variables are available
 */
export const env = cleanEnv(process.env, {
  STAGE: str({ default: 'dev', desc: 'AWS Stage' }),
});
