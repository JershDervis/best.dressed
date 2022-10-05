<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ user } = data.session);
</script>

<h1>{data.party.name}</h1>

{#if user}
	<p>
		Hi {user.email}! You {user.id === data.party.owner ? 'own this' : 'are a guest of this'} party.
	</p>
{/if}
