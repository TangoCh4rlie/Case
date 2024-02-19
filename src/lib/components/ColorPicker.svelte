<script>
    import { Dropdown, DropdownItem } from 'flowbite-svelte';
	export let color;
    import { Color } from '../types/case';

    const colorOptions = Object.keys(Color).filter((item) => {
		return isNaN(Number(item));
	});
</script>

<div>
	<button>drop Down</button>
	<Dropdown class='bg-popup'>
		{#each colorOptions as colorOption}
			<DropdownItem on:click={() => (color = colorOption)}>{colorOption}</DropdownItem>
		{/each}
	</Dropdown>
</div>
