import { Request, Response } from 'express';
import Cart from '../models/Cart';
import { cartValidationSchema } from '../validations/cartValidation';
import { validate} from '../validations/index';
import mongoose from 'mongoose';

class CartController {
  async createCart(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = validate(cartValidationSchema, req.body);
       if (!mongoose.isValidObjectId(validatedData.user_id)) {
           res.status(400).json({ message: 'Invalid User ID' });
        }

      const cart = new Cart(validatedData);
      await cart.save();
       res.status(201).json(cart);
    } catch (error: any) {
       res.status(400).json({ message: error.message });
    }
  }

  async getCartById(req: Request, res: Response): Promise<void> {
    try {
         if (!mongoose.isValidObjectId(req.params['id'])) {
           res.status(400).json({ message: 'Invalid Cart ID' });
        }

      const cart = await Cart.findById(req.params['id']);
      if (!cart) {
         res.status(404).json({ message: 'Cart not found' });
      }
       res.json(cart);
    } catch (error: any) {
       res.status(500).json({ message: error.message });
    }
  }

  async getAllCarts(_req: Request, res: Response): Promise<void> {
    try {
      const carts = await Cart.find();
       res.json(carts);
    } catch (error: any) {
       res.status(500).json({ message: error.message });
    }
  }

  async updateCart(req: Request, res: Response): Promise<void> {
    try {
       if (!mongoose.isValidObjectId(req.params['id'])) {
           res.status(400).json({ message: 'Invalid Cart ID' });
        }
      const cart = await Cart.findByIdAndUpdate(req.params['id'], req.body, { new: true });
      if (!cart) {
         res.status(404).json({ message: 'Cart not found' });
      }
       res.json(cart);
    } catch (error: any) {
       res.status(400).json({ message: error.message });
    }
  }

  async deleteCart(req: Request, res: Response): Promise<void> {
    try {
       if (!mongoose.isValidObjectId(req.params['id'])) {
           res.status(400).json({ message: 'Invalid Cart ID' });
        }
      const result = await Cart.deleteOne({ _id: req.params['id'] });
      if (result.deletedCount === 0) {
         res.status(404).json({ message: 'Cart not found' });
      }
       res.json({ message: 'Cart deleted successfully' });
    } catch (error: any) {
       res.status(500).json({ message: error.message });
    }
  }
}

export default new CartController();