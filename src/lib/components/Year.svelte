<script lang="ts">
	import { Color } from '$lib/types/case';

	export let color;

	// @ts-ignores
	const tableOfData: {date: Date, color: Color}[] = color.cases;

	const cases: any[] = [];
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
		const joursParMois = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // Nombre de jours dans chaque mois
		const position = joursParMois.slice(0, mois - 1).reduce((total, jours) => total + jours, 0) + jour - 1; // Calcul de la position dans l'année
		return position;
	}
	

	let i = 0;
	while (i <= 364) {
		cases.push({ id: i++, color: 'F0F0F0' });
	}

	tableOfData.forEach(element => {
		cases[positionJourAnnee(element.date.getMonth() + 1, element.date.getDate() + 1)].color = element.color;
	});
</script>

<div class="flex flex-col">
	<div class="graph">
		<ul class="months">
			{#each mois as m}
				<li>{m}</li>
			{/each}
		</ul>
		<ul class="days">
			<li>Dim</li>
			<li>Lun</li>
			<li>Mar</li>
			<li>Mer</li>
			<li>Jeu</li>
			<li>Ven</li>
			<li>Sam</li>
		</ul>
		<ul class="squares">
			{#each cases as i}
				<li style="background-color: #{Color[i.color]}"></li>
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

	.days li:nth-child(odd) {
		visibility: hidden;
	}

	.squares li {
		background-color: #ebedf0;
		border-radius: 5px;
	}
</style>
