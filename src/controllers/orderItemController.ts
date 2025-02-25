//import { any, any } from 'express';
import OrderItem from '../models/OrderItem';
import { orderItemValidationSchema, validate } from '../validations/orderValidation';
import mongoose from 'mongoose';

class OrderItemController {
  async createOrderItem(req: any, res: any): Promise<void> {
    try {
      const validatedData = validate(orderItemValidationSchema, req.body);

      if (!mongoose.isValidObjectId(validatedData.order_id)) {
          return res.status(400).json({ message: 'Invalid Order ID' });
      }

      if (!mongoose.isValidObjectId(validatedData.product_id)) {
          return res.status(400).json({ message: 'Invalid Product ID' });
      }

      const orderItem = new OrderItem(validatedData);
      await orderItem.save();
      return res.status(201).json(orderItem);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getOrderItemById(req: any, res: any): Promise<void> {
    try {
        console.log('req.params',req.params);
      if (!mongoose.isValidObjectId(req.params.orderId)) {
        console.log('test1')
          return res.status(400).json({ message: 'Invalid OrderItem ID' });
      }

      const orderItem = await OrderItem.findById(req.params.itemId);
      if (!orderItem) {
        return res.status(404).json({ message: 'OrderItem not found' });
      }
      return res.json(orderItem);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getAllOrderItems(_req: any, res: any): Promise<void> {
    try {
      const orderItems = await OrderItem.find();
      return res.json(orderItems);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async updateOrderItem(req: any, res: any): Promise<void> {
    try {
      console.log(req.params);
      if (!mongoose.isValidObjectId(req.params.orderId)) {
          return res.status(400).json({ message: 'Invalid OrderItem ID' });
      }

      const orderItem = await OrderItem.findByIdAndUpdate(req.params.itemId, req.body, { new: true });
      if (!orderItem) {
        return res.status(404).json({ message: 'OrderItem not found' });
      }
      return res.json(orderItem);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async deleteOrderItem(req: any, res: any): Promise<void> {
    try {
      if (!mongoose.isValidObjectId(req.params.orderId)) {
          return res.status(400).json({ message: 'Invalid OrderItem ID' });
      }

      const result = await OrderItem.deleteOne({ _id: req.params.itemId });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'OrderItem not found' });
      }
      return res.json({ message: 'OrderItem deleted successfully' });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new OrderItemController();