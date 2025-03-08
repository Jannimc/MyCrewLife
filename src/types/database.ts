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
          full_name: string | null
          avatar_url: string | null
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          user_id: string
          service_type: string
          date: string
          time: string
          address: string
          cleaner: string
          status: string
          duration: string
          created_at: string
          rating: number | null
        }
        Insert: {
          id?: string
          user_id: string
          service_type: string
          date: string
          time: string
          address: string
          cleaner: string
          status: string
          duration: string
          created_at?: string
          rating?: number | null
        }
        Update: {
          id?: string
          user_id?: string
          service_type?: string
          date?: string
          time?: string
          address?: string
          cleaner?: string
          status?: string
          duration?: string
          created_at?: string
          rating?: number | null
        }
      }
      loyalty_points: {
        Row: {
          user_id: string
          points: number
          tier: string
          updated_at: string
        }
        Insert: {
          user_id: string
          points?: number
          tier?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          points?: number
          tier?: string
          updated_at?: string
        }
      }
    }
  }
}