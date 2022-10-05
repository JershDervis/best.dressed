<script>
	import { supabaseClient } from '$lib/db';
	import Auth from 'supabase-ui-svelte';
</script>

<Auth {supabaseClient} providers={['google']} />
