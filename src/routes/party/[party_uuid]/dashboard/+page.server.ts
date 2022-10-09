import { error } from '@sveltejs/kit';
// import { supabaseClient } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	return {
		...params
	};
	throw error(404, 'Not found');
};
