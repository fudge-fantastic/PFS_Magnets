export interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  pendingInquiries: number;
  totalUsers: number;
}

export interface RecentActivity {
  type: 'product' | 'inquiry' | 'user';
  title: string;
  description: string;
  timestamp: string;
}

export interface PaginationParams {
  skip?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
}
