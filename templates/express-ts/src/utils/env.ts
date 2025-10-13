/* src/utils/env.ts */
import 'dotenv/config';
import logger from '../services/logger';

/**
 * Gets an environment variable or throws if not set
 *
 * @param key - The environment variable key to fetch
 * @param defaultValue - Optional default value if the env variable is not set
 * @returns The environment variable value as a string
 * @throws Throws an error if the environment variable is not set and no default is provided
 */
export function getEnv(key: string, defaultValue?: string): string {
  logger.debug(`Accessing environment variable: ${key}`);

  const value = process.env[key]?.trim();

  if (value !== undefined && value !== '') {
    return value;
  }

  if (defaultValue !== undefined) {
    return defaultValue;
  }

  throw new Error(
    `Environment variable "${key}" is not set and no default value was provided.`
  );
}
