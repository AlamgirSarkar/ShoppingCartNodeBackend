import { Request, Response } from 'express';
import Category from '../models/Category';

// Get all categories
export const getAllCategories = async (  _req:Request,  res: Response ):Promise<void> => {
  try {
    const categories = await Category.find();
    res.status(201).json(categories);
  } catch (err:any) {
    res.json({ message: err.message });
    return;
  }
};

// Get a category by ID
export const getCategoryById = async (req: Request, res: Response):Promise<void> => {
  try {
    const category = await Category.findById(req.params['id']);
    if (!category) {
       res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new category 
export const createCategory = async (req: Request, res: Response) => {
  console.log('requsetbody',req.body);
  const category = new Category({
    name: req.body.name,
    description: req.body.description
  });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err:any) {
    res.status(400).json({ message: err.message });
  }
};

// Update an existing category 
export const updateCategory = async (req: Request, res: Response):Promise<void> => {
  try {
    const category = await Category.findById(req.params['id']);
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return; 
    }

    if (req.body.name != null) {
      category.name = req.body.name;
    }
    if (req.body.description != null) {
      category.description = req.body.description;
    }

    const updatedCategory = await category.save();
    res.json(updatedCategory);
    return
  } catch (err:any) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a category
export const deleteCategory = async (req: Request, res: Response):Promise<void> => {
  try {
    const category = await Category.findById(req.params['id']);
    if (!category) {
       res.status(404).json({ message: 'Category not found' });
       return
    }

    await category.deleteOne();
    res.json({ message: 'Deleted Category' });
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
};