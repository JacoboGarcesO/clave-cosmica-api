import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  transaction_id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  accessCode: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    default: 'USD'
  },
  status: {
    type: String,
    required: true,
    trim: true,
    enum: ['pending', 'completed', 'failed', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true,
  versionKey: false
});

export default mongoose.model('Payment', paymentSchema);
