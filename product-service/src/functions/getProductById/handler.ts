import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { availableProducts } from 'src/mocks/products';

import schema from './schema';

const getProductById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { id } = event.pathParameters;

  try {
    const product = availableProducts.find( product => product.id === id );

    if (!id) {
      throw `Invalid id=${id}`;
    }

    if (!product) {
      throw `No product with id=${id} found`;
    }

    return formatJSONResponse({ product });
  } catch (error) {
    return formatJSONResponse({message: error});
  }
};

export const main = middyfy(getProductById);
