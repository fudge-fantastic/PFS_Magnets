import { z } from 'zod';

export type InquiryStatus = 'received' | 'in_progress' | 'resolved';

export interface Inquiry {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  subject: string;
  message: string;
  subscribe_newsletter: boolean;
  reference_id: string;
  status: InquiryStatus;
  submitted_at: string;
  created_at: string;
}

export const updateInquirySchema = z.object({
  status: z.enum(['received', 'in_progress', 'resolved']),
});

export type UpdateInquiryInput = z.infer<typeof updateInquirySchema>;
