import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

export type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

export const formatJSONResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT',
    },
    body: JSON.stringify(response)
  }
};

export const formatErrorJSONResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 400,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(response)
  }
}
