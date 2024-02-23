<script lang="ts">
    import { Dropdown, DropdownItem } from 'flowbite-svelte';
	export let color;
    import { Color } from '../types/case';

    const colorName = Object.keys(Color);
	colorName.shift()
	
</script>

<div>
	<button>drop Down</button>
	<Dropdown class='bg-popup'>
		{#each colorName as colorOption}
			<DropdownItem on:click={() => (color = colorName[colorName.indexOf(colorOption)])}>{colorOption}</DropdownItem>
		{/each}
	</Dropdown>
</div>
