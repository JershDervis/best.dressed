<script lang="ts">
	import { browser } from '$app/environment';
	import PartyList from '$components/party/PartyList.svelte';
	import { supabaseClient } from '$lib/db';
	import { page } from '$app/stores';
	import { applyAction, enhance } from '$app/forms';
	import type Party from '$types/party.type';

	let userParties: Party[] | null = [];

	const loadData = async () => {
		if ($page.data.session?.user) {
			const { data } = await supabaseClient
				.rpc('get_user_parties', {
					return_limit: 10,
					user_id: $page.data.session.user.id
				})
				.select('room_uuid, name');
			userParties = data as Party[];
		}
	};

	$: if (browser && $page.data.session) {
		loadData();
	}

	let awaitingRequest = false;
	let bInputParty = '';
	let idPartyName = 'partyName';
</script>

<head>
	<title>{import.meta.env.VITE_PUBLIC_APP_NAME}</title>
</head>

<h1
	class="text-center text-3xl text-base-content font-extrabold leading-8 tracking-tight sm:text-4xl mb-4"
>
	{import.meta.env.VITE_PUBLIC_APP_NAME}
</h1>

<!-- If the user is authenticated -->
{#if $page.data.session}
	<!-- If we found parties AND there wasn't any -->
	{#if userParties !== null}
		<div class="px-4 py-5 sm:px-6 border-b w-full flex flex-row items-center">
			<div class="grow">
				<h3 class="text-lg leading-6 font-medium text-base-content">
					Welcome {$page.data.session?.user?.user_metadata.full_name}
				</h3>
				<p class="mt-1 max-w-2xl text-sm text-base-content">Select a party, or create a new one!</p>
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
	<p class="mt-3 text-lg text-base-content">
		Welcome to {import.meta.env.VITE_PUBLIC_APP_NAME}! Please sign in to get started.
	</p>
{/if}

<input type="checkbox" id="modal-create-party" class="modal-toggle" />
<div class="modal modal-middle">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Create a Party!</h3>
		<div class="py-4">
			<form
				method="post"
				action="?/create_party"
				use:enhance={() => {
					// `form` is the `<form>` element
					// `data` is its `FormData` object
					// `action` is the URL to which the form is posted
					// `cancel()` will prevent the submission
					awaitingRequest = true;

					return async ({ result }) => {
						//  Called when the server returns a result from 'create_party' endpoint
						if (result.type === 'error') {
							if (result.error.message === 'Missing party name') {
								//  If the error is that the party name is missing, focus the input
								document.getElementById(idPartyName)?.focus();
							}
							await applyAction(result);
						} else if (result.type === 'success') {
							//  If the request was successful, get the data and update the list
							if (result.data) {
								let party = {
									name: result.data.name,
									room_uuid: result.data.room_uuid
								};
								if (userParties === null) userParties = [party];
								else {
									userParties = [
										{
											name: result.data.name,
											room_uuid: result.data.room_uuid
										},
										...userParties
									];
								}
							}

							// Finally, close the modal to show the new party
							document.getElementById('modal-close')?.click();
						}

						// We're done waiting for the response.. let the ui update to reflect this
						awaitingRequest = false;
					};
				}}
			>
				<label for={idPartyName}>Enter your party name:</label>
				<input
					bind:value={bInputParty}
					disabled={awaitingRequest}
					type="text"
					id={idPartyName}
					name={idPartyName}
					class="input input-bordered w-full my-1"
					placeholder="Josh's Big Birthday Bash!"
				/>
				<div class="modal-action">
					<label for="modal-create-party" id="modal-close" class="btn">Close</label>
					{#if awaitingRequest}
						<button class="btn btn-primary btn-loading" disabled>Creating Party...</button>
					{:else}
						<button type="submit" class="btn btn-primary" disabled={bInputParty.length <= 0}>
							Create Party
						</button>
					{/if}
				</div>
			</form>
		</div>
	</div>
</div>
