<script>
	import '../app.pcss';
	import { SignIn, SignOut } from '@auth/sveltekit/components';
	import src from '$lib/images/LogoMyCasesNoBG.png'
</script>

<header class="flex flex-row">
	<a href="/" class="flex flex-row">
		<img 
			{src} 
			alt="Logo de l'application MyCase"
			class="w-10 m-3"
		>
		<h1>My Cases</h1>
	</a>
	<SignOut>
		<div slot="submitButton" class="buttonPrimary">Sign out</div>
	</SignOut>
</header>

<slot />
