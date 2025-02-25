import mongoose, { Schema, Document } from 'mongoose';

export interface IWarehouse extends Document {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  region: string;
}

const WarehouseSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    latitude: { type: Number },
    longitude: { type: Number },
    region: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IWarehouse>('Warehouse', WarehouseSchema);