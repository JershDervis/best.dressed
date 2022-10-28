import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	create_party: async (event: RequestEvent) => {
		const { session, supabaseClient } = await getSupabase(event);

		//  Retrieve the submitted data from the form
		const formData = await event.request.formData();
		const partyName = formData.get('partyName')?.toString();

		//  Error checking
		if (!session) throw redirect(401, '/auth');
		if (!partyName) throw error(400, { message: 'Missing party name' });

		//  Submit db insert request
		const { data, error: sbError } = await supabaseClient
			.rpc('create_party', {
				user_id: session.user?.id,
				party_name: partyName
			})
			.limit(1)
			.single();

		if (sbError) throw error(500, { message: sbError.message });

		return { room_uuid: data.room_uuid, name: data.name };
	}
};
