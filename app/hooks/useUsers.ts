import { useState, useEffect } from 'react';
import { userService } from '../services/user.service';
import type { User } from '../types/user';

interface UseUsersOptions {
  searchTerm?: string;
  roleFilter?: 'all' | 'USER' | 'ADMIN';
}

interface UseUsersResult {
  users: User[];
  isLoading: boolean;
  error: string | null;
  total: number;
  refetch: () => void;
}

export const useUsers = (options: UseUsersOptions = {}): UseUsersResult => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const filters: any = {};

      if (options.roleFilter && options.roleFilter !== 'all') {
        filters.role = options.roleFilter;
      }

      const result = await userService.getUsers(filters);

      // Client-side search filtering
      let filteredData = result.data;
      if (options.searchTerm) {
        const search = options.searchTerm.toLowerCase();
        filteredData = result.data.filter((u: any) =>
          u.email.toLowerCase().includes(search)
        );
      }

      setUsers(filteredData);
      setTotal(result.total);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [options.searchTerm, options.roleFilter]);

  return {
    users,
    isLoading,
    error,
    total,
    refetch: fetchUsers,
  };
};
