import type { Route } from "./+types/home";
import { useState, useEffect } from "react";
import { api, type Category, type Product } from "~/lib/api";
import { HeroSection, CategoriesSection, MagnetSizesSection, FeaturesSection } from "~/components/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Beautiful Magnets - Unique Designs for Every Space" },
    { name: "description", content: "Discover our collection of beautifully designed magnets. From minimalist to playful, find the perfect magnets for your home, office, or as gifts." },
  ];
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<Record<string, Product>>({});
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);

  // Dummy data for fallback
  const dummyCategories: Category[] = [
    { id: "1", name: "Fridge Magnets", description: "Fun and functional magnets for your kitchen and home", is_active: true, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    { id: "2", name: "Photo Magnets", description: "Personalized magnets featuring your favorite memories", is_active: true, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    { id: "3", name: "Retro Prints", description: "Vintage-inspired designs with a nostalgic charm", is_active: true, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    { id: "4", name: "Save the Date", description: "Calendar magnets for special occasions and events", is_active: true, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" }
  ];

  const dummyProducts: Product[] = [
    { id: "1", title: "Vintage Rose", description: "Beautiful vintage rose design", short_description: "Classic floral magnet", price: 699, category_id: "1", category_name: "Fridge Magnets", rating: 4.5, images: ["/designer.jpg"], is_locked: false, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    { id: "3", title: "Family Photo", description: "Custom family photo magnet", short_description: "Personalized memories", price: 899, category_id: "2", category_name: "Photo Magnets", rating: 5.0, images: ["/1.jpg"], is_locked: false, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    { id: "4", title: "Retro Sunset", description: "Nostalgic sunset design", short_description: "Vintage sunset vibes", price: 799, category_id: "3", category_name: "Retro Prints", rating: 4.8, images: ["/dummy.jpg"], is_locked: false, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" },
    { id: "7", title: "Wedding Calendar", description: "Beautiful wedding save the date calendar", short_description: "Special date reminder", price: 999, category_id: "4", category_name: "Save the Date", rating: 4.9, images: ["/small.jpg"], is_locked: false, created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z" }
  ];

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        setLoading(true);
        setApiError(false);
        
        // Fetch categories
        const categoriesResponse = await api.getCategories(true);
        let fetchedCategories: Category[] = [];
        
        if (categoriesResponse.success && categoriesResponse.data && categoriesResponse.data.length > 0) {
          fetchedCategories = categoriesResponse.data;
          setCategories(fetchedCategories);
        } else {
          setApiError(true);
          fetchedCategories = dummyCategories;
          setCategories(dummyCategories);
        }

        // Fetch all products to get one per category
        try {
          const productsResponse = await api.getProducts(0, 100);
          if (productsResponse.success && productsResponse.data && productsResponse.data.length > 0) {
            // Create a map of category_id -> first product in that category
            const categoryProductMap: Record<string, Product> = {};
            fetchedCategories.forEach(category => {
              const firstProduct = productsResponse.data.find(p => p.category_id === category.id);
              if (firstProduct) {
                categoryProductMap[category.id] = firstProduct;
              }
            });
            setCategoryProducts(categoryProductMap);
          } else {
            // Use dummy products as fallback
            const dummyMap: Record<string, Product> = {};
            dummyProducts.forEach(product => {
              dummyMap[product.category_id] = product;
            });
            setCategoryProducts(dummyMap);
          }
        } catch (error) {
          console.error('Failed to fetch products:', error);
          // Use dummy products as fallback
          const dummyMap: Record<string, Product> = {};
          dummyProducts.forEach(product => {
            dummyMap[product.category_id] = product;
          });
          setCategoryProducts(dummyMap);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setApiError(true);
        setCategories(dummyCategories);
        // Use dummy products as fallback
        const dummyMap: Record<string, Product> = {};
        dummyProducts.forEach(product => {
          dummyMap[product.category_id] = product;
        });
        setCategoryProducts(dummyMap);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndProducts();
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoriesSection 
        categories={categories} 
        loading={loading} 
        categoryProducts={categoryProducts}
      />
      <MagnetSizesSection />
      <FeaturesSection />
    </div>
  );
}
