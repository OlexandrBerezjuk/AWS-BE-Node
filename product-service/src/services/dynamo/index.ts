import { DynamoDB } from 'aws-sdk';

export const dbClient = new DynamoDB.DocumentClient();
