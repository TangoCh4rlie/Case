<script>
	import '../app.pcss';
	import { SignIn } from '@auth/sveltekit/components';
	import { page } from '$app/stores';
</script>

<header>
	<a href="/" class="flex flex-row items-center">
		<div>
			<enhanced:img 
				src="$lib/assets/images/LogoMyCasesNoBg.png"
				alt="Logo de l'application MyCase"
				class="w-10 m-3"
			>
		</div>
		<h1 class="text-4xl font-bold">My Cases</h1>
	</a>
	<div>
		{#if $page.data.session}
			<a href="/profile" class="buttonPrimary">Profile</a>
		{:else}
			<SignIn provider="google">
				<div slot="submitButton" class="buttonPrimary">Sign in</div>
			</SignIn>
		{/if}
	</div>
</header>

<slot />

<style>
	header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
</style>
