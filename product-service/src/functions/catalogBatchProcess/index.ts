import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sqs: {
        batchSize: 5,
        arn: {
          'Fn::GetAtt': ['SQSQueue', 'Arn']
        }
      },
    },
  ],
  environment: {
    TABLE_PRODUCTS: "${env:TABLE_PRODUCTS}",
    TABLE_STOCKS: "${env:TABLE_STOCKS}",
    SNS_ARN: {
      Ref: 'SNSTopic'
    }
  },
};
