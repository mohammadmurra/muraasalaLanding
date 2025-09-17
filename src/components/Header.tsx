import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface HeaderProps {
  nav: {
    features: string;
    contact: string;
    privacy: string;
    terms: string;
    language: string;
  };
  brand: string;
  lang: "en" | "ar";
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onToggleLang: () => void;
  dir: "ltr" | "rtl";
}

const Header: React.FC<HeaderProps> = ({
  brand,
  nav,
  darkMode,
  onToggleDarkMode,
  onToggleLang,
  dir,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <nav
        className={`sticky top-0 z-30 transition-all duration-300 ${
          scrolled
            ? "glass-strong border-b border-gray-200/20 dark:border-gray-700/20 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Brand */}
          <Link 
            to="/" 
            className={`flex items-center gap-3 rtl:flex-row-reverse group transition-all duration-300 ${
              isLoaded ? 'animate-fadeIn' : 'opacity-0'
            }`}
          >
            <div className="relative">
              <img 
                src="/icon.png" 
                alt="Muraasala Icon" 
                className="h-8 w-8" 
              />
            </div>
            <span 
              className="text-2xl font-bold"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {brand}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="/#features" 
              className="nav-link relative group"
            >
              {nav.features}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
              href="/#contact" 
              className="nav-link relative group"
            >
              {nav.contact}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <Link 
              to="/privacy" 
              className="nav-link relative group"
            >
              {nav.privacy}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/terms" 
              className="nav-link relative group"
            >
              {nav.terms}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleDarkMode}
              className="p-2.5 rounded-xl glass hover:scale-110 transition-all duration-200"
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              aria-label="Toggle theme"
            >
              <span className="text-lg transition-transform duration-300 hover:rotate-180">
                {darkMode ? "☀️" : "🌙"}
              </span>
            </button>
            <button
              onClick={onToggleLang}
              className="px-4 py-2 rounded-xl glass text-sm font-medium hover:scale-105 transition-all duration-200"
            >
              {nav.language}
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden p-2.5 rounded-xl glass hover:scale-110 transition-all duration-200"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span className="text-lg transition-transform duration-300">
                {menuOpen ? "✕" : "☰"}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          onClick={handleNavClick}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed inset-y-0 z-50 md:hidden w-80 max-w-[85%] glass-strong transition-all duration-300 ${
          dir === "rtl" ? "right-0 rounded-l-3xl" : "left-0 rounded-r-3xl"
        } ${
          menuOpen
            ? "translate-x-0 opacity-100"
            : dir === "rtl"
            ? "translate-x-full opacity-0"
            : "-translate-x-full opacity-0"
        }`}
      >
        <div className="px-8 py-12 space-y-8">
          {/* Mobile Brand */}
          <div className="flex items-center gap-3 mb-8">
            <img src="/icon.png" alt="Muraasala Icon" className="h-8 w-8" />
                <span 
                  className="text-xl font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {brand}
                </span>
          </div>
          
          {/* Mobile Navigation */}
          <nav className="space-y-6">
            <a
              href="/#features"
              onClick={handleNavClick}
              className="block text-lg font-medium nav-link hover:translate-x-2 rtl:hover:-translate-x-2 transition-all duration-300"
            >
              {nav.features}
            </a>
            <a
              href="/#contact"
              onClick={handleNavClick}
              className="block text-lg font-medium nav-link hover:translate-x-2 rtl:hover:-translate-x-2 transition-all duration-300"
            >
              {nav.contact}
            </a>
            <Link
              to="/privacy"
              onClick={handleNavClick}
              className="block text-lg font-medium nav-link hover:translate-x-2 rtl:hover:-translate-x-2 transition-all duration-300"
            >
              {nav.privacy}
            </Link>
            <Link
              to="/terms"
              onClick={handleNavClick}
              className="block text-lg font-medium nav-link hover:translate-x-2 rtl:hover:-translate-x-2 transition-all duration-300"
            >
              {nav.terms}
            </Link>
          </nav>
          
          {/* Mobile Controls */}
          <div className="pt-8 border-t border-gray-200/20 dark:border-gray-700/20">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Theme</span>
              <button
                onClick={onToggleDarkMode}
                className="p-2 rounded-xl glass hover:scale-110 transition-all duration-200"
              >
                <span className="text-lg">{darkMode ? "☀️" : "🌙"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
