<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	// $: ({ user } = data.session);

	const partyUUID = data.party_uuid;
</script>

<div>Test</div>
