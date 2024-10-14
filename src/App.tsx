import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Download, CheckCircle, Send, Menu, X } from "lucide-react"
import { Link } from 'react-router-dom'

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${scrollPosition > 50 ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary bg-purple-50 p-2 rounded-md">
          <img src="https://www.natcmd.dhiu.in/img/logo.png" className='w-12' alt="" />
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Button variant="secondary" size="sm">
              <CheckCircle className="mr-2 h-4 w-4" /> Check Status
            </Button>
            <Button variant="secondary" size="sm">
              <Download className="mr-2 h-4 w-4" /> Download Brochure
            </Button>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(false)}>
                <CheckCircle className="mr-2 h-4 w-4" /> Check Status
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(false)}>
                <Download className="mr-2 h-4 w-4" /> Download Brochure
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        <img
          src="https://www.natcmd.dhiu.in/img/campus.jpg"
          alt="University campus"
          // layout="fill"
          // objectFit="cover"
          className="absolute inset-0"
          // priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/70" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 animate-fade-in-up uppercase">
            Darul Huda Islamic University
          </h1>
          <p className="text-xl sm:text-2xl mb-8 animate-fade-in-up animation-delay-300">
            Where Innovation Meets Tradition
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in-up animation-delay-600">
            <Button className="text-lg px-8 py-6 bg-white text-primary hover:bg-primary hover:text-white transition-colors duration-300" size="lg">
              <Send className="mr-2 h-5 w-5" /> Apply Now
            </Button>
            {/* <Button className="text-lg px-8 py-6" variant="outline" size="lg">
              Explore Programs
            </Button> */}
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <address className="not-italic">
                <p>123 University Avenue</p>
                <p>Evergreen, ES 12345</p>
                <p className="mt-2">
                  <a href="tel:+15551234567" className="hover:underline">
                    (555) 123-4567
                  </a>
                </p>
                <p>
                  <a href="mailto:admissions@evergreenstate.edu" className="hover:underline">
                    admissions@evergreenstate.edu
                  </a>
                </p>
              </address>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
              <ul className="space-y-2">
                <li><Link to="#" className="hover:underline">About Us</Link></li>
                <li><Link to="#" className="hover:underline">Programs</Link></li>
                <li><Link to="#" className="hover:underline">Campus Life</Link></li>
                <li><Link to="#" className="hover:underline">Alumni</Link></li>
              </ul>
            </div>
            <div className="text-center md:text-right">
              <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
              <div className="flex justify-center md:justify-end space-x-4">
                <Link to="#" aria-label="Facebook" className="hover:text-blue-400 transition-colors duration-300">
                  <svg className="h-8 w-8 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </Link>
                <Link to="#" aria-label="Twitter" className="hover:text-blue-400 transition-colors duration-300">
                  <svg className="h-8 w-8 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </Link>
                <Link to="#" aria-label="Instagram" className="hover:text-pink-400 transition-colors duration-300">
                  <svg className="h-8 w-8 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center">
            <p>&copy; {new Date().getFullYear()} Evergreen State University. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}