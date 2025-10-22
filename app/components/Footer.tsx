import { Link } from "react-router";
import { Heart, Mail, MapPin, Phone, ShoppingBag } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-beige-200/50 bg-gradient-to-br from-beige-50 via-rose-50/30 to-lavender-50/30">
      <div className="container-responsive py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-5">
            <Link 
              to="/" 
              className="group inline-flex items-center gap-2 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-200 to-lavender-200 flex items-center justify-center shadow-soft">
                <ShoppingBag className="w-5 h-5 text-rose-600" />
              </div>
              <span className="text-2xl font-semibold text-neutral-800 tracking-tight">
                pfs.magnets
              </span>
            </Link>
            <p className="text-neutral-600 leading-relaxed font-light">
              Beautiful magnets that bring joy to everyday spaces. 
              Crafted with love, made to last.
            </p>
            <div className="flex items-center gap-2 text-neutral-600">
              <span className="font-light">Made with</span>
              <Heart className="h-4 w-4 text-rose-500 fill-current animate-pulse-soft" />
              <span className="font-medium">Pixel Forge Studio</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-neutral-800 mb-5 text-lg">Quick Links</h3>
            <div className="space-y-3">
              <Link 
                to="/" 
                className="block text-neutral-600 hover:text-rose-500 transition-all duration-200 font-light hover:translate-x-1"
              >
                Home
              </Link>
              <Link 
                to="/gallery" 
                className="block text-neutral-600 hover:text-rose-500 transition-all duration-200 font-light hover:translate-x-1"
              >
                Gallery
              </Link>
              <Link 
                to="/contact" 
                className="block text-neutral-600 hover:text-rose-500 transition-all duration-200 font-light hover:translate-x-1"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-neutral-800 mb-5 text-lg">Categories</h3>
            <div className="space-y-3">
              <Link 
                to="/gallery?category=fridge-magnets" 
                className="block text-neutral-600 hover:text-rose-500 transition-all duration-200 font-light hover:translate-x-1"
              >
                Fridge Magnets
              </Link>
              <Link 
                to="/gallery?category=photo-magnets" 
                className="block text-neutral-600 hover:text-rose-500 transition-all duration-200 font-light hover:translate-x-1"
              >
                Photo Magnets
              </Link>
              <Link 
                to="/gallery?category=retro-prints" 
                className="block text-neutral-600 hover:text-rose-500 transition-all duration-200 font-light hover:translate-x-1"
              >
                Retro Prints
              </Link>
              <Link 
                to="/gallery?category=save-the-date" 
                className="block text-neutral-600 hover:text-rose-500 transition-all duration-200 font-light hover:translate-x-1"
              >
                Save the Date
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-neutral-800 mb-5 text-lg">Contact</h3>
            <div className="space-y-4">
              <a 
                href="mailto:support@pixelforgestudio.in"
                className="flex items-start gap-3 text-neutral-600 hover:text-rose-500 transition-colors duration-200 group"
              >
                <Mail className="h-5 w-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-light">support@pixelforgestudio.in</span>
              </a>
              <a 
                href="tel:+917219846935"
                className="flex items-center gap-3 text-neutral-600 hover:text-rose-500 transition-colors duration-200 group"
              >
                <Phone className="h-5 w-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-light">+91 7219846935</span>
              </a>
              <div className="flex items-start gap-3 text-neutral-600">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm font-light">
                  Raga Homes, Chikhali, Vitthal Nagar, Pimpri-Chinchwad, Maharashtra 411062
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-beige-200/50 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-neutral-500 text-sm font-light">
            © 2025 Pixel Forge Studio. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6 text-sm">
            <Link 
              to="/privacy-policy" 
              className="text-neutral-500 hover:text-rose-500 transition-colors duration-200 font-light"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms-of-service" 
              className="text-neutral-500 hover:text-rose-500 transition-colors duration-200 font-light"
            >
              Terms of Service
            </Link>
            <Link 
              to="/shipping-info" 
              className="text-neutral-500 hover:text-rose-500 transition-colors duration-200 font-light"
            >
              Shipping Info
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
