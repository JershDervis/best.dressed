<script lang="ts">
	import Card from './Card.svelte';

	export let items: {
		title: string;
		href: string;
	}[];
</script>

<ul class="flex flex-col divide divide-y w-full">
	{#each items as item}
		<li class="flex flex-row bg-base-300">
			<Card title={item.title} href={item.href} />
		</li>
	{/each}
</ul>
