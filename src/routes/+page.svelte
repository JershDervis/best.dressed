<script lang="ts">
	import type { PageData } from './$types';
	import { browser } from '$app/environment';
	import { supabaseClient } from '$lib/db';
	import CardList from '$components/CardList.svelte';

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

<h1
	class="text-center text-3xl text-white font-extrabold leading-8 tracking-tight sm:text-4xl mb-4"
>
	Best Dressed
</h1>

<!-- If the user is authenticated -->
{#if user}
	<!-- If we found parties AND there wasn't any -->
	{#if userParties !== null}
		<CardList
			title={'Welcome ' + user.user_metadata.full_name}
			subtitle="Select a party, or create a new one!"
			items={userParties.map((p) => {
				return {
					title: p.name,
					href: `/party/${p.room_uuid}`
				};
			})}
		/>
	{:else}
		<div>You haven't created any parties yet, click here to create one!</div>
	{/if}
{:else}
	<p class="mt-3 text-lg text-gray-400">Welcome to Best Dressed! Please sign in to get started.</p>
{/if}
