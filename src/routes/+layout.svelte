<script lang="ts">
	import '../app.css';
	import { supabaseClient } from '$lib/db';
	import { startSupabaseSessionSync } from '@supabase/auth-helpers-sveltekit';
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	import { redirect } from '@sveltejs/kit';
	import { Modals, closeModal } from 'svelte-modals';
	import Navbar from '$components/Navbar.svelte';

	// this sets up automatic token refreshing
	startSupabaseSessionSync({
		page,
		handleRefresh: () => invalidateAll()
	});

	function signout() {
		supabaseClient.auth.signOut();
		redirect(307, '/auth');
	}
</script>

<Modals>
	<div
		slot="backdrop"
		class="fixed bg-gray-900 bg-opacity-50 top-0 right-0 left-0 bottom-0"
		on:click={closeModal}
	/>
</Modals>

<main class="h-screen bg-gray-900 lg:overflow-x-hidden">
	<Navbar user={$page.data.session.user} signOut={signout} />

	<div class="container mx-auto mt-4 rounded-md text-gray-400 p-4 max-w-2xl dark:bg-slate-800">
		<slot />
	</div>
</main>
