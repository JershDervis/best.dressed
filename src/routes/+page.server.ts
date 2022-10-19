import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, type RequestEvent } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	create_party: async (event: RequestEvent) => {
		const { session, supabaseClient } = await getSupabase(event);
		const formData = await event.request.formData();
		const partyName = formData.get('partyName')?.toString();

		//  Error checking
		if (!session) throw error(401, { message: 'Unauthorized' });
		if (!partyName) throw error(400, { message: 'Missing party name' });

		//  Submit to the db, TODO: Requires fixing
		const { data, error: sbError } = await supabaseClient.rpc('create_party', {
			user_id: session.user?.id,
			party_name: partyName
		});

		if (sbError) return { success: false, message: sbError };

		return { success: true, room_uuid: data.room_uuid, name: data.name };
	}
};
