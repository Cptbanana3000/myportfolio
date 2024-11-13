import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// Out directory for the build
			out: 'build',
			
			// Enable precompress for better performance
			precompress: true,
			
			// Configure the port to match Render's environment
			env: {
				port: process.env.PORT || 3000,
				host: process.env.HOST || '0.0.0.0'
			}
		}),
		
		// Add CSRF protection
		csrf: {
			checkOrigin: true
		}
	},
	preprocess: vitePreprocess()
};

export default config;
