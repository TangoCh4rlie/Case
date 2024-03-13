<script lang="ts">
	import { Color, type Case } from '$lib/types/case';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let cases;

	const tableOfData: Case[] = cases;

	const casesToDisplay: any[] = [];
	const mois: string[] = [
		'Janv',
		'Févr',
		'Mars',
		'Avr',
		'Mai',
		'Juin',
		'Juill',
		'Août',
		'Sept',
		'Oct',
		'Nov',
		'Déc'
	];

	function positionJourAnnee(mois: number, jour: number) {
		let position = 0;
		for (let i = 1; i < mois; i++) {
			position += new Date(2024, i, 0).getDate();
		}
		position += jour - 1;
		return position;
	}

	let i = 0;
	while (i <= 365) {
		casesToDisplay.push({ id: i++, color: Color.default, date: new Date(2024, 0, i) });
	}

	tableOfData.forEach((element) => {
		casesToDisplay[
			positionJourAnnee(element.date.getMonth() + 1, element.date.getDate() + 1) - 1
		].color = element.color;
	});

	const triggerEventStoreData = (date: Date) => {
		dispatch('storeData', date);
	};
</script>

<div class="flex flex-col">
	<div class="graph">
		<ul class="months">
			{#each mois as m}
				<li>{m}</li>
			{/each}
		</ul>
		<ul class="days">
			<li>Lun</li>
			<li>Mar</li>
			<li>Mer</li>
			<li>Jeu</li>
			<li>Ven</li>
			<li>Sam</li>
			<li>Dim</li>
		</ul>
		<ul class="squares">
			{#each casesToDisplay as i}
				<button
					on:click={() => {
						triggerEventStoreData(i.date);
					}}
					class={i.date.toLocaleDateString() === new Date().toLocaleDateString() ? 'today' : ''}
					style="background-color: #{Color[i.color]}"
				></button>
			{/each}
		</ul>
	</div>
</div>

<style>
	:root {
		--square-size: 18px;
		--square-gap: 5px;
		--week-width: calc(var(--square-size) + var(--square-gap));
	}

	.months {
		grid-area: months;
	}
	.days {
		grid-area: days;
	}
	.squares {
		grid-area: squares;
	}

	.graph {
		display: inline-grid;
		grid-template-areas:
			'empty months'
			'days squares';
		grid-template-columns: auto 1fr;
		grid-gap: 10px;
	}

	.months {
		display: grid;
		grid-template-columns:
			calc(var(--week-width) * 4) /* Jan */
			calc(var(--week-width) * 4) /* Feb */
			calc(var(--week-width) * 4) /* Mar */
			calc(var(--week-width) * 5) /* Apr */
			calc(var(--week-width) * 4) /* May */
			calc(var(--week-width) * 4) /* Jun */
			calc(var(--week-width) * 5) /* Jul */
			calc(var(--week-width) * 4) /* Aug */
			calc(var(--week-width) * 4) /* Sep */
			calc(var(--week-width) * 5) /* Oct */
			calc(var(--week-width) * 4) /* Nov */
			calc(var(--week-width) * 5) /* Dec */;
	}

	.days,
	.squares {
		display: grid;
		grid-gap: var(--square-gap);
		grid-template-rows: repeat(7, var(--square-size));
	}

	.squares {
		grid-auto-flow: column;
		grid-auto-columns: var(--square-size);
	}

	.days li:nth-child(even) {
		visibility: hidden;
	}

	.squares button {
		background-color: #ebedf0;
		border-radius: 5px;
	}

	.squares button.today {
		border: 2px dashed #ff0000;
	}
</style>
