import { useState, useEffect } from 'react';
import { inquiryService } from '../services/inquiry.service';
import type { Inquiry } from '../types/inquiry';

interface UseInquiriesOptions {
  searchTerm?: string;
  statusFilter?: 'all' | 'received' | 'in_progress' | 'resolved';
}

interface UseInquiriesResult {
  inquiries: Inquiry[];
  isLoading: boolean;
  error: string | null;
  total: number;
  currentPage: number;
  totalPages: number;
  refetch: () => void;
  goToPage: (page: number) => void;
}

const ITEMS_PER_PAGE = 10;

export const useInquiries = (options: UseInquiriesOptions = {}): UseInquiriesResult => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const filters: any = {
        skip: currentPage * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
      };

      if (options.statusFilter && options.statusFilter !== 'all') {
        filters.status = options.statusFilter;
      }

      const { data, total: totalCount } = await inquiryService.getInquiries(filters);

      // Client-side search filtering
      let filteredData = data;
      if (options.searchTerm) {
        const search = options.searchTerm.toLowerCase();
        filteredData = data.filter(i =>
          i.reference_id?.toLowerCase().includes(search) ||
          i.email.toLowerCase().includes(search) ||
          i.first_name.toLowerCase().includes(search) ||
          i.last_name.toLowerCase().includes(search) ||
          i.subject.toLowerCase().includes(search)
        );
      }

      setInquiries(filteredData);
      setTotal(totalCount);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch inquiries');
      setInquiries([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [currentPage, options.searchTerm, options.statusFilter]);

  return {
    inquiries,
    isLoading,
    error,
    total,
    currentPage,
    totalPages: Math.ceil(total / ITEMS_PER_PAGE),
    refetch: fetchInquiries,
    goToPage: setCurrentPage,
  };
};
