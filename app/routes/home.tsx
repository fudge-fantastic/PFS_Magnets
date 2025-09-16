import type { Route } from "./+types/home";
import { Link } from "react-router";
import { ArrowRight, Sparkles, Heart, Star, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { api, type Category, type Product } from "~/lib/api";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Beautiful Magnets - Unique Designs for Every Space" },
    { name: "description", content: "Discover our collection of beautifully designed magnets. From minimalist to playful, find the perfect magnets for your home, office, or as gifts." },
  ];
}

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);

  // Dummy data for fallback when API is not available
  const dummyCategories: Category[] = [
    { 
      id: "1", 
      name: "Fridge Magnets", 
      description: "Fun and functional magnets for your kitchen and home", 
      is_active: true, 
      created_at: "2024-01-01T00:00:00Z", 
      updated_at: "2024-01-01T00:00:00Z" 
    },
    { 
      id: "2", 
      name: "Photo Magnets", 
      description: "Personalized magnets featuring your favorite memories", 
      is_active: true, 
      created_at: "2024-01-01T00:00:00Z", 
      updated_at: "2024-01-01T00:00:00Z" 
    },
    { 
      id: "3", 
      name: "Retro Prints", 
      description: "Vintage-inspired designs with a nostalgic charm", 
      is_active: true, 
      created_at: "2024-01-01T00:00:00Z", 
      updated_at: "2024-01-01T00:00:00Z" 
    },
    { 
      id: "4", 
      name: "Save the Date", 
      description: "Calendar magnets for special occasions and events", 
      is_active: true, 
      created_at: "2024-01-01T00:00:00Z", 
      updated_at: "2024-01-01T00:00:00Z" 
    }
  ];

  // Sample products for each category (1 product per category for preview)
  const dummyProducts: Product[] = [
    { id: "1", title: "Vintage Rose", description: "Beautiful vintage rose design", short_description: "Classic floral magnet", price: 699, category_id: "1", category_name: "Fridge Magnets", rating: 4.5, images: ["/designer.jpg"], is_locked: false, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    { id: "3", title: "Family Photo", description: "Custom family photo magnet", short_description: "Personalized memories", price: 899, category_id: "2", category_name: "Photo Magnets", rating: 5.0, images: ["/1.jpg"], is_locked: false, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    { id: "4", title: "Retro Sunset", description: "Nostalgic sunset design", short_description: "Vintage sunset vibes", price: 799, category_id: "3", category_name: "Retro Prints", rating: 4.8, images: ["/dummy.jpg"], is_locked: false, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    { id: "7", title: "Wedding Calendar", description: "Beautiful wedding save the date calendar", short_description: "Special date reminder", price: 999, category_id: "4", category_name: "Save the Date", rating: 4.9, images: ["/small.jpg"], is_locked: false, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" }
  ];

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setApiError(false);
        const response = await api.getCategories(true); // Get active categories only
        if (response.success && response.data && response.data.length > 0) {
          setCategories(response.data);
        } else {
          // If API returns no data, use dummy data
          setApiError(true);
          setCategories(dummyCategories);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        // API failed, use dummy data
        setApiError(true);
        setCategories(dummyCategories);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Helper function to get icon and styling for categories
  const getCategoryDisplayInfo = (categoryName: string) => {
    const name = categoryName.toLowerCase();
    if (name.includes('fridge') || name.includes('kitchen')) {
      return {
        icon: <Sparkles className="h-8 w-8" />,
        color: "from-primary/30 to-accent/30",
        count: "25+ designs"
      };
    } else if (name.includes('photo')) {
      return {
        icon: <Heart className="h-8 w-8" />,
        color: "from-accent/30 to-primary/30",
        count: "Custom orders"
      };
    } else if (name.includes('retro') || name.includes('vintage')) {
      return {
        icon: <Star className="h-8 w-8" />,
        color: "from-secondary/40 to-primary/20",
        count: "15+ designs"
      };
    } else if (name.includes('save the date') || name.includes('calendar')) {
      return {
        icon: <Users className="h-8 w-8" />,
        color: "from-pink-300/30 to-purple-300/30",
        count: "Special events"
      };
    } else {
      return {
        icon: <Sparkles className="h-8 w-8" />,
        color: "from-primary/30 to-accent/30",
        count: "Available"
      };
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/20">
        <div className="container-responsive py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center bg-primary/10 text-primary px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium mb-4 md:mb-6">
                ✨ Custom Designs Available
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-foreground/80 mb-4 md:mb-6">
                <span className="text-foreground/80">Create</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent pb-1">
                  Personalized
                </span>
                <span className="block text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light text-foreground/80">
                  Fridge Magnets
                </span>
              </h1>

              <p className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto lg:mx-0 mb-6 leading-relaxed">
                Transform your favorite memories into beautiful custom fridge magnets.
                Perfect for preserving special moments, gifting loved ones, or adding
                personal touches to your kitchen.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start items-center">
                <Link
                  to="/gallery"
                  className="w-full sm:w-auto group bg-primary text-primary-foreground px-4 md:px-5 py-2 md:py-2.5 rounded-lg font-medium text-sm md:text-base lg:text-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
                >
                  Explore Magnets
                  <ArrowRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>

            {/* Hero Image Placeholder */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center relative overflow-hidden border border-border/20">
                {/* Actual Image Placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative">
                                    <img
                    src="/designer.jpg"
                    alt="Beautiful magnet collection"
                    className="w-full h-full object-cover rounded-lg opacity-80"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-16 lg:py-20 xl:py-24">
        <div className="container-responsive">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground/80 mb-2">
              Explore Our Collections
            </h2>
            <p className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto px-4">
              Discover our four unique collections, each designed to serve different needs and styles
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {loading ? (
              // Loading skeleton
              [...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="bg-card rounded-lg shadow-sm border border-border/50 animate-pulse overflow-hidden"
                >
                  <div className="aspect-square bg-primary/20"></div>
                  <div className="p-4 md:p-6">
                    <div className="text-center">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/20 rounded-lg mx-auto mb-3 md:mb-4"></div>
                      <div className="h-4 md:h-5 bg-primary/20 rounded mb-2"></div>
                      <div className="h-3 bg-primary/10 rounded mb-3 md:mb-4"></div>
                      <div className="h-4 w-16 bg-primary/20 rounded-full mx-auto"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              categories.map((category, index) => {
                const displayInfo = getCategoryDisplayInfo(category.name);
                const sampleProduct = dummyProducts.find(p => p.category_id === category.id);
                return (
                  <Link
                    key={category.id}
                    to={`/gallery?category=${category.id}`}
                    className="group bg-card rounded-lg shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-border/50 hover:border-primary/30 hover:-translate-y-1 lg:hover:-translate-y-2 overflow-hidden"
                  >
                    {/* Product Image */}
                    {sampleProduct && (
                      <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                        <img
                          src={sampleProduct.images[0] || '/dummy.jpg'}
                          alt={sampleProduct.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/dummy.jpg';
                          }}
                        />
                        <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-primary">
                          ₹{sampleProduct.price}
                        </div>
                      </div>
                    )}
                    
                    {/* Category Info */}
                    <div className="p-3 md:p-4 lg:p-5">
                      <div className="text-center">
                        <h3 className="text-base md:text-lg lg:text-xl font-semibold text-foreground/80 mb-1 md:mb-2 group-hover:text-primary transition-colors duration-300">
                          {category.name}
                        </h3>

                        <p className="text-foreground/70 mb-2 md:mb-3 leading-relaxed text-xs md:text-sm">
                          {category.description}
                        </p>

                        {/* Sample Product Info */}
                        {sampleProduct && (
                          <div className="mb-2 md:mb-3 p-2 bg-primary/5 rounded-lg">
                            <p className="text-xs font-medium text-foreground/80">{sampleProduct.title}</p>
                            <p className="text-xs text-foreground/60">{sampleProduct.short_description}</p>
                          </div>
                        )}

                        {/* Count badge */}
                        <div className="inline-flex items-center bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                          {displayInfo.count}
                        </div>

                        {/* Hover arrow */}
                        <div className="mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <ArrowRight className="h-4 w-4 text-primary mx-auto" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>

          <div className="text-center mt-6 md:mt-8 lg:mt-12">
            <Link
              to="/gallery?category=all"
              className="inline-flex items-center bg-secondary text-foreground/80 px-4 md:px-5 py-2 md:py-2.5 rounded-lg font-medium hover:bg-secondary/80 transition-colors duration-200"
            >
              View All Designs
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>


      {/* Magnet Sizes Section */}
      <section className="py-12 md:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container-responsive">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground/80 mb-2">
              Available Magnet Sizes
            </h2>
            <p className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto px-4">
              Choose from our range of sizes to perfectly fit your needs. All magnets feature strong adhesion and premium quality construction.
            </p>
          </div>

          {/* Featured Size Comparison */}
          <div className="mb-12 md:mb-16">
            <div>
              <div className="aspect-[16/9] bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg overflow-hidden mb-3 md:mb-4 lg:mb-6 relative">
                <img
                  src="/dummy.jpg"
                  alt="All magnet sizes comparison - Small, Medium, and Large"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="text-center">
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground/80 mb-2 lg:mb-3">Complete Size Range</h3>
                <p className="text-foreground/70 text-sm md:text-base lg:text-lg">
                  From compact 2.75×2.75" to large 3.25×4" - choose the perfect size for your design
                </p>
              </div>
            </div>
          </div>

          {/* Individual Size Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-8 lg:mb-12">
            {/* Small Magnets */}
            <div className="bg-card rounded-lg p-4 md:p-5 shadow-sm border border-border/20 text-center group hover:shadow-lg transition-all duration-300">
              <div className="aspect-[4/4] bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg mb-4 md:mb-6 lg:mb-8 overflow-hidden relative">
                <img
                  src="/small.jpg"
                  alt="Small magnets - 2.75x2.75 inch size"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="space-y-2 md:space-y-3 lg:space-y-4">
                <div className="bg-primary/10 text-primary px-2.5 md:px-3 lg:px-4 py-1 md:py-1.5 lg:py-2 rounded-lg text-xs md:text-sm font-semibold inline-block">
                  Compact & Cute
                </div>
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground/80">Small Size</h3>
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-primary mb-2">2.75" × 2.75"</div>
                <p className="text-foreground/70 text-xs md:text-sm lg:text-base leading-relaxed pb-2">
                  Perfect for delicate designs, logos, or when you need multiple magnets in a small space.
                  Ideal for refrigerator collections.
                </p>
              </div>
            </div>

            {/* Medium Magnets */}
            <div className="bg-card rounded-lg p-4 md:p-5 shadow-sm border border-border/20 text-center group hover:shadow-lg transition-all duration-300">
              <div className="aspect-[4/4] bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg mb-4 md:mb-6 lg:mb-8 overflow-hidden relative">
                <img
                  src="/medium.jpg"
                  alt="Medium magnets - 2.75x3.5 inch size"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="space-y-2 md:space-y-3 lg:space-y-4">
                <div className="bg-accent/20 text-accent px-2.5 md:px-3 lg:px-4 py-1 md:py-1.5 lg:py-2 rounded-lg text-xs md:text-sm font-semibold inline-block">
                  Most Popular ⭐
                </div>
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground/80">Medium Size</h3>
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-accent mb-2">2.75" × 3.5"</div>
                <p className="text-foreground/70 text-xs md:text-sm lg:text-base leading-relaxed pb-2">
                  Our bestseller! The perfect balance of visibility and space efficiency.
                  Great for photos, artwork, and promotional materials.
                </p>
              </div>
            </div>

            {/* Large Magnets */}
            <div className="bg-card rounded-lg p-4 md:p-5 shadow-sm border border-border/20 text-center group hover:shadow-lg transition-all duration-300">
              <div className="aspect-[4/4] bg-gradient-to-br from-secondary/10 to-primary/10 rounded-lg mb-4 md:mb-6 lg:mb-8 overflow-hidden relative">
                <img
                  src="/large.jpg"
                  alt="Large magnets - 3.25x4 inch size"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="space-y-2 md:space-y-3 lg:space-y-4">
                <div className="bg-primary/10 text-primary px-2.5 md:px-3 lg:px-4 py-1 md:py-1.5 lg:py-2 rounded-lg text-xs md:text-sm font-semibold inline-block">
                  Detail Rich
                </div>
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground/80">Large Size</h3>
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-primary mb-2">3.25" × 4"</div>
                <p className="text-foreground/70 text-xs md:text-sm lg:text-base leading-relaxed pb-2">
                  Maximum impact! Perfect for detailed artwork, family photos, or when you want
                  your magnet to be the centerpiece.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Size Info */}
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-6 md:p-8 text-center">
            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground/80 mb-3 md:mb-4">Custom Sizes Available</h3>
            <p className="text-foreground/70 mb-4 md:mb-6 max-w-3xl mx-auto text-sm md:text-base">
              Need a different size? We also offer 4" × 6" rectangles and custom dimensions for bulk orders.
              All magnets feature strong neodymium cores with pull strengths ranging from 2-8 lbs depending on size.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center bg-primary text-primary-foreground px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
            >
              Request Custom Size
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-12 md:py-16 lg:py-20 xl:py-24">
        <div className="container-responsive">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground/80 mb-3 md:mb-4">
              What We Believe In
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-foreground/70 max-w-2xl mx-auto px-4">
              Our values guide everything we do, from design to customer service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 lg:gap-8">
            <div className="text-center group p-3 md:p-4">
              <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-7 w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 text-primary" />
              </div>
              <h3 className="text-base md:text-lg lg:text-xl font-semibold text-foreground/80 mb-2 md:mb-3">
                Beauty in Details
              </h3>
              <p className="text-foreground/70 leading-relaxed text-sm md:text-base">
                We believe that the smallest touches can make the biggest impact. Every magnet is designed
                to bring a moment of beauty to your everyday life.
              </p>
            </div>

            <div className="text-center group p-3 md:p-4">
              <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="h-7 w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 text-primary" />
              </div>
              <h3 className="text-base md:text-lg lg:text-xl font-semibold text-foreground/80 mb-2 md:mb-3">
                Quality First
              </h3>
              <p className="text-foreground/70 leading-relaxed text-sm md:text-base">
                Premium materials, fade-resistant inks, and strong magnets ensure that your purchase
                will bring joy for years to come.
              </p>
            </div>

            <div className="text-center group p-3 md:p-4">
              <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-7 w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 text-primary" />
              </div>
              <h3 className="text-base md:text-lg lg:text-xl font-semibold text-foreground/80 mb-2 md:mb-3">
                Customer Joy
              </h3>
              <p className="text-foreground/70 leading-relaxed text-sm md:text-base">
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
