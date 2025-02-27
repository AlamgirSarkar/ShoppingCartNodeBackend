import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Shopping App API',
      version: '1.0.0',
      description: 'API documentation for the shopping app',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
          User: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'The user ID'
              },
              name: {
                type: 'string',
                description: 'The user\'s name'
              },
              email: {
                type: 'string',
                description: 'The user\'s email'
              },
              role: {
                type: 'string',
                description: 'The user\'s role (customer, admin, vendor)'
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                description: 'The date the user was created'
              }
            }
          },
            Category: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'The category ID'
              },
              name: {
                type: 'string',
                description: 'The category name'
              },
              description: {
                type: 'string',
                description: 'The category description'
              },
               image_url: {
                type: 'string',
                description: 'The category image'
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                description: 'The date the category was created'
              }
            }
          },
          CategoryInput: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'The category name'
              },
              description: {
                type: 'string',
                description: 'The category description'
              },
               image_url: {
                type: 'string',
                description: 'The category image'
              }
            }
          },
          Product: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'The product ID'
              },
              name: {
                type: 'string',
                description: 'The product name'
              },
              description: {
                type: 'string',
                description: 'The product description'
              },
              price: {
                type: 'number',
                format: 'double',
                description: 'The product price'
              },
              category_id: {
                type: 'string',
                description: 'The ID of the category this product belongs to'
              },
              image_url: {
                type: 'string',
                description: 'The product image URL'
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                description: 'The date the product was created'
              }
            }
          },
           ProductInput: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'The product name'
              },
              description: {
                type: 'string',
                description: 'The product description'
              },
              price: {
                type: 'number',
                format: 'double',
                description: 'The product price'
              },
              category_id: {
                type: 'string',
                description: 'The ID of the category this product belongs to'
              },
              seller_id: {
                type: 'string',
                description: 'The ID of the seller who sells this product'
              },
              image_url: {
                type: 'string',
                description: 'The product image URL'
              },
              stock: {
                type: 'number',
                description: 'The quantity of the product in stock'
              },
            }
          },
          Order: {
            type: 'object',
            properties: {
              id: { type: 'string', description: 'The order ID' },
              user_id: { type: 'string', description: 'The user ID' },
              total_price: { type: 'number', format: 'float', description: 'The total price' },
              status: { type: 'string', description: 'The order status' },
              createdAt: { type: 'string', format: 'date-time', description: 'Creation timestamp' },
            },
          },
          OrderItem: {
            type: 'object',
            properties: {
              id: { type: 'string', description: 'The order item ID' },
              order_id: { type: 'string', description: 'The order ID' },
              product_id: { type: 'string', description: 'The product ID' },
              quantity: { type: 'integer', description: 'The quantity' },
              price: { type: 'number', format: 'float', description: 'The price' },
              createdAt: { type: 'string', format: 'date-time', description: 'Creation timestamp' },
            },
          },
          Warehouse: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'The warehouse ID (MongoDB ObjectId)',
              },
              name: {
                type: 'string',
                description: 'The name of the warehouse',
              },
              address: {
                type: 'string',
                description: 'The address of the warehouse',
              },
              latitude: {
                type: 'number',
                format: 'float',
                description: 'The latitude of the warehouse location',
              },
              longitude: {
                type: 'number',
                format: 'float',
                description: 'The longitude of the warehouse location',
              },
              region: {
                type: 'string',
                description: 'The region where the warehouse is located',
              },
            },
          },
          Inventory: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'The inventory ID (MongoDB ObjectId)',
              },
              product_id: {
                type: 'string',
                description: 'The ID of the product',
              },
              warehouse_id: {
                type: 'string',
                description: 'The ID of the warehouse',
              },
              stock: {
                type: 'integer',
                description: 'The quantity of the product in stock',
              },
            },
          },
          Cart: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'The cart ID (MongoDB ObjectId)'
              },
              user_id: {
                type: 'string',
                description: 'The ID of the user'
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                description: 'The date and time the cart was created'
              }
            }
          },
          CartItem: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'The cart item ID (MongoDB ObjectId)'
              },
              cart_id: {
                type: 'string',
                description: 'The ID of the cart'
              },
              product_id: {
                type: 'string',
                description: 'The ID of the product'
              },
              quantity: {
                type: 'integer',
                description: 'The quantity of the product in the cart'
              },
              addedAt: {
                type: 'string',
                format: 'date-time',
                description: 'The date and time the item was added to the cart'
              }
            }
          },
          Review: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'The review ID (MongoDB ObjectId)'
              },
              user_id: {
                type: 'string',
                description: 'The ID of the user'
              },
              product_id: {
                type: 'string',
                description: 'The ID of the product'
              },
              rating: {
                type: 'integer',
                description: 'The rating given by the user (1-5)'
              },
              comment: {
                type: 'string',
                description: 'The comment provided by the user'
              }
            }
          }
      }
    }
  },
  apis: ['./src/routes/*.ts'], 
};

export default swaggerOptions;