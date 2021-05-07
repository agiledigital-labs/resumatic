import { CognitoIdentityServiceProvider } from 'aws-sdk';

/**
 * Fetches a user pool that name matches the one in the configuration
 *
 * @param cognito Instance of cognito
 * @param stage service stage
 * @returns User pool
 */
export const fetchUserPool = async (
  cognito: CognitoIdentityServiceProvider,
  stage: string
) => {
  const { UserPools } = await cognito
    .listUserPools({ MaxResults: 10 })
    .promise();
  return UserPools?.find(({ Name }) => Name === `${stage}-postgrest`);
};
