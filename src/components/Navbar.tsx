'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'হোম', path: '/' },
    { name: 'ফসল ডাক্তার', path: '/crop-doctor' },
    { name: 'বাজার দর', path: '/market' },
    { name: 'আবহাওয়া', path: '/weather' },
    { name: 'সরকারি সুবিধা', path: '/schemes' },
  ]

  return (
    <nav className="bg-white shadow-md py-2 px-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold text-green-600 mr-2">ক্ষেত-সেবা</span>
         </Link>

        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              href={link.path}
              key={link.name}
              className={`text-gray-700 hover:text-green-600 transition ${
                pathname === link.path ? 'font-semibold text-green-600 underline' : ''
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md transition">
            লগইন
          </button>
          <button
            className="md:hidden text-green-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-green-50 px-4 py-2 border-t border-green-100">
          {navLinks.map((link) => (
            <Link
              href={link.path}
              key={link.name}
              className={`block py-2 text-gray-700 ${
                pathname === link.path ? 'font-semibold text-green-600' : ''
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar