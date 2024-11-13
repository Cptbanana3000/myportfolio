/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
    const response = await resolve(event);
    
    // Security Headers
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()');
    
    // Content Security Policy (CSP)
    response.headers.set(
        'Content-Security-Policy',
        [
            "default-src 'self'",
            // Allow scripts from Google reCAPTCHA and inline scripts
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com https://cdnjs.cloudflare.com",
            // Allow styles from Font Awesome CDN
            "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com",
            "img-src 'self' data: https:",
            // Allow fonts from Font Awesome and Google Fonts
            "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com",
            // Allow connections to Formspree and Google reCAPTCHA
            "connect-src 'self' https://formspree.io https://www.google.com",
            // Allow frames for reCAPTCHA
            "frame-src 'self' https://www.google.com",
            "frame-ancestors 'none'",
            // Allow form submissions to Formspree
            "form-action 'self' https://formspree.io",
            "base-uri 'self'",
            "style-src-elem 'self' 'unsafe-inline' https://cdnjs.cloudflare.com"
        ].join('; ')
    );
    
    // HSTS (Strict-Transport-Security)
    if (event.url.protocol === 'https:') {
        response.headers.set(
            'Strict-Transport-Security',
            'max-age=31536000; includeSubDomains; preload'
        );
    }

    return response;
}; 