import { v4 } from "uuid";
import { Product } from "src/shared/types/products";
import { dbClient } from "../dynamo";

export const generateProductId = () => v4();

export const storeProduct = async (product: Omit<Product, "id">) => {
  const { stocks, ...data } = product;
  const itemId = generateProductId();

  const item = {
    ...data,
    id: itemId,
  }

  try {
    await dbClient.batchWrite({
      RequestItems: {
        [process.env.TABLE_PRODUCTS]: [
          {
            PutRequest: {
              Item: item,
            }
          }
        ],
        [process.env.TABLE_STOCKS]: [
          {
            PutRequest: {
              Item: {
                product_id: itemId,
                count: Number(stocks)
              }
            }
          },
        ]
      }
    }).promise();

    return item;
  } catch (err) {
    console.log({ error: err });
  }
}

export const retrieveAllProducts = async () => {
  const productsResults = await dbClient.scan({
    TableName: process.env.TABLE_PRODUCTS
  }).promise();

  return productsResults.Items;
}

export const retrieveProductById = async (id) => {
  const product = await dbClient.query({
    TableName: process.env.TABLE_PRODUCTS,
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: {':id': id}
}).promise();

  return product;
}
