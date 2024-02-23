<script lang="ts">
	import Week from '$lib/components/Week.svelte';
	import Life from '$lib/components/Year.svelte';
	import { onDestroy, onMount } from 'svelte';
	import type { PageData } from './$types';
	import { storeDataInBd } from '$lib/utils/storeWeekInBd';

	export let data: PageData;

	onMount(() => {
		window.addEventListener('beforeunload', () => {
			storeDataInBd(data);
		});
		// window.addEventListener('unload', () => {
		// 	storeDataInBd(data);
		// });
		// window.addEventListener('')

		return () => {
			window.removeEventListener('beforeunload', () => {
				storeDataInBd(data);
			});
			// window.addEventListener('unload', () => {
			// 	storeDataInBd(data);
			// });
		};
	});
</script>

<div>
	<Week {data} />
	<button on:click={() => storeDataInBd(data)}>Store data</button>
	{#await data.color}
		<p>Loading</p>
	{:then color}
		<div class="flex justify-center">
			<Life {color} />
		</div>
	{/await}
</div>
