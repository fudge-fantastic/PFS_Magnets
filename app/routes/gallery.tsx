import type { Route } from "./+types/gallery";
import { Link, useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import { Heart, Search, SlidersHorizontal, Grid3X3, LayoutGrid, Star, Eye, ShoppingCart, ChevronDown } from "lucide-react";
import { api, type Product, type Category } from "~/lib/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "compact">("grid");
  const [wishlistedItems, setWishlistedItems] = useState<Set<string>>(new Set());


  // Get category from URL params on component mount, or default to 'all'
  useEffect(() => { 
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('all'); // Default to 'all' instead of first category
    }
  }, [searchParams]);

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

  // Filter products based on selected category, search, and sort
  useEffect(() => {
    let filtered = allProducts;

    // Filter by category
    if (selectedCategory !== 'all' && selectedCategory) {
      filtered = filtered.filter(product => product.category_id === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category_name.toLowerCase().includes(query)
      );
    }

    // Sort products
    const sortedFiltered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.title.localeCompare(b.title);
        case "newest":
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

    setProducts(sortedFiltered);
  }, [selectedCategory, allProducts, searchQuery, sortBy]);

  const toggleWishlist = (productId: string) => {
    setWishlistedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };
  

  // Build category filter options with 'All' option first
  const categoryOptions = [
    {
      id: 'all',
      name: 'All',
      count: allProducts.length
    },
    ...categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      count: allProducts.filter(p => p.category_id === cat.id).length
    }))
  ];

  const filteredProducts = products; // Products are already filtered by the useEffect

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "name", label: "Name: A to Z" }
  ];

  return (
    <div className="min-h-screen bg-background py-4 md:py-8">
      {/* Filters and Controls */}
      <section>
        <div className="container-responsive">
          {/* Filters and Controls */}
          <div className="flex justify-end items-center mb-6">
            {/* Mobile Filter Toggle - could be added later */}
            <div className="lg:hidden">
              {/* Mobile filter button placeholder */}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="">
        <div className="container-responsive">
          {/* API Error Message */}
          {apiError && (
            <div className="mb-6 md:mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm md:text-base">
                ⚠️ Unable to connect to the API. Please check your connection or try again later.
              </p>
            </div>
          )}

          {/* Main Layout: Sidebar + Grid */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Sidebar - Filters */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-card rounded-xl p-4 border border-border shadow-sm sticky top-8">
                {/* Search Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-foreground/80 mb-3">Search</h4>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/50" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 text-sm"
                    />
                  </div>
                </div>

                {/* Category Filters */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-foreground/80 mb-3">Categories</h4>
                  <div className="space-y-2">
                    {loading || categories.length === 0 ? (
                      // Loading skeleton for filters
                      [...Array(5)].map((_, index) => (
                        <div
                          key={index}
                          className="h-8 bg-secondary/50 rounded animate-pulse"
                        />
                      ))
                    ) : (
                      categoryOptions.map(category => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 flex justify-between items-center ${
                            selectedCategory === category.id
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-primary/10 text-foreground/80'
                          }`}
                        >
                          <span>{category.name}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            selectedCategory === category.id
                              ? 'bg-primary-foreground/20 text-primary-foreground'
                              : 'bg-primary/10 text-primary'
                          }`}>
                            {category.count}
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                </div>

                {/* Sort Options */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-foreground/80 mb-3">Sort By</h4>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="w-full flex items-center justify-between bg-background border border-border rounded-lg px-3 py-2 text-sm hover:bg-primary/5 hover:border-primary/30 transition-colors">
                        {sortOptions.find(option => option.value === sortBy)?.label}
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-full">
                      {sortOptions.map(option => (
                        <DropdownMenuItem
                          key={option.value}
                          onClick={() => setSortBy(option.value)}
                          className={sortBy === option.value ? "bg-primary/10 text-primary" : ""}
                        >
                          {option.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* View Mode Toggle */}
                <div>
                  <h4 className="text-sm font-medium text-foreground/80 mb-3">View</h4>
                  <div className="flex bg-background border border-border rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`flex-1 p-2 rounded-md transition-all duration-200 flex items-center justify-center ${
                        viewMode === "grid"
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-foreground/60 hover:text-foreground/80'
                      }`}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("compact")}
                      className={`flex-1 p-2 rounded-md transition-all duration-200 flex items-center justify-center ${
                        viewMode === "compact"
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-foreground/60 hover:text-foreground/80'
                      }`}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Results Count */}
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-sm text-foreground/70">
                    {productsLoading ? 'Loading...' : `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} found`}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Product Grid */}
            <div className="flex-1">
              <div className={`grid gap-4 md:gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" 
                  : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
              }`}>
            {productsLoading || allProducts.length === 0 ? (
              // Loading skeleton for products
              [...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className={`bg-card rounded-xl overflow-hidden shadow-sm flex flex-col animate-pulse ${
                    viewMode === "compact" ? "h-64" : "h-80"
                  }`}
                >
                  <div className={`bg-primary/20 ${viewMode === "grid" ? "aspect-square" : "aspect-[4/3]"}`}></div>
                  <div className="p-3 md:p-4 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <div className="h-4 md:h-5 bg-primary/20 rounded w-3/4"></div>
                      <div className="h-4 md:h-5 bg-primary/20 rounded w-12 md:w-16"></div>
                    </div>
                    <div className="h-3 bg-primary/10 rounded mb-2 md:mb-3 flex-grow"></div>
                    <div className="flex justify-between items-center mt-auto">
                      <div className="h-3 bg-primary/10 rounded w-16 md:w-20"></div>
                      <div className="h-6 md:h-7 bg-primary/20 rounded w-16 md:w-20"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              filteredProducts.map((product, index) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className={`group bg-card rounded-xl overflow-hidden shadow-md transition-all duration-300 flex flex-col hover:shadow-xl hover:scale-[1.02] border border-transparent hover:border-primary/20 ${
                    viewMode === "compact" ? "h-64" : "h-80"
                  }`}
                >
                  {/* Image Container */}
                  <div className={`bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative overflow-hidden ${
                    viewMode === "grid" ? "aspect-square" : "aspect-[4/3]"
                  }`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 group-hover:to-primary/10 transition-all duration-300"></div>
                    
                    {/* Quick Action Buttons */}
                    <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                          wishlistedItems.has(product.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white/90 text-foreground hover:bg-white'
                        }`}
                      >
                        <Heart className={`h-3 w-3 ${wishlistedItems.has(product.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Product Badge */}
                    {product.rating >= 4.5 && (
                      <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 z-20">
                        <Star className="h-2 w-2 fill-current" />
                        Best
                      </div>
                    )}

                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover relative z-10"
                        loading={index < 8 ? "eager" : "lazy"}
                        style={{ imageRendering: 'auto' }}
                      />
                    ) : (
                      <span className={`relative z-10 ${viewMode === "grid" ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"}`}>
                        🖼️
                      </span>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 z-15"></div>
                  </div>

                  {/* Content - flex-grow to fill remaining space */}
                  <div className={`flex flex-col flex-grow ${viewMode === "grid" ? "p-3 md:p-4" : "p-2 md:p-3"}`}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className={`font-semibold text-foreground/90 group-hover:text-primary transition-colors duration-200 line-clamp-2 ${
                        viewMode === "grid" ? "text-sm md:text-base" : "text-xs md:text-sm"
                      }`}>
                        {product.title}
                      </h3>
                      <span className={`font-bold text-primary flex-shrink-0 ml-2 ${
                        viewMode === "grid" ? "text-base md:text-lg" : "text-sm md:text-base"
                      }`}>
                        ₹{product.price}
                      </span>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-2.5 w-2.5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                      <span className="text-xs text-foreground/60 ml-1">({product.rating.toFixed(1)})</span>
                    </div>

                    {viewMode === "grid" && (
                      <p className="text-foreground/70 text-xs leading-relaxed flex-grow line-clamp-2 mb-2">
                        {product.short_description || product.description}
                      </p>
                    )}
                    
                    {/* Bottom section - always at bottom of card */}
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-xs font-medium text-primary/70 uppercase tracking-wide">
                        {product.category_name}
                      </span>
                      
                      <div className="flex gap-1">
                        {viewMode === "compact" && (
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            className="bg-primary/10 text-primary p-1.5 rounded-lg hover:bg-primary/20 transition-colors duration-200"
                          >
                            <ShoppingCart className="h-3 w-3" />
                          </button>
                        )}
                        <span
                          className={`bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 hover:shadow-lg flex items-center justify-center ${
                            viewMode === "grid" 
                              ? "px-2 md:px-3 py-1 md:py-1.5 text-xs" 
                              : "px-2 py-1 text-xs"
                          }`}
                        >
                          {viewMode === "grid" ? "View" : "View"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* Empty State for no products */}
          {!productsLoading && !apiError && allProducts.length === 0 && (
            <div className="text-center py-16 md:py-24">
              <div className="text-6xl md:text-8xl mb-6">📦</div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground/80 mb-4">
                No products available
              </h3>
              <p className="text-foreground/70 mb-8 max-w-md mx-auto">
                We're working hard to bring you amazing magnet designs. Check back later for new arrivals!
              </p>
              <Link
                to="/"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
              >
                Back to Home
              </Link>
            </div>
          )}

          {/* Empty State for filtered results */}
          {!productsLoading && !apiError && allProducts.length > 0 && filteredProducts.length === 0 && (
            <div className="text-center py-16 md:py-24">
              <div className="text-6xl md:text-8xl mb-6">🔍</div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground/80 mb-4">
                No products found
              </h3>
              <p className="text-foreground/70 mb-8 max-w-md mx-auto">
                {searchQuery 
                  ? `No products match your search for "${searchQuery}". Try different keywords or browse all products.`
                  : `No products found in this category. Try selecting a different category to see more designs.`
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
                  >
                    Clear Search
                  </button>
                )}
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                  }}
                  className="bg-background border border-border text-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/5 transition-colors duration-200"
                >
                  View All Products
                </button>
              </div>
            </div>
          )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
