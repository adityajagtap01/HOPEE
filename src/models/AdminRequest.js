import mongoose from 'mongoose';

const adminRequestSchema = new mongoose.Schema({
  user_email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  user_name: {
    type: String,
    required: true,
    trim: true
  },
  reason: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const AdminRequest = mongoose.model('AdminRequest', adminRequestSchema);

export default AdminRequest;