import { User } from '../models/index.js';

/**
 * User Service - Handles all database operations for User entity
 */
const userService = {
  /**
   * Create a new user
   * @param {Object} userData - User data to create
   * @returns {Promise<Object>} Created user
   */
  createUser: async (userData) => {
    try {
      const newUser = new User(userData);
      return await newUser.save();
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  },

  /**
   * Get all users with optional filtering
   * @param {Object} filter - Filter criteria
   * @param {Object} options - Query options (sort, limit, skip)
   * @returns {Promise<Array>} List of users
   */
  getUsers: async (filter = {}, options = {}) => {
    try {
      const { sort = 'name', limit = 10, skip = 0 } = options;
      
      return await User.find(filter)
        .sort(sort)
        .limit(limit)
        .skip(skip);
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  },

  /**
   * Get a user by ID
   * @param {String} id - User ID
   * @returns {Promise<Object>} User object
   */
  getUserById: async (id) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  },

  /**
   * Get a user by email
   * @param {String} email - User email
   * @returns {Promise<Object>} User object
   */
  getUserByEmail: async (email) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  },

  /**
   * Update a user
   * @param {String} id - User ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object>} Updated user
   */
  updateUser: async (id, updateData) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
      
      if (!updatedUser) {
        throw new Error('User not found');
      }
      
      return updatedUser;
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  },

  /**
   * Delete a user
   * @param {String} id - User ID
   * @returns {Promise<Boolean>} True if deleted
   */
  deleteUser: async (id) => {
    try {
      const result = await User.findByIdAndDelete(id);
      
      if (!result) {
        throw new Error('User not found');
      }
      
      return true;
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  },

  /**
   * Get users by role
   * @param {String} role - User role
   * @returns {Promise<Array>} List of users with specified role
   */
  getUsersByRole: async (role) => {
    try {
      return await User.find({ role });
    } catch (error) {
      throw new Error(`Error fetching users by role: ${error.message}`);
    }
  },

  /**
   * Get users by NGO
   * @param {String} ngoId - NGO ID
   * @returns {Promise<Array>} List of users associated with the NGO
   */
  getUsersByNGO: async (ngoId) => {
    try {
      return await User.find({ ngo: ngoId });
    } catch (error) {
      throw new Error(`Error fetching users by NGO: ${error.message}`);
    }
  }
};

export default userService;