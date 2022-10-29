<script lang="ts">
	export let items: {
		title: string;
		href: string;
	}[];
</script>

<div class="overflow-x-auto">
	<table class="table w-full">
		<!-- head -->
		<thead>
			<tr>
				<th>Name</th>
				<th>Entries Allowed At</th>
				<th>Voting Allowed At</th>
			</tr>
		</thead>
		<tbody>
			{#each items as item}
				<tr on:click={() => (window.location.href = item.href)} class="hover cursor-pointer">
					<td>{item.title}</td>
					<td>6pm</td>
					<td>8pm</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
