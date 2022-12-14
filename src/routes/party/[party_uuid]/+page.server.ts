import { error } from '@sveltejs/kit';
import { supabaseClient } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const roomUUID = params.party_uuid;
	let errCode = 404;
	let errMessage = `Party ${roomUUID} not found`;
	if (roomUUID !== undefined) {
		const { data, error } = await supabaseClient
			.from('party')
			.select('*')
			.eq('room_uuid', roomUUID)
			.limit(1);

		if (error) {
			errCode = 500;
			errMessage = error.message;
		} else if (data !== null && data.length > 0) {
			return {
				party: { ...data[0] }
			};
		}
	}
	throw error(errCode, errMessage);
};
