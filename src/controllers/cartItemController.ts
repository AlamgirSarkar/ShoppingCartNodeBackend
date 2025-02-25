//import { any, any } from 'express';
import CartItem from '../models/CartItem';
import { cartItemValidationSchema } from '../validations/cartItemValiadtion';
import {validate} from '../validations/index'
import mongoose from 'mongoose';

class CartItemController {
  async createCartItem(req: any, res: any): Promise<void> {
    try {

      const validatedData = validate(cartItemValidationSchema, req.body);

      if (!mongoose.isValidObjectId(validatedData.cart_id)) {
          return res.status(400).json({ message: 'Invalid Cart ID' });
      }

      if (!mongoose.isValidObjectId(validatedData.product_id)) {
          return res.status(400).json({ message: 'Invalid Product ID' });
      }

      const cartItem = new CartItem(validatedData);
      await cartItem.save();
      return res.status(201).json(cartItem);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getCartItemById(req: any, res: any): Promise<void> {
    try {
       if (!mongoose.isValidObjectId(req.params.id)) {
          return res.status(400).json({ message: 'Invalid CartItem ID' });
        }

      const cartItem = await CartItem.findById(req.params.id);
      if (!cartItem) {
        return res.status(404).json({ message: 'CartItem not found' });
      }
      return res.json(cartItem);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getAllCartItems(_req: any, res: any): Promise<void> {
    try {
      const cartItems = await CartItem.find();
      return res.json(cartItems);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async updateCartItem(req: any, res: any): Promise<void> {
    try {
       if (!mongoose.isValidObjectId(req.params.id)) {
          return res.status(400).json({ message: 'Invalid CartItem ID' });
        }
      const cartItem = await CartItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!cartItem) {
        return res.status(404).json({ message: 'CartItem not found' });
      }
      return res.json(cartItem);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async deleteCartItem(req: any, res: any): Promise<void> {
    try {
       if (!mongoose.isValidObjectId(req.params.id)) {
          return res.status(400).json({ message: 'Invalid CartItem ID' });
        }
      const result = await CartItem.deleteOne({ _id: req.params.id });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'CartItem not found' });
      }
      return res.json({ message: 'CartItem deleted successfully' });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new CartItemController();