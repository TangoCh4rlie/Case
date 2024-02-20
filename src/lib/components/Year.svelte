<script lang="ts">
	const cases: number[] = [];

	let i = 0;
	while (i <= 363) {
		cases.push(i++);
	}
</script>

<div class="flex justify-center">
	<div class="year">
		{#each cases as i}
			<div
				class="flex justify-center items-center w-5 h-5 rounded-md"
				id="i"
				style="background-color: #FF9B9B"
			></div>
		{/each}
	</div>
</div>

<style>
	.year {
		display: grid;
        grid-template-columns: repeat(52, 24px);
		grid-template-rows: repeat(7, 24px);
        margin: 15rem;
	}
</style>
