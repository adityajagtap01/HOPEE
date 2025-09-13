import { NGO } from '../models/index.js';

/**
 * NGO Service - Handles all database operations for NGO entity
 */
const ngoService = {
  /**
   * Create a new NGO
   * @param {Object} ngoData - NGO data to create
   * @returns {Promise<Object>} Created NGO
   */
  createNGO: async (ngoData) => {
    try {
      const newNGO = new NGO(ngoData);
      return await newNGO.save();
    } catch (error) {
      throw new Error(`Error creating NGO: ${error.message}`);
    }
  },

  /**
   * Get all NGOs with optional filtering
   * @param {Object} filter - Filter criteria
   * @param {Object} options - Query options (sort, limit, skip)
   * @returns {Promise<Array>} List of NGOs
   */
  getNGOs: async (filter = {}, options = {}) => {
    try {
      const { sort = 'name', limit = 10, skip = 0 } = options;
      
      return await NGO.find(filter)
        .sort(sort)
        .limit(limit)
        .skip(skip);
    } catch (error) {
      throw new Error(`Error fetching NGOs: ${error.message}`);
    }
  },

  /**
   * Get an NGO by ID
   * @param {String} id - NGO ID
   * @returns {Promise<Object>} NGO object
   */
  getNGOById: async (id) => {
    try {
      const ngo = await NGO.findById(id);
      if (!ngo) {
        throw new Error('NGO not found');
      }
      return ngo;
    } catch (error) {
      throw new Error(`Error fetching NGO: ${error.message}`);
    }
  },

  /**
   * Update an NGO
   * @param {String} id - NGO ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object>} Updated NGO
   */
  updateNGO: async (id, updateData) => {
    try {
      const updatedNGO = await NGO.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
      
      if (!updatedNGO) {
        throw new Error('NGO not found');
      }
      
      return updatedNGO;
    } catch (error) {
      throw new Error(`Error updating NGO: ${error.message}`);
    }
  },

  /**
   * Delete an NGO
   * @param {String} id - NGO ID
   * @returns {Promise<Boolean>} True if deleted
   */
  deleteNGO: async (id) => {
    try {
      const result = await NGO.findByIdAndDelete(id);
      
      if (!result) {
        throw new Error('NGO not found');
      }
      
      return true;
    } catch (error) {
      throw new Error(`Error deleting NGO: ${error.message}`);
    }
  },

  /**
   * Search NGOs by text
   * @param {String} searchText - Text to search for
   * @returns {Promise<Array>} List of matching NGOs
   */
  searchNGOs: async (searchText) => {
    try {
      return await NGO.find(
        { $text: { $search: searchText } },
        { score: { $meta: 'textScore' } }
      ).sort({ score: { $meta: 'textScore' } });
    } catch (error) {
      throw new Error(`Error searching NGOs: ${error.message}`);
    }
  },

  /**
   * Get verified NGOs
   * @returns {Promise<Array>} List of verified NGOs
   */
  getVerifiedNGOs: async () => {
    try {
      return await NGO.find({ verified: true });
    } catch (error) {
      throw new Error(`Error fetching verified NGOs: ${error.message}`);
    }
  },

  /**
   * Get NGOs by specialization
   * @param {String} specialization - NGO specialization
   * @returns {Promise<Array>} List of NGOs with specified specialization
   */
  getNGOsBySpecialization: async (specialization) => {
    try {
      return await NGO.find({ specializations: specialization });
    } catch (error) {
      throw new Error(`Error fetching NGOs by specialization: ${error.message}`);
    }
  },

  /**
   * Get NGOs by service area
   * @param {String} area - Service area
   * @returns {Promise<Array>} List of NGOs serving the specified area
   */
  getNGOsByServiceArea: async (area) => {
    try {
      return await NGO.find({ service_areas: area });
    } catch (error) {
      throw new Error(`Error fetching NGOs by service area: ${error.message}`);
    }
  }
};

export default ngoService;