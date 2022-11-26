import { formatErrorJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { retrieveProductById } from 'src/services/products/products';

import schema from './schema';

const getProductById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { id } = event.pathParameters;

  try {
    const product = await retrieveProductById(Number(id));

    if (!id) {
      throw `Invalid id=${id}`;
    }

    if (!product) {
      throw `No product with id=${id} found`;
    }

    return formatJSONResponse({ product });
  } catch (error) {
    return formatErrorJSONResponse({message: error});
  }
};

export const main = middyfy(getProductById);
