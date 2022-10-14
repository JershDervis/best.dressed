<script lang="ts">
	import '../app.css';
	import { supabaseClient } from '$lib/db';
	import { startSupabaseSessionSync } from '@supabase/auth-helpers-sveltekit';
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	import { redirect } from '@sveltejs/kit';
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

<main class="h-screen bg-gray-900 lg:overflow-x-hidden">
	<Navbar user={$page.data.session.user} signOut={signout} />

	<div class="container mx-auto mt-4 rounded-md text-gray-400 p-4 max-w-2xl dark:bg-slate-800">
		<slot />
	</div>
</main>
