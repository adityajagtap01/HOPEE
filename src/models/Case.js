import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  address: { type: String, required: true },
  latitude: { type: Number },
  longitude: { type: Number },
  city: { type: String },
  state: { type: String }
});

const caseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: locationSchema,
    required: true
  },
  photo_url: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'resolved'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  category: {
    type: String,
    enum: ['homeless', 'medical', 'elderly', 'abandoned', 'mental_health', 'food_security', 'other'],
    required: true
  },
  contact_phone: {
    type: String
  },
  assigned_ngo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NGO'
  },
  resolution_notes: {
    type: String
  },
  created_by: {
    type: String,
    required: true
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

const Case = mongoose.model('Case', caseSchema);

export default Case;