import type { AWS } from '@serverless/typescript';
import * as dotenv from "dotenv";

import getProductsList from '@functions/getProductsList';
import getProductById from '@functions/getProductById';
import createProduct from '@functions/createProduct';
import swagger from '@functions/swagger';

dotenv.config({path: __dirname + '/.env'});

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  useDotenv : true,
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    region: 'eu-west-1',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ["dynamodb:*"],
        Resource: [
          "arn:aws:dynamodb:${self:provider.region}:*:table/${env:TABLE_PRODUCTS}",
          "arn:aws:dynamodb:${self:provider.region}:*:table/${env:TABLE_STOCKS}"
        ]
      }
    ],
    // function environment variables
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: {
    getProductsList,
    getProductById,
    createProduct,
    swagger,
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
