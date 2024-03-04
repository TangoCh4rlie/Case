<script lang="ts">
	import Test from "$lib/components/Test.svelte";
	let data = 'Hello World';
</script>

<div >
	<h1>Hello Home Page</h1>
	<a href="/profile">Profile</a>
	<Test {data} />
	<button on:click={() => {data = 'Prout'}}>Prout</button>
</div>