// Core integrations for the application
import { connectDB } from '../config/database.js';

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Import models only in Node environment or use mock models in browser
let Case, NGO, User, AdminRequest, ContactMessage;

if (!isBrowser) {
  // Server-side: import actual models
  const models = await import('../models/index.js');
  Case = models.Case;
  NGO = models.NGO;
  User = models.User;
  AdminRequest = models.AdminRequest;
  ContactMessage = models.ContactMessage;
} else {
  // Browser-side: use mock models
  console.log('Using mock models for browser environment');
}

// Initialize database connection
const initializeDB = async () => {
  try {
    if (isBrowser) {
      console.log('Mock database initialized for browser environment');
      return true;
    } else {
      await connectDB();
      console.log('Database initialized successfully');
      return true;
    }
  } catch (error) {
    console.error('Failed to initialize database:', error);
    return false;
  }
};

// Mock file upload function - in a real app, this would connect to a storage service
export const UploadFile = async ({ file }) => {
  // Mock file upload - returns a placeholder URL
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockUrl = `https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=400&auto=format&fit=crop&crop=faces&t=${Date.now()}`;
      resolve({ file_url: mockUrl });
    }, 1000);
  });
};

// Create mock data for browser environment
const mockData = {
  cases: [],
  ngos: [],
  users: [],
  adminRequests: [],
  contactMessages: []
};

// Database operations
export const DB = {
  // Initialize the database
  initialize: initializeDB,
  
  // Case operations
  Case: {
    create: async (caseData) => {
      try {
        if (isBrowser) {
          const newCase = { ...caseData, _id: Date.now().toString(), created_at: new Date() };
          mockData.cases.push(newCase);
          return newCase;
        } else {
          const newCase = new Case(caseData);
          return await newCase.save();
        }
      } catch (error) {
        console.error('Error creating case:', error);
        throw error;
      }
    },
    getAll: async (filter = {}) => {
      try {
        if (isBrowser) {
          return mockData.cases;
        } else {
          return await Case.find(filter).sort({ created_at: -1 });
        }
      } catch (error) {
        console.error('Error getting cases:', error);
        throw error;
      }
    },
    getById: async (id) => {
      try {
        return await Case.findById(id);
      } catch (error) {
        console.error('Error getting case by ID:', error);
        throw error;
      }
    },
    update: async (id, updateData) => {
      try {
        return await Case.findByIdAndUpdate(id, updateData, { new: true });
      } catch (error) {
        console.error('Error updating case:', error);
        throw error;
      }
    },
    delete: async (id) => {
      try {
        return await Case.findByIdAndDelete(id);
      } catch (error) {
        console.error('Error deleting case:', error);
        throw error;
      }
    }
  },
  
  // NGO operations
  NGO: {
    create: async (ngoData) => {
      try {
        const newNGO = new NGO(ngoData);
        return await newNGO.save();
      } catch (error) {
        console.error('Error creating NGO:', error);
        throw error;
      }
    },
    getAll: async (filter = {}) => {
      try {
        return await NGO.find(filter).sort({ name: 1 });
      } catch (error) {
        console.error('Error getting NGOs:', error);
        throw error;
      }
    },
    getById: async (id) => {
      try {
        return await NGO.findById(id);
      } catch (error) {
        console.error('Error getting NGO by ID:', error);
        throw error;
      }
    },
    update: async (id, updateData) => {
      try {
        return await NGO.findByIdAndUpdate(id, updateData, { new: true });
      } catch (error) {
        console.error('Error updating NGO:', error);
        throw error;
      }
    }
  },
  
  // User operations
  User: {
    create: async (userData) => {
      try {
        const newUser = new User(userData);
        return await newUser.save();
      } catch (error) {
        console.error('Error creating user:', error);
        throw error;
      }
    },
    getByEmail: async (email) => {
      try {
        return await User.findOne({ email });
      } catch (error) {
        console.error('Error getting user by email:', error);
        throw error;
      }
    },
    update: async (id, updateData) => {
      try {
        return await User.findByIdAndUpdate(id, updateData, { new: true });
      } catch (error) {
        console.error('Error updating user:', error);
        throw error;
      }
    }
  },
  
  // Admin Request operations
  AdminRequest: {
    create: async (requestData) => {
      try {
        const newRequest = new AdminRequest(requestData);
        return await newRequest.save();
      } catch (error) {
        console.error('Error creating admin request:', error);
        throw error;
      }
    },
    getAll: async () => {
      try {
        return await AdminRequest.find().sort({ created_at: -1 });
      } catch (error) {
        console.error('Error getting admin requests:', error);
        throw error;
      }
    },
    update: async (id, updateData) => {
      try {
        return await AdminRequest.findByIdAndUpdate(id, updateData, { new: true });
      } catch (error) {
        console.error('Error updating admin request:', error);
        throw error;
      }
    }
  },
  
  // Contact Message operations
  ContactMessage: {
    create: async (messageData) => {
      try {
        const newMessage = new ContactMessage(messageData);
        return await newMessage.save();
      } catch (error) {
        console.error('Error creating contact message:', error);
        throw error;
      }
    },
    getAll: async () => {
      try {
        return await ContactMessage.find().sort({ created_at: -1 });
      } catch (error) {
        console.error('Error getting contact messages:', error);
        throw error;
      }
    },
    update: async (id, updateData) => {
      try {
        return await ContactMessage.findByIdAndUpdate(id, updateData, { new: true });
      } catch (error) {
        console.error('Error updating contact message:', error);
        throw error;
      }
    }
  }
};
