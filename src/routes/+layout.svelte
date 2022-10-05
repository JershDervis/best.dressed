<script lang="ts">
	import '../app.css';
	import { supabaseClient } from '$lib/db';
	import { startSupabaseSessionSync } from '@supabase/auth-helpers-sveltekit';
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	import Navbar from '$components/Navbar.svelte';
	import { redirect } from '@sveltejs/kit';

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

<Navbar user={$page.data.session.user} signOut={signout} />

<div class="container mx-auto mt-4">
	<slot />
</div>
