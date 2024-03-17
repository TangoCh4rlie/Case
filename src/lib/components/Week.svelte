<script lang="ts">
	import ColorPicker from './ColorPicker.svelte';
	import { Color } from '$lib/types/case';
	import type { PageData } from '../../routes/dashboard/$types';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let newdata: PageData;
	export let selectedDate: Date;
	$: cases = newdata.week ? newdata.week : [];
	$: currentDay = selectedDate.getDay() === 0 ? 6 : selectedDate.getDay() - 1;

	const triggerEventStoreData = (date: Date, color: Color) => {
		dispatch('changeColor', { date, color });
	};

	function getColor(colorName: string) {
		if (colorName in Color) {
			return Color[colorName as keyof typeof Color];
		} else {
			return Color.default;
		}
	}
</script>

<div>
	<div class="flex justify-center m-6">
		<div class="grid grid-cols-7 gap-10">
			{#if cases && newdata && newdata.cases}
				{#each cases as info}
					{#if info.id === ''}
						{#if new Date(info.date).getTime() <= new Date().getTime()}
							<button
								class="case {currentDay === cases.indexOf(info) ? 'active' : ''} {info.color ===
								'default'
									? 'dotted'
									: ''}"
								id="case-{info.id}"
								style="background-color: #{getColor(info.color)}"
								on:click={() => {
									currentDay = cases.indexOf(info);
								}}
							>
								{info.description}
							</button>
							<!-- {:else if moment(info.date).format('YYYY MM DD') == moment().format('YYYY MM DD')}
					<button class="case {currentDay === cases.indexOf(info) ? 'active' : ''} today"
						id="case-{info.id}"
						style="background-color: #{Color[info.color]}"
						on:click={() => {
							currentDay = cases.indexOf(info);
						}}
					>
						{info.description}
					</button> -->
						{:else}
							<button
								class="case {currentDay === cases.indexOf(info) ? 'active' : ''}"
								id="case-{info.id}"
								style="background-color: #{getColor(info.color)}"
								on:click={() => {
									currentDay = cases.indexOf(info);
								}}
							>
								{info.description}
							</button>
						{/if}
					{:else}
						<button
							class="case {currentDay === cases.indexOf(info) ? 'active' : ''} {info.color ===
							'default'
								? 'dotted'
								: ''}"
							id="case-{info.id}"
							style="background-color: #{getColor(info.color)}"
							on:click={() => {
								currentDay = cases.indexOf(info);
							}}
						>
							{info.description}
						</button>
					{/if}
				{/each}
			{/if}
		</div>
	</div>
	<div class="flex flex-rows justify-center">
		<button
			on:click={() => {
				currentDay === 0 ? (currentDay = 6) : currentDay--;
			}}>left</button
		>
		<div class="flex flex-col border">
			{#if newdata.cases}
				{#if new Date(newdata.cases[currentDay].date).getTime() >= new Date().getTime()}
					<p>Impossible de mofier ce jour</p>
				{:else}
					<div class="flex flex-row">
						<div>Journée du {new Date(cases[currentDay].date).toLocaleDateString()}</div>
						<ColorPicker
							on:changeColor={async ({ detail: color }) => {
								triggerEventStoreData(cases[currentDay].date, color);
							}}
							bind:color={cases[currentDay].color}
						/>
					</div>
					<input
						type="text"
						class="w-full p-2 bg-transparent"
						placeholder="Ajouter une description"
						bind:value={cases[currentDay].description}
					/>
				{/if}
			{/if}
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
	/* 
	.case.today {
		border: 2px dashed #ff0000
	} */
</style>
