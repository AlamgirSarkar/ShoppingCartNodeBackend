import { Request, Response } from 'express';
import Product from '../models/Products';
import mongoose from 'mongoose';
import { productSchema } from '../validations/productValidation'; // Import the Joi schema

// Get all products (with filtering, sorting, and pagination)
// Get all products (with filtering, sorting, and pagination)
export const getAllProducts = async (_req: Request, res: Response) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };
// Get a product by ID
export const getProductById = async (req: any, res: any) => {
  try {
    const product = await Product.findById(req.params['id']);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new product (Admin only)
export const createProduct = async (req: any, res: any) => {

     try {
        // Validate the request body using Joi
        const { error, value } = productSchema.validate(req.body);
    
        if (error) {
          return res.status(400).json({ message: error }); 
        }
    
        const product = new Product({
          name: value.name,  // Use the validated values
          description: value.description,
          price: value.price,
          category_id: value.category_id,
          image_url: value.image_url
        });
    
        const newProduct = await product.save();
        console.log('newProduct',newProduct);
        return res.status(201).json(newProduct);
      } catch (err: any) {
        return res.status(400).json({ message: err.message });
      }
};

// Update an existing product (Admin only)
export const updateProduct = async (req: any, res: any) => {
  try {
    const product = await Product.findById(req.params['id']);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (req.body.name != null) {
      product.name = req.body.name;
    }
    if (req.body.description != null) {
      product.description = req.body.description;
    }
    if (req.body.price != null) {
      product.price = req.body.price;
    }
    if (req.body.category_id != null) {
      product.category_id = req.body.category_id;
    }
    if (req.body.image_url != null) {
      product.image_url = req.body.image_url;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err:any) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a product (Admin only)
export const deleteProduct = async (req: any, res: any) => {
  try {
    const product = await Product.findById(req.params['id']);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();
    res.json({ message: 'Deleted Product' });
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
};
// Get products by category
export const getProductsByCategory = async (req: any, res: any) => {
    try {
      const categoryId = req.params['categoryId'];
      if (!mongoose.Types.ObjectId.isValid(categoryId as string)) {
        return res.status(400).json({ message: 'Invalid category ID' });
      }
  
      const products = await Product.find({ category_id: categoryId });
      res.json(products);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };