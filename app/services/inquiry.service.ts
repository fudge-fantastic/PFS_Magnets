import { supabase } from '../lib/supabase';
import type { Inquiry, UpdateInquiryInput } from '../types/inquiry';

interface GetInquiriesFilters {
  status?: 'received' | 'in_progress' | 'resolved';
  skip?: number;
  limit?: number;
}

export const inquiryService = {
  /**
   * Get all inquiries with optional filters
   */
  getInquiries: async (filters?: GetInquiriesFilters) => {
    let query = supabase
      .from('inquiries')
      .select('*', { count: 'exact' })
      .order('submitted_at', { ascending: false });

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    if (filters?.skip !== undefined && filters?.limit !== undefined) {
      query = query.range(filters.skip, filters.skip + filters.limit - 1);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    return { data: (data || []) as Inquiry[], total: count || 0 };
  },

  /**
   * Get a single inquiry by ID
   */
  getInquiry: async (id: string): Promise<Inquiry> => {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Inquiry;
  },

  /**
   * Update inquiry status
   */
  updateStatus: async (id: string, statusData: UpdateInquiryInput): Promise<Inquiry> => {
    const { data, error } = await supabase
      .from('inquiries')
      .update(statusData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Inquiry;
  },

  /**
   * Update inquiry status (simplified)
   */
  updateInquiryStatus: async (id: string, status: 'received' | 'in_progress' | 'resolved'): Promise<Inquiry> => {
    return inquiryService.updateStatus(id, { status });
  },

  /**
   * Get count of pending inquiries
   */
  getPendingCount: async (): Promise<number> => {
    const { count, error } = await supabase
      .from('inquiries')
      .select('*', { count: 'exact', head: true })
      .neq('status', 'resolved');

    if (error) throw error;
    return count || 0;
  },
};
