<script lang="ts">
	import Week from '$lib/components/Week.svelte';
	import Life from '$lib/components/Year.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { getWeek, storeDataInBd } from '$lib/utils/controlerWeekInBd';

	export let data: PageData;

	onMount(() => {
		window.addEventListener('beforeunload', () => {
			storeDataInBd(data);
		});
		// window.addEventListener('unload', () => {
		// 	storeDataInBd(data, window.location.origin);
		// });
		// window.addEventListener('')

		return () => {
			window.removeEventListener('beforeunload', () => {
				storeDataInBd(data);
			});
			// window.addEventListener('unload', () => {
			// 	storeDataInBd(data, window.location.origin);
			// });
		};
	});

	const changeWeek = (date: Date) => {
		storeDataInBd(data);
		getWeek(date);
	};


</script>

<div>
	<Week {data} />
	<button on:click={() => storeDataInBd(data)}>Store data</button>
	{#await data.color}
		<p>Loading</p>
	{:then color}
		<div class="flex justify-center">
			<Life on:storeData={({ detail: date }) => changeWeek(date)} {color} />
		</div>
	{/await}
</div>
