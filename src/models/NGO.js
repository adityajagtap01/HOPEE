import mongoose from 'mongoose';

const ngoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  service_areas: {
    type: [String],
    required: true
  },
  specializations: {
    type: [String],
    enum: ['homeless', 'medical', 'elderly', 'abandoned', 'mental_health', 'food_security', 'other']
  },
  verified: {
    type: Boolean,
    default: false
  },
  website: {
    type: String,
    trim: true
  },
  logo_url: {
    type: String
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

const NGO = mongoose.model('NGO', ngoSchema);

export default NGO;