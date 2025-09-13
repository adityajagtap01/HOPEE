// Database Test File
// Run this file to test database functionality

import { DB } from '../integrations/Core.js';

// Test database connection and operations
const testDatabase = async () => {
  try {
    console.log('Initializing database connection...');
    await DB.initialize();
    console.log('Database connection successful!');
    
    // Test Case operations
    console.log('\n--- Testing Case operations ---');
    const testCase = {
      title: 'Test Case',
      description: 'This is a test case',
      category: 'homeless',
      priority: 'medium',
      location: {
        address: '123 Test Street',
        city: 'Test City',
        state: 'Test State'
      },
      created_by: 'test@example.com'
    };
    
    // Create a case
    const createdCase = await DB.Case.create(testCase);
    console.log('Created case:', createdCase);
    
    // Get all cases
    const allCases = await DB.Case.getAll();
    console.log(`Retrieved ${allCases.length} cases`);
    
    // Get case by ID
    const caseById = await DB.Case.getById(createdCase._id);
    console.log('Retrieved case by ID:', caseById);
    
    // Update case
    const updatedCase = await DB.Case.update(createdCase._id, { status: 'in_progress' });
    console.log('Updated case:', updatedCase);
    
    // Delete case
    const deleteResult = await DB.Case.delete(createdCase._id);
    console.log('Case deleted:', deleteResult);
    
    console.log('\n--- Testing NGO operations ---');
    const testNGO = {
      name: 'Test NGO',
      email: 'test@ngo.org',
      description: 'This is a test NGO',
      service_areas: ['Test City', 'Another City'],
      specializations: ['homeless', 'medical']
    };
    
    // Create an NGO
    const createdNGO = await DB.NGO.create(testNGO);
    console.log('Created NGO:', createdNGO);
    
    // Get all NGOs
    const allNGOs = await DB.NGO.getAll();
    console.log(`Retrieved ${allNGOs.length} NGOs`);
    
    // Get NGO by ID
    const ngoById = await DB.NGO.getById(createdNGO._id);
    console.log('Retrieved NGO by ID:', ngoById);
    
    // Update NGO
    const updatedNGO = await DB.NGO.update(createdNGO._id, { verified: true });
    console.log('Updated NGO:', updatedNGO);
    
    console.log('\nDatabase tests completed successfully!');
  } catch (error) {
    console.error('Database test failed:', error);
  }
};

// Run the test
testDatabase();