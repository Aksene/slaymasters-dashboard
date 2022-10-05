import { createClient } from '@supabase/supabase-js'

// import dotenv from 'dotenv' 
// require('dotenv').config();
// console.log(process.env)

// Database URL and Key
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL

// Export the variable to be used in other files
export const supabase = createClient(supabaseUrl, supabaseKey)
