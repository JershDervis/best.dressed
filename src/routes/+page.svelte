<script lang="ts">
	import { browser } from '$app/environment';
	import { PlusCircleIcon } from '@rgossiaux/svelte-heroicons/solid';
	import Textfield from '$components/Textfield.svelte';
	import Dialog from '$components/Dialog.svelte';
	import PartyList from '$components/party/PartyList.svelte';
	import { enhance } from '$app/forms';
	import { supabaseClient } from '$lib/db';
	import { page } from '$app/stores';

	/** @type {import('./$types').ActionData} */
	export let form;

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

	let dialog: Dialog;
	let partyName: string;

	$: canSubmit = partyName !== undefined && partyName.length > 0;
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
		<Dialog
			bind:this={dialog}
			bind:submitable={canSubmit}
			title="Create a party"
			submitText="Create"
			icon={PlusCircleIcon}
			theme="blue"
		>
			<form method="post" action="?/create" use:enhance>
				<Textfield
					bind:value={partyName}
					idName="partyName"
					label="Give your party a name:"
					placeholder="21st Birthday!"
				/>
			</form>
		</Dialog>
		<div
			class="container flex flex-col mx-auto w-full items-center justify-center bg-white dark:bg-gray-800 shadow-lg"
		>
			<div class="px-4 py-5 sm:px-6 border-b w-full flex flex-row items-center">
				<div class="grow">
					<h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">
						Welcome {$page.data.session?.user?.user_metadata.full_name}
					</h3>
					<p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-200">
						Select a party, or create a new one!
					</p>
				</div>
				<button
					on:click={() => dialog.openModal()}
					class="text-center flex-col justify-end flex items-center rounded-md px-4 py-2 text-sm font-medium bg-blue-600 text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-blue-500"
				>
					New Party
				</button>
			</div>
			<PartyList
				items={userParties.map((p) => {
					return {
						title: p.name,
						href: `/party/${p.room_uuid}`
					};
				})}
			/>
		</div>
	{:else}
		<div>You haven't created any parties yet, click here to create one!</div>
	{/if}
{:else}
	<p class="mt-3 text-lg text-gray-400">
		Welcome to {import.meta.env.VITE_PUBLIC_APP_NAME}! Please sign in to get started.
	</p>
{/if}
