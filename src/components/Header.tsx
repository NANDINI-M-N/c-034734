
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-dark-primary border-b border-border-dark">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-tech-green rounded-lg flex items-center justify-center">
              <span className="text-dark-primary font-bold text-lg font-mono">&lt;/&gt;</span>
            </div>
            <span className="text-text-primary font-bold text-xl">CodeInterview Pro</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-text-secondary hover:text-text-primary transition-colors duration-200">
              Features
            </a>
            <a href="#pricing" className="text-text-secondary hover:text-text-primary transition-colors duration-200">
              Pricing
            </a>
            <a href="#about" className="text-text-secondary hover:text-text-primary transition-colors duration-200">
              About
            </a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-text-secondary hover:text-text-primary hover:bg-dark-secondary">
              Login
            </Button>
            <Button className="bg-tech-green hover:bg-tech-green/90 text-dark-primary font-semibold">
              Start Free Trial
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border-dark">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-text-secondary hover:text-text-primary transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-text-secondary hover:text-text-primary transition-colors">
                Pricing
              </a>
              <a href="#about" className="text-text-secondary hover:text-text-primary transition-colors">
                About
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="ghost" className="text-text-secondary hover:text-text-primary hover:bg-dark-secondary justify-start">
                  Login
                </Button>
                <Button className="bg-tech-green hover:bg-tech-green/90 text-dark-primary font-semibold justify-start">
                  Start Free Trial
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
