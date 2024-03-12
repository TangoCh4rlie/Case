<script lang="ts">
    import { Dropdown, DropdownItem } from 'flowbite-svelte';
	export let color;
    import { Color } from '../types/case';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

    const colorName = Object.keys(Color);
	colorName.shift()
	
	const triggerEventStoreData = (color: string) => {
		dispatch('changeColor', color);
	};
</script>

<div>
	<button>drop Down</button>
	<Dropdown class='bg-popup'>
		{#each colorName as colorOption}
			<DropdownItem on:click={() => {
					color = colorName[colorName.indexOf(colorOption)];
					triggerEventStoreData(color);
				}}>
				{colorOption}
			</DropdownItem>
		{/each}
	</Dropdown>
</div>
