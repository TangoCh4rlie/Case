<script lang="ts">
	import Week from '$lib/components/Week.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div>
	<h1>Profile</h1>
	<Week {data} />
</div>


