<script lang="ts">
	import Week from '$lib/components/Week.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	

	const storeDataInBd = async (data: PageData) => {
		const res = await fetch('http://localhost:5173/api/week', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Headers': 'Accept'
			},
			body: JSON.stringify(data.cases)
		});
		const json = await res.json();
		console.log(json);
	};
</script>

<div>
	<h1>Profile</h1>
	<h1>{data.user?.username}</h1>
	<Week {data} />
	<button on:click={() => storeDataInBd(data)}>Store data</button>
</div>


