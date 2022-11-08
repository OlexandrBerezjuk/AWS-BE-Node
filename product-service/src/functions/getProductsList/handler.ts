import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { retrieveAllProducts } from 'src/services/products/products';
import { retrieveAllStocks } from 'src/services/stocks/stocks';

import schema from './schema';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  const products = await retrieveAllProducts();

  const stocks = await retrieveAllStocks();

  const availableProducts = stocks.map( stock => {
    const productInStock = products.find( product => product.id === stock.product_id );

    return {
      ...productInStock,
      count: stock.count
    }
  } )
  
  return formatJSONResponse({ products: availableProducts });
};

export const main = middyfy(getProductsList);
