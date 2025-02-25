import mongoose, { Schema, Document } from 'mongoose';

export interface IInventory extends Document {
  product_id: mongoose.Types.ObjectId;
  warehouse_id: mongoose.Types.ObjectId;
  stock: number;
  last_updated: Date;
}

const InventorySchema: Schema = new Schema(
  {
    product_id: { type: mongoose.Types.ObjectId, ref: 'Product', required: true },
    warehouse_id: { type: mongoose.Types.ObjectId, ref: 'Warehouse', required: true },
    stock: { type: Number, required: true },
  },
  { timestamps: true }  //Correct timestamp
);

export default mongoose.model<IInventory>('Inventory', InventorySchema);