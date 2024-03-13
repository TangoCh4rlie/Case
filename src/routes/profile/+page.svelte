<script lang="ts">
	import { page } from '$app/stores';
	import { changeUserInfo } from '$lib/utils/controlerUser';
	$: session = $page.data.session;
	let username = '';

	const changeUsername = () => {
		changeUserInfo(username, session?.user?.email as string);
		console.log('Username changed');
	};
</script>

<div>
	<h1>{session?.user?.name}</h1>
	<h1>{session?.user?.email}</h1>
	<h2>Change your username</h2>
	<input type="text" bind:value={username} />
	<button on:click={changeUsername}>Save</button>
</div>
