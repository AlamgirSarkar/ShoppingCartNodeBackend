import { Request, Response } from 'express';
import Review from '../models/Review';
import { reviewValidationSchema } from '../validations/reviewValidation';
import {validate} from '../validations/index'
import mongoose from 'mongoose';

class ReviewController {
  async createReview(req: Request, res: Response): Promise<Response> {
    try {
      const validatedData = validate(reviewValidationSchema, req.body);

      if (!mongoose.isValidObjectId(validatedData.user_id)) {
          return res.status(400).json({ message: 'Invalid User ID' });
      }

      if (!mongoose.isValidObjectId(validatedData.product_id)) {
          return res.status(400).json({ message: 'Invalid Product ID' });
      }

      const review = new Review(validatedData);
      await review.save();
      return res.status(201).json(review);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getReviewById(req: Request, res: Response): Promise<Response> {
    try {
       if (!mongoose.isValidObjectId(req.params['id'])) {
          return res.status(400).json({ message: 'Invalid Review ID' });
        }

      const review = await Review.findById(req.params['id']);
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
      return res.json(review);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getAllReviews(req: Request, res: Response): Promise<Response> {
    try {
        let filter = {};
        if(req.query['product_id']) {
            filter = {product_id: req.query['product_id']}
        }
      const reviews = await Review.find(filter);
      return res.json(reviews);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async updateReview(req: Request, res: Response): Promise<Response> {
    try {
       if (!mongoose.isValidObjectId(req.params['id'])) {
          return res.status(400).json({ message: 'Invalid Review ID' });
        }
      const review = await Review.findByIdAndUpdate(req.params['id'], req.body, { new: true });
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
      return res.json(review);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async deleteReview(req: Request, res: Response): Promise<Response> {
    try {
      if (!mongoose.isValidObjectId(req.params['id'])) {
          return res.status(400).json({ message: 'Invalid Review ID' });
        }

      const result = await Review.deleteOne({ _id: req.params['id'] });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Review not found' });
      }
      return res.json({ message: 'Review deleted successfully' });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new ReviewController();