//import { any, any } from 'express';
import Cart from '../models/Cart';
import { cartValidationSchema } from '../validations/cartValidation';
import { validate} from '../validations/index';
import mongoose from 'mongoose';

class CartController {
  async createCart(req: any, res: any): Promise<void> {
    try {
      const validatedData = validate(cartValidationSchema, req.body);
       if (!mongoose.isValidObjectId(validatedData.user_id)) {
          return res.status(400).json({ message: 'Invalid User ID' });
        }

      const cart = new Cart(validatedData);
      await cart.save();
      return res.status(201).json(cart);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getCartById(req: any, res: any): Promise<void> {
    try {
         if (!mongoose.isValidObjectId(req.params.id)) {
          return res.status(400).json({ message: 'Invalid Cart ID' });
        }

      const cart = await Cart.findById(req.params.id);
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      return res.json(cart);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getAllCarts(_req: any, res: any): Promise<void> {
    try {
      const carts = await Cart.find();
      return res.json(carts);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async updateCart(req: any, res: any): Promise<void> {
    try {
       if (!mongoose.isValidObjectId(req.params.id)) {
          return res.status(400).json({ message: 'Invalid Cart ID' });
        }
      const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      return res.json(cart);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async deleteCart(req: any, res: any): Promise<void> {
    try {
       if (!mongoose.isValidObjectId(req.params.id)) {
          return res.status(400).json({ message: 'Invalid Cart ID' });
        }
      const result = await Cart.deleteOne({ _id: req.params.id });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      return res.json({ message: 'Cart deleted successfully' });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new CartController();