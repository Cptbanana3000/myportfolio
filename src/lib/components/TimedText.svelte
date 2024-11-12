<script>
    import { onMount, createEventDispatcher } from 'svelte';
    
    export let message = '';
    export let duration = 5000;
    export let type = 'success'; // 'success' or 'error'
    
    const dispatch = createEventDispatcher();
    
    onMount(() => {
        const timer = setTimeout(() => {
            dispatch('hide');
        }, duration);
        
        return () => clearTimeout(timer);
    });
</script>

<div class="fixed top-4 right-4 z-50 animate-fade-in-down">
    <div class={`px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2
        ${type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}
    >
        <i class={`fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
        <span>{message}</span>
    </div>
</div>

<style>
    .animate-fade-in-down {
        animation: fadeInDown 0.5s ease-out;
    }
    
    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style> 