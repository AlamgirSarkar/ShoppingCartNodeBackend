import mongoose, { Schema, Document } from 'mongoose';

export interface IProductType extends Document {
  name: string; //The Product Type name.
  description?: string; //Optional description
  createdAt: Date;
  updatedAt: Date;
}

const ProductTypeSchema: Schema = new Schema(
  {
    name: { type: String, unique: true }, // Ensure uniqueness
    description: { type: String },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export default mongoose.model<IProductType>('ProductType', ProductTypeSchema);