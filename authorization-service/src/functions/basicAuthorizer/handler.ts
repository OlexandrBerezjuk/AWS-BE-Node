import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { generatePolicy } from '../../libs/generatePolicy';

const basicAuthorizer = async (event) => {
  console.log(JSON.stringify(event));
  
  if (event['type'] !== 'TOKEN') {
    return formatJSONResponse({ message: 'Unauthorized' }, 401)
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
    return formatJSONResponse({ message: 'Unauthorized' }, 401);
  }
};

export const main = middyfy(basicAuthorizer);
