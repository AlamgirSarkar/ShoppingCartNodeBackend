import mongoose, { Schema, Document } from 'mongoose';

export enum OrderStatus {
  Pending = 'pending',
  Paid = 'paid',
  Shipped = 'shipped',
  Delivered = 'delivered',
  Cancelled = 'cancelled',
}

export interface IOrder extends Document {
  user_id: mongoose.Types.ObjectId;
  total_price: number;
  status: OrderStatus;
  createdAt: Date;
}

const OrderSchema: Schema = new Schema(
  {
    user_id: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    total_price: { type: Number, required: true },
    status: { type: String, enum: OrderStatus, default: OrderStatus.Pending },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>('Order', OrderSchema);