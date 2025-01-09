import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://moxwhzxieseyfbyabcqk.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_KEY environment variable')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
