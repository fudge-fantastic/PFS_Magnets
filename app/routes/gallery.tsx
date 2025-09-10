import type { Route } from "./+types/gallery";
import { Link, useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import { Heart, Eye, Filter } from "lucide-react";
import { api, type Product, type Category } from "~/lib/api";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Gallery - Beautiful Magnets Collection" },
    { name: "description", content: "Browse our complete collection of beautiful, unique magnet designs. Find the perfect magnets for your home, office, or as gifts." },
  ];
}

export default function Gallery() {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]); // Store all products for count calculation
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [apiError, setApiError] = useState(false);

  // Dummy data for products when API is not available (20+ products)
  const dummyProducts: Product[] = [
    { id: 1, title: "Vintage Rose", description: "Beautiful vintage rose design", short_description: "Classic floral magnet", price: 12.99, category_id: 1, category_name: "Fridge Magnets", rating: 4.5, images: ["/designer.jpg"], is_locked: false, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    { id: 2, title: "Modern Geometric", description: "Contemporary geometric patterns", short_description: "Sleek modern design", price: 14.99, category_id: 1, category_name: "Fridge Magnets", rating: 4.7, images: ["/designer1.jpg"], is_locked: false, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    { id: 3, title: "Family Photo", description: "Custom family photo magnet", short_description: "Personalized memories", price: 18.99, category_id: 2, category_name: "Photo Magnets", rating: 5.0, images: ["/1.jpg"], is_locked: false, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    { id: 4, title: "Retro Sunset", description: "Nostalgic sunset design", short_description: "Vintage sunset vibes", price: 15.99, category_id: 3, category_name: "Retro Prints", rating: 4.8, images: ["/dummy.jpg"], is_locked: false, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    { id: 5, title: "Wedding Calendar", description: "Beautiful wedding save the date calendar", short_description: "Special date reminder", price: 19.99, category_id: 4, category_name: "Save the Date", rating: 4.9, images: ["/small.jpg"], is_locked: false, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    { id: 6, title: "Coffee Cup", description: "Steaming coffee cup design", short_description: "Morning motivation", price: 11.99, category_id: 1, category_name: "Fridge Magnets", rating: 4.3, images: ["/medium.jpg"], is_locked: false, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    { id: 7, title: "City Skyline", description: "Urban city skyline at night", short_description: "Metropolitan view", price: 17.99, category_id: 1, category_name: "Fridge Magnets", rating: 4.4, images: ["/large.jpg"], is_locked: false, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    { id: 8, title: "Pet Portrait", description: "Custom pet portrait magnet", short_description: "Beloved pet memories", price: 19.99, category_id: 2, category_name: "Photo Magnets", rating: 4.8, images: ["/all_sizes.jpg"], is_locked: false, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    { id: 9, title: "80s Neon", description: "Bright neon 80s style", short_description: "Retro neon vibes", price: 14.99, category_id: 3, category_name: "Retro Prints", rating: 4.5, images: ["/designer.jpg"], is_locked: false, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    { id: 10, title: "Anniversary Date", description: "Custom anniversary calendar magnet", short_description: "Love milestone", price: 21.99, category_id: 4, category_name: "Save the Date", rating: 4.7, images: ["/designer1.jpg"], is_locked: false, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    { id: 11, title: "Space Galaxy", description: "Cosmic galaxy design", short_description: "Stellar universe", price: 16.99, category_id: 1, category_name: "Fridge Magnets", rating: 4.8, images: ["/1.jpg"], is_locked: false, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    { id: 12, title: "Wedding Photo", description: "Beautiful wedding memory", short_description: "Special day keepsake", price: 22.99, category_id: 2, category_name: "Photo Magnets", rating: 5.0, images: ["/dummy.jpg"], is_locked: false, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    { id: 13, title: "Vintage Car", description: "Classic vintage automobile", short_description: "Retro automobile", price: 15.99, category_id: 3, category_name: "Retro Prints", rating: 4.4, images: ["/small.jpg"], is_locked: false, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    { id: 14, title: "Birthday Calendar", description: "Special birthday calendar magnet", short_description: "Birthday reminder", price: 17.99, category_id: 4, category_name: "Save the Date", rating: 4.6, images: ["/medium.jpg"], is_locked: false, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    { id: 15, title: "Pizza Slice", description: "Delicious pizza slice design", short_description: "Food lover's choice", price: 12.99, category_id: 1, category_name: "Fridge Magnets", rating: 4.4, images: ["/large.jpg"], is_locked: false, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    { id: 16, title: "Baby Photo", description: "Adorable baby photo magnet", short_description: "Precious moments", price: 17.99, category_id: 2, category_name: "Photo Magnets", rating: 4.9, images: ["/all_sizes.jpg"], is_locked: false, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    { id: 17, title: "Disco Ball", description: "Glittery disco ball design", short_description: "Party vibes", price: 16.99, category_id: 3, category_name: "Retro Prints", rating: 4.6, images: ["/designer.jpg"], is_locked: false, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    { id: 18, title: "Graduation Date", description: "Graduation ceremony calendar", short_description: "Achievement milestone", price: 20.99, category_id: 4, category_name: "Save the Date", rating: 5.0, images: ["/designer1.jpg"], is_locked: false, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    { id: 19, title: "Vintage Coffee", description: "Classic coffee shop design", short_description: "Retro café style", price: 13.99, category_id: 1, category_name: "Fridge Magnets", rating: 4.5, images: ["/1.jpg"], is_locked: false, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    { id: 20, title: "Graduation Photo", description: "Proud graduation moment", short_description: "Achievement celebration", price: 20.99, category_id: 2, category_name: "Photo Magnets", rating: 5.0, images: ["/dummy.jpg"], is_locked: false, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    { id: 21, title: "Vinyl Record", description: "Classic vinyl record design", short_description: "Music nostalgia", price: 14.99, category_id: 3, category_name: "Retro Prints", rating: 4.5, images: ["/small.jpg"], is_locked: false, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    { id: 22, title: "Holiday Calendar", description: "Special holiday calendar magnet", short_description: "Holiday memories", price: 18.99, category_id: 4, category_name: "Save the Date", rating: 4.8, images: ["/medium.jpg"], is_locked: false, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" }
  ];

  // Get category from URL params on component mount, or default to first category
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].id.toString());
    }
  }, [searchParams, categories]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.getCategories(true);
        if (response.success && response.data && response.data.length > 0) {
          setCategories(response.data);
        } else {
          // Use dummy categories if API returns no data
          setCategories([
            { id: 1, name: "Fridge Magnets", description: "Fun and functional magnets", is_active: true, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
            { id: 2, name: "Photo Magnets", description: "Personalized photo magnets", is_active: true, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
            { id: 3, name: "Retro Prints", description: "Vintage-inspired designs", is_active: true, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
            { id: 4, name: "Save the Date", description: "Calendar magnets for special occasions", is_active: true, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" }
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        // Use dummy categories on API error
        setCategories([
          { id: 1, name: "Fridge Magnets", description: "Fun and functional magnets", is_active: true, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
          { id: 2, name: "Photo Magnets", description: "Personalized photo magnets", is_active: true, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
          { id: 3, name: "Retro Prints", description: "Vintage-inspired designs", is_active: true, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
          { id: 4, name: "Save the Date", description: "Calendar magnets for special occasions", is_active: true, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products when category changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProductsLoading(true);
        setApiError(false);
        const response = await api.getProducts(0, 50); // Always get all products first
        if (response.success && response.data && response.data.length > 0) {
          setAllProducts(response.data); // Store all products for count calculations
          setProducts(response.data); // Initially show all products
        } else {
          // If API returns no data, use dummy data
          setApiError(true);
          setAllProducts(dummyProducts);
          setProducts(dummyProducts);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        // API failed, use dummy data
        setApiError(true);
        setAllProducts(dummyProducts);
        setProducts(dummyProducts);
      } finally {
        setProductsLoading(false);
      }
    };

    if (!loading) { // Only fetch products after categories are loaded
      fetchProducts();
    }
  }, [loading]); // Remove selectedCategory dependency since we fetch all products once

  // Filter products based on selected category
  useEffect(() => {
    if (selectedCategory) {
      const filtered = allProducts.filter(product => product.category_id === parseInt(selectedCategory));
      setProducts(filtered);
    }
  }, [selectedCategory, allProducts]);
  

  // Build category filter options (no 'All')
  const categoryOptions = categories.map(cat => ({
    id: cat.id.toString(),
    name: cat.name,
    count: allProducts.filter(p => p.category_id === cat.id).length
  }));

  const filteredProducts = products; // Products are already filtered by the useEffect

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-12 md:py-16">
        <div className="container-responsive">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground/80 mb-3 md:mb-4">
              Our Magnet Collection
            </h1>
            <p className="text-base md:text-xl text-foreground/70 max-w-2xl mx-auto">
              Discover beautifully crafted magnets that bring personality and style to any space
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 md:py-8 border-b border-border/50">
        <div className="container-responsive">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2 md:gap-3">
              {loading || categories.length === 0 ? (
                // Loading skeleton for filters
                [...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="h-8 md:h-10 w-20 md:w-24 bg-secondary/50 rounded-full animate-pulse"
                  />
                ))
              ) : (
                categoryOptions.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full font-light transition-all duration-200 text-sm md:text-base ${
                      selectedCategory === category.id
                        ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                        : 'bg-secondary/50 text-foreground hover:bg-secondary hover:scale-105'
                    }`}
                  >
                    {category.name}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 md:py-16">
        <div className="container-responsive">
          {/* API Error Message (only when using dummy data) */}
          {apiError && (
            <div className="mb-6 md:mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm md:text-base">
                ⚠️ Currently showing sample products. Live product data will appear when the API is connected.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {productsLoading || allProducts.length === 0 ? (
              // Loading skeleton for products
              [...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl lg:rounded-2xl overflow-hidden shadow-sm flex flex-col animate-pulse"
                >
                  <div className="aspect-square bg-primary/20"></div>
                  <div className="p-4 md:p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <div className="h-5 md:h-6 bg-primary/20 rounded w-3/4"></div>
                      <div className="h-5 md:h-6 bg-primary/20 rounded w-12 md:w-16"></div>
                    </div>
                    <div className="h-4 bg-primary/10 rounded mb-3 md:mb-4 flex-grow"></div>
                    <div className="flex justify-between items-center mt-auto">
                      <div className="h-3 md:h-4 bg-primary/10 rounded w-16 md:w-20"></div>
                      <div className="h-7 md:h-8 bg-primary/20 rounded w-20 md:w-24"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="group bg-card rounded-xl lg:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-105 flex flex-col"
                >
                  {/* Image Container */}
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/10 group-hover:to-primary/20 transition-all duration-300"></div>
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={`${product.images[0]}`}
                        alt={product.title}
                        className="w-full h-full object-cover relative z-10"
                      />
                    ) : (
                      <span className="text-4xl md:text-6xl relative z-10">
                        🖼️
                      </span>
                    )}
                  </div>

                  {/* Content - flex-grow to fill remaining space */}
                  <div className="p-4 md:p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-foreground/80 text-base md:text-lg group-hover:text-primary transition-colors duration-200">
                        {product.title}
                      </h3>
                      <span className="text-base md:text-lg font-bold text-primary">
                        ${product.price}
                      </span>
                    </div>
                    
                    <p className="text-foreground/70 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed flex-grow">
                      {product.short_description || product.description}
                    </p>
                    
                    {/* Bottom section - always at bottom of card */}
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-xs font-medium text-primary/70 uppercase tracking-wide">
                        {product.category_name}
                      </span>
                      
                      <Link
                        to={`/product/${product.id}`}
                        className="bg-primary text-primary-foreground px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-primary/90 transition-colors duration-200"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Empty State */}
          {!productsLoading && allProducts.length > 0 && filteredProducts.length === 0 && (
            <div className="text-center py-12 md:py-16">
              <div className="text-4xl md:text-6xl mb-4">🔍</div>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground/80 mb-2">
                No products found
              </h3>
              <p className="text-foreground/70">
                Try selecting a different category or check back later for new designs.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-accent/10 to-primary/10">
        <div className="container-responsive text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground/80 mb-3 md:mb-4">
            Don't see what you're looking for?
          </h2>
          <p className="text-base md:text-xl text-foreground/70 mb-6 md:mb-8">
            We're always adding new designs and taking custom requests. Get in touch with us!
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-primary text-primary-foreground px-5 md:px-6 py-2.5 md:py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors duration-200"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
