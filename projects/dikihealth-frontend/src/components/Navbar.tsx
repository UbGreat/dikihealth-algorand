import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar: React.FC = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/ehr', label: 'EHR' },
    { path: '/remote-monitoring', label: 'Remote Monitoring' },
    { path: '/medical-assets', label: 'Medical Assets' },
    { path: '/emergency-response', label: 'Emergency Response' },
  ]

  return (
    <nav className="bg-teal-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo / Brand */}
        <Link to="/" className="text-white text-2xl font-bold">
          DikiHealth
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-white hover:text-gray-200 transition ${location.pathname === item.path ? 'font-bold underline' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
