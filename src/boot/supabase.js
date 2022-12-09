
import { createClient } from '@supabase/supabase-js'
import UseAuthUser from '../composables/UseAuthUser'

const supabaseURL = 'https://epjjtafemlcyobvycsrf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwamp0YWZlbWxjeW9idnljc3JmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk5NTA4NjUsImV4cCI6MTk4NTUyNjg2NX0.-0zWFG-sy7TyuT7rDqX_KcWJl9lzX3WbJK6fM_6yN6o'
const supabase = createClient(supabaseURL, supabaseKey)

supabase.auth.onAuthStateChange((event, session) => {
    const { user } = UseAuthUser()

    user.value = session?.user || null
})

export default function useSupabase() {
    return { supabase }
}