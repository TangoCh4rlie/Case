<script lang="ts">
	import { Popover, Button } from 'flowbite-svelte';
</script>

<div>
	<Button id="b1">Default popover</Button>
	<Popover id="popover" title="Popover title" triggeredBy="#b1"  defaultClass="popover"
		>And here's some amazing content. It's very engaging. Right?</Popover
	>
	<h1>Hello Home Page</h1>
</div>

<style>
	.popover {
		width: 16rem; /* w-64 */
		font-size: 0.875rem; /* text-sm */
		font-weight: 300;
        background-color: blanchedalmond;
	}
</style>
