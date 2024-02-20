<script lang="ts">
	import type { PageData } from '../../routes/profile/$types';
	import { Popover } from 'flowbite-svelte';
	import ColorPicker from './ColorPicker.svelte';
	import { Color, type Case } from '$lib/types/case';

	export let data: PageData;
	const cases: Case[] = data.cases;

	const emptyCases: string[] = [];
	const lenghtCases = cases.length;

	while ( lenghtCases + emptyCases.length < 7) {
		emptyCases.push("emptyCase");
	}
</script>

<div>
	<div class="flex justify-center border">
		<div class="grid grid-cols-7 gap-10 border">
			{#each cases as info}
				<div
					class="flex justify-center items-center w-20 h-20 rounded-2xl"
					id="case-{info.id}"
					style="background-color: #{info.color}"
				>
					{cases.indexOf(info)}
					{info.description}
				</div>
				<Popover class="w-64 text-sm font-light bg-popup/75" triggeredBy="#case-{info.id}">
					<div class="flex flex-row">
						<p>{info.date.toLocaleDateString()}</p>
						<ColorPicker bind:color={info.color} />
					</div>
					<input
						type="text"
						class="w-full p-2 bg-transparent"
						placeholder="Ajouter une description"
						bind:value={info.description}
					/>
					<input type="text" placeholder="Ajouter un lieu" bind:value={info.place} />
				</Popover>
			{/each}
			{#each emptyCases as e}
				<div class="flex justify-center items-center w-20 h-20 rounded-2xl" style="background-color: #F0F0F0"></div>
			{/each}
		</div>
	</div>
</div>
