import { useState, useEffect } from 'react';
import { Bus, Menu, X, Globe, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Routes', href: '#routes' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'How it Works', href: '#how-it-works' },
    { label: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[#0070C0] rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
              <Bus className="w-6 h-6 text-white" />
            </div>
            <span className={`text-xl font-bold transition-colors ${isScrolled ? 'text-[#0070C0]' : 'text-white'}`}>
              BusBooking
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-white/10 ${
                  isScrolled ? 'text-gray-700 hover:text-[#0070C0]' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}>
              <Globe className="w-4 h-4" />
              EN
              <ChevronDown className="w-3 h-3" />
            </button>
            <Button
              variant="outline"
              className={`gap-2 ${
                isScrolled
                  ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  : 'border-white/30 text-white hover:bg-white/10'
              }`}
            >
              <User className="w-4 h-4" />
              Sign In
            </Button>
            <Button className="bg-[#0070C0] hover:bg-[#005a9c] text-white gap-2 btn-shine">
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#0070C0] font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-gray-100 space-y-2">
            <Button variant="outline" className="w-full justify-center gap-2">
              <User className="w-4 h-4" />
              Sign In
            </Button>
            <Button className="w-full bg-[#0070C0] hover:bg-[#005a9c] text-white justify-center">
              Book Now
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
