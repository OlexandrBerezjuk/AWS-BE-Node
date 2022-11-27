import { APIGatewayAuthorizerHandler } from 'aws-lambda';
import { lambdaWrapper } from '@libs/lambda';

import { generatePolicy } from '../../libs/generatePolicy';

const basicAuthorizer: APIGatewayAuthorizerHandler = async (event) => {
  if (event['type'] !== 'TOKEN') {
    throw new Error('Unauthorized');
  }

  try {
    const authorizationToken = event.authorizationToken;

    const encodedCreds = authorizationToken.split(' ')[1];
    const buff = Buffer.from(encodedCreds, 'base64');
    const [ username, password ] = buff.toString('utf-8').split(':');

    console.log(`username - ${username} and password ${password}`);

    const storedUserPassword = process.env[username];
    const effect = !storedUserPassword || storedUserPassword !== password ? 'Deny' : 'Allow';

    const policy = generatePolicy(encodedCreds, event.methodArn, effect);

    return policy;
  } catch (err) {
    throw new Error('Unauthorized');
  }
};

export const main = lambdaWrapper(basicAuthorizer);
