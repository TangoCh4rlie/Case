<script lang="ts">
	import type { PageData } from '../../routes/profile/$types';
	import ColorPicker from './ColorPicker.svelte';
	import { Color } from '$lib/types/case';

	export let newdata: PageData;
	$: cases = newdata.cases ? newdata.cases : [];
	
	// const emptyCases: string[] = [];
	// const lengthCases = newdata.cases ? newdata.cases.length : 0;

	// //remplir les cases avec des cases vide
	// while (lengthCases + emptyCases.length < 7) {
	// 	emptyCases.push('emptyCase');
	// }

	const today = new Date().getDay() - 1;
	let currentDay = today;

</script>

<div>
	{currentDay}
	<div class="flex justify-center m-6">
		<div class="grid grid-cols-7 gap-10">
			{#each cases as info}
				{#if info.id === '' }
					{#if new Date(info.date).getTime() <= new Date().getTime()}
						<button class="case {currentDay === cases.indexOf(info) ? 'active' : ''} {info.color === 'default' ? 'dotted' : ''}"
							id="case-{info.id}"
							style="background-color: #{Color[info.color]}"
							on:click={() => {
								currentDay = cases.indexOf(info);
							}}
						>
							{info.description}
						</button>
					{:else}
						<button class="case {currentDay === cases.indexOf(info) ? 'active' : ''}"
							id="case-{info.id}"
							style="background-color: #{Color[info.color]}"
							on:click={() => {
								currentDay = cases.indexOf(info);
							}}
						>
							{info.description}
						</button>
					{/if}		
				{:else}
					<button
						class="case {currentDay === cases.indexOf(info) ? 'active' : ''} {info.color === 'default' ? 'dotted' : ''}"
						id="case-{info.id}"
						style="background-color: #{Color[info.color]}"
						on:click={() => {
							currentDay = cases.indexOf(info);
						}}
					>
						{info.description}
					</button>
				{/if}
			{/each}
		</div>
	</div>
	<div class="flex flex-rows justify-center">
		<button
			on:click={() => {
				currentDay === 0 ? (currentDay = 6) : currentDay--;
			}}>left</button
		>
		<div class="flex flex-col border">
			<div class="flex flex-row ">
				<!-- {#if newdata.cases}
					<div>Journée du {newdata.cases[currentDay].date}</div>
				{/if} -->
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
				currentDay === 6 ? (currentDay = 0) : currentDay++;
			}}>right</button
		>
	</div>
</div>

<style>
	.case {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 80px;
		height: 80px;
		border-radius: 20px;
		transition: all 0.3s ease;
	}

	.case.dotted {
		border: 2px dashed #9b9b9b;
	}
  
	.case.active {
	  	transform: scale(1.25);
	}
  </style>
