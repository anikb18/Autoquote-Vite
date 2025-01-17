export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          avatar_url: string | null
          updated_at: string | null
          created_at: string | null
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string | null
          created_at?: string | null
        }
      }
      quotes: {
        Row: {
          id: string
          user_id: string
          created_at: string
          updated_at: string | null
          status: 'pending' | 'accepted' | 'rejected'
          vehicle_id: string
        }
        Insert: {
          id?: string
          user_id: string
          created_at?: string
          updated_at?: string | null
          status?: 'pending' | 'accepted' | 'rejected'
          vehicle_id: string
        }
        Update: {
          id?: string
          user_id?: string
          created_at?: string
          updated_at?: string | null
          status?: 'pending' | 'accepted' | 'rejected'
          vehicle_id?: string
        }
      }
      vehicles: {
        Row: {
          id: string
          make: string
          model: string
          year: number
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          make: string
          model: string
          year: number
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          make?: string
          model?: string
          year?: number
          created_at?: string
          updated_at?: string | null
        }
      }
    }
  }
}
