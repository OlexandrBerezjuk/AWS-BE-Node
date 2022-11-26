import { formatErrorJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { BUCKET, s3 } from '@libs/s3';
import { join, extname } from "node:path";

import { schema } from './schema';

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { name } = event?.queryStringParameters;

  if (!name) {
    return formatErrorJSONResponse({ message: "[name] query parameter is missing" });
  }

  if (extname(name) !== ".csv") {
    return formatErrorJSONResponse({ message: "wrong file format" });
  }

  const signedUrl = await s3.getSignedUrl('putObject', {
    Bucket: BUCKET,
    Key: join('uploaded/', name),
    ContentType: "text/csv",
    Expires: 60,
  });

  return formatJSONResponse({ signedUrl });
};

export const main = middyfy(importProductsFile);
