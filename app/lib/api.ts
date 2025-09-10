// API configuration and client for PixelForge Studio backend
const API_BASE_URL = 'http://localhost:8000';

// API response type matching the backend format
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  total?: number;
}

// Product interface matching backend response
export interface Product {
  id: number;
  title: string;
  description: string;
  short_description: string;
  price: number;
  category_id: number;
  category_name: string;
  rating: number;
  images: string[];
  is_locked: boolean;
  created_at: string;
  updated_at: string;
}

// Category interface matching backend response
export interface Category {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// API Client class for making requests
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Products API methods
  async getPublicProducts(page: number = 0, limit: number = 12, categoryId?: number): Promise<ApiResponse<Product[]>> {
    const skip = page * limit;
    let url = `/products/unlocked?skip=${skip}&limit=${limit}`;
    
    if (categoryId) {
      url += `&category_id=${categoryId}`;
    }
    
    return this.request<Product[]>(url);
  }

  async getAllProducts(page: number = 0, limit: number = 12, categoryId?: number): Promise<ApiResponse<Product[]>> {
    const skip = page * limit;
    let url = `/products/?skip=${skip}&limit=${limit}`;
    
    if (categoryId) {
      url += `&category_id=${categoryId}`;
    }
    
    return this.request<Product[]>(url);
  }

  async getProductDetails(productId: number): Promise<ApiResponse<Product>> {
    return this.request<Product>(`/products/${productId}`);
  }

  // Categories API methods
  async getAllCategories(page: number = 0, limit: number = 100, activeOnly: boolean = false): Promise<ApiResponse<Category[]>> {
    const skip = page * limit;
    const url = `/categories/?skip=${skip}&limit=${limit}&active_only=${activeOnly}`;
    
    return this.request<Category[]>(url);
  }

  async getActiveCategories(page: number = 0, limit: number = 100): Promise<ApiResponse<Category[]>> {
    const skip = page * limit;
    const url = `/categories/active?skip=${skip}&limit=${limit}`;
    
    return this.request<Category[]>(url);
  }

  async getCategoryDetails(categoryId: number): Promise<ApiResponse<Category>> {
    return this.request<Category>(`/categories/${categoryId}`);
  }

  // Health check
  async checkHealth(): Promise<any> {
    return this.request('/health');
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Utility functions for common API operations
export const api = {
  // Get products (defaults to public/unlocked only)
  getProducts: (page?: number, limit?: number, categoryId?: number, includeAll: boolean = false) => {
    return includeAll 
      ? apiClient.getAllProducts(page, limit, categoryId)
      : apiClient.getPublicProducts(page, limit, categoryId);
  },

  // Get product by ID
  getProduct: (id: number) => apiClient.getProductDetails(id),

  // Get categories (defaults to active only)
  getCategories: (activeOnly: boolean = true) => {
    return activeOnly 
      ? apiClient.getActiveCategories()
      : apiClient.getAllCategories();
  },

  // Get category by ID
  getCategory: (id: number) => apiClient.getCategoryDetails(id),

  // Health check
  health: () => apiClient.checkHealth()
};

export default api;