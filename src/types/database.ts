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
          property_type: string | null
          residential_areas: Record<string, number> | null
          commercial_areas: Record<string, number> | null
          other_areas: string[] | null
          custom_area_name: string | null
          extra_services: string[] | null
          frequency: string | null
          special_requirements: string | null
          has_pets: boolean | null
          pet_details: string | null
          access_instructions: string | null
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
          property_type?: string | null
          residential_areas?: Record<string, number> | null
          commercial_areas?: Record<string, number> | null
          other_areas?: string[] | null
          custom_area_name?: string | null
          extra_services?: string[] | null
          frequency?: string | null
          special_requirements?: string | null
          has_pets?: boolean | null
          pet_details?: string | null
          access_instructions?: string | null
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
          property_type?: string | null
          residential_areas?: Record<string, number> | null
          commercial_areas?: Record<string, number> | null
          other_areas?: string[] | null
          custom_area_name?: string | null
          extra_services?: string[] | null
          frequency?: string | null
          special_requirements?: string | null
          has_pets?: boolean | null
          pet_details?: string | null
          access_instructions?: string | null
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