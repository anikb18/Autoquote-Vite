export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface DealerQuote {
  id: string;
  status: string;
  dealer_id: string;
  is_accepted: boolean;
  dealer_profiles: {
    dealer_name: string;
  };
}

export interface QuoteType {
  id: string;
  car_details: any; // Replace with proper car details type
  has_trade_in: boolean;
  status: string;
  dealer_quotes?: DealerQuote[];
  user_id: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
          email: string | null
          role: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          email?: string | null
          role?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          email?: string | null
          role?: string | null
        }
      }
      auctions: {
        Row: {
          id: string
          user_id: string
          vehicle_id: string
          start_price: number
          current_price: number
          endDate: string
          status: 'active' | 'completed' | 'cancelled'
          created_at: string
          updated_at: string | null
          photos: string[] | null
          vehicle_details: Json
        }
        Insert: {
          id?: string
          user_id: string
          vehicle_id: string
          start_price: number
          current_price?: number
          endDate: string
          status?: 'active' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string | null
          photos?: string[] | null
          vehicle_details: Json
        }
        Update: {
          id?: string
          user_id?: string
          vehicle_id?: string
          start_price?: number
          current_price?: number
          endDate?: string
          status?: 'active' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string | null
          photos?: string[] | null
          vehicle_details?: Json
        }
      }
      dealer_profiles: {
        Row: {
          id: string
          dealer_name: string
          contact_email: string
          contact_phone: string
          address: string
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id: string
          dealer_name: string
          contact_email: string
          contact_phone: string
          address: string
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          dealer_name?: string
          contact_email?: string
          contact_phone?: string
          address?: string
          created_at?: string
          updated_at?: string | null
        }
      }
      quotes: {
        Row: {
          id: string
          user_id: string
          car_details: Json
          has_trade_in: boolean
          status: string
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id: string
          user_id: string
          car_details: Json
          has_trade_in?: boolean
          status?: string
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          car_details?: Json
          has_trade_in?: boolean
          status?: string
          created_at?: string
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}