<script>
    import { PUBLIC_FORMSPREE_ENDPOINT } from '$env/static/public';
    import { onMount } from 'svelte';
    import { fade, fly, slide } from 'svelte/transition';
    import TimedText from '$lib/components/TimedText.svelte';
    
    let visible = $state(false);
    let aboutVisible = $state(false);
    let scrollY = $state(0);
    let scrollPercentage = $state(0);
    let skillsVisible = $state(false);
    let isSubmitting = $state(false);
    let showSuccess = $state(false);
    let showError = $state(false);
    
    onMount(() => {
        visible = true;
        
        // Intersection Observer for About section
        const aboutObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        aboutVisible = true;
                    }
                });
            },
            { threshold: 0.2 } // Trigger when 20% of the element is visible
        );
        
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutObserver.observe(aboutSection);
        }
        
        // Existing scroll percentage calculation
        const calculateScrollPercentage = () => {
            scrollPercentage = Math.min(
                Math.round(
                    (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
                ),
                100
            );
        };
        
        window.addEventListener('scroll', calculateScrollPercentage);
        
        // Add Skills section observer
        const skillsObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        skillsVisible = true;
                    }
                });
            },
            { threshold: 0.2 }
        );
        
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            skillsObserver.observe(skillsSection);
        }
        
        return () => {
            window.removeEventListener('scroll', calculateScrollPercentage);
            aboutObserver.disconnect();
            skillsObserver.disconnect();
        };
    });

    // Rate limiting
    const SUBMIT_TIMEOUT = 60000; // 1 minute
    let lastSubmitTime = 0;

    function checkRateLimit() {
        const now = Date.now();
        if (now - lastSubmitTime < SUBMIT_TIMEOUT) {
            return false;
        }
        lastSubmitTime = now;
        return true;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        
        // Check rate limit
        if (!checkRateLimit()) {
            showError = true;
            return;
        }

        isSubmitting = true;

        try {
            const form = event.target;
            const formData = new FormData(form);
            
            // Check honeypot
            if (formData.get('_gotcha')) {
                console.log('Bot detected');
                return;
            }

            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                form.reset();
                showSuccess = true;
            } else {
                showError = true;
            }
        } catch (error) {
            showError = true;
        } finally {
            isSubmitting = false;
        }
    }

    // Add reCAPTCHA script to head
    onMount(() => {
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js';
        document.head.appendChild(script);
    });
</script>

<!-- Add this to your +layout.svelte or +page.svelte -->
<svelte:head>
    <title>Joel Chhetri - Full Stack Developer</title>
    <meta name="description" content="Joel Chhetri's portfolio showcasing skills in full stack development, projects, and services offered." />
    <meta name="keywords" content="Joel Chhetri, Full Stack Developer, Web Development, Portfolio, Projects" />
    <meta name="author" content="Joel Chhetri" />
    <meta property="og:title" content="Joel Chhetri - Full Stack Developer" />
    <meta property="og:description" content="Explore Joel Chhetri's portfolio to see his skills, projects, and services offered." />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Joel Chhetri - Full Stack Developer" />
    <meta name="twitter:description" content="Explore Joel Chhetri's portfolio to see his skills, projects, and services offered." />
    <meta name="twitter:image" content="/path/to/your/image.jpg" />

    <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Joel Chhetri",
            "url": "https://joelchhetri.tech",
            "sameAs": [
                "https://github.com/Cptbanana3000",
                "mailto:joelchhetriwork@gmail.com"
            ],
            "jobTitle": "Full Stack Developer",
            "worksFor": {
                "@type": "Organization",
                "name": "Joel Chhetri"
            }
        }
    </script>
</svelte:head>

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
                    Code. Create. Elevate.
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
                        href="mailto:joelchhetriwork@gmail.com" 
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
            {#if aboutVisible}
                <h2 
                    in:fly="{{ y: 30, duration: 1000 }}" 
                    class="text-4xl font-bold text-gray-900 text-center mb-16"
                >
                    About Me
                </h2>
                <div class="prose prose-lg max-w-none text-gray-600 space-y-6">
                    <p 
                        in:fly="{{ y: 30, duration: 1000, delay: 200 }}" 
                        class="leading-relaxed"
                    >
                    Hi, I'm Joel, a full stack developer who creates modern web solutions by leveraging the latest technologies and best practices, 
                    with a focus on delivering clean, functional websites that meet your needs.
                    </p>
                    <p 
                        in:fly="{{ y: 30, duration: 1000, delay: 400 }}" 
                        class="leading-relaxed"
                    >
                    As an emerging developer, I bring fresh perspective and dedication to every project. 
                    I'm committed to continuous learning and problem-solving to deliver the best solutions for my clients.
                    </p>
                </div>
            {/if}
        </div>
    </div>
</section>

<!-- Skills Section -->
<section id="skills" class="py-32 bg-gray-50">
    <div class="container mx-auto px-8">
        {#if skillsVisible}
            <h2 
                in:fly="{{ y: 30, duration: 1000 }}" 
                class="text-4xl font-bold text-gray-900 text-center mb-16"
            >
                Skills
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-5xl mx-auto">
                <!-- Frontend -->
                <div 
                    in:fly="{{ y: 30, duration: 1000, delay: 200 }}"
                    class="space-y-6"
                >
                    <div class="text-center">
                        <i class="fas fa-code text-3xl text-blue-500 mb-4"></i>
                        <h3 class="text-xl font-semibold text-gray-900">Frontend</h3>
                    </div>
                    <div class="space-y-3">
                        {#each ['React', 'Svelte/SvelteKit', 'JavaScript', 'Tailwind CSS', 'Bootstrap'] as skill, i}
                            <div 
                                in:fly="{{ y: 20, duration: 800, delay: 300 + (i * 100) }}"
                                class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                {skill}
                            </div>
                        {/each}
                    </div>
                </div>

                <!-- Backend -->
                <div 
                    in:fly="{{ y: 30, duration: 1000, delay: 400 }}"
                    class="space-y-6"
                >
                    <div class="text-center">
                        <i class="fas fa-server text-3xl text-green-500 mb-4"></i>
                        <h3 class="text-xl font-semibold text-gray-900">Backend</h3>
                    </div>
                    <div class="space-y-3">
                        {#each ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'Bun'] as skill, i}
                            <div 
                                in:fly="{{ y: 20, duration: 800, delay: 500 + (i * 100) }}"
                                class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                {skill}
                            </div>
                        {/each}
                    </div>
                </div>

                <!-- Tools & Deployment -->
                <div 
                    in:fly="{{ y: 30, duration: 1000, delay: 600 }}"
                    class="space-y-6"
                >
                    <div class="text-center">
                        <i class="fas fa-tools text-3xl text-purple-500 mb-4"></i>
                        <h3 class="text-xl font-semibold text-gray-900">Tools & Deployment</h3>
                    </div>
                    <div class="space-y-3">
                        {#each ['Git', 'Vercel', 'Netlify', 'AWS', 'Render'] as skill, i}
                            <div 
                                in:fly="{{ y: 20, duration: 800, delay: 700 + (i * 100) }}"
                                class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                {skill}
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        {/if}
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
                        loading="lazy"
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
                        loading="lazy"
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

<!-- Services Section -->
<section id="services" class="py-32 bg-gray-50">
    <div class="container mx-auto px-8">
        <h2 class="text-4xl font-bold text-gray-900 text-center mb-16">Services</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <!-- Custom Web Development -->
            <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div class="text-blue-500 mb-6">
                    <i class="fas fa-code text-3xl"></i>
                </div>
                <h3 class="text-xl font-semibold mb-4">Custom Web Development</h3>
                <p class="text-gray-600 mb-4">
                    Tailored web solutions using modern frameworks or vanilla JavaScript.
                </p>
                <ul class="text-gray-600 space-y-2 text-sm">
                    <li>• React/Svelte Applications</li>
                    <li>• Vanilla JavaScript Solutions</li>
                    <li>• Node.js & Express Backend</li>
                    <li>• EJS Template Integration</li>
                </ul>
            </div>

            <!-- WordPress Development -->
            <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div class="text-indigo-500 mb-6">
                    <i class="fab fa-wordpress text-3xl"></i>
                </div>
                <h3 class="text-xl font-semibold mb-4">WordPress Solutions</h3>
                <p class="text-gray-600 mb-4">
                    Custom WordPress websites and themes for easy content management.
                </p>
                <ul class="text-gray-600 space-y-2 text-sm">
                    <li>• Custom Theme Development</li>
                    <li>• Plugin Integration</li>
                    <li>• WooCommerce Setup</li>
                    <li>• WordPress Optimization</li>
                </ul>
            </div>

            <!-- Static Websites -->
            <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div class="text-green-500 mb-6">
                    <i class="fas fa-globe text-3xl"></i>
                </div>
                <h3 class="text-xl font-semibold mb-4">Static Websites</h3>
                <p class="text-gray-600 mb-4">
                    Fast, secure, and cost-effective static websites for businesses.
                </p>
                <ul class="text-gray-600 space-y-2 text-sm">
                    <li>• HTML/CSS/JavaScript</li>
                    <li>• Landing Pages</li>
                    <li>• Business Websites</li>
                    <li>• Portfolio Sites</li>
                </ul>
            </div>

            <!-- E-commerce Solutions -->
            <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div class="text-yellow-500 mb-6">
                    <i class="fas fa-shopping-cart text-3xl"></i>
                </div>
                <h3 class="text-xl font-semibold mb-4">E-commerce Solutions</h3>
                <p class="text-gray-600 mb-4">
                    Online store solutions using various technologies.
                </p>
                <ul class="text-gray-600 space-y-2 text-sm">
                    <li>• Custom E-commerce Sites</li>
                    <li>• WooCommerce Stores</li>
                    <li>• Payment Integration</li>
                    <li>• Inventory Management</li>
                </ul>
            </div>

            <!-- Web Maintenance -->
            <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div class="text-purple-500 mb-6">
                    <i class="fas fa-wrench text-3xl"></i>
                </div>
                <h3 class="text-xl font-semibold mb-4">Web Maintenance</h3>
                <p class="text-gray-600 mb-4">
                    Keep your website updated and running smoothly.
                </p>
                <ul class="text-gray-600 space-y-2 text-sm">
                    <li>• Regular Updates</li>
                    <li>• Security Maintenance</li>
                    <li>• Content Updates</li>
                    <li>• Performance Optimization</li>
                </ul>
            </div>

            <!-- Consultation & Support -->
            <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div class="text-teal-500 mb-6">
                    <i class="fas fa-comments text-3xl"></i>
                </div>
                <h3 class="text-xl font-semibold mb-4">Consultation & Support</h3>
                <p class="text-gray-600 mb-4">
                    Technical guidance and ongoing support for your web projects.
                </p>
                <ul class="text-gray-600 space-y-2 text-sm">
                    <li>• Technology Consultation</li>
                    <li>• Project Planning</li>
                    <li>• Technical Support</li>
                    <li>• Training & Documentation</li>
                </ul>
            </div>
        </div>
    </div>
</section>

<!-- Contact Section -->
<section id="contact" class="py-32 bg-gray-50">
    <div class="container mx-auto px-8">
        <div class="max-w-5xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold text-gray-900 mb-4">Let's Work Together</h2>
                <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                    Have a project in mind? I'm always open to discussing new opportunities and ideas.
                </p>
            </div>

            <!-- Contact Cards -->
            <div class="grid md:grid-cols-2 gap-8 mb-16">
                <!-- Direct Contact -->
                <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                    <div class="text-blue-500 mb-6">
                        <i class="fas fa-envelope text-3xl"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-4">Get in Touch</h3>
                    <p class="text-gray-600 mb-6">
                        Ready to start a project? Contact me through any of these secure methods:
                    </p>
                    <div class="space-y-4">
                        <!-- Email Option -->
                        <a 
                            href="mailto:joelchhetriwork@gmail.com"
                            class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 w-full justify-center"
                        >
                            <i class="fas fa-envelope mr-2"></i>
                            Connect on Email
                        </a>

                        <!-- LinkedIn Option -->
                        <a 
                            href="https://www.linkedin.com/in/joel-chhetri-7b6003218"
                            class="inline-flex items-center px-6 py-3 bg-[#0077b5] text-white rounded-full hover:bg-[#006399] transition-all duration-300 w-full justify-center"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i class="fab fa-linkedin mr-2"></i>
                            Connect on LinkedIn
                        </a>

                        <!-- GitHub Option -->
                        <a 
                            href="https://github.com/Cptbanana3000"
                            class="inline-flex items-center px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300 w-full justify-center"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i class="fab fa-github mr-2"></i>
                            Message on GitHub
                        </a>
                    </div>
                </div>

                <!-- Social Connect -->
                <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                    <div class="text-purple-500 mb-6">
                        <i class="fas fa-code-branch text-3xl"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-4">Follow My Work</h3>
                    <p class="text-gray-600 mb-6">
                        Check out my latest projects and contributions on GitHub.
                    </p>
                    <a 
                        href="https://github.com/Cptbanana3000"
                        class="inline-flex items-center px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i class="fab fa-github mr-2"></i>
                        View GitHub
                    </a>
                </div>
            </div>

            <!-- Quick Contact Info -->
            <div class="bg-gray-900 text-white rounded-xl p-8 text-center">
                <h3 class="text-xl font-semibold mb-4">Quick Response Time</h3>
                <p class="text-gray-400">
                    I typically respond within 24 hours during business days.
                </p>
                <div class="mt-6 flex flex-wrap justify-center gap-4">
                    <div class="px-4 py-2 bg-white/10 rounded-full text-sm">
                        <i class="fas fa-clock mr-2"></i>
                        24hr Response Time
                    </div>
                    <div class="px-4 py-2 bg-white/10 rounded-full text-sm">
                        <i class="fas fa-map-marker-alt mr-2"></i>
                        Based on Planet Earth
                    </div>
                    <div class="px-4 py-2 bg-white/10 rounded-full text-sm">
                        <i class="fas fa-language mr-2"></i>
                        English
                    </div>
                </div>
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

<!-- Contact Form Section -->
<div class="bg-white rounded-xl shadow-sm p-8 mt-16">
    <h3 class="text-2xl font-semibold mb-8 text-center">Send Me a Message</h3>
    
    {#if showSuccess}
        <TimedText 
            message="Thank you for your message! I'll get back to you soon."
            type="success"
            on:hide={() => showSuccess = false}
        />
    {/if}

    {#if showError}
        <TimedText 
            message="Please wait a moment before sending another message."
            type="error"
            on:hide={() => showError = false}
        />
    {/if}

    <form 
        action={PUBLIC_FORMSPREE_ENDPOINT}
        method="POST"
        class="space-y-6 max-w-2xl mx-auto"
        onsubmit={handleSubmit}
    >
        <!-- Honeypot field -->
        <div class="hidden">
            <input
                type="text"
                name="_gotcha"
                tabindex="-1"
                autocomplete="off"
            />
        </div>

        <!-- Name Input -->
        <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                Name
            </label>
            <input
                type="text"
                name="name"
                id="name"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
                placeholder="Your name"
                disabled={isSubmitting}
            />
        </div>

        <!-- Email Input -->
        <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                Email
            </label>
            <input
                type="email"
                name="email"
                id="email"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
                placeholder="your@email.com"
                disabled={isSubmitting}
            />
        </div>

        <!-- Subject Input -->
        <div>
            <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">
                Subject
            </label>
            <input
                type="text"
                name="subject"
                id="subject"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
                placeholder="What is this regarding?"
                disabled={isSubmitting}
            />
        </div>

        <!-- Message Input -->
        <div>
            <label for="message" class="block text-sm font-medium text-gray-700 mb-1">
                Message
            </label>
            <textarea
                name="message"
                id="message"
                required
                rows="4"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 resize-none"
                placeholder="Your message here..."
                disabled={isSubmitting}
            ></textarea>
        </div>

        <!-- Submit Button -->
        <div class="text-center">
            <button
                type="submit"
                class="inline-flex items-center px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
            >
                {#if isSubmitting}
                    <i class="fas fa-spinner fa-spin mr-2"></i>
                    Sending...
                {:else}
                    <i class="fas fa-paper-plane mr-2"></i>
                    Send Message
                {/if}
            </button>
        </div>
    </form>
</div>