import { formatErrorJSONResponse } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { BUCKET, s3 } from '@libs/s3';
import { S3 } from 'aws-sdk';
import csv from 'csv-parser';

const readFile = (params: S3.GetObjectRequest) => {
  return new Promise((res, rej) => {
    const stream = s3.getObject(params).createReadStream();

    stream
      .pipe(csv())
      .on('data', async (data) => {
        console.log(JSON.stringify(data));
      })
      .on('error', (error) => {
        rej('PARSE ERROR ' + error.message);
      })
      .on('end', () => {
        res('Success!');
      })
  })
}

const importFileParser = async (event) => {
  for (const record of event.Records) {
    const params = {
      Bucket: BUCKET,
      Key: record.s3.object.key
    }

    console.log(JSON.stringify(params));


    try {
      await readFile(params);
      await s3.copyObject({
        ...params,
        CopySource: BUCKET + '/' + record.s3.object.key,
        Key: record.s3.object.key.replace('uploaded', 'parsed')
      }).promise();

      await s3.deleteObject(params).promise();

      console.log(record.s3.object.key + ' succesfully parsed');

      return formatJSONResponse({
        data: `Parsed ${record.s3.object.key}`
      });
    }
    catch (error) {
      console.log(error);
      return formatErrorJSONResponse({
        message: `Parsed ${record.s3.object.key} failed, because ${error.message}`
      });
    }
  }
};

export const main = middyfy(importFileParser);
