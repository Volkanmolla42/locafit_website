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
      contact_messages: {
        Row: {
          id: string
          created_at: string
          name: string
          phone: string
          message: string
          status: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          phone: string
          message: string
          status?: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          phone?: string
          message?: string
          status?: string
        }
      }
      members: {
        Row: {
          id: string
          created_at: string
          first_name: string
          last_name: string
          phone: string
          email?: string
        }
        Insert: {
          id?: string
          created_at?: string
          first_name: string
          last_name: string
          phone: string
          email?: string
        }
        Update: {
          id?: string
          created_at?: string
          first_name?: string
          last_name?: string
          phone?: string
          email?: string
        }
      }
      appointments: {
        Row: {
          id: string
          created_at: string
          member_id: string
          date: string
          time: string
          status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
          notes?: string
        }
        Insert: {
          id?: string
          created_at?: string
          member_id: string
          date: string
          time: string
          status?: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
          notes?: string
        }
        Update: {
          id?: string
          created_at?: string
          member_id?: string
          date?: string
          time?: string
          status?: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
          notes?: string
        }
      }
      services: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string
          price: number
          duration: number
          session_count: number
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description: string
          price: number
          duration: number
          session_count?: number
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string
          price?: number
          duration?: number
          session_count?: number
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}