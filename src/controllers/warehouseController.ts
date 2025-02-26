import { Request, Response } from 'express';
import Warehouse from '../models/Warehouse';
import { warehouseValidationSchema, validate } from '../validations/warehouseInventoryValidation';
import mongoose from 'mongoose';

class WarehouseController {
  async createWarehouse(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = validate(warehouseValidationSchema, req.body);
      const warehouse = new Warehouse(validatedData);
      await warehouse.save();
       res.status(201).json(warehouse);
    } catch (error: any) {
       res.status(400).json({ message: error.message });
    }
  }

  async getWarehouseById(req: Request, res: Response): Promise<void> {
    try {
        if (!mongoose.isValidObjectId(req.params['id'])) {
           res.status(400).json({ message: 'Invalid Warehouse ID' });
        }
      const warehouse = await Warehouse.findById(req.params['id']);
      if (!warehouse) {
       res.status(404).json({ message: 'Warehouse not found' });
      }
     res.json(warehouse);
    } catch (error: any) {
     res.status(500).json({ message: error.message });
    }
  }

  async getAllWarehouses(_req: Request, res: Response): Promise<void> {
    try {
      const warehouses = await Warehouse.find();
     res.json(warehouses);
    } catch (error: any) {
     res.status(500).json({ message: error.message });
    }
  }

  async updateWarehouse(req: Request, res: Response): Promise<void> {
    try {
        if (!mongoose.isValidObjectId(req.params['id'])) {
           res.status(400).json({ message: 'Invalid Warehouse ID' });
        }
      const warehouse = await Warehouse.findByIdAndUpdate(req.params['id'], req.body, { new: true });
      if (!warehouse) {
       res.status(404).json({ message: 'Warehouse not found' });
      }
     res.json(warehouse);
    } catch (error: any) {
     res.status(400).json({ message: error.message });
    }
  }

  async deleteWarehouse(req: Request, res: Response): Promise<void> {
    try {
        if (!mongoose.isValidObjectId(req.params['id'])) {
           res.status(400).json({ message: 'Invalid Warehouse ID' });
        }
      const result = await Warehouse.deleteOne({ _id: req.params['id'] });
      if (result.deletedCount === 0) {
       res.status(404).json({ message: 'Warehouse not found' });
      }
     res.json({ message: 'Warehouse deleted successfully' });
    } catch (error: any) {
     res.status(500).json({ message: error.message });
    }
  }
}

export default new WarehouseController();