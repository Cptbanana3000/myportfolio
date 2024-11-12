<script>
	import '../app.css';
	import { onMount } from 'svelte';
	
	let { children } = $props();
	let isScrolled = $state(false);
	
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
>
	<div class="container mx-auto px-6 py-4">
		<div class="flex justify-between items-center">
			<!-- Logo -->
			<a href="/" class="group relative" aria-label="Home">
				<h1 class="text-2xl font-bold">
					<span class="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
						Joel Chhetri
					</span>
				</h1>
				<span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/30 transition-all duration-300 group-hover:w-full"></span>
			</a>

			<!-- Navigation -->
			<nav class="hidden md:flex space-x-8 text-sm font-light tracking-wide">
				{#each ['About', 'Skills', 'Projects', 'Contact'] as item}
					<a 
						href="#{item.toLowerCase()}" 
						class="relative group text-white/80 hover:text-white transition-colors duration-300"
					>
						<span>{item}</span>
						<span class="absolute -bottom-1 left-0 w-0 h-px bg-white/30 transition-all duration-300 group-hover:w-full"></span>
					</a>
				{/each}
			</nav>

			<!-- Mobile Menu Button -->
			<button 
				class="md:hidden text-white" 
				aria-label="Toggle mobile menu"
			>
				<i class="fas fa-bars"></i>
			</button>
		</div>
	</div>
</header>

<!-- Main Content -->
<main class="min-h-screen">
	{@render children()}
</main>

<!-- Footer -->
<footer class="bg-gray-950 text-white/80">
	<div class="container mx-auto px-6 py-12">
		<div class="max-w-4xl mx-auto">
			<!-- Social Links -->
			<div class="flex justify-center space-x-8 mb-8">
				<a 
					href="https://github.com/Cptbanana3000" 
					class="group relative p-2"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="GitHub Profile"
				>
					<i class="fab fa-github text-2xl"></i>
				</a>
				<a 
					href="mailto:joelchhetri2001@gmail.com" 
					class="group relative p-2"
					aria-label="Email Me"
				>
					<i class="fas fa-envelope text-2xl"></i>
				</a>
			</div>

			<!-- Divider -->
			<div class="w-24 h-px bg-white/10 mx-auto mb-8"></div>

			<!-- Copyright -->
			<div class="text-center text-sm text-white/60">
				<p>&copy; {new Date().getFullYear()} Joel Chhetri. All rights reserved.</p>
				<p class="mt-2 text-xs">Crafted with ❤️ in Nepal</p>
			</div>
		</div>
	</div>
</footer>
