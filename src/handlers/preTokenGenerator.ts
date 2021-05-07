import { PreTokenGenerationAuthenticationTriggerEvent } from 'aws-lambda';
import * as deepmerge from 'deepmerge';

/**
 * Adds a custom claim to the id token
 *
 * @param event Cognito PreAuth trigger
 * @returns Cogntio PreAuth payload
 */
export const handler = async (
  event: PreTokenGenerationAuthenticationTriggerEvent
) =>
  deepmerge(event, {
    response: {
      claimsOverrideDetails: {
        claimsToAddOrOverride: {
          role: event.request.userAttributes['custom:role'],
        },
      },
    },
  });
