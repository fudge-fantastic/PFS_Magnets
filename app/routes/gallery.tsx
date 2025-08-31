import type { Route } from "./+types/gallery";
import { Link } from "react-router";
import { useState } from "react";
import { Heart, Eye, Filter } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Gallery - Beautiful Magnets Collection" },
    { name: "description", content: "Browse our complete collection of beautiful, unique magnet designs. Find the perfect magnets for your home, office, or as gifts." },
  ];
}

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Mock data for magnets
  const magnets = [
    { id: 1, name: "Vintage Kitchen", category: "fridge-magnets", price: 8.99, image: "�", description: "Retro kitchen utensils design" },
    { id: 2, name: "Family Portrait", category: "photo-magnets", price: 12.99, image: "👨‍👩‍👧‍👦", description: "Custom family photo magnet" },
    { id: 3, name: "Classic Car", category: "retro-prints", price: 9.99, image: "�", description: "Vintage automobile print" },
    { id: 4, name: "Food Fun", category: "fridge-magnets", price: 7.99, image: "🍕", description: "Colorful food-themed magnet" },
    { id: 5, name: "Wedding Memory", category: "photo-magnets", price: 14.99, image: "💒", description: "Beautiful wedding photo keepsake" },
    { id: 6, name: "Pin-Up Style", category: "retro-prints", price: 10.99, image: "�", description: "Classic pin-up art design" },
    { id: 7, name: "Recipe Helper", category: "fridge-magnets", price: 6.99, image: "📝", description: "Handy recipe reminder magnet" },
    { id: 8, name: "Pet Portrait", category: "photo-magnets", price: 11.99, image: "🐕", description: "Custom pet photo magnet" },
    { id: 9, name: "Diner Sign", category: "retro-prints", price: 9.99, image: "�", description: "Vintage diner advertisement" },
    { id: 10, name: "Grocery List", category: "fridge-magnets", price: 5.99, image: "🛒", description: "Magnetic shopping list holder" },
    { id: 11, name: "Baby's First", category: "photo-magnets", price: 13.99, image: "👶", description: "Precious baby milestone photo" },
    { id: 12, name: "Jukebox Era", category: "retro-prints", price: 11.99, image: "🎵", description: "Classic jukebox and music theme" }
  ];

  const categories = [
    { id: "all", name: "All", count: magnets.length },
    { id: "fridge-magnets", name: "Fridge Magnets", count: magnets.filter(m => m.category === "fridge-magnets").length },
    { id: "photo-magnets", name: "Photo Magnets", count: magnets.filter(m => m.category === "photo-magnets").length },
    { id: "retro-prints", name: "Retro Prints", count: magnets.filter(m => m.category === "retro-prints").length }
  ];

  const filteredMagnets = selectedCategory === "all" 
    ? magnets 
    : magnets.filter(magnet => magnet.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground/80 mb-4">
              Our Magnet Collection
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Discover beautifully crafted magnets that bring personality and style to any space
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-foreground/70">
              <Filter className="h-5 w-5" />
              <span className="font-semibold">Filter by category:</span>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                      : 'bg-secondary/50 text-foreground hover:bg-secondary hover:scale-105'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMagnets.map((magnet, index) => (
              <div
                key={magnet.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-105"
              >
                {/* Image Container */}
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-6xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/10 group-hover:to-primary/20 transition-all duration-300"></div>
                  <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">
                    {magnet.image}
                  </span>
                  
                  {/* Hover Overlay */}
                  {/* <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-3">
                      <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200">
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>
                  </div> */}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-foreground/80 text-lg group-hover:text-primary transition-colors duration-200">
                      {magnet.name}
                    </h3>
                    <span className="text-lg font-bold text-primary">
                      ${magnet.price}
                    </span>
                  </div>
                  
                  <p className="text-foreground/70 text-sm mb-4 leading-relaxed">
                    {magnet.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-primary/70 uppercase tracking-wide">
                      {magnet.category}
                    </span>
                    
                    <Link
                      to={`/product/${magnet.id}`}
                      className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors duration-200"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredMagnets.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-foreground/80 mb-2">
                No magnets found
              </h3>
              <p className="text-foreground/70">
                Try selecting a different category or check back later for new designs.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-accent/10 to-primary/10">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground/80 mb-4">
            Don't see what you're looking for?
          </h2>
          <p className="text-xl text-foreground/70 mb-8">
            We're always adding new designs and taking custom requests. Get in touch with us!
          </p>
          <Link
            to="/about"
            className="inline-flex items-center bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors duration-200"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
