import type { Route } from "./+types/about";
import { Mail, MapPin, Phone, Heart, Sparkles, Users } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Us - Beautiful Magnets" },
    { name: "description", content: "Learn about our story, mission, and passion for creating beautiful magnets that bring joy to everyday spaces." },
  ];
}

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/20">
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground/80 mb-6">
              About Our
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Magnet Journey
              </span>
            </h1>
            
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              We believe that beauty should be accessible, functional, and present in the smallest details of our daily lives. 
              That's why we create magnets that aren't just practical—they're little pieces of art that spark joy every time you see them.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground/80 mb-6">
                Our Story
              </h2>
              
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  It all started with a simple observation: why should the things we see every day be boring? 
                  Our founder noticed how people would unconsciously smile when they saw a beautiful magnet on a fridge, 
                  and that moment of unexpected joy became the inspiration for our entire brand.
                </p>
                
                <p>
                  We began creating magnets that weren't just functional, but genuinely beautiful. Each design is 
                  carefully crafted to bring a moment of happiness to your daily routine, whether you're grabbing 
                  something from the fridge, organizing papers on a magnetic board, or simply walking past.
                </p>
                
                <p>
                  Today, we're proud to offer a curated collection of magnets that combine aesthetic beauty with 
                  practical functionality. Every piece is designed with love, printed with premium materials, 
                  and made to last—because we believe that the small details make the biggest difference.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/30 to-accent/30 rounded-3xl flex items-center justify-center relative overflow-hidden">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🎨</div>
                  <p className="text-lg font-medium text-gray-700">Our Creative Process</p>
                  <p className="text-gray-600">Design • Create • Inspire</p>
                </div>
                
                {/* Floating design elements */}
                <div className="absolute top-8 left-8 w-4 h-4 bg-white/30 rounded-full animate-pulse"></div>
                <div className="absolute bottom-8 right-8 w-6 h-6 bg-white/20 rounded-full animate-pulse animation-delay-1000"></div>
                <div className="absolute top-1/2 left-4 w-3 h-3 bg-white/40 rounded-full animate-pulse animation-delay-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      

      {/* Contact Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-foreground/80 mb-8">
                Get In Touch
              </h2>
              
              <div className="space-y-6">
                <p className="text-foreground/70 leading-relaxed text-lg">
                  Have a question about our magnets? Want to request a custom design? 
                  Or just want to say hello? We'd love to hear from you!
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground/80">Email Us</p>
                      <p className="text-foreground/70">hello@beautifulmagnets.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground/80">Call Us</p>
                      <p className="text-foreground/70">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground/80">Visit Us</p>
                      <p className="text-foreground/70">123 Creative Street<br />Design District, NY 10001</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-foreground/80 mb-6">
                Send us a message
              </h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Tell us what's on your mind..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground px-6 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
