import { Link } from "react-router";
import { Heart, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link 
              to="/" 
              className="text-2xl font-semibold text-primary hover:text-primary/80 transition-colors duration-200"
            >
              .magnets
            </Link>
            <p className="text-foreground/70 leading-relaxed">
              Beautiful magnets that bring joy to everyday spaces. 
              Crafted with love, made to last.
            </p>
            <div className="flex items-center gap-2 text-foreground/70">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>bluesalt</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground/80 mb-4">Quick Links</h3>
            <div className="space-y-3">
              <Link 
                to="/" 
                className="block text-foreground/70 hover:text-primary transition-colors duration-200"
              >
                Home
              </Link>
              <Link 
                to="/gallery" 
                className="block text-foreground/70 hover:text-primary transition-colors duration-200"
              >
                Gallery
              </Link>
              <Link 
                to="/about" 
                className="block text-foreground/70 hover:text-primary transition-colors duration-200"
              >
                About
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-foreground/80 mb-4">Categories</h3>
            <div className="space-y-3">
              <Link 
                to="/gallery?category=fridge-magnets" 
                className="block text-foreground/70 hover:text-primary transition-colors duration-200"
              >
                Fridge Magnets
              </Link>
              <Link 
                to="/gallery?category=photo-magnets" 
                className="block text-foreground/70 hover:text-primary transition-colors duration-200"
              >
                Photo Magnets
              </Link>
              <Link 
                to="/gallery?category=retro-prints" 
                className="block text-foreground/70 hover:text-primary transition-colors duration-200"
              >
                Retro Prints
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground/80 mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-foreground/70">
                <Mail className="h-4 w-4" />
                <span className="text-sm">hello@beautifulmagnets.com</span>
              </div>
              <div className="flex items-center gap-3 text-foreground/70">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start gap-3 text-foreground/70">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  123 Creative Street<br />
                  Design District, NY 10001
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-foreground/60 text-sm">
            © 2024 Beautiful Magnets. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6 text-sm text-foreground/60">
            <a href="#" className="hover:text-primary transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary transition-colors duration-200">
              Shipping Info
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
