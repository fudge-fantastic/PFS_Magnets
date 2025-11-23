import { supabase } from '../lib/supabase';
import type { User, UpdateUserRoleInput } from '../types/user';

interface GetUsersFilters {
  role?: 'USER' | 'ADMIN';
}

export const userService = {
  /**
   * Get all users
   */
  getUsers: async (filters?: GetUsersFilters) => {
    let query = supabase
      .from('users')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (filters?.role) {
      query = query.eq('role', filters.role);
    }

    const { data, error, count } = await query;

    if (error) throw error;
    return { data: (data || []) as User[], total: count || 0 };
  },

  /**
   * Get a single user by ID
   */
  getUser: async (id: string): Promise<User> => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as User;
  },

  /**
   * Update user role
   */
  updateUserRole: async (id: string, role: 'USER' | 'ADMIN'): Promise<User> => {
    const { data, error } = await supabase
      .from('users')
      .update({ role })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as User;
  },

  /**
   * Get total user count
   */
  getTotalCount: async (): Promise<number> => {
    const { count, error } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;
    return count || 0;
  },
};
