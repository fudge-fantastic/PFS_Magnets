import { useState, useEffect } from 'react';
import { productService } from '../services/product.service';
import type { Product } from '../types/product';

interface UseProductsOptions {
  searchTerm?: string;
  categoryFilter?: string;
  statusFilter?: 'all' | 'active' | 'locked';
}

interface UseProductsResult {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  total: number;
  currentPage: number;
  totalPages: number;
  refetch: () => void;
  goToPage: (page: number) => void;
}

const ITEMS_PER_PAGE = 10;

export const useProducts = (options: UseProductsOptions = {}): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const filters: any = {
        skip: currentPage * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
      };

      if (options.categoryFilter && options.categoryFilter !== 'all') {
        filters.category_id = options.categoryFilter;
      }

      if (options.statusFilter && options.statusFilter !== 'all') {
        filters.is_locked = options.statusFilter === 'locked';
      }

      const { data, total: totalCount } = await productService.getProducts(filters);

      // Client-side search filtering
      let filteredData = data;
      if (options.searchTerm) {
        const search = options.searchTerm.toLowerCase();
        filteredData = data.filter(p =>
          p.title.toLowerCase().includes(search) ||
          p.description?.toLowerCase().includes(search)
        );
      }

      setProducts(filteredData);
      setTotal(totalCount);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, options.searchTerm, options.categoryFilter, options.statusFilter]);

  return {
    products,
    isLoading,
    error,
    total,
    currentPage,
    totalPages: Math.ceil(total / ITEMS_PER_PAGE),
    refetch: fetchProducts,
    goToPage: setCurrentPage,
  };
};
