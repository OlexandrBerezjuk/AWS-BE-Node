import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { storeProduct } from 'src/services/products/products';

import { eventSchema } from './schema';

const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof eventSchema> = async (event) => {
  const { title, description, price, stocks } = event.body;
  console.log({event});

  try {
    const product = await storeProduct({ title, description, price: Number(price), stocks });

    return formatJSONResponse({ product });
  } catch (error) {
    console.log({error})
  }
};

export const main = middyfy(createProduct);
