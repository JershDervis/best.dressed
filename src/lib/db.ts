import { createClient } from '@supabase/supabase-js';
import { setupSupabaseHelpers } from '@supabase/auth-helpers-sveltekit';
import { dev } from '$app/environment';

/**
 * Initialize supabase client
 */
export const supabaseClient = createClient(
	import.meta.env.VITE_PUBLIC_SUPABASE_URL,
	import.meta.env.VITE_PUBLIC_SUPABASE_KEY,
	{
		persistSession: false,
		autoRefreshToken: false
	}
);

setupSupabaseHelpers({
	supabaseClient,
	cookieOptions: {
		secure: !dev
	}
});
