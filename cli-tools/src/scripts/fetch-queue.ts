import { env } from '../common/env';
import { RootCommand } from '..';
import { CloudFormation, SQS } from 'aws-sdk';
import { fetchServerlessConfig } from '../common/sls';

require('colors');

const sqs = new SQS();
const cloudFormation = new CloudFormation();

/**
 * Fetches the Queue URL from the Cloud Formation stack outputs
 *
 * @param queueExportKey Key of queueUrl
 * @param nextToken token to fetch next pagination payload
 * @returns Queue Url
 */
const fetchQueueUrl = async (
  queueExportKey: string,
  nextToken?: string
): Promise<string | undefined> => {
  const response = await cloudFormation
    .listExports({ NextToken: nextToken })
    .promise();

  const output = response.Exports?.find(
    (output) => output.Name === queueExportKey
  );

  if (output !== undefined) {
    return output.Value;
  }

  if (response.NextToken !== undefined) {
    return fetchQueueUrl(queueExportKey, response.NextToken);
  }

  return undefined;
};

export default ({ command }: RootCommand) =>
  command(
    'fetch-queue',
    'Fetches the latest messages of the async processing queue',
    (yargs) =>
      yargs
        .option('stage', {
          alias: 's',
          type: 'string',
          description: 'The stage for the SQS queue',
          default: env.STAGE,
        })
        .option('sls-file', {
          type: 'string',
          description: 'Serverless File Location',
          default: 'serverless.yml',
        }),
    async ({ stage, ...rest }) => {
      const serverlessConfig = fetchServerlessConfig(rest['sls-file']);

      const queueUrl = await fetchQueueUrl(
        `${serverlessConfig.service}-${stage}-QueueUrl`
      );

      if (queueUrl === undefined) {
        console.error(`Failed to find queue url`.red);
        return;
      }

      const response = await sqs
        .receiveMessage({ QueueUrl: queueUrl, MaxNumberOfMessages: 10 })
        .promise();

      if (response.Messages !== undefined && response.Messages.length >= 0) {
        await sqs
          .deleteMessageBatch({
            QueueUrl: queueUrl,
            Entries:
              response.Messages?.map(({ ReceiptHandle, MessageId }) => ({
                Id: MessageId!,
                ReceiptHandle: ReceiptHandle!,
              })) ?? [],
          })
          .promise();
      }

      console.info(response.Messages);
    }
  );
