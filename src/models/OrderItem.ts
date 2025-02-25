import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem extends Document {
  order_id: mongoose.Types.ObjectId;
  product_id: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

const OrderItemSchema: Schema = new Schema(
  {
    order_id: { type: mongoose.Types.ObjectId, ref: 'Order', required: true },
    product_id: { type: mongoose.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IOrderItem>('OrderItem', OrderItemSchema);