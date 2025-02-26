import { Request, Response } from 'express';
import Seller from '../models/Seller';
import { sellerValidationSchema } from '../validations/sellerValidations';
import { validate } from '../validations/index';
import mongoose from 'mongoose';

class SellerController {
    async createSeller(req: Request, res: Response): Promise<void> {
        try {
            const validatedData = validate(sellerValidationSchema, req.body);

             const seller = new Seller(validatedData);
             await seller.save();
             res.status(201).json({ message: 'Seller created successfully' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getSellerById(req: Request, res: Response): Promise<void> {
        try {
            if (!mongoose.isValidObjectId(req.params['id'])) {
                 res.status(400).json({ message: 'Invalid seller ID' });
                 return;
            }

            const seller = await Seller.findById(req.params['id']);
            if (!seller) {
                res.status(404).json({ message: 'Seller not found' });
            } else {
                res.json(seller);
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllSellers(_req: Request, res: Response): Promise<void> {
        try {
            const sellers = await Seller.find();
            res.json(sellers);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateSeller(req: Request, res: Response): Promise<void> {
        try {
            if (!mongoose.isValidObjectId(req.params['id'])) {
                 res.status(400).json({ message: 'Invalid seller ID' });
                 return;
            }

            const seller = await Seller.findByIdAndUpdate(req.params['id'], req.body, { new: true });

            if (!seller) {
                res.status(404).json({ message: 'Seller not found' });
            } else {
                res.json(seller);
            }
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteSeller(req: Request, res: Response): Promise<void> {
        try {
            if (!mongoose.isValidObjectId(req.params['id'])) {
                 res.status(400).json({ message: 'Invalid seller ID' });
                 return;
            }
            const result = await Seller.deleteOne({ _id: req.params['id'] });

            if (result.deletedCount === 0) {
                res.status(404).json({ message: 'Seller not found' });
            } else {
                res.json({ message: 'Seller deleted successfully' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new SellerController();