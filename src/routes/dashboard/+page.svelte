<script lang="ts">
	import Week from '$lib/components/Week.svelte';
	import Year from '$lib/components/Year.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { storeDataInBd } from '$lib/utils/controlerWeekInBd';
	import moment from 'moment';
	import { remplirDatesManquantesSemainePrecedente } from '$lib/utils/manipulateWeek';

	export let data: PageData;
	$: newdata = data;
	
	let selectedDate = new Date();

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
    	const monday = moment(date).startOf('isoWeek');
		const sunday = moment(date).endOf('isoWeek');
		if (newdata) {
			newdata.week = (newdata.cases ?? []).filter(data => data.date >= monday.toDate() && data.date <= sunday.toDate());
        	newdata.week = remplirDatesManquantesSemainePrecedente(newdata.week, moment(date).toDate());
		}
	};


</script>

<div>
	<Week {newdata} {selectedDate} />
	<button on:click={() => storeDataInBd(newdata)}>Store newdata</button>
	<div class="flex justify-center">
		<Year on:storeData={async ({ detail: date }) => {
			await changeWeek(date)
			selectedDate = date
		}} cases={newdata.cases} />
	</div>
		
</div>
