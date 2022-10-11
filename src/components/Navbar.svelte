<script lang="ts">
	import type { User } from '@supabase/supabase-js';
	import { Transition } from '@rgossiaux/svelte-headlessui';
	import { page } from '$app/stores';

	export let user: User | undefined;
	export let signOut: () => void;

	let isOpen = false;
	let isProfileOpen = false;

	//TODO: Fix logic for displaying menu items authed vs guest
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

<nav class="bg-gray-800">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			<div class="flex items-center">
				<div class="flex-shrink-0">
					<a href="/">
						<img class="h-8 w-8" src="/party.png" alt={import.meta.env.VITE_PUBLIC_APP_NAME} />
					</a>
				</div>
				<div class="hidden md:block">
					<div class="ml-10 flex items-baseline space-x-4">
						{#each navItems as item}
							<a
								href={item.href}
								class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium 
                  {$page.url.pathname === item.href ? 'hover:bg-gray-700 text-white' : ''}"
							>
								{item.name}
							</a>
						{/each}
					</div>
				</div>
			</div>
			<div class="-mr-2 flex md:hidden">
				<button
					on:click={() => (isOpen = !isOpen)}
					type="button"
					class="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
					aria-controls="mobile-menu"
					aria-expanded="false"
				>
					<span class="sr-only">Open main menu</span>
					{#if !isOpen}
						<svg
							class="block h-6 w-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					{:else}
						<svg
							class="block h-6 w-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path d="M6 18L18 6M6 6l12 12" />
						</svg>
					{/if}
				</button>
			</div>
			<div class="hidden md:block">
				<div class="ml-4 flex items-center md:ml-6">
					<div class="ml-3 relative">
						<div class="relative inline-block text-left">
							<button
								class="flex items-center justify-center w-full rounded-md px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 {isProfileOpen
									? 'bg-gray-50 dark:bg-gray-500'
									: ''}"
								on:click={() => (isProfileOpen = !isProfileOpen)}
							>
								<svg
									width="20"
									fill="currentColor"
									height="20"
									class="text-gray-300 {user ? 'mr-4' : ''}"
									viewBox="0 0 1792 1792"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M1523 1339q-22-155-87.5-257.5t-184.5-118.5q-67 74-159.5 115.5t-195.5 41.5-195.5-41.5-159.5-115.5q-119 16-184.5 118.5t-87.5 257.5q106 150 271 237.5t356 87.5 356-87.5 271-237.5zm-243-699q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm512 256q0 182-71 347.5t-190.5 286-285.5 191.5-349 71q-182 0-348-71t-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"
									/>
								</svg>
								{#if user}
									{user?.user_metadata.full_name !== undefined
										? user?.user_metadata.full_name
										: user?.email}
								{/if}
							</button>
							{#if isProfileOpen}
								<div
									class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5"
								>
									<div
										class="py-1 "
										role="menu"
										aria-orientation="vertical"
										aria-labelledby="options-menu"
									>
										{#each profileItems as item}
											{#if (!item.authRequired && !user) || (item.authRequired && user)}
												{#if typeof item.href === 'string'}
													<a
														href={item.href}
														class="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
														role="menuitem"
													>
														<span class="flex flex-col">
															<span> {item.name} </span>
														</span>
													</a>
												{:else if typeof item.href === 'function'}
													<a
														on:click={item.href}
														href="/auth"
														class="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
														role="menuitem"
													>
														<span class="flex flex-col">
															<span> {item.name} </span>
														</span>
													</a>
												{/if}
											{/if}
										{/each}
									</div>
								</div>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
		<Transition
			show={isOpen}
			enter="transition ease-out duration-100 transform"
			enterFrom="opacity-0 scale-95"
			enterTo="opacity-100 scale-100"
			leave="transition ease-in duration-75 transform"
			leaveFrom="opacity-100 scale-100"
			leaveTo="opacity-0 scale-95"
		>
			<div class="md:hidden" id="mobile-menu">
				<div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
					{#each navItems as item}
						<a
							href={item.href}
							class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium 
            {$page.url.pathname === item.href ? 'hover:bg-gray-700 text-white' : ''}"
						>
							{item.name}
						</a>
					{/each}
					<div class="border-t-2">
						{#each profileItems as item}
							{#if (!item.authRequired && !user) || (item.authRequired && user)}
								{#if typeof item.href === 'string'}
									<a
										href={item.href}
										class="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
										role="menuitem"
									>
										<span class="flex flex-col">
											<span> {item.name} </span>
										</span>
									</a>
								{:else if typeof item.href === 'function'}
									<a
										on:click={item.href}
										href="/auth"
										class="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
										role="menuitem"
									>
										<span class="flex flex-col">
											<span> {item.name} </span>
										</span>
									</a>
								{/if}
							{/if}
						{/each}
					</div>
				</div>
			</div>
		</Transition>
	</div>
</nav>
