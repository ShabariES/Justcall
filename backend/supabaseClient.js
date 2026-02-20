const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// DISABLE SSL VERIFICATION (Local Development Only)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase URL or Key is missing. Please check your .env file.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Test connection
(async () => {
    try {
        const { data, error } = await supabase.from('users').select('count', { count: 'exact', head: true });
        if (error) {
            console.error('Supabase connection error:', error.message);
        } else {
            console.log('Supabase connected successfully');
        }
    } catch (err) {
        console.error('Supabase connection exception:', err.message);
    }
})();

module.exports = supabase;
