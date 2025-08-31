import type { Route } from "./+types/home";
import { Link } from "react-router";
import { ArrowRight, Sparkles, Heart, Star, Users } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Beautiful Magnets - Unique Designs for Every Space" },
    { name: "description", content: "Discover our collection of beautifully designed magnets. From minimalist to playful, find the perfect magnets for your home, office, or as gifts." },
  ];
}

export default function Home() {
  const categories = [
    {
      name: "Fridge Magnets",
      description: "Fun and functional magnets for your kitchen and home",
      icon: <Sparkles className="h-8 w-8" />,
      color: "from-primary/30 to-accent/30",
      count: "25+ designs"
    },
    {
      name: "Photo Magnets",
      description: "Personalized magnets featuring your favorite memories",
      icon: <Heart className="h-8 w-8" />,
      color: "from-accent/30 to-primary/30",
      count: "Custom orders"
    },
    {
      name: "Retro Prints",
      description: "Vintage-inspired designs with a nostalgic charm",
      icon: <Star className="h-8 w-8" />,
      color: "from-secondary/40 to-primary/20",
      count: "15+ designs"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/20">
        <div className="absolute inset-0 opacity-40">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-24 sm:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                ✨ Custom Designs Available
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground/80 mb-6">
                <span className="text-foreground/80">Create</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent pb-3">
                  Personalized
                </span>
                <span className="block text-4xl sm:text-5xl lg:text-6xl font-light text-foreground/80">
                  Fridge Magnets
                </span>
              </h1>
              
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                Transform your favorite memories into beautiful custom fridge magnets. 
                Perfect for preserving special moments, gifting loved ones, or adding 
                personal touches to your kitchen.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <Link
                  to="/gallery"
                  className="group bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center gap-2"
                >
                  Start Creating
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                
                <Link
                  to="/about"
                  className="px-8 py-4 rounded-xl font-semibold text-lg border-2 border-primary/20 text-foreground/80 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Hero Image Placeholder */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl flex items-center justify-center relative overflow-hidden border border-border/20">
                {/* Actual Image Placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative">
                  <img 
                    src="public/designer.jpg"
                    alt="Custom Fridge Magnets Preview"
                    className="w-full h-full object-cover rounded-3xl opacity-80"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground/80 mb-4">
              Explore Our Collections
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Discover our three unique collections, each designed to serve different needs and styles
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to={`/gallery?category=${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className={`group relative overflow-hidden bg-gradient-to-br ${category.color} rounded-2xl p-8 hover:scale-105 transition-all duration-500 cursor-pointer border border-border/20`}
              >
                <div className="relative z-10">
                  <div className="text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {category.name}
                  </h3>
                  
                  <p className="text-white/90 mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  
                  <div className="text-white/80 text-sm font-medium">
                    {category.count}
                  </div>
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <div className="w-full h-full" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v-40c11.046 0 20 8.954 20 20z'/%3E%3C/g%3E%3C/svg%3E")`
                  }}></div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/gallery"
              className="inline-flex items-center bg-secondary text-foreground/80 px-6 py-3 rounded-xl font-medium hover:bg-secondary/80 transition-colors duration-200"
            >
              View All Designs
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 bg-gradient-to-br from-accent/10 to-primary/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground/80 mb-4">
              What We Believe In
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Our values guide everything we do, from design to customer service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground/80 mb-3">
                Beauty in Details
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                We believe that the smallest touches can make the biggest impact. Every magnet is designed 
                to bring a moment of beauty to your everyday life.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground/80 mb-3">
                Quality First
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                Premium materials, fade-resistant inks, and strong magnets ensure that your purchase 
                will bring joy for years to come.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground/80 mb-3">
                Customer Joy
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                Your happiness is our success. We're not satisfied until you're absolutely delighted 
                with your magnets and the experience of shopping with us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground/80 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Get answers to common questions about our custom magnets and services
            </p>
          </div>

          <Accordion type="single" className="space-y-4" collapsible>
            <AccordionItem value="materials" className="bg-card rounded-xl px-6 border border-border/20">
              <AccordionTrigger className="text-lg font-semibold text-foreground/80">
                What materials are your magnets made from?
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70">
                Our magnets are made from high-quality materials including durable magnetic backing, 
                weather-resistant coating, and premium printing surfaces. They're designed to last 
                for years while maintaining their vibrant colors and strong magnetic hold.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="customization" className="bg-card rounded-xl px-6 border border-border/20">
              <AccordionTrigger className="text-lg font-semibold text-foreground/80">
                Can I create custom magnets with my own photos?
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70">
                Absolutely! Our photo magnets are our specialty. Simply upload your favorite photos, 
                and we'll print them on high-quality magnetic material. We accept various file formats 
                including JPG, PNG, and PDF. For best results, we recommend high-resolution images.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="sizes" className="bg-card rounded-xl px-6 border border-border/20">
              <AccordionTrigger className="text-lg font-semibold text-foreground/80">
                What sizes are available for magnets?
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70">
                We offer multiple sizes to fit your needs: 2"x2", 3"x3", 4"x4", and 4"x6" rectangles. 
                Our fridge magnets come in standard sizes, while photo magnets can be customized to 
                various dimensions. Contact us for special size requests.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="shipping" className="bg-card rounded-xl px-6 border border-border/20">
              <AccordionTrigger className="text-lg font-semibold text-foreground/80">
                How long does shipping take?
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70">
                Standard shipping takes 5-7 business days within the US. We also offer express 
                shipping (2-3 days) and next-day delivery for urgent orders. International 
                shipping is available and typically takes 10-14 business days.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="bulk-orders" className="bg-card rounded-xl px-6 border border-border/20">
              <AccordionTrigger className="text-lg font-semibold text-foreground/80">
                Do you offer discounts for bulk orders?
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70">
                Yes! We offer attractive discounts for bulk orders: 10% off for 25+ magnets, 
                15% off for 50+ magnets, and 20% off for 100+ magnets. Perfect for businesses, 
                events, or large family gatherings. Contact us for custom quotes on larger orders.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="returns" className="bg-card rounded-xl px-6 border border-border/20">
              <AccordionTrigger className="text-lg font-semibold text-foreground/80">
                What's your return policy?
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70">
                We offer a 30-day satisfaction guarantee. If you're not completely happy with your 
                magnets, you can return them for a full refund or exchange. Custom photo magnets 
                can be returned if there's a quality issue or printing error on our end.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
