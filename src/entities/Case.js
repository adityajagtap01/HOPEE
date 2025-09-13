// Mock Case entity for development
// In a real app, this would connect to a backend API

class Case {
  static async create(caseData) {
    // Mock case creation
    console.log('Creating case:', caseData);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock created case
    return {
      id: `case_${Date.now()}`,
      ...caseData,
      status: 'pending',
      created_date: new Date().toISOString(),
      created_by: 'user@example.com'
    };
  }

  static async list(sortBy = '-created_date', limit = 10) {
    // Mock case list - return sample data
    const mockCases = [
      {
        id: 'case_1',
        title: 'Elderly person needs medical assistance',
        description: 'Found an elderly person on the street who appears to be in distress and needs immediate medical attention.',
        category: 'elderly',
        priority: 'high',
        status: 'pending',
        location: {
          address: '123 Main Street, Downtown',
          city: 'Mumbai',
          state: 'Maharashtra',
          latitude: 19.0760,
          longitude: 72.8777
        },
        photo_url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=400&auto=format&fit=crop',
        contact_phone: '+91-9876543210',
        created_date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        created_by: 'reporter@example.com'
      },
      {
        id: 'case_2',
        title: 'Homeless family needs shelter',
        description: 'A family with two children is sleeping on the street and needs immediate shelter and food.',
        category: 'homeless',
        priority: 'urgent',
        status: 'in_progress',
        location: {
          address: '456 Park Avenue, Central',
          city: 'Delhi',
          state: 'Delhi',
          latitude: 28.7041,
          longitude: 77.1025
        },
        photo_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=400&auto=format&fit=crop',
        contact_phone: '+91-9876543211',
        created_date: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        created_by: 'reporter2@example.com'
      },
      {
        id: 'case_3',
        title: 'Food distribution needed',
        description: 'Several people in the area are going hungry and need food assistance.',
        category: 'food_security',
        priority: 'medium',
        status: 'resolved',
        location: {
          address: '789 Market Street, Old City',
          city: 'Bangalore',
          state: 'Karnataka',
          latitude: 12.9716,
          longitude: 77.5946
        },
        photo_url: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=400&auto=format&fit=crop',
        contact_phone: '+91-9876543212',
        created_date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        created_by: 'reporter3@example.com'
      },
      {
        id: 'case_4',
        title: 'Mental health crisis support needed',
        description: 'Someone is having a mental health episode and needs professional help.',
        category: 'mental_health',
        priority: 'high',
        status: 'pending',
        location: {
          address: '321 Hospital Road, Medical District',
          city: 'Chennai',
          state: 'Tamil Nadu',
          latitude: 13.0827,
          longitude: 80.2707
        },
        photo_url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=400&auto=format&fit=crop',
        contact_phone: '+91-9876543213',
        created_date: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        created_by: 'reporter4@example.com'
      }
    ];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return mockCases.slice(0, limit);
  }

  static async updateStatus(caseId, status) {
    // Mock status update
    console.log(`Updating case ${caseId} status to ${status}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return { success: true };
  }
}

export { Case };
