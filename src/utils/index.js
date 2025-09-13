// Utility functions for HOPEE app

export const createPageUrl = (pageName) => {
  const pageMap = {
    'Landing': '/',
    'ReportCase': '/report-case',
    'Contact': '/contact',
    'Profile': '/profile',
    'NGORegister': '/ngo-register',
    'NGOProfile': '/ngo-profile',
    'NGODashboard': '/ngo-dashboard',
    'AdminDashboard': '/admin-dashboard',
    'CreateNGOProfile': '/create-ngo-profile'
  };
  
  return pageMap[pageName] || '/';
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const formatDateTime = (date) => {
  return new Date(date).toLocaleString();
};
