<script lang="ts">
    import { Dropdown, DropdownItem } from 'flowbite-svelte';
	export let color;
    import { Color } from '../types/case';

    const colorName = Object.keys(Color);
	const colorValues = Object.values(Color);
	
</script>

<div>
	<button>drop Down</button>
	<Dropdown class='bg-popup'>
		{#each colorName as colorOption}
			<DropdownItem on:click={() => (color = colorValues[colorName.indexOf(colorOption)])}>{colorOption}</DropdownItem>
		{/each}
	</Dropdown>
</div>
