<script lang="ts">
	import Card from './Card.svelte';
	import { openModal } from 'svelte-modals';
	import Create from './Create.svelte';

	export let title: string;
	export let subtitle: string;
	export let items: {
		title: string;
		href: string;
	}[];
</script>

<div
	class="container flex flex-col mx-auto w-full items-center justify-center bg-white dark:bg-gray-800 shadow-lg"
>
	<div class="px-4 py-5 sm:px-6 border-b w-full flex flex-row items-center">
		<div class="grow">
			<h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">{title}</h3>
			<p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-200">
				{subtitle}
			</p>
		</div>
		<button
			on:click={() => openModal(Create, { title: 'Create Party', message: 'Create a new party' })}
			class="text-center flex-col justify-end flex items-center rounded-md px-4 py-2 text-sm font-medium bg-blue-600 text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-blue-500"
		>
			New Party
		</button>
	</div>
	<ul class="flex flex-col divide divide-y w-full">
		{#each items as item}
			<li class="flex flex-row dark:hover:bg-gray-700">
				<Card title={item.title} href={item.href} />
			</li>
		{/each}
	</ul>
</div>
