'use client';

import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { getTextBlockBySlug, getMetadata } from '@/lib/text-blocks';

const logo = '/images/text-logo.svg';
const portalSignInUrl = 'https://portal.archpad.pro/sign-in';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const content = getTextBlockBySlug('header');
  const navItems = content?.navigation || [];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    isRoute?: boolean,
  ) => {
    // If it's a route, let React Router handle it
    if (isRoute) {
      return;
    }

    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      e.preventDefault();
      navigate('/');
      // Wait for navigation, then scroll to the section
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center cursor-pointer"
            >
              <img src={logo} alt="ArchPad" className="h-8" />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item: any, index: number) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-gray-700 hover:text-[#7CB342] transition-colors"
                onClick={(e) => handleNavClick(e, item.href, item.isRoute)}
              >
                {item.label}
              </motion.a>
            ))}
            <motion.a
              href={portalSignInUrl}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="px-6 py-2 bg-[#7CB342] hover:bg-[#689F38] text-white rounded-full hover:shadow-lg transition-all"
            >
              {getMetadata(content, 'loginButton')}
            </motion.a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-gray-200"
          >
            {navItems.map((item: any) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-2 text-gray-700 hover:text-[#7CB342] transition-colors"
                onClick={(e) => handleNavClick(e, item.href, item.isRoute)}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-4">
              <a
                href={portalSignInUrl}
                className="block w-full px-6 py-2 bg-[#7CB342] hover:bg-[#689F38] text-white rounded-full text-center"
              >
                {getMetadata(content, 'loginButton')}
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}
