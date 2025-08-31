import type { Route } from "./+types/home";
import { Link } from "react-router";
import { ArrowRight, Sparkles, Heart, Star, Users, ZoomIn } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";

export function meta({ }: Route.MetaArgs) {
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
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-24 sm:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                ✨ Custom Designs Available
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-foreground/80 mb-6">
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
                  Explore Magnets
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
                className="group bg-card rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-border/50 hover:border-primary/30 hover:-translate-y-2"
              >
                <div className="text-center">
                  {/* Icon with gradient background */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-foreground/80 mb-3 group-hover:text-primary transition-colors duration-300">
                    {category.name}
                  </h3>

                  <p className="text-foreground/70 mb-6 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Count badge */}
                  <div className="inline-flex items-center bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium">
                    {category.count}
                  </div>

                  {/* Hover arrow */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <ArrowRight className="h-5 w-5 text-primary mx-auto" />
                  </div>
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



      {/* Magnet Sizes Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground/80 mb-4">
              Available Magnet Sizes
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Choose from our range of sizes to perfectly fit your needs. All magnets feature strong adhesion and premium quality construction.
            </p>
          </div>

          {/* Featured Size Comparison */}
          <div className="mb-16">
            <div className="bg-card rounded-3xl p-8 shadow-lg border border-border/20 group hover:shadow-xl transition-all duration-300 cursor-pointer relative">
              <div className="aspect-[16/9] bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl overflow-hidden mb-6 relative">
                <img
                  src="/dummy.jpg"
                  alt="All magnet sizes comparison - Small, Medium, and Large"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground/80 mb-3">Complete Size Range</h3>
                <p className="text-foreground/70 text-lg">
                  From compact 2.75×2.75" to large 3.25×4" - choose the perfect size for your design
                </p>
                <p className="text-foreground/60 text-sm mt-2">Click to view larger image</p>
              </div>
            </div>
          </div>

          {/* Individual Size Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Small Magnets */}
            <Dialog>
              <DialogTrigger asChild>
                <div className="bg-card rounded-3xl p-8 shadow-sm border border-border/20 text-center group hover:shadow-lg transition-all duration-300">
                  <div className="aspect-[4/4] bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl mb-8 overflow-hidden relative">
                    <img
                      src="/small.jpg"
                      alt="Small magnets - 2x2 inch size"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <div className="bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                        <ZoomIn className="h-4 w-4 text-foreground/80" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold inline-block">
                      Compact & Cute
                    </div>
                    <h3 className="text-2xl font-bold text-foreground/80">Small Size</h3>
                    <div className="text-3xl font-bold text-primary mb-2">2.75" × 2.75"</div>
                    <p className="text-foreground/70 text-base leading-relaxed">
                      Perfect for delicate designs, logos, or when you need multiple magnets in a small space.
                      Ideal for refrigerator collections.
                    </p>
                    <div className="pt-2 text-sm text-foreground/60">
                      Pull Strength: 2-3 lbs
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Small Magnets (2.75" × 2.75")</DialogTitle>
                  <DialogDescription>
                    Perfect for delicate designs and compact spaces
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <img
                    src="/small.jpg"
                    alt="Detailed view of small magnets"
                    className="w-full h-auto rounded-xl mb-4"
                  />
                  <div className="space-y-3 text-foreground/70">
                    <p><strong>Dimensions:</strong> 2.75" × 2.75" (7.0 × 7.0 cm)</p>
                    <p><strong>Pull Strength:</strong> 2-3 lbs</p>
                    <p><strong>Best For:</strong> Logos, small artwork, multiple magnet displays</p>
                    <p><strong>Material:</strong> Premium vinyl with neodymium magnetic core</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Medium Magnets */}
            <Dialog>
              <DialogTrigger asChild>
                <div className="bg-card rounded-3xl p-8 shadow-sm border border-border/20 text-center group hover:shadow-lg transition-all duration-300 lg:scale-105 cursor-pointer">
                  <div className="aspect-[4/4] bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl mb-8 overflow-hidden relative">
                    <img
                      src="/medium.jpg"
                      alt="Medium magnets - 3x3 inch size"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <div className="bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                        <ZoomIn className="h-4 w-4 text-foreground/80" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-semibold inline-block">
                      Most Popular ⭐
                    </div>
                    <h3 className="text-2xl font-bold text-foreground/80">Medium Size</h3>
                    <div className="text-3xl font-bold text-accent mb-2">2.75" × 3.5"</div>
                    <p className="text-foreground/70 text-base leading-relaxed">
                      Our bestseller! The perfect balance of visibility and space efficiency.
                      Great for photos, artwork, and promotional materials.
                    </p>
                    <div className="pt-2 text-sm text-foreground/60">
                      Pull Strength: 4-5 lbs
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Medium Magnets (2.75" × 3.5") ⭐</DialogTitle>
                  <DialogDescription>
                    Our most popular size - perfect balance of impact and practicality
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <img
                    src="/medium.jpg"
                    alt="Detailed view of medium magnets"
                    className="w-full h-auto rounded-xl mb-4"
                  />
                  <div className="space-y-3 text-foreground/70">
                    <p><strong>Dimensions:</strong> 2.75" × 3.5" (7.0 × 8.9 cm)</p>
                    <p><strong>Pull Strength:</strong> 4-5 lbs</p>
                    <p><strong>Best For:</strong> Photos, artwork, promotional materials, gifts</p>
                    <p><strong>Material:</strong> Premium vinyl with neodymium magnetic core</p>
                    <p className="text-accent font-medium">🏆 Customer favorite - 80% of orders choose this size!</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Large Magnets */}
            <Dialog>
              <DialogTrigger asChild>
                <div className="bg-card rounded-3xl p-8 shadow-sm border border-border/20 text-center group hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="aspect-[4/4] bg-gradient-to-br from-secondary/10 to-primary/10 rounded-2xl mb-8 overflow-hidden relative">
                    <img
                      src="/large.jpg"
                      alt="Large magnets - 4x4 inch size"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <div className="bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                        <ZoomIn className="h-4 w-4 text-foreground/80" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-secondary/30 text-secondary px-4 py-2 rounded-full text-sm font-semibold inline-block">
                      Detail Rich
                    </div>
                    <h3 className="text-2xl font-bold text-foreground/80">Large Size</h3>
                    <div className="text-3xl font-bold text-secondary mb-2">3.25" × 4"</div>
                    <p className="text-foreground/70 text-base leading-relaxed">
                      Maximum impact! Perfect for detailed artwork, family photos, or when you want
                      your magnet to be the centerpiece.
                    </p>
                    <div className="pt-2 text-sm text-foreground/60">
                      Pull Strength: 6-8 lbs
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Large Magnets (3.25" × 4")</DialogTitle>
                  <DialogDescription>
                    Maximum impact for detailed artwork and statement pieces
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <img
                    src="/large.jpg"
                    alt="Detailed view of large magnets"
                    className="w-full h-auto rounded-xl mb-4"
                  />
                  <div className="space-y-3 text-foreground/70">
                    <p><strong>Dimensions:</strong> 3.25" × 4" (8.3 × 10.2 cm)</p>
                    <p><strong>Pull Strength:</strong> 6-8 lbs</p>
                    <p><strong>Best For:</strong> Detailed artwork, family photos, statement pieces</p>
                    <p><strong>Material:</strong> Premium vinyl with neodymium magnetic core</p>
                    <p className="text-secondary font-medium">💎 Premium choice for maximum visual impact</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Additional Size Info */}
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-semibold text-foreground/80 mb-4">Custom Sizes Available</h3>
            <p className="text-foreground/70 mb-6 max-w-3xl mx-auto">
              Need a different size? We also offer 4" × 6" rectangles and custom dimensions for bulk orders.
              All magnets feature strong neodymium cores with pull strengths ranging from 2-8 lbs depending on size.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors duration-200"
            >
              Request Custom Size
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
    </div>
  );
}
