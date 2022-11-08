import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
        cors: true,
      },
    },
  ],
  environment: {
    TABLE_PRODUCTS: "${env:TABLE_PRODUCTS}",
    TABLE_STOCKS: "${env:TABLE_STOCKS}",
  },
};
