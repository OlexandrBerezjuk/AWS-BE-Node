import { APIGatewayProxyEvent } from 'aws-lambda';
import { contextMock } from 'src/mocks/context';
import { availableProducts } from 'src/mocks/products';
import { main } from '../handler';

describe('getProductsList', () => {
  it('should return founded product and statusCode = 200', async () => {
    const event: APIGatewayProxyEvent = {} as any;

    const output = await main(event, contextMock);

    expect(output.statusCode).toBe(200);
    expect(output.body).toEqual(JSON.stringify({ products: availableProducts }));
  });
});