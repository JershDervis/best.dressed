<script lang="ts">
	import type { User } from '@supabase/supabase-js';
	import { UserIcon } from '@rgossiaux/svelte-heroicons/solid';

	export let user: User | undefined | null;
	export let signOut: () => void;

	const navItems = [
		{
			name: 'Home',
			href: '/'
		}
	];

	const profileItems = [
		{
			name: 'Login',
			href: '/auth',
			authRequired: false
		},
		{
			name: 'Profile',
			href: '/profile',
			authRequired: true
		},
		{
			name: 'Sign Out',
			href: signOut,
			authRequired: true
		}
	];
</script>

<div class="drawer">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col">
		<!-- Navbar -->
		<div class="w-full navbar bg-base-300">
			<div class="flex-none lg:hidden">
				<label for="my-drawer-3" class="btn btn-square btn-ghost">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block w-6 h-6 stroke-current"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/></svg
					>
				</label>
			</div>
			<div class="flex-1 px-2 mx-2">{import.meta.env.VITE_PUBLIC_APP_NAME}</div>
			<div class="flex-none hidden lg:block">
				<ul class="menu menu-horizontal mx-2">
					<!-- Navbar menu content here -->
					{#each navItems as item}
						<li><a href={item.href}>{item.name}</a></li>
					{/each}
				</ul>
			</div>
			<div class="dropdown dropdown-end">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label tabindex="0" class="btn btn-ghost btn-circle avatar">
					<div class="w-8 rounded-full">
						<UserIcon />
					</div>
				</label>
				<ul
					tabindex="0"
					class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-52"
				>
					{#each profileItems as item}
						{#if (!item.authRequired && !user) || (item.authRequired && user)}
							{#if typeof item.href === 'string'}
								<li><a href={item.href}>{item.name}</a></li>
							{:else if typeof item.href === 'function'}
								<!-- svelte-ignore a11y-missing-attribute -->
								<li><a on:click={item.href}>{item.name}</a></li>
							{/if}
						{/if}
					{/each}
				</ul>
			</div>
		</div>
		<!-- Page content here -->
		<slot />
	</div>
	<div class="drawer-side">
		<label for="my-drawer-3" class="drawer-overlay" />
		<ul class="menu p-4 overflow-y-auto w-80 bg-base-300">
			<!-- Sidebar content here -->
			{#each navItems as item}
				<li><a href={item.href}>{item.name}</a></li>
			{/each}
		</ul>
	</div>
</div>
