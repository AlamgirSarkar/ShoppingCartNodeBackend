import { Request, Response } from 'express';
import Product from '../models/Products';
import mongoose from 'mongoose';
import { productSchema } from '../validations/productValidation'; 
import { validate } from '../validations/index';
import ProductType from '../models/ProductType';
// Get all products
export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
// Get a product by ID
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params['id']);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new product
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  
    try {
      const validatedData = validate(productSchema, req.body);

      //Check if a ProductType with the given name already exists
      let productType = await ProductType.findOne({ name: validatedData.name });

      // If not, create it
      if (!productType) {
        productType = new ProductType({ name: validatedData.name });
        await productType.save();
      }

      // Assign the ProductType ID to the product
      const product = new Product({ ...validatedData, productType: productType._id });

      await product.save();
      res.status(201).json(product);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
};

// Update an existing product
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
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a product 
export const deleteProduct = async (req: Request, res: Response):Promise<void> => {
  try {
    const product = await Product.findById(req.params['id']);
    if (!product) {
     res.status(404).json({ message: 'Product not found' });
    }

    await product?.deleteOne();
    res.json({ message: 'Deleted Product' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
// Get products by category
export const getProductsByCategory = async (req: Request, res: Response):Promise<void> => {
  try {
    const categoryId = req.params['categoryId'];
    if (!mongoose.Types.ObjectId.isValid(categoryId as string)) {
     res.status(400).json({ message: 'Invalid category ID' });
    }

    const products = await Product.find({ category_id: categoryId });
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

