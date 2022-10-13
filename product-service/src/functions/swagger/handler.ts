import { swaggerConfig } from './swagger';

const body = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Mobile Shop AWS</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@3/swagger-ui.css">
</head>
<body>
    <div id="swagger"></div>
    <script src="https://unpkg.com/swagger-ui-dist@3/swagger-ui-bundle.js"></script>
    <script>
      SwaggerUIBundle({
        dom_id: '#swagger',
        url: '/dev/swagger.json'
    });
    </script>
</body>
</html>`;

const swagger = async (event) => {
  if (event.path === '/swagger.json') {
    return {
      statusCode: 200,
      body: JSON.stringify(swaggerConfig)
    }
  }

  return {
    statusCode: 200,
    headers: {
      ['Content-Type']: 'text/html',
    },
    body
  };
};

export const main = swagger;
