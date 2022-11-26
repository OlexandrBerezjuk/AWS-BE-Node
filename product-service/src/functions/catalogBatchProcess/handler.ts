import { SNS } from 'aws-sdk';
import { middyfy } from '@libs/lambda';
import { storeProduct } from 'src/services/products/products';
import { formatErrorJSONResponse, formatJSONResponse } from '@libs/api-gateway';

const catalogBatchProcess = async (event) => {
  try {
    const sns = new SNS({ region: 'eu-west-1' });
    const products = event.Records.map(({ body }) => JSON.parse(body));

    const storedProducts = await Promise.all(products.map(product => storeProduct(product)));

    sns.publish(
      {
          Subject: 'New products were added', // we're going to receive email with content from this object
          Message: `Successfully stored next products - ${JSON.stringify(storedProducts)}`,
          TopicArn: process.env.SNS_ARN
      },
      () => {
          console.log('Send email for: ' + JSON.stringify(storedProducts));
      }
    );
    
    return formatJSONResponse({storedProducts});
  } catch (err) {
    return formatErrorJSONResponse(err);
  }
};

export const main = middyfy(catalogBatchProcess);
