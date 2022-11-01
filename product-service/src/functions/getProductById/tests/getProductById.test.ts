import { APIGatewayProxyEvent } from 'aws-lambda';
import { contextMock } from 'src/mocks/context';
import { products } from 'src/mocks/products';
import { main } from '../handler';

describe('getProductById', () => {
  it('should return founded product and statusCode = 200', async () => {
    const [ expectedProduct ] = products;
    const event: APIGatewayProxyEvent = {
      pathParameters: {
        id: expectedProduct.id
      }
    } as any;

    const output = await main(event, contextMock);

    expect(output.statusCode).toBe(200);
    expect(output.body).toBe(JSON.stringify({ product: { ...expectedProduct, count: 1 } }));
  });

  it('should return error message and statusCode = 500 if product was not found', async () => {
    const TEST_ID = '123';
    const event: APIGatewayProxyEvent = {
      pathParameters: {
        id: TEST_ID,
      }
    } as any;

    const output = await main(event, contextMock);

    expect(output.statusCode).toBe(500);
    expect(output.body).toBe(JSON.stringify({ message: `No product with id=${TEST_ID} found` }));
  });

  it('should return error message and statusCode = 500 if pathParams does not contain id', async () => {
    const event: APIGatewayProxyEvent = {
      pathParameters: {
        id: undefined,
      }
    } as any;

    const output = await main(event, contextMock);

    expect(output.statusCode).toBe(500);
    expect(output.body).toBe(JSON.stringify({ message: `Invalid id=${undefined}` }));
  });
});