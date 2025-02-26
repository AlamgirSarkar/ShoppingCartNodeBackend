import { Request, Response } from 'express';
import CartItem from '../models/CartItem';
import { cartItemValidationSchema } from '../validations/cartItemValiadtion';
import {validate} from '../validations/index'
import mongoose from 'mongoose';

class CartItemController {
  async createCartItem(req: Request, res: Response): Promise<void> {
    try {

      const validatedData = validate(cartItemValidationSchema, req.body);

      if (!mongoose.isValidObjectId(validatedData.cart_id)) {
           res.status(400).json({ message: 'Invalid Cart ID' });
      }

      if (!mongoose.isValidObjectId(validatedData.product_id)) {
           res.status(400).json({ message: 'Invalid Product ID' });
      }

      const cartItem = new CartItem(validatedData);
      await cartItem.save();
       res.status(201).json(cartItem);
    } catch (error: any) {
       res.status(400).json({ message: error.message });
    }
  }

  async getCartItemById(req: Request, res: Response): Promise<void> {
    try {
       if (!mongoose.isValidObjectId(req.params['id'])) {
           res.status(400).json({ message: 'Invalid CartItem ID' });
        }

      const cartItem = await CartItem.findById(req.params['id']);
      if (!cartItem) {
         res.status(404).json({ message: 'CartItem not found' });
      }
       res.json(cartItem);
    } catch (error: any) {
       res.status(500).json({ message: error.message });
    }
  }

  async getAllCartItems(_req: Request, res: Response): Promise<void> {
    try {
      const cartItems = await CartItem.find();
       res.json(cartItems);
    } catch (error: any) {
       res.status(500).json({ message: error.message });
    }
  }

  async updateCartItem(req: Request, res: Response): Promise<void> {
    try {
       if (!mongoose.isValidObjectId(req.params['id'])) {
           res.status(400).json({ message: 'Invalid CartItem ID' });
        }
      const cartItem = await CartItem.findByIdAndUpdate(req.params['id'], req.body, { new: true });
      if (!cartItem) {
         res.status(404).json({ message: 'CartItem not found' });
      }
       res.json(cartItem);
    } catch (error: any) {
       res.status(400).json({ message: error.message });
    }
  }

  async deleteCartItem(req: Request, res: Response): Promise<void> {
    try {
       if (!mongoose.isValidObjectId(req.params['id'])) {
           res.status(400).json({ message: 'Invalid CartItem ID' });
        }
      const result = await CartItem.deleteOne({ _id: req.params['id'] });
      if (result.deletedCount === 0) {
         res.status(404).json({ message: 'CartItem not found' });
      }
       res.json({ message: 'CartItem deleted successfully' });
    } catch (error: any) {
       res.status(500).json({ message: error.message });
    }
  }
}

export default new CartItemController();