<script>
	import { supabaseClient } from '$lib/db';
	import Auth from 'supabase-ui-svelte';
</script>

<!-- TODO: Create my own form -->
<Auth {supabaseClient} socialColors={true} providers={['google']} />
