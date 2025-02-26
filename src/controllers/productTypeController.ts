import { Request, Response } from 'express';
import ProductType from '../models/productType'
import Seller from '../models/Seller';
import Product from '../models/Products';
import { productTypeValidationSchema } from '../validations/productTypeValidations';
import { validate } from '../validations/index'
class ProductTypeController {
  async createProductType(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = validate(productTypeValidationSchema, req.body);
      const productType = new ProductType(validatedData);
      await productType.save();
      res.status(201).json(productType);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getProductTypeById(req: Request, res: Response): Promise<void> {
    try {
      const productType = await ProductType.findById(req.params['id']);
      if (!productType) {
        res.status(404).json({ message: 'Product type not found' });
      } else {
        res.json(productType);
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllProductTypes(_req: Request, res: Response): Promise<void> {
    try {
      const productTypes = await ProductType.find();
      res.json(productTypes);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateProductType(req: Request, res: Response): Promise<void> {
    try {
      const productType = await ProductType.findByIdAndUpdate(req.params['id'], req.body, { new: true });
      if (!productType) {
        res.status(404).json({ message: 'Product type not found' });
      } else {
        res.json(productType);
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteProductType(req: Request, res: Response): Promise<void> {
    try {
      const success = await ProductType.deleteOne({ _id: req.params['id'] });
      if (success.deletedCount === 0) {
        res.status(404).json({ message: 'Product type not found' });
      } else {
        res.json({ message: 'Product type deleted successfully' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
  async getProductNearestLocation(req: Request, res: Response): Promise<void> {
  try {
    const { id, userPincode } = req.params;
    //Find sellers operating in the user's pincode.
    const sellers = await Seller.find({ pincodes: userPincode });

    if (!sellers || sellers.length === 0) {
      res.status(500).json('No seller operating in this pin code'); 
    }
    const productType = await ProductType.find({_id :id});
    if (!productType) {
      res.status(200).json('Product not found');
    }
    const productName = productType[0]?.name;
    // Find products matching the product ID and belonging to the sellers.
    const products = await Product.find({
      name:productName,
      seller_id: { $in: sellers.map((seller) => seller._id) },
    }).sort({ price: 1 });
    //Return the product with the lowest price
    if (products.length > 0) {
      res.status(200).json(products[0]);
      return;
    }
    res.status(200).json('Product not found in nearby locations');
    
  } catch (error: any) {
    res.status(500).json(new Error(`Error getting product with lowest price: ${error.message}`));
  }
 }
}

export default new ProductTypeController();