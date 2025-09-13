# HOPEE - Helping Out People Everywhere Effectively

A React-based web application that connects people in need with NGOs that can provide assistance. Report cases of people who need help, and connect them with verified NGOs in your area.

## Features

- 🏠 **Landing Page** - Beautiful homepage with recent cases and mission information
- 📝 **Case Reporting** - Easy-to-use form to report people in need
- 🏢 **NGO Registration** - NGOs can register and get verified
- 👤 **User Profiles** - Manage your profile and track your reported cases
- 📊 **NGO Dashboard** - NGOs can manage assigned cases and update status
- 🛡️ **Admin Dashboard** - Platform administrators can monitor and manage the system
- 📱 **Responsive Design** - Works perfectly on desktop and mobile devices

## Tech Stack

- **React 18** - Frontend framework
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Lucide React** - Beautiful icons
- **Date-fns** - Date manipulation library

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (local installation or MongoDB Atlas account)

## Installation & Setup

1. **Clone or download the project**
   ```bash
   # If you have git installed
   git clone <repository-url>
   cd HOPEE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally

## Project Structure

```
HOPEE/
├── src/
│   ├── Pages/                 # Main page components
│   │   ├── landing.jsx       # Homepage
│   │   ├── reportcase.jsx    # Case reporting form
│   │   ├── profile.jsx       # User profile
│   │   ├── ngoRegister.jsx   # NGO registration
│   │   ├── ngoDashboard.jsx  # NGO case management
│   │   └── adminDashboard.jsx # Admin panel
│   ├── Components/           # Reusable components
│   │   ├── Layout.js         # Main layout wrapper
│   │   ├── case/            # Case-related components
│   │   └── ngo/             # NGO-related components
│   ├── components/ui/        # UI component library
│   ├── entities/            # Data models and API calls
│   ├── utils/               # Utility functions
│   └── integrations/        # External service integrations
├── index.html               # Main HTML file
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── postcss.config.js       # PostCSS configuration
```

## Features Overview

### For General Users
- **Report Cases**: Submit cases of people in need with location, photos, and details
- **Track Cases**: View the status of cases you've reported
- **Contact Support**: Get help and support through the contact page

### For NGOs
- **Register**: Sign up as an NGO partner
- **Manage Cases**: View and update assigned cases
- **Track Progress**: Monitor case resolution status

### For Administrators
- **Monitor Platform**: View overall statistics and activity
- **Verify NGOs**: Approve or reject NGO registrations
- **Manage Cases**: Oversee all cases and their status

## Development Notes

This is a frontend-only application with mock data and API calls. In a production environment, you would need to:

1. **Backend API**: Implement a backend server with database
2. **Authentication**: Add user authentication and authorization
3. **File Upload**: Implement real file upload for photos
4. **Real-time Updates**: Add WebSocket or polling for live updates
5. **Email Notifications**: Send notifications to NGOs and users
6. **Maps Integration**: Add real map functionality for location picking

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you have any questions or need help, please contact us at support@hopee.org or create an issue in the repository.

---

**Made with ❤️ for humanity**
