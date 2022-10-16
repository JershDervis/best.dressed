<script lang="ts">
	export let idName: string;
	export let label: string;
	export let placeholder: string;

	export let value: string = '';
</script>

<label for={idName}>{label}</label>
<input
	bind:value
	type="text"
	name={idName}
	class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full my-1 py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
	{placeholder}
/>
