import { Link, useLocation } from "react-router";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Palette, ChevronDown } from "lucide-react";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('lavender');
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const location = useLocation();
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const mobileThemeMenuRef = useRef<HTMLDivElement>(null);

  const themes = [
    { id: 'lavender', name: 'Lavender', color: 'bg-gradient-to-r from-purple-300/70 to-pink-300/70', class: '' },
    { id: 'mint', name: 'Mint', color: 'bg-gradient-to-r from-emerald-300/70 to-cyan-300/70', class: 'theme-mint' },
    { id: 'peach', name: 'Peach', color: 'bg-gradient-to-r from-orange-300/70 to-rose-300/70', class: 'theme-peach' },
    { id: 'sky', name: 'Sky', color: 'bg-gradient-to-r from-blue-300/70 to-indigo-300/70', class: 'theme-sky' },
  ];

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      const savedTheme = localStorage.getItem('theme') || 'lavender';
      setCurrentTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, [isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      applyTheme(currentTheme);
      localStorage.setItem('theme', currentTheme);
    }
  }, [currentTheme, isHydrated]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node) &&
          mobileThemeMenuRef.current && !mobileThemeMenuRef.current.contains(event.target as Node)) {
        setIsThemeMenuOpen(false);
      }
    };

    if (isThemeMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isThemeMenuOpen]);

  const applyTheme = (theme: string) => {
    if (typeof window !== 'undefined') {
      // Remove all theme classes
      document.documentElement.className = document.documentElement.className
        .split(' ')
        .filter(cls => !cls.startsWith('theme-'))
        .join(' ');
      
      // Apply new theme class if not lavender (default)
      if (theme !== 'lavender') {
        document.documentElement.classList.add(`theme-${theme}`);
      }
    }
  };

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
    setIsThemeMenuOpen(false);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    // { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const currentThemeData = themes.find(theme => theme.id === currentTheme) || themes[0];

  return (
    <nav className="fixed top-0 w-full bg-background/90 z-50 border-b border-border/50">
      <div className="container-responsive">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-lg md:text-xl font-semibold text-primary hover:text-primary/80 transition-colors duration-200"
          >
            {/* .magnets */}
            pfs.magnets
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-7">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-semibold text-sm lg:text-base transition-colors duration-200 hover:text-primary ${
                  location.pathname === item.path
                    ? 'text-primary border-b-2 border-primary pb-1'
                    : 'text-foreground/80'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Theme Selector */}
            <div className="relative" ref={themeMenuRef}>
              <button
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="p-1.5 lg:p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors duration-200 flex items-center space-x-1 lg:space-x-2"
                aria-label="Select theme"
              >
                <Palette className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-foreground" />
                <ChevronDown className={`h-2.5 w-2.5 lg:h-3 lg:w-3 text-foreground/60 transition-transform duration-200 ${isThemeMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isThemeMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 lg:w-40 bg-background border border-border/50 rounded-lg shadow-lg overflow-hidden">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => handleThemeChange(theme.id)}
                      className={`w-full px-3 lg:px-4 py-2 lg:py-3 text-left hover:bg-secondary/50 transition-colors duration-200 flex items-center space-x-2 lg:space-x-3 ${
                        currentTheme === theme.id ? 'bg-secondary/30' : ''
                      }`}
                    >
                      <div className={`w-3 h-3 lg:w-4 lg:h-4 rounded-full ${theme.color}`} />
                      <span className="text-xs lg:text-sm font-medium text-foreground/80">{theme.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <div className="relative" ref={mobileThemeMenuRef}>
              <button
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="p-1.5 rounded-full bg-secondary/50 hover:bg-secondary transition-colors duration-200"
                aria-label="Select theme"
              >
                <Palette className="h-4 w-4 text-foreground" />
              </button>
              
              {isThemeMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-background border border-border/50 rounded-lg shadow-lg overflow-hidden">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => handleThemeChange(theme.id)}
                      className={`w-full px-3 py-2 text-left hover:bg-secondary/50 transition-colors duration-200 flex items-center space-x-2 ${
                        currentTheme === theme.id ? 'bg-secondary/30' : ''
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full ${theme.color}`} />
                      <span className="text-xs font-medium text-foreground/80">{theme.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 rounded-md text-foreground hover:bg-secondary transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
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
  );
}
