<script lang="ts">
	import Week from '$lib/components/Week.svelte';
	import Year from '$lib/components/Year.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { getWeek, storeDataInBd } from '$lib/utils/controlerWeekInBd';

	export let data: PageData;
	$: newdata = data;
	let selectedDate = new Date();

	console.log({data});
	console.log(data.user?.name);
	
	
	

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
		// storeDataInBd(newdata);
		newdata.cases = await getWeek(date, data.user?.name);
		
	};


</script>

<div>
	<Week {newdata} {selectedDate} />
	<button on:click={() => storeDataInBd(newdata)}>Store newdata</button>
	{#await newdata.color}
		<p>Loading</p>
	{:then color}
		<div class="flex justify-center">
			<Year on:storeData={async ({ detail: date }) => {
				await changeWeek(date)
				selectedDate = date
			}} {color} />
		</div>
	{/await}
</div>
