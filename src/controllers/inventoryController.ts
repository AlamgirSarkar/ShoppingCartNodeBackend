//import { any, any } from 'express';
import Inventory from '../models/Inventory';
import { inventoryValidationSchema, validate } from '../validations/warehouseInventoryValidation';
import mongoose from 'mongoose';

class InventoryController {
  async createInventory(req: any, res: any): Promise<void> {
    try {
      const validatedData = validate(inventoryValidationSchema, req.body);

      if (!mongoose.isValidObjectId(validatedData.product_id)) {
          return res.status(400).json({ message: 'Invalid Product ID' });
      }
      if (!mongoose.isValidObjectId(validatedData.warehouse_id)) {
          return res.status(400).json({ message: 'Invalid Warehouse ID' });
      }
      const inventory = new Inventory(validatedData);
      await inventory.save();
      return res.status(201).json(inventory);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getInventoryById(req: any, res: any): Promise<void> {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: 'Invalid Inventory ID' });
        }
      const inventory = await Inventory.findById(req.params.id);
      if (!inventory) {
        return res.status(404).json({ message: 'Inventory not found' });
      }
      return res.json(inventory);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getAllInventories(_req: any, res: any): Promise<void> {
    try {
      const inventories = await Inventory.find();
      return res.json(inventories);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async updateInventory(req: any, res: any): Promise<void> {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: 'Invalid Inventory ID' });
        }
      const inventory = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!inventory) {
        return res.status(404).json({ message: 'Inventory not found' });
      }
      return res.json(inventory);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async deleteInventory(req: any, res: any): Promise<void> {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: 'Invalid Inventory ID' });
        }
      const result = await Inventory.deleteOne({ _id: req.params.id });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Inventory not found' });
      }
      return res.json({ message: 'Inventory deleted successfully' });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new InventoryController();