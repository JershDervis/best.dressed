<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<head>
	<title>{import.meta.env.VITE_PUBLIC_APP_NAME} | {data.party.name}</title>
</head>

<h1>{data.party.name}</h1>

{#if data.session?.user}
	<p>
		Hi {data.session.user.email}! You {data.session.user.id === data.party.owner
			? 'own this'
			: 'are a guest of this'} party.
	</p>
{/if}
