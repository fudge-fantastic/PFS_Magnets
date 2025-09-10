import { Link } from "react-router";
import { Heart, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border/50">
      <div className="container-responsive py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          {/* Brand */}
          <div className="space-y-3 md:space-y-4">
            <Link 
              to="/" 
              className="text-xl md:text-2xl font-semibold text-primary hover:text-primary/80 transition-colors duration-200"
            >
              pfs.magnets
            </Link>
            <p className="text-foreground/70 leading-relaxed text-sm md:text-base">
              Beautiful magnets that bring joy to everyday spaces. 
              Crafted with love, made to last.
            </p>
            <div className="flex items-center gap-2 text-foreground/70 text-sm md:text-base">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>Pixel Forge Studio</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground/80 mb-3 md:mb-4 text-base md:text-lg">Quick Links</h3>
            <div className="space-y-2 md:space-y-3">
              <Link 
                to="/" 
                className="block text-foreground/70 hover:text-primary transition-colors duration-200 text-sm md:text-base"
              >
                Home
              </Link>
              <Link 
                to="/gallery" 
                className="block text-foreground/70 hover:text-primary transition-colors duration-200 text-sm md:text-base"
              >
                Gallery
              </Link>
              <Link 
                to="/about" 
                className="block text-foreground/70 hover:text-primary transition-colors duration-200 text-sm md:text-base"
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="block text-foreground/70 hover:text-primary transition-colors duration-200 text-sm md:text-base"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-foreground/80 mb-3 md:mb-4 text-base md:text-lg">Categories</h3>
            <div className="space-y-2 md:space-y-3">
              <Link 
                to="/gallery?category=fridge-magnets" 
                className="block text-foreground/70 hover:text-primary transition-colors duration-200 text-sm md:text-base"
              >
                Fridge Magnets
              </Link>
              <Link 
                to="/gallery?category=photo-magnets" 
                className="block text-foreground/70 hover:text-primary transition-colors duration-200 text-sm md:text-base"
              >
                Photo Magnets
              </Link>
              <Link 
                to="/gallery?category=retro-prints" 
                className="block text-foreground/70 hover:text-primary transition-colors duration-200 text-sm md:text-base"
              >
                Retro Prints
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground/80 mb-3 md:mb-4 text-base md:text-lg">Contact</h3>
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center gap-3 text-foreground/70">
                <Mail className="h-4 w-4" />
                <span className="text-xs md:text-sm">adi.pandagle@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-foreground/70">
                <Phone className="h-4 w-4" />
                <span className="text-xs md:text-sm">+91 7972567926</span>
              </div>
              <div className="flex items-start gap-3 text-foreground/70">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-xs md:text-sm">
                  123 Creative Street<br />
                  Design District, Pune - Maharashtra, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-foreground/60 text-xs md:text-sm">
            © 2025 Beautiful Magnets. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm text-foreground/60">
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
