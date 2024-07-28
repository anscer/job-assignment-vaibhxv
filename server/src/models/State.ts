import mongoose, { Document, Schema } from 'mongoose';

export interface IState extends Document {
  name: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

const StateSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  createdBy: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<IState>('State', StateSchema);