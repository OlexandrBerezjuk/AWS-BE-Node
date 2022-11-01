export const swaggerConfig = {
  "swagger": "2.0",
  "openapi": "3.1.0",
  "x-stoplight": {
    "id": "23yvhnuuwxnfd"
  },
  "info": {
    "title": "AWS-Node",
    "version": "1.0",
    "description": "AWS Node BE APIs description"
  },
  "servers": [
    {
      "url": "/dev"
    }
  ],
  "paths": {
    "/products/{id}": {
      "parameters": [
        {
          "schema": {
            "type": "string"
          },
          "name": "id",
          "in": "path",
          "required": true
        }
      ],
      "get": {
        "summary": "Get User Info by User ID",
        "tags": [],
        "responses": {
          "200": {
            "description": "Product found",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "product": {
                      "$ref": "#/components/schemas/Product"
                    }
                  }
                },
                "examples": {}
              }
            }
          },
          "500": {
            "description": "Product not found",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        },
        "operationId": "getProductById",
        "description": "Retrieve the information of the product with the matching user ID."
      }
    },
    "/products": {
      "parameters": [],
      "get": {
        "summary": "",
        "operationId": "getProductsList",
        "responses": {
          "200": {
            "description": "Successfully received all available products",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "products": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Product"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "description": "Retrieve all available products"
      }
    }
  },
  "components": {
    "schemas": {
      "Product": {
        "title": "Product",
        "type": "object",
        "description": "",
        "examples": [],
        "properties": {
          "id": {
            "type": "number",
            "description": "Unique identifier for the given user."
          },
          "description": {
            "type": "string"
          },
          "price": {
            "type": "number"
          },
          "count": {
            "type": "number"
          },
          "title": {
            "type": "string"
          }
        },
        "required": [
          "id"
        ],
        "x-internal": false
      }
    }
  }
};
