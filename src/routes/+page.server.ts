// import { supabaseClient } from '$lib/db';

import type { RequestEvent } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	create: async ({ request }: RequestEvent) => {
		const formData = await request.formData();
		const partyName = formData.get('partyName');

		// const { data } = await supabaseClient
		// 	.rpc('create_party', {
		// 		user_id: user?.id,
		// 		party_name: partyName
		// 	})
		// 	.select('room_uuid, name');

		// console.log(partyName);
		return { success: true };
	}
};
