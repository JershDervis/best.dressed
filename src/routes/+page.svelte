<script lang="ts">
	import { browser } from '$app/environment';
	import PartyList from '$components/party/PartyList.svelte';
	import { supabaseClient } from '$lib/db';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import Textfield from '$components/Textfield.svelte';

	interface Party {
		room_uuid: string;
		name: string;
	}

	let userParties: Party[] | null = [];

	const loadData = async () => {
		if ($page.data.session?.user) {
			const { data } = await supabaseClient
				.rpc('get_user_parties', {
					return_limit: 10,
					user_id: $page.data.session.user.id
				})
				.select('room_uuid, name');
			userParties = data;
		}
	};

	$: if (browser && $page.data.session) {
		loadData();
	}

	let idPartyName = 'partyName';
	let bInputPartyName = '';
	let bInputDisabledPartyName = false;
</script>

<head>
	<title>{import.meta.env.VITE_PUBLIC_APP_NAME}</title>
</head>

<h1
	class="text-center text-3xl text-white font-extrabold leading-8 tracking-tight sm:text-4xl mb-4"
>
	{import.meta.env.VITE_PUBLIC_APP_NAME}
</h1>

<!-- If the user is authenticated -->
{#if $page.data.session}
	<!-- If we found parties AND there wasn't any -->
	{#if userParties !== null}
		<div class="px-4 py-5 sm:px-6 border-b w-full flex flex-row items-center">
			<div class="grow">
				<h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">
					Welcome {$page.data.session?.user?.user_metadata.full_name}
				</h3>
				<p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-200">
					Select a party, or create a new one!
				</p>
			</div>
			<label for="modal-create-party" class="btn btn-primary modal-button">New Party</label>
		</div>
		<PartyList
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
	<p class="mt-3 text-lg text-gray-400">
		Welcome to {import.meta.env.VITE_PUBLIC_APP_NAME}! Please sign in to get started.
	</p>
{/if}

<input type="checkbox" id="modal-create-party" class="modal-toggle" />
<div class="modal modal-middle">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Create a Party!</h3>
		<div class="py-4">
			<form method="post" action="?/create_party" use:enhance>
				<label for={idPartyName}>Enter your party name:</label>
				<input
					bind:value={bInputPartyName}
					disabled={bInputDisabledPartyName}
					type="text"
					name={idPartyName}
					class="input input-bordered w-full my-1"
					placeholder="Josh's Big Birthday Bash!"
				/>
				<div class="modal-action">
					<button for="modal-create-party" class="btn">Close</button>
					<button id="btn-create-party" type="submit" class="btn">Create!</button>
				</div>
			</form>
		</div>
	</div>
</div>
