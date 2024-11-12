<script>
    import { onMount } from 'svelte';
    import { fade, fly, slide } from 'svelte/transition';
    
    let visible = false;
    let scrollY;
    let scrollPercentage = 0;
    
    onMount(() => {
        visible = true;
        // Calculate scroll percentage on client side only
        const calculateScrollPercentage = () => {
            scrollPercentage = Math.min(
                Math.round(
                    (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
                ),
                100
            );
        };
        
        window.addEventListener('scroll', calculateScrollPercentage);
        return () => window.removeEventListener('scroll', calculateScrollPercentage);
    });
</script>

<svelte:window bind:scrollY={scrollY}/>

<!-- Hero Section -->
<section class="hero min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 to-gray-900 text-white p-8 md:p-12">
    {#if visible}
        <div class="text-center space-y-12 max-w-4xl mx-auto">
            <div in:fly="{{ y: 30, duration: 1200, delay: 300 }}" class="space-y-6">
                <p class="text-gray-400 font-light tracking-widest uppercase text-sm">Full Stack Developer</p>
                <h1 class="text-6xl md:text-7xl font-bold leading-tight">
                    <span class="bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
                        Joel Chhetri
                    </span>
                </h1>
                <h2 class="text-2xl md:text-3xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
                    Crafting digital experiences with clean code and minimalist design
                </h2>
            </div>

            <div in:fly="{{ y: 30, duration: 1200, delay: 600 }}" 
                 class="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8">
                <a 
                    href="#projects" 
                    class="group relative px-8 py-4 overflow-hidden rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-500"
                    aria-label="View my projects"
                >
                    <span class="relative z-10 text-white text-lg">View Projects</span>
                </a>
                <a 
                    href="#contact" 
                    class="group relative px-8 py-4 overflow-hidden rounded-full border border-white/20 hover:border-white/40 transition-all duration-500"
                    aria-label="Contact me"
                >
                    <span class="relative z-10 text-white text-lg">Get in Touch</span>
                </a>
            </div>

            <div in:fade="{{ duration: 1000, delay: 900 }}" class="pt-12">
                <div class="flex justify-center items-center space-x-8">
                    <a 
                        href="https://github.com/Cptbanana3000" 
                        class="text-gray-500 hover:text-white transition-all duration-500"
                        aria-label="Visit my GitHub profile"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i class="fab fa-github text-2xl"></i>
                    </a>
                    <a 
                        href="mailto:joelchhetri2001@gmail.com" 
                        class="text-gray-500 hover:text-white transition-all duration-500"
                        aria-label="Send me an email"
                    >
                        <i class="fas fa-envelope text-2xl"></i>
                    </a>
                </div>
            </div>
        </div>
    {/if}
</section>

<!-- About Section -->
<section id="about" class="relative py-32 bg-white">
    <div class="container mx-auto px-8">
        <div class="max-w-4xl mx-auto space-y-8">
            <h2 class="text-4xl font-bold text-gray-900 text-center mb-16">About Me</h2>
            <div class="prose prose-lg max-w-none text-gray-600 space-y-6">
                <p class="leading-relaxed">
                    Hello! I'm Joel, a full-stack developer with a passion for creating elegant, user-centric web applications. 
                    I specialize in building responsive, performant websites using modern technologies and best practices.
                </p>
                <p class="leading-relaxed">
                    My approach to development combines technical expertise with creative problem-solving, 
                    ensuring that each project not only functions flawlessly but also provides an exceptional user experience.
                </p>
            </div>
        </div>
    </div>
    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50 pointer-events-none"></div>
</section>

<!-- Skills Section -->
<section id="skills" class="py-32 bg-gray-50">
    <div class="container mx-auto px-8">
        <h2 class="text-4xl font-bold text-gray-900 text-center mb-16">Skills</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-5xl mx-auto">
            <!-- Frontend -->
            <div class="space-y-6">
                <div class="text-center">
                    <i class="fas fa-code text-3xl text-blue-500 mb-4"></i>
                    <h3 class="text-xl font-semibold text-gray-900">Frontend</h3>
                </div>
                <div class="space-y-3">
                    {#each ['React', 'Svelte/SvelteKit', 'JavaScript', 'Tailwind CSS'] as skill}
                        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                            {skill}
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Backend -->
            <div class="space-y-6">
                <div class="text-center">
                    <i class="fas fa-server text-3xl text-green-500 mb-4"></i>
                    <h3 class="text-xl font-semibold text-gray-900">Backend</h3>
                </div>
                <div class="space-y-3">
                    {#each ['Node.js', 'Express', 'MongoDB', 'REST APIs'] as skill}
                        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                            {skill}
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Tools & Deployment -->
            <div class="space-y-6">
                <div class="text-center">
                    <i class="fas fa-tools text-3xl text-purple-500 mb-4"></i>
                    <h3 class="text-xl font-semibold text-gray-900">Tools & Deployment</h3>
                </div>
                <div class="space-y-3">
                    {#each ['Git', 'Vercel', 'Netlify', 'AWS'] as skill}
                        <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                            {skill}
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Projects Section -->
<section id="projects" class="py-32 bg-white">
    <div class="container mx-auto px-8">
        <h2 class="text-4xl font-bold text-gray-900 text-center mb-16">Featured Projects</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <!-- Portfolio Website -->
            <div class="group relative bg-gray-50 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-500">
                <div class="aspect-video bg-gray-200 relative overflow-hidden">
                    <img 
                        src="/personal.png" 
                        alt="Portfolio Preview" 
                        class="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-300"
                    />
                    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50"></div>
                </div>
                <div class="p-8">
                    <h3 class="text-2xl font-semibold mb-4">Personal Portfolio</h3>
                    <p class="text-gray-600 mb-6">A modern, responsive portfolio website showcasing my work and skills.</p>
                    <div class="flex flex-wrap gap-2 mb-6">
                        <span class="px-3 py-1 bg-gray-200 rounded-full text-sm">SvelteKit</span>
                        <span class="px-3 py-1 bg-gray-200 rounded-full text-sm">Tailwind CSS</span>
                        <span class="px-3 py-1 bg-gray-200 rounded-full text-sm">JavaScript</span>
                    </div>
                    <a 
                        href="https://github.com/Cptbanana3000" 
                        class="inline-flex items-center text-blue-500 hover:text-blue-600 transition-all duration-300"
                    >
                        <i class="fab fa-github mr-2"></i>
                        View Source
                    </a>
                </div>
            </div>

            <!-- Weather App -->
            <div class="group relative bg-gray-50 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-500">
                <div class="aspect-video bg-gray-200 relative overflow-hidden">
                    <img 
                        src="/weather1.webp" 
                        alt="Weather App Preview" 
                        class="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-300"
                    />
                    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50"></div>
                </div>
                <div class="p-8">
                    <h3 class="text-2xl font-semibold mb-4">Weather Dashboard</h3>
                    <p class="text-gray-600 mb-6">A weather application providing real-time weather data and forecasts.</p>
                    <div class="flex flex-wrap gap-2 mb-6">
                        <span class="px-3 py-1 bg-gray-200 rounded-full text-sm">React</span>
                        <span class="px-3 py-1 bg-gray-200 rounded-full text-sm">API Integration</span>
                        <span class="px-3 py-1 bg-gray-200 rounded-full text-sm">CSS3</span>
                    </div>
                    <a href="https://github.com/Cptbanana3000/A-basic-Weather-App" class="inline-flex items-center text-blue-500 hover:text-blue-600 transition-all duration-300">
                        <i class="fab fa-github mr-2"></i>
                        View Source
                    </a>
                </div>
            </div>

            <!-- Currently Working On -->
            <div class="col-span-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 text-white">
                <div class="max-w-2xl mx-auto text-center space-y-6">
                    <div class="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i class="fas fa-code text-3xl text-white/80"></i>
                    </div>
                    <h3 class="text-2xl font-semibold">Currently Working On</h3>
                    <p class="text-gray-300">
                        I'm currently developing several exciting projects, including:
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                        <div class="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                            <h4 class="font-semibold mb-2">E-commerce Platform</h4>
                            <p class="text-sm text-gray-400">A modern e-commerce solution with real-time inventory management.</p>
                        </div>
                        <div class="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                            <h4 class="font-semibold mb-2">Task Management App</h4>
                            <p class="text-sm text-gray-400">A collaborative task management tool with real-time updates.</p>
                        </div>
                    </div>
                    <p class="text-sm text-gray-400 mt-8">
                        Stay tuned for updates! These projects will be available soon.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>
<!-- Contact Section -->
<section id="contact" class="py-32 bg-gray-50">
    <div class="container mx-auto px-8">
        <div class="max-w-4xl mx-auto text-center space-y-8">
            <h2 class="text-4xl font-bold text-gray-900">Let's Connect</h2>
            <p class="text-xl text-gray-600">
                I'm always interested in hearing about new projects and opportunities.
            </p>
            <div class="flex flex-col md:flex-row justify-center gap-6 mt-12">
                <a 
                    href="mailto:joelchhetri2001@gmail.com"
                    class="group px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-300"
                >
                    <span class="flex items-center justify-center">
                        <i class="fas fa-envelope mr-2"></i>
                        Get in Touch
                    </span>
                </a>
                <a 
                    href="https://github.com/Cptbanana3000"
                    class="group px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300"
                >
                    <span class="flex items-center justify-center">
                        <i class="fab fa-github mr-2"></i>
                        View GitHub
                    </span>
                </a>
            </div>
        </div>
    </div>
</section>

<!-- Scroll Indicator -->
<div class="fixed bottom-8 right-8 z-50 opacity-50 hover:opacity-100 transition-opacity duration-300">
    <div class="w-12 h-12 rounded-full border-2 border-gray-900/20 flex items-center justify-center text-gray-900/50">
        {scrollPercentage}%
    </div>
</div>