<script lang="ts">
	import { closeModal, onBeforeClose } from 'svelte-modals';

	export let isOpen: boolean;
	export let title: string;
	export let message: string;

	let dirty = false;

	onBeforeClose(() => {
		if (dirty) {
			alert('You have unsaved changes!');
			return false; // prevents close
		}
	});

	//  Store the create button so we can change to loading animation
	let createButton;

	const createParty = async () => {
		// Async logic here
		closeModal();
	};
</script>

{#if isOpen}
	<div role="dialog" class="fixed flex justify-center items-center pointer-events-none">
		<div class="contents">
			<h2>{title}</h2>
			<p>{message}</p>
			<form action="post">
				<input type="text" name="name" placeholder="Party Name" />
			</form>
			<div class="actions">
				<button bind:this={createButton} on:click={createParty}>Create</button>
				<button on:click={closeModal}>Cancel</button>
			</div>
		</div>
	</div>
{/if}
