import { Link, useLocation } from "react-router";
import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Skip to main content for keyboard users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <nav className="fixed top-0 w-full bg-beige-50/95 border-b border-beige-200/30 z-50">
        <div className="container-responsive">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link 
            to="/" 
            className="group flex items-center gap-2 transition-all duration-300"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-2xl bg-rose-200 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 text-rose-600" />
            </div>
            <span className="text-lg md:text-xl font-semibold text-neutral-800 tracking-tight">
              pfs.magnets
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'text-rose-600 bg-rose-50'
                    : 'text-neutral-600 hover:text-rose-600 hover:bg-rose-50/50'
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-rose-500 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl text-neutral-700 hover:bg-rose-50 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-fade-in-up">
            <div className="space-y-1 pt-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-2xl font-medium text-sm transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'text-rose-600 bg-rose-50'
                      : 'text-neutral-600 hover:text-rose-600 hover:bg-rose-50/50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
    </>
  );
}
