//import { any, any } from 'express';
import Warehouse from '../models/Warehouse';
import { warehouseValidationSchema, validate } from '../validations/warehouseInventoryValidation';
import mongoose from 'mongoose';

class WarehouseController {
  async createWarehouse(req: any, res: any): Promise<void> {
    try {
      const validatedData = validate(warehouseValidationSchema, req.body);
      const warehouse = new Warehouse(validatedData);
      await warehouse.save();
      return res.status(201).json(warehouse);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getWarehouseById(req: any, res: any): Promise<void> {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: 'Invalid Warehouse ID' });
        }
      const warehouse = await Warehouse.findById(req.params.id);
      if (!warehouse) {
        return res.status(404).json({ message: 'Warehouse not found' });
      }
      return res.json(warehouse);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getAllWarehouses(_req: any, res: any): Promise<void> {
    try {
      const warehouses = await Warehouse.find();
      return res.json(warehouses);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async updateWarehouse(req: any, res: any): Promise<void> {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: 'Invalid Warehouse ID' });
        }
      const warehouse = await Warehouse.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!warehouse) {
        return res.status(404).json({ message: 'Warehouse not found' });
      }
      return res.json(warehouse);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async deleteWarehouse(req: any, res: any): Promise<void> {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: 'Invalid Warehouse ID' });
        }
      const result = await Warehouse.deleteOne({ _id: req.params.id });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Warehouse not found' });
      }
      return res.json({ message: 'Warehouse deleted successfully' });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new WarehouseController();