// Simple script to test database connection
import { DB } from './src/integrations/Core.js';

console.log('Testing database connection...');
DB.initialize()
  .then(() => {
    console.log('Database connection successful!');
    console.log('Your database is now set up and working correctly.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1);
  });