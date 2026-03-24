import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://eezpbcbgnogbvmdasduy.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImQ3NTEzNDU4LWEyMDEtNDY1Ni04YjUzLWU1YTVlNDU0NzdhNyJ9.eyJwcm9qZWN0SWQiOiJlZXpwYmNiZ25vZ2J2bWRhc2R1eSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzcwMDU2MjY1LCJleHAiOjIwODU0MTYyNjUsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.uFqfEOND2DlapZIlRqGuOS40FLZ2SGp7_YnvNxm225o';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };