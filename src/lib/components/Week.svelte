<script lang="ts">
	import { getUser } from '$lib/api/user';
	import { onMount } from 'svelte';

	const loadWeek = getUser('John Doe')

	onMount(() => {
		console.log(loadWeek);
		
	})
</script>

<div>
	<h1>test</h1>
	<p>{loadWeek}</p>
	<!-- {#each weekCases as day}
		<div style="background-color: #ff0000;"></div>
	{/each} -->
</div>
