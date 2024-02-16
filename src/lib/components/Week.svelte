<script lang="ts">
	import type { PageData } from "../../routes/profile/$types";
	import { Popover } from 'flowbite-svelte';

    export let data: PageData;
</script>

<div>
	<div class="main">
		<div class="week">
			{#each data.user as day (day.cases)}
				{#each day.cases as info}
					<div class="case" id="case-{info.id}" style="background-color: #{info.color};">{info.description}</div>
					<Popover class="w-64 text-sm font-light " title="Popover title" triggeredBy="#case-{info.id}" >And here's some amazing content. It's very engaging. Right?</Popover>
				{/each}
			{/each}
		</div>
	</div>
	
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
