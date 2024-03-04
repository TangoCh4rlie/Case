<script lang="ts">
	import Week from '$lib/components/Week.svelte';
	import Life from '$lib/components/Year.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { getWeek, storeDataInBd } from '$lib/utils/controlerWeekInBd';

	export let data: PageData;
	$: newdata = data;
	

	// onMount(() => {
	// 	window.addEventListener('beforeunload', () => {
	// 		storeDataInBd(newdata);
	// 	});
	// 	// window.addEventListener('unload', () => {
	// 	// 	storeDataInBd(newdata, window.location.origin);
	// 	// });
	// 	// window.addEventListener('')

	// 	return () => {
	// 		window.removeEventListener('beforeunload', () => {
	// 			storeDataInBd(newdata);
	// 		});
	// 		// window.addEventListener('unload', () => {
	// 		// 	storeDataInBd(newdata, window.location.origin);
	// 		// });
	// 	};
	// });

	const changeWeek = async (date: Date) => {
		storeDataInBd(newdata);
		newdata.cases = await getWeek(date);
		console.log(newdata.cases);
		
	};


</script>

<div>
	<Week {newdata} />
	<button on:click={() => storeDataInBd(newdata)}>Store newdata</button>
	{#await newdata.color}
		<p>Loading</p>
	{:then color}
		<div class="flex justify-center">
			<Life on:storeData={({ detail: date }) => changeWeek(date)} {color} />
		</div>
	{/await}
</div>
