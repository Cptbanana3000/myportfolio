<script>
	import '../app.css';
	import { onMount } from 'svelte';
	
	let { children } = $props();
	let isScrolled = $state(false);
	let isMobileMenuOpen = $state(false);
	
	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 20;
		};
		
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<!-- Header with smooth transition -->
<header 
	class="fixed top-0 w-full z-50 transition-all duration-500"
	class:bg-transparent={!isScrolled}
	class:bg-gray-950={isScrolled}
	class:backdrop-blur-md={isScrolled}
	class:shadow-lg={isScrolled}
	aria-label="Site header"
>
	<div class="container mx-auto px-6 py-4">
		<div class="flex justify-between items-center">
			<!-- Logo -->
			<a 
				href="/" 
				class="group relative" 
				aria-label="Joel Chhetri - Home"
			>
				<h1 class="text-2xl font-bold">
					<span class="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
						Joel Chhetri
					</span>
				</h1>
				<span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/30 transition-all duration-300 group-hover:w-full"></span>
			</a>

			<!-- Navigation -->
			<nav 
				class="hidden md:flex space-x-8 text-sm font-light tracking-wide"
				aria-label="Main navigation"
			>
				{#each ['About', 'Skills', 'Services', 'Projects', 'Contact'] as item}
					<a 
						href="#{item.toLowerCase()}" 
						class="relative group text-white/80 hover:text-white transition-colors duration-300"
						aria-label="Navigate to {item} section"
					>
						<span>{item}</span>
						<span class="absolute -bottom-1 left-0 w-0 h-px bg-white/30 transition-all duration-300 group-hover:w-full"></span>
					</a>
				{/each}
			</nav>

			<!-- Mobile Menu Button -->
			<button 
				class="md:hidden text-white" 
				aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
				aria-expanded={isMobileMenuOpen}
				aria-controls="mobile-menu"
				onclick={() => isMobileMenuOpen = !isMobileMenuOpen}
			>
				<i class="fas {isMobileMenuOpen ? 'fa-times' : 'fa-bars'}" aria-hidden="true"></i>
			</button>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if isMobileMenuOpen}
		<div 
			id="mobile-menu"
			class="md:hidden fixed inset-x-0 top-[73px] bg-gray-950/95 backdrop-blur-sm"
			role="navigation"
			aria-label="Mobile navigation"
		>
			<nav class="flex flex-col items-center py-8">
				{#each ['About', 'Skills', 'Services', 'Projects', 'Contact'] as item}
					<a 
						href="#{item.toLowerCase()}" 
						class="py-4 text-white/80 hover:text-white transition-colors duration-300"
						onclick={() => isMobileMenuOpen = false}
						aria-label="Navigate to {item} section"
					>
						{item}
					</a>
				{/each}
			</nav>
		</div>
	{/if}
</header>

<!-- Main Content -->
<main 
	class="min-h-screen"
	aria-label="Main content"
>
	{@render children()}
</main>

<!-- Footer -->
<footer 
	class="bg-gray-950 text-white/80"
	aria-label="Site footer"
>
	<div class="container mx-auto px-6 py-12">
		<div class="max-w-4xl mx-auto">
			<!-- Social Links -->
			<div 
				class="flex justify-center space-x-8 mb-8"
				role="navigation"
				aria-label="Social media links"
			>
				<a 
					href="https://github.com/Cptbanana3000" 
					class="group relative p-2"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Visit Joel's GitHub profile (opens in new tab)"
				>
					<i class="fab fa-github text-2xl" aria-hidden="true"></i>
				</a>
				<a 
					href="mailto:joelchhetriwork@gmail.com" 
					class="group relative p-2"
					aria-label="Send email to Joel"
				>
					<i class="fas fa-envelope text-2xl" aria-hidden="true"></i>
				</a>
			</div>

			<!-- Divider -->
			<div 
				class="w-24 h-px bg-white/10 mx-auto mb-8"
				role="separator"
				aria-hidden="true"
			></div>

			<!-- Copyright -->
			<div 
				class="text-center text-sm text-white/60"
				role="contentinfo"
				aria-label="Copyright information"
			>
				<p>&copy; {new Date().getFullYear()} Joel Chhetri. All rights reserved.</p>
				<p class="mt-2 text-xs">Hit me UP!!!!</p>
			</div>
		</div>
	</div>
</footer>
