import { supabase } from '../lib/supabase';
import type { DashboardStats } from '../types/admin';

export const adminService = {
  /**
   * Get dashboard statistics
   */
  getDashboardStats: async (): Promise<DashboardStats> => {
    const [productsResult, categoriesResult, inquiriesResult, usersResult] = await Promise.all([
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase.from('categories').select('*', { count: 'exact', head: true }),
      supabase.from('inquiries').select('*', { count: 'exact', head: true }).neq('status', 'resolved'),
      supabase.from('users').select('*', { count: 'exact', head: true }),
    ]);

    return {
      totalProducts: productsResult.count || 0,
      totalCategories: categoriesResult.count || 0,
      pendingInquiries: inquiriesResult.count || 0,
      totalUsers: usersResult.count || 0,
    };
  },
};
