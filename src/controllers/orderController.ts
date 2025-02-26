import { Request, Response } from 'express';
import Order from '../models/Order';
import { orderValidationSchema, validate } from '../validations/orderValidation';
import mongoose from 'mongoose';

const DEFAULT_LIMIT = 10;

class OrderController {
  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = validate(orderValidationSchema, req.body);
      if (!mongoose.isValidObjectId(validatedData.user_id)) {
         res.status(400).json({ message: 'Invalid user_id' });
      }
      const order = new Order(validatedData);
      await order.save();
       res.status(201).json(order);
    } catch (error: any) {
       res.status(400).json({ message: error.message });
    }
  }

  async getOrderById(req: Request, res: Response): Promise<void> {
    try {
      if (!mongoose.isValidObjectId(req.params['id'])) {
         res.status(400).json({ message: 'Invalid Order ID' });
      }

      const order = await Order.findById(req.params['id']);
      if (!order) {
         res.status(404).json({ message: 'Order not found' });
      }
       res.json(order);
    } catch (error: any) {
       res.status(500).json({ message: error.message });
    }
  }

  async getAllOrders(req: Request, res: Response): Promise<void> {
    try {
      const limit = req.query['limit'] ? parseInt(req.query['limit'] as string, 10) : undefined;
      const offset = req.query['offset'] ? parseInt(req.query['offset'] as string, 10) : undefined;

      const orders = await Order.find().skip(offset || 0).limit(limit || DEFAULT_LIMIT);
       res.json(orders);
    } catch (error: any) {
       res.status(500).json({ message: error.message });
    }
  }

  async updateOrder(req: Request, res: Response): Promise<void> {
    try {
      if (!mongoose.isValidObjectId(req.params['id'])) {
         res.status(400).json({ message: 'Invalid Order ID' });
      }

      const order = await Order.findByIdAndUpdate(req.params['id'], req.body, { new: true });
      if (!order) {
         res.status(404).json({ message: 'Order not found' });
      }
       res.json(order);
    } catch (error: any) {
       res.status(400).json({ message: error.message });
    }
  }

  async deleteOrder(req: Request, res: Response): Promise<void> {
    try {
      if (!mongoose.isValidObjectId(req.params['id'])) {
         res.status(400).json({ message: 'Invalid Order ID' });
      }

      const result = await Order.deleteOne({ _id: req.params['id'] });
      if (result.deletedCount === 0) {
         res.status(404).json({ message: 'Order not found' });
      }
       res.json({ message: 'Order deleted successfully' });
    } catch (error: any) {
       res.status(500).json({ message: error.message });
    }
  }
}

export default new OrderController();