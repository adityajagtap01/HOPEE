import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './Components/Layout.jsx'
import Landing from './Pages/landing.jsx'
import ReportCase from './Pages/reportcase.jsx'
import Contact from './Pages/contact.jsx'
import Profile from './Pages/profile.jsx'
import NGORegister from './Pages/ngoRegister.jsx'
import NGOProfile from './Pages/ngoProfile.jsx'
import NGODashboard from './Pages/ngoDashboard.jsx'
import AdminDashboard from './Pages/adminDashboard.jsx'
import CreateNGOProfile from './Pages/createNgoProfile.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout currentPageName="Landing"><Landing /></Layout>} />
      <Route path="/report-case" element={<Layout><ReportCase /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />
      <Route path="/profile" element={<Layout><Profile /></Layout>} />
      <Route path="/ngo-register" element={<Layout><NGORegister /></Layout>} />
      <Route path="/ngo-profile" element={<Layout><NGOProfile /></Layout>} />
      <Route path="/ngo-dashboard" element={<Layout><NGODashboard /></Layout>} />
      <Route path="/admin-dashboard" element={<Layout><AdminDashboard /></Layout>} />
      <Route path="/create-ngo-profile" element={<Layout><CreateNGOProfile /></Layout>} />
    </Routes>
  )
}

export default App
