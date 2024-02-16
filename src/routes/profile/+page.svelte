<script lang="ts">
	import Week from '$lib/components/Week.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div>
	<h1>Profile</h1>
	<main class="main">
		<div class="week">
			{#each data.user as day (day.cases)}
				{#each day.cases as info}
					<div class="case" style="background-color: #{info.color};">{info.description}</div>
				{/each}
			{/each}
		</div>
	</main>
</div>

<style>
	/* display my week as grid with each case ahev the same place and center my main */
	/* make my case square with the same width */
	.case {
		width: 100px;
		height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-style: solid;
		border-radius: 20;
		border-color: blue;
		margin: 30px;
	}
	.week {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		justify-content: center;
		border-style: solid;
		border-radius: 20;
		border-color: green;
	}
	.main {
		display: flex;
		justify-content: center;
		border-style: solid;
		border-radius: 20;
		border-color: red;
	}
</style>
