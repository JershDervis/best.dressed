import type { RequestEvent } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async (event: RequestEvent) => {
		// TODO log the user in
	}
};
