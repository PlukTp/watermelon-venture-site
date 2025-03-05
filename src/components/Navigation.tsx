
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Menu, X, Sprout } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { title: "หน้าหลัก", path: "/" },
    { title: "สินค้าของเรา", path: "/products" },
    { title: "เกี่ยวกับเรา", path: "/about" },
    { title: "ติดต่อเรา", path: "/contact" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-custom py-4 px-6 md:px-12",
        isScrolled ? "glass shadow-sm" : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 transition-custom hover:opacity-80">
          <Sprout className="h-8 w-8 text-trima-600" />
          <span className="text-2xl font-display font-semibold bg-clip-text text-transparent bg-gradient-to-r from-trima-800 to-trima-600">
            ตรีมาเขียว
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "relative font-medium text-base transition-custom",
                isActive(link.path) 
                  ? "text-trima-700 after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-trima-500" 
                  : "text-foreground/80 hover:text-trima-600"
              )}
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-7 w-7" />
          ) : (
            <Menu className="h-7 w-7" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          "fixed inset-0 top-[72px] bg-white z-40 transition-custom overflow-hidden",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none h-0"
        )}
      >
        <div className="p-6 pt-8 flex flex-col space-y-8 text-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={closeMobileMenu}
              className={cn(
                "text-xl py-2 transition-custom",
                isActive(link.path) 
                  ? "text-trima-600 font-medium" 
                  : "text-foreground/80 hover:text-trima-600"
              )}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
