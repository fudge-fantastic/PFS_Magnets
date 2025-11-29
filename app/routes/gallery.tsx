import type { Route } from "./+types/gallery";
import { useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import { api, type Product, type Category } from "~/lib/api";
import { FilterSidebar, ProductGrid, EmptyState } from "~/components/gallery";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "~/components/ui/drawer";
import { Button } from "~/components/Button";
import { SlidersHorizontal } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Gallery - Beautiful Magnets Collection" },
    { name: "description", content: "Browse our complete collection of beautiful, unique magnet designs. Find the perfect magnets for your home, office, or as gifts." },
  ];
}

export default function Gallery() {
  const [searchParams] = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [wishlistedItems, setWishlistedItems] = useState<Set<string>>(new Set());
  const [filterOpen, setFilterOpen] = useState(false);

  // Get category from URL params on component mount
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categoryParam !== 'all') {
      setSelectedCategories(new Set([categoryParam]));
    } else {
      setSelectedCategories(new Set());
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
        const response = await api.getProducts(0, 100);
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

  // Filter products based on selected categories, search, and sort
  useEffect(() => {
    let filtered = allProducts;

    if (selectedCategories.size > 0) {
      filtered = filtered.filter(product => selectedCategories.has(product.category_id));
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category_name.toLowerCase().includes(query)
      );
    }

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
  }, [allProducts, selectedCategories, searchQuery, sortBy]);

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

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const clearAllCategories = () => {
    setSelectedCategories(new Set());
  };

  const clearAllFilters = () => {
    clearAllCategories();
    setSearchQuery("");
  };

  const categoryOptions = categories.map(cat => ({
    id: cat.id,
    name: cat.name,
    count: allProducts.filter(p => p.category_id === cat.id).length
  }));

  return (
    <div className="min-h-screen py-8 sm:py-10 md:py-12 lg:py-16">
      <section>
        <div className="container-responsive">
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12 space-y-3 md:space-y-4 animate-fade-in-up">
            <p className="text-rose-500 font-medium text-sm tracking-wide uppercase">Our Collection</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800">
              Explore Beautiful Magnets
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto font-light">
              Browse our complete collection of handcrafted magnets
            </p>
          </div>

          {/* API Error Message */}
          {apiError && (
            <div className="mb-8 p-5 bg-rose-50 border border-rose-200 rounded-3xl animate-fade-in-up">
              <p className="text-rose-700 text-sm md:text-base font-medium flex items-center gap-2">
                <span className="text-lg">⚠️</span>
                <span>Unable to connect to the API. Please check your connection or try again later.</span>
              </p>
            </div>
          )}

          {/* Main Layout: Sidebar + Grid */}
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-10">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block">
              <FilterSidebar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                categories={categoryOptions}
                selectedCategories={selectedCategories}
                onCategoryToggle={toggleCategory}
                onClearCategories={clearAllCategories}
                sortBy={sortBy}
                onSortChange={setSortBy}
                loading={loading}
                resultsCount={products.length}
                productsLoading={productsLoading}
              />
            </aside>

            {/* Mobile Filter Drawer */}
            <div className="lg:hidden fixed bottom-6 right-6 z-40">
              <Drawer open={filterOpen} onOpenChange={setFilterOpen}>
                <DrawerTrigger asChild>
                  <Button size="lg" className="shadow-soft-lg relative">
                    <SlidersHorizontal className="h-5 w-5" />
                    Filters
                    {selectedCategories.size > 0 && (
                      <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-semibold rounded-full h-6 w-6 flex items-center justify-center">
                        {selectedCategories.size}
                      </span>
                    )}
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="max-h-[85vh] overflow-y-auto">
                  <DrawerHeader>
                    <DrawerTitle>Filter Products</DrawerTitle>
                  </DrawerHeader>
                  <div className="px-4 pb-6">
                    <FilterSidebar
                      searchQuery={searchQuery}
                      onSearchChange={setSearchQuery}
                      categories={categoryOptions}
                      selectedCategories={selectedCategories}
                      onCategoryToggle={toggleCategory}
                      onClearCategories={clearAllCategories}
                      sortBy={sortBy}
                      onSortChange={setSortBy}
                      loading={loading}
                      resultsCount={products.length}
                      productsLoading={productsLoading}
                    />
                  </div>
                </DrawerContent>
              </Drawer>
            </div>

            <div className="flex-1">
              {!productsLoading && !apiError && allProducts.length === 0 ? (
                <EmptyState type="no-products" />
              ) : !productsLoading && !apiError && allProducts.length > 0 && products.length === 0 ? (
                <EmptyState
                  type="no-results"
                  searchQuery={searchQuery}
                  onClearSearch={() => setSearchQuery("")}
                  onClearFilters={clearAllFilters}
                />
              ) : (
                <ProductGrid
                  products={products}
                  loading={productsLoading}
                  wishlistedItems={wishlistedItems}
                  onToggleWishlist={toggleWishlist}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
