import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://moxwhzxieseyfbyabcqk.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1veHdoenhpZXNleWZieWFiY3FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxMzg4MDcsImV4cCI6MjA1MTcxNDgwN30.YGmsMfNWQ6lsrxk-5KS-hQLFDi__Pmq6sZ-rq4C6fxU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
