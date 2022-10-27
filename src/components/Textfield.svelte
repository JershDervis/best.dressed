<script lang="ts">
	export let idName: string;
	export let label: string;
	export let placeholder: string;

	export let value: string = '';

	export let disabled: boolean = false;
</script>

<label for={idName}>{label}</label>
<input
	bind:value
	{disabled}
	type="text"
	name={idName}
	class="input input-bordered w-full max-w-xs"
	{placeholder}
/>
