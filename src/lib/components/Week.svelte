<script lang="ts">
	import type { PageData } from '../../routes/profile/$types';
	import ColorPicker from './ColorPicker.svelte';
	import { Color, type Case } from '$lib/types/case';

	export let data: PageData;
	// @ts-ignore
	const cases: Case[] = data.cases;

	const emptyCases: string[] = [];
	const lenghtCases = cases.length;

	//remplir les cases avec des cases vide
	while (lenghtCases + emptyCases.length < 7) {
		emptyCases.push('emptyCase');
	}

	const today = new Date().getDay() - 1;
	let currentDay = today;

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
			{/each}
			{#each emptyCases as e}
				<div
					class="flex justify-center items-center w-20 h-20 rounded-2xl"
					style="background-color: #F0F0F0"
				></div>
			{/each}
		</div>
	</div>
	<div class="flex flex-rows justify-center">
		<button
			on:click={() => {
				currentDay === 0 ? (currentDay = today) : currentDay--;
			}}>left</button
		>
		<div class="flex flex-col border">
			<div class="flex flex-row ">
				<div>Journée du {cases[currentDay].date.toLocaleDateString()}</div>
				<ColorPicker bind:color={cases[currentDay].color} />
			</div>
			<input
				type="text"
				class="w-full p-2 bg-transparent"
				placeholder="Ajouter une description"
				bind:value={cases[currentDay].description}
			/>
		</div>
		<button
			on:click={() => {
				currentDay === today ? (currentDay = 0) : currentDay++;
			}}>right</button
		>
	</div>
</div>
