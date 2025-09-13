import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  subject: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['general', 'bug_report', 'feature_request', 'support'],
    default: 'general'
  },
  status: {
    type: String,
    enum: ['new', 'in_review', 'resolved'],
    default: 'new'
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

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);

export default ContactMessage;