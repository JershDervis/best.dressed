<script lang="ts">
	import type { PageData } from './$types';
	import { browser } from '$app/environment';
	import { supabaseClient } from '$lib/db';

	export let data: PageData;
	$: ({ user } = data.session);

	interface Party {
		room_uuid: string;
		name: string;
	}

	let userParties: Party[] | null = [];

	async function loadData() {
		const { data } = await supabaseClient
			.rpc('get_user_parties', {
				return_limit: 10,
				user_id: user?.id
			})
			.select('room_uuid, name');
		userParties = data;
	}

	$: if (browser && user) {
		loadData();
	}
</script>

<head>
	<title>Best Dressed</title>
</head>

<h1 class="text-center text-3xl text-white font-extrabold leading-8 tracking-tight sm:text-4xl">
	Best Dressed
</h1>

<!-- If the user is authenticated -->
{#if user}
	<p class="mt-3 text-lg text-gray-400">
		Welcome {user.email}!
	</p>
	<!-- If we found parties AND there wasn't any -->
	{#if userParties !== null}
		<div>These are your party's...</div>
		{#each userParties as party}
			<p>{party.name}</p>
		{/each}
	{:else}
		<div>You haven't created any parties yet, click here to create one!</div>
	{/if}
{:else}
	<p class="mt-3 text-lg text-gray-400">Welcome to Best Dressed! Please sign in to get started.</p>
{/if}
