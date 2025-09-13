// Mock integrations for development
// In a real app, these would connect to actual services

export const UploadFile = async ({ file }) => {
  // Mock file upload - returns a placeholder URL
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockUrl = `https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=400&auto=format&fit=crop&crop=faces&t=${Date.now()}`;
      resolve({ file_url: mockUrl });
    }, 1000);
  });
};
