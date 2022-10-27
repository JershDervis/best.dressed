import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, type RequestEvent } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	create_party: async (event: RequestEvent) => {
		const { session, supabaseClient } = await getSupabase(event);

		//  Retrieve the submitted data from the form
		const formData = await event.request.formData();
		const partyName = formData.get('partyName')?.toString();

		//  Error checking
		if (!session) throw error(401, { message: 'Unauthorized user request' });
		if (!partyName) throw error(400, { message: 'Missing party name' });

		//  Submit to the db
		const { data, error: sbError } = await supabaseClient
			.rpc('create_party', {
				user_id: session.user?.id,
				party_name: partyName
			})
			.limit(1)
			.single();

		console.log(data, sbError);

		if (sbError) return { success: false, message: sbError };

		return { success: true, room_uuid: data.room_uuid, name: data.name };
	}
};
