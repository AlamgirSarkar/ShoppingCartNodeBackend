"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerOptions = {
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
                        image_url: {
                            type: 'string',
                            description: 'The product image URL'
                        }
                    }
                },
            }
        }
    },
    apis: ['./src/routes/*.ts'],
};
exports.default = swaggerOptions;
//# sourceMappingURL=swaggerOptions.js.map