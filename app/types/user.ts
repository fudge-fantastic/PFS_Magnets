import { z } from 'zod';

export type UserRole = 'USER' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export const updateUserRoleSchema = z.object({
  role: z.enum(['USER', 'ADMIN']),
});

export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>;
