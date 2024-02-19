<script lang="ts">
	import type { PageData } from '../../routes/profile/$types';
	import { Popover } from 'flowbite-svelte';
	import ColorPicker from './ColorPicker.svelte';
	import { Color } from '$lib/types/case';

	export let data: PageData;
	console.log(data.user[0].cases);
	while (data.user[0].cases.length < 7) {
		data.user[0].cases.push({ id: "", date: new Date(), description: "", color: Color.gray, place: null, photo: [], people: [], tag: [], userId: "f9631f48-8f9d-438d-8b1a-025cf05d1272"})
	}
</script>

<div>
	<div class="flex justify-center border">
		<div class="grid grid-cols-7 gap-10 border">
			{#each data.user as day (day.cases)}
				{#each day.cases as info}
					<div
						class="flex justify-center items-center w-20 h-20 rounded-2xl"
						id="case-{info.id}"
						style="background-color: #{info.color};"
					>
						{data.user[0].cases.indexOf(info)}
						{info.description}
						{info.color }
					</div>
					<Popover class="w-64 text-sm font-light bg-popup/75" triggeredBy="#case-{info.id}">
						<div class="flex flex-row">
							<p>{info.date.toLocaleDateString()}</p>
							<ColorPicker bind:color={info.color} />
						</div>
						<input type="text" class="w-full p-2 bg-transparent" placeholder="Ajouter une description" bind:value={info.description} />
						<input type="text" placeholder="Ajouter un lieu" bind:value={info.place} />
					</Popover>
				{/each}
			{/each}
		</div>
	</div>
</div>
