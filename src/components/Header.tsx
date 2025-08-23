import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Shared site header displayed on every page. This component renders the
 * navigation bar, language selector, dark/light mode toggle and logo. It
 * accepts strings for navigation labels, a toggle function for language
 * and dark mode, as well as directionality for RTL languages.
 */
export interface HeaderProps {
  /** Navigation labels for the current language. */
  nav: {
    features: string;
    contact: string;
    privacy: string;
    terms: string;
    language: string;
  };
  /** Site brand name to display in the logo area. */
  brand: string;
  /** Current language, used only to set the document direction on toggles. */
  lang: 'en' | 'ar';
  /** Whether dark mode is currently enabled. */
  darkMode: boolean;
  /** Handler to toggle dark mode. */
  onToggleDarkMode: () => void;
  /** Handler to toggle the site language. */
  onToggleLang: () => void;
  /** Directionality for the page (ltr or rtl). */
  dir: 'ltr' | 'rtl';
}

/**
 * Header component. Renders a sticky navigation bar with logo, navigation
 * links and controls for language and theme switching. Links to internal
 * pages use React Router's Link component to avoid full page reloads.
 */
const Header: React.FC<HeaderProps> = ({ brand, nav, lang, darkMode, onToggleDarkMode, onToggleLang, dir }) => {
  // Track whether the mobile navigation menu is open
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the menu when navigating to a link
  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and brand */}
        <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
          <img src="/icon.png" alt="Muraasala Icon" className="h-8 w-8" />
          <span className="text-2xl font-bold text-primary-500 dark:text-primary-300">{brand}</span>
        </Link>
        {/* Navigation links for medium and larger screens */}
        <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
          {/* In-page anchors for home page sections. Using plain <a> to keep anchors working outside router context. */}
          <a href="/#features" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{nav.features}</a>
          <a href="/#contact" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{nav.contact}</a>
          {/* Link to privacy and terms pages */}
          <Link to="/privacy" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{nav.privacy}</Link>
          <Link to="/terms" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{nav.terms}</Link>
        </div>
        {/* Controls: dark mode, language and mobile menu toggle */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          {/* Dark mode toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          {/* Language toggle */}
          <button
            onClick={onToggleLang}
            className="px-3 py-1 border border-primary-500 text-primary-500 dark:text-primary-300 rounded-md hover:bg-primary-50 dark:hover:bg-primary-900 transition-colors"
          >
            {nav.language}
          </button>
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
      </nav>
      {/* Overlay behind the menu when it is open. Clicking on it closes the menu. */}
      {menuOpen && (
        <div
          onClick={handleNavClick}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}
      {/* Slide-in side menu container. It slides from the side depending on RTL/LTR and features a high z-index and rounded corners */}
      <div
        className={`fixed inset-y-0 z-50 md:hidden w-64 max-w-[75%] bg-white dark:bg-gray-800 shadow-lg overflow-y-auto transform transition-transform duration-300 ${
          dir === 'rtl'
            ? 'right-0 rounded-l-xl border-l border-gray-200 dark:border-gray-700'
            : 'left-0 rounded-r-xl border-r border-gray-200 dark:border-gray-700'
        } ${
          menuOpen
            ? 'translate-x-0'
            : dir === 'rtl'
            ? 'translate-x-full'
            : '-translate-x-full'
        }`}
      >
        <div className="px-6 py-8 space-y-6">
          <a href="/#features" onClick={handleNavClick} className="block text-lg font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            {nav.features}
          </a>
          <a href="/#contact" onClick={handleNavClick} className="block text-lg font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            {nav.contact}
          </a>
          <Link to="/privacy" onClick={handleNavClick} className="block text-lg font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            {nav.privacy}
          </Link>
          <Link to="/terms" onClick={handleNavClick} className="block text-lg font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            {nav.terms}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;