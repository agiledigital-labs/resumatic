import { cleanEnv, str } from 'envalid';
import { SQS } from 'aws-sdk';

const env = cleanEnv(process.env, {
  SQS_QUEUE_URL: str(),
});

const sqs = new SQS();

/**
 * Handles the insert events from Postgres. JSON encodes the payload from
 * Postgres, then sends it to SQS
 *
 * @param event payload from Postgres
 */
export const handler = async (event: unknown) => {
  await sqs
    .sendMessage({
      QueueUrl: env.SQS_QUEUE_URL,
      MessageBody: JSON.stringify(event),
    })
    .promise();
};
