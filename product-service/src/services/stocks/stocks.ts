import { dbClient } from "../dynamo"

export const retrieveAllStocks = async () => {
  const stocksResults = await dbClient.scan({
    TableName: process.env.TABLE_STOCKS
  }).promise();

  return stocksResults.Items;
}
