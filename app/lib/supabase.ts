// Supabase client configuration for PixelForge Studio
import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file.'
  );
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'X-Client-Info': 'pixelforge-studio'
    }
  }
});

// Database types for TypeScript
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          role: 'USER' | 'ADMIN';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          role?: 'USER' | 'ADMIN';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          role?: 'USER' | 'ADMIN';
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          short_description: string | null;
          price: number;
          category_id: string;
          rating: number;
          images: string[];
          is_locked: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          short_description?: string | null;
          price: number;
          category_id: string;
          rating?: number;
          images?: string[];
          is_locked?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          short_description?: string | null;
          price?: number;
          category_id?: string;
          rating?: number;
          images?: string[];
          is_locked?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      inquiries: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          email: string;
          phone_number: string | null;
          subject: string;
          message: string;
          subscribe_newsletter: boolean;
          reference_id: string;
          status: 'received' | 'in_progress' | 'resolved';
          submitted_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          first_name: string;
          last_name: string;
          email: string;
          phone_number?: string | null;
          subject: string;
          message: string;
          subscribe_newsletter?: boolean;
          reference_id?: string;
          status?: 'received' | 'in_progress' | 'resolved';
          submitted_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          first_name?: string;
          last_name?: string;
          email?: string;
          phone_number?: string | null;
          subject?: string;
          message?: string;
          subscribe_newsletter?: boolean;
          reference_id?: string;
          status?: 'received' | 'in_progress' | 'resolved';
          submitted_at?: string;
          created_at?: string;
        };
      };
    };
  };
}

export default supabase;
