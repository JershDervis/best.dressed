// src/routes/+layout.ts
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import type { RequestEvent } from '@sveltejs/kit';

export const load = async (event: RequestEvent) => {
	const { session } = await getSupabase(event);
	return { session };
};
