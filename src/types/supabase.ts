export type SupabaseDatabase = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          role: 'user' | 'dealer' | 'admin' | null
          created_at: string
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          role?: 'user' | 'dealer' | 'admin' | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          role?: 'user' | 'dealer' | 'admin' | null
          created_at?: string
        }
      }
    }
  }
}
