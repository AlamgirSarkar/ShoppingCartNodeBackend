import { Request, Response } from 'express';
import OrderItem from '../models/OrderItem';
import { orderItemValidationSchema, validate } from '../validations/orderValidation';
import mongoose from 'mongoose';

class OrderItemController {
  async createOrderItem(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = validate(orderItemValidationSchema, req.body);

      if (!mongoose.isValidObjectId(validatedData.order_id)) {
           res.status(400).json({ message: 'Invalid Order ID' });
      }

      if (!mongoose.isValidObjectId(validatedData.product_id)) {
           res.status(400).json({ message: 'Invalid Product ID' });
      }

      const orderItem = new OrderItem(validatedData);
      await orderItem.save();
       res.status(201).json(orderItem);
    } catch (error: any) {
       res.status(400).json({ message: error.message });
    }
  }

  async getOrderItemById(req: Request, res: Response): Promise<void> {
    try {
      if (!mongoose.isValidObjectId(req.params['orderId'])) {
           res.status(400).json({ message: 'Invalid OrderItem ID' });
      }

      const orderItem = await OrderItem.findById(req.params['itemId']);
      if (!orderItem) {
         res.status(404).json({ message: 'OrderItem not found' });
      }
       res.json(orderItem);
    } catch (error: any) {
       res.status(500).json({ message: error.message });
    }
  }

  async getAllOrderItems(_req: Request, res: Response): Promise<void> {
    try {
      const orderItems = await OrderItem.find();
       res.json(orderItems);
    } catch (error: any) {
       res.status(500).json({ message: error.message });
    }
  }

  async updateOrderItem(req: Request, res: Response): Promise<void> {
    try {
      if (!mongoose.isValidObjectId(req.params['orderId'])) {
           res.status(400).json({ message: 'Invalid OrderItem ID' });
      }

      const orderItem = await OrderItem.findByIdAndUpdate(req.params['itemId'], req.body, { new: true });
      if (!orderItem) {
         res.status(404).json({ message: 'OrderItem not found' });
      }
       res.json(orderItem);
    } catch (error: any) {
       res.status(400).json({ message: error.message });
    }
  }

  async deleteOrderItem(req: Request, res: Response): Promise<void> {
    try {
      if (!mongoose.isValidObjectId(req.params['orderId'])) {
           res.status(400).json({ message: 'Invalid OrderItem ID' });
      }

      const result = await OrderItem.deleteOne({ _id: req.params['itemId'] });
      if (result.deletedCount === 0) {
         res.status(404).json({ message: 'OrderItem not found' });
      }
       res.json({ message: 'OrderItem deleted successfully' });
    } catch (error: any) {
       res.status(500).json({ message: error.message });
    }
  }
}

export default new OrderItemController();