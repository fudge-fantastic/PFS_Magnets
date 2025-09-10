import type { Route } from "./+types/gallery";
import { Link, useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
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


  // Get category from URL params on component mount, or default to first category
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].id);
    }
  }, [searchParams, categories]);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.getCategories(true);
        if (response.success && response.data) {
          setCategories(response.data);
          setApiError(false);
        } else {
          console.warn('API returned no categories data');
          setCategories([]);
          setApiError(true);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setCategories([]);
        setApiError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProductsLoading(true);
        const response = await api.getProducts(0, 100); // Get more products
        if (response.success && response.data) {
          setAllProducts(response.data);
          setProducts(response.data);
          setApiError(false);
        } else {
          console.warn('API returned no products data');
          setAllProducts([]);
          setProducts([]);
          setApiError(true);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setAllProducts([]);
        setProducts([]);
        setApiError(true);
      } finally {
        setProductsLoading(false);
      }
    };

    if (!loading) {
      fetchProducts();
    }
  }, [loading]);

  // Filter products based on selected category
  useEffect(() => {
    if (selectedCategory) {
      const filtered = allProducts.filter(product => product.category_id === selectedCategory);
      setProducts(filtered);
    }
  }, [selectedCategory, allProducts]);
  

  // Build category filter options (no 'All')
  const categoryOptions = categories.map(cat => ({
    id: cat.id,
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
          {/* API Error Message */}
          {apiError && (
            <div className="mb-6 md:mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm md:text-base">
                ⚠️ Unable to connect to the API. Please check your connection or try again later.
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

          {/* Empty State for no products */}
          {!productsLoading && !apiError && allProducts.length === 0 && (
            <div className="text-center py-12 md:py-16">
              <div className="text-4xl md:text-6xl mb-4">📦</div>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground/80 mb-2">
                No products available
              </h3>
              <p className="text-foreground/70">
                Check back later for new magnet designs.
              </p>
            </div>
          )}

          {/* Empty State for filtered results */}
          {!productsLoading && !apiError && allProducts.length > 0 && filteredProducts.length === 0 && (
            <div className="text-center py-12 md:py-16">
              <div className="text-4xl md:text-6xl mb-4">🔍</div>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground/80 mb-2">
                No products found in this category
              </h3>
              <p className="text-foreground/70">
                Try selecting a different category to see more designs.
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
