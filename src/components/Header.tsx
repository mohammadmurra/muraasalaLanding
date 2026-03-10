import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  const isActive = (path: string) => {
    if (path.startsWith('/#')) {
      return location.pathname === '/' && location.hash === path.substring(1);
    }
    return location.pathname === path;
  };

  const navItems = [
    { href: "/#features", label: nav.features },
    { href: "/#contact", label: nav.contact },
    { href: "/privacy", label: nav.privacy },
    { href: "/terms", label: nav.terms },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'nav-premium shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="container-premium">
          <nav className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              to="/" 
              className={`flex items-center gap-2.5 transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
            >
              <div className="relative">
                <img 
                  src="/icon.png" 
                  alt={brand}
                  className="w-9 h-9 rounded-xl shadow-lg"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-500 to-gold-400 opacity-0 hover:opacity-20 transition-opacity" />
              </div>
              <span className="text-lg font-bold tracking-tight text-headline">
                {brand}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`nav-link px-4 py-2 rounded-full transition-all duration-500 ${
                    isActive(item.href) 
                      ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20' 
                      : 'hover:text-primary-600 hover:bg-gray-50 dark:hover:bg-white/5'
                  } ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Actions */}
            <div 
              className={`flex items-center gap-2 transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              {/* Theme Toggle */}
              <button
                onClick={onToggleDarkMode}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-gray-100 dark:hover:bg-white/10"
                aria-label="Toggle theme"
              >
                {darkMode ? (
                  <svg className="w-5 h-5 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Language Toggle */}
              <button
                onClick={onToggleLang}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-white/10 nav-link"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                {nav.language}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-gray-100 dark:hover:bg-white/10"
                aria-label="Toggle menu"
              >
                <div className="relative w-5 h-5">
                  <span className={`absolute left-0 w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${menuOpen ? 'top-2.5 rotate-45' : 'top-1'}`} />
                  <span className={`absolute left-0 top-2.5 w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 scale-0' : 'opacity-100'}`} />
                  <span className={`absolute left-0 w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${menuOpen ? 'top-2.5 -rotate-45' : 'top-4'}`} />
                </div>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleNavClick} />
        
        <div
          className={`absolute top-20 left-4 right-4 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl transition-all duration-500 ${
            menuOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95'
          }`}
        >
          <nav className="space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={`block px-4 py-3 text-lg font-medium rounded-xl transition-all ${
                  isActive(item.href)
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={() => {
                onToggleLang();
                handleNavClick();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-base font-medium rounded-xl transition-all hover:bg-gray-50 dark:hover:bg-white/5"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              {nav.language}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
