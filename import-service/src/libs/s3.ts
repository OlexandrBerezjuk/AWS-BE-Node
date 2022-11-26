import { S3 } from 'aws-sdk';

export const BUCKET = 'secondary-storage-bucket';
export const s3 = new S3({ region: 'eu-west-1' });