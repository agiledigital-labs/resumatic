import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { resolve } from 'path';
import type { AWS } from '@serverless/typescript';
const cloudFormationSchema = require('@serverless/utils/cloudformation-schema');

/**
 * Loads a serverless file using a yaml loader and matches it against the
 * cloudformation schema. The loaded in file will be returned as a Javascript
 * object.
 *
 * @param serverlessFile Location of serverless file
 * @returns serverless configuration object
 */
export const fetchServerlessConfig = (serverlessFile: string): AWS =>
  yaml.load(readFileSync(resolve(serverlessFile), 'utf-8'), {
    schema: cloudFormationSchema,
  }) as AWS;
