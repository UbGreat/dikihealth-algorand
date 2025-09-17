import { Menu, X } from 'lucide-react' // icon library
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar: React.FC = () => {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

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

        {/* Desktop Nav */}
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

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu (Slide-down) */}
      {menuOpen && (
        <div className="md:hidden bg-teal-700">
          <div className="flex flex-col space-y-4 px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)} // close menu after navigation
                className={`text-white hover:text-gray-200 transition ${location.pathname === item.path ? 'font-bold underline' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
