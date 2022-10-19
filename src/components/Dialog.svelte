<script lang="ts">
	import { enhance } from '$app/forms';
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		DialogDescription,
		Transition,
		TransitionChild
	} from '@rgossiaux/svelte-headlessui';

	export let title: string;
	export let description: string | undefined = undefined;
	export let submitText: string = 'Submit';
	export let submitAction: string;
	export let icon: ConstructorOfATypedSvelteComponent | undefined = undefined;
	export let theme: string = 'red';

	// Controls the enabled state of the submit button
	export let submitable: boolean = true;

	let isOpen = false;

	export const openModal = () => {
		isOpen = true;
	};

	/**
	 * Handle closing if the form has modified content
	 */
	const closeModal = () => {
		isOpen = false;
	};

	const submit = () => {
		if (!submitable) return;
		isOpen = false;
	};
</script>

<!-- Need to somehow allow this dialog to submit a child form  -->
<!-- Or use the same form and have some form of callback function to handle -->

<Transition
	show={isOpen}
	enter="transition duration-100 ease-out"
	enterFrom="transform scale-95 opacity-0"
	enterTo="transform scale-100 opacity-100"
	leave="transition duration-75 ease-out"
	leaveFrom="transform scale-100 opacity-100"
	leaveTo="transform scale-95 opacity-0"
>
	<Dialog open={isOpen} on:close={closeModal}>
		<div class="fixed z-10 inset-0 overflow-y-auto bg-gray-900 bg-opacity-50 content-center">
			<div
				class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
			>
				<TransitionChild
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-75"
					leave="ease-in duration-200"
					leaveFrom="opacity-75"
					leaveTo="opacity-0"
					entered="opacity-75"
				>
					<DialogOverlay class="fixed inset-0 bg-gray-900 transition-opacity" />
				</TransitionChild>

				<TransitionChild
					enter="ease-out transform duration-300"
					enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					enterTo="opacity-100 translate-y-0 sm:scale-100"
					leave="ease-in transform duration-200"
					leaveFrom="opacity-100 translate-y-0 sm:scale-100"
					leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
				>
					<!-- This element is to trick the browser into centering the modal contents. -->
					<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
						&#8203;
					</span>
					<div
						class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
					>
						<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
							<form method="post" use:enhance action={submitAction}>
								<div class="sm:flex sm:items-start">
									<!-- TODO: Fix the dialog colouring -->
									{#if icon}
										<div
											class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-{theme}-100 sm:mx-0 sm:h-10 sm:w-10"
										>
											<svelte:component this={icon} class="h-6 w-6 text-{theme}-600" />
										</div>
									{/if}
									<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
										<DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
											{title}
										</DialogTitle>
										{#if description}
											<DialogDescription>
												{description}
											</DialogDescription>
										{/if}
										<div class="mt-2">
											<slot />
										</div>
									</div>
								</div>
								<div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse mt-2">
									<button
										type="submit"
										on:click={submit}
										class={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${
											submitable
												? `bg-${theme}-600 hover:bg-${theme}-700`
												: `bg-gray-300 cursor-not-allowed`
										} text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm`}
									>
										{submitText}
									</button>
									<button
										type="button"
										on:click={closeModal}
										class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 sm:mt-0 sm:w-auto sm:text-sm"
									>
										Cancel
									</button>
								</div>
							</form>
						</div>
					</div>
				</TransitionChild>
			</div>
		</div>
	</Dialog>
</Transition>
