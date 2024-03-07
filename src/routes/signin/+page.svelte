<script>
	import { signIn, signOut } from '@auth/sveltekit/client';
</script>

<div class="actions">
	<div class="wrapper-form">
		<button on:click={() => signIn('Google')}>Sign In with Google</button>
	</div>
	<button on:click={() => signOut()}> Sign Out </button>
</div>
