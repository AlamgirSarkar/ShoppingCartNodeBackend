import { Request, Response } from 'express';
import Inventory from '../models/Inventory';
import { inventoryValidationSchema, validate } from '../validations/warehouseInventoryValidation';
import mongoose from 'mongoose';

class InventoryController {
  async createInventory(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = validate(inventoryValidationSchema, req.body);

      if (!mongoose.isValidObjectId(validatedData.product_id)) {
           res.status(400).json({ message: 'Invalid Product ID' });
      }
      if (!mongoose.isValidObjectId(validatedData.warehouse_id)) {
           res.status(400).json({ message: 'Invalid Warehouse ID' });
      }
      const inventory = new Inventory(validatedData);
      await inventory.save();
       res.status(201).json(inventory);
    } catch (error: any) {
       res.status(400).json({ message: error.message });
    }
  }

  async getInventoryById(req: Request, res: Response): Promise<void> {
    try {
        if (!mongoose.isValidObjectId(req.params['id'])) {
             res.status(400).json({ message: 'Invalid Inventory ID' });
        }
      const inventory = await Inventory.findById(req.params['id']);
      if (!inventory) {
         res.status(404).json({ message: 'Inventory not found' });
      }
       res.json(inventory);
    } catch (error: any) {
       res.status(500).json({ message: error.message });
    }
  }

  async getAllInventories(_req: Request, res: Response): Promise<void> {
    try {
      const inventories = await Inventory.find();
       res.json(inventories);
    } catch (error: any) {
       res.status(500).json({ message: error.message });
    }
  }

  async updateInventory(req: Request, res: Response): Promise<void> {
    try {
        if (!mongoose.isValidObjectId(req.params['id'])) {
             res.status(400).json({ message: 'Invalid Inventory ID' });
        }
      const inventory = await Inventory.findByIdAndUpdate(req.params['id'], req.body, { new: true });
      if (!inventory) {
         res.status(404).json({ message: 'Inventory not found' });
      }
       res.json(inventory);
    } catch (error: any) {
       res.status(400).json({ message: error.message });
    }
  }

  async deleteInventory(req: Request, res: Response): Promise<void> {
    try {
        if (!mongoose.isValidObjectId(req.params['id'])) {
             res.status(400).json({ message: 'Invalid Inventory ID' });
        }
      const result = await Inventory.deleteOne({ _id: req.params['id'] });
      if (result.deletedCount === 0) {
         res.status(404).json({ message: 'Inventory not found' });
      }
       res.json({ message: 'Inventory deleted successfully' });
    } catch (error: any) {
       res.status(500).json({ message: error.message });
    }
  }
}

export default new InventoryController();