<script lang="ts">
	import '../app.css';
	import { supabaseClient } from '$lib/db';
	import { page } from '$app/stores';
	import { redirect } from '@sveltejs/kit';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import Navbar from '$components/Navbar.svelte';

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});

	function signout() {
		supabaseClient.auth.signOut();
		redirect(307, '/auth');
	}
</script>

<main class="h-screen bg-gray-900 lg:overflow-x-hidden">
	<Navbar user={$page.data.session?.user} signOut={signout} />

	<div class="container mx-auto mt-4 rounded-md text-gray-400 p-4 max-w-2xl dark:bg-slate-800">
		<slot />
	</div>
</main>
