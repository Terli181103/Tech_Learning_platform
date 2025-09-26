// Interactive features and enhancements for TechGuide Hub
class InteractiveFeatures {
    constructor() {
        this.animations = new Map();
        this.observers = new Map();
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupAnimations();
        this.setupKeyboardShortcuts();
        this.setupTooltips();
        this.setupProgressAnimations();
        this.setupCodeHighlighting();
        this.setupThemeToggle();
        this.setupNotificationSystem();
    }

    // Intersection Observer for scroll animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    
                    // Trigger counter animations for stats
                    if (entry.target.classList.contains('stat-item')) {
                        this.animateCounter(entry.target);
                    }
                    
                    // Trigger progress bar animations
                    if (entry.target.classList.contains('progress-bar-container')) {
                        this.animateProgressBars(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements that should animate on scroll
        document.querySelectorAll('.feature-card, .stat-item, .progress-bar-container, .topic-card').forEach(el => {
            observer.observe(el);
        });

        this.observers.set('scroll', observer);
    }

    // Animation utilities
    setupAnimations() {
        // Add CSS classes for animations
        const style = document.createElement('style');
        style.textContent = `
            .animate-fade-in {
                animation: fadeInUp 0.8s ease-out forwards;
            }
            
            .animate-slide-in-left {
                animation: slideInLeft 0.6s ease-out forwards;
            }
            
            .animate-slide-in-right {
                animation: slideInRight 0.6s ease-out forwards;
            }
            
            .animate-bounce-in {
                animation: bounceIn 0.8s ease-out forwards;
            }
            
            .animate-pulse {
                animation: pulse 2s infinite;
            }
            
            @keyframes slideInLeft {
                from {
                    opacity: 0;
                    transform: translateX(-50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes bounceIn {
                0% {
                    opacity: 0;
                    transform: scale(0.3);
                }
                50% {
                    opacity: 1;
                    transform: scale(1.05);
                }
                70% {
                    transform: scale(0.9);
                }
                100% {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            .typing-animation {
                overflow: hidden;
                border-right: 2px solid #3b82f6;
                white-space: nowrap;
                animation: typing 3s steps(40, end), blink-caret 0.75s step-end infinite;
            }
            
            @keyframes typing {
                from { width: 0; }
                to { width: 100%; }
            }
            
            @keyframes blink-caret {
                from, to { border-color: transparent; }
                50% { border-color: #3b82f6; }
            }
        `;
        document.head.appendChild(style);
    }

    // Counter animations for statistics
    animateCounter(element) {
        const target = parseInt(element.querySelector('.text-4xl').textContent);
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = target / steps;
        const stepDuration = duration / steps;
        
        let current = 0;
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(counter);
            }
            element.querySelector('.text-4xl').textContent = Math.floor(current).toLocaleString();
        }, stepDuration);
    }

    // Progress bar animations
    animateProgressBars(container) {
        const progressBars = container.querySelectorAll('.progress-bar');
        progressBars.forEach((bar, index) => {
            const width = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = width;
                bar.style.transition = 'width 1.5s ease-out';
            }, index * 200);
        });
    }

    // Keyboard shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Only activate shortcuts when no input is focused
            if (document.activeElement.tagName === 'INPUT' || 
                document.activeElement.tagName === 'TEXTAREA') {
                return;
            }

            switch (e.key) {
                case 'h':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        window.navigationManager.navigateToSection('home');
                    }
                    break;
                case 'd':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        window.navigationManager.navigateToSection('dsa');
                    }
                    break;
                case 'p':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        window.navigationManager.navigateToSection('programming');
                    }
                    break;
                case 'c':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        window.navigationManager.navigateToSection('careers');
                    }
                    break;
                case '/':
                    e.preventDefault();
                    this.focusSearch();
                    break;
                case 'Escape':
                    this.closeAllModals();
                    break;
            }
        });

        // Show keyboard shortcuts help
        this.createKeyboardShortcutsHelp();
    }

    createKeyboardShortcutsHelp() {
        const helpButton = document.createElement('button');
        helpButton.className = 'fixed bottom-4 left-4 w-12 h-12 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors z-40';
        helpButton.innerHTML = '<i class="fas fa-keyboard text-lg"></i>';
        helpButton.title = 'Keyboard Shortcuts (?)';
        
        helpButton.addEventListener('click', () => {
            this.showKeyboardShortcutsModal();
        });
        
        document.body.appendChild(helpButton);

        // Also trigger with '?' key
        document.addEventListener('keydown', (e) => {
            if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
                if (document.activeElement.tagName !== 'INPUT' && 
                    document.activeElement.tagName !== 'TEXTAREA') {
                    e.preventDefault();
                    this.showKeyboardShortcutsModal();
                }
            }
        });
    }

    showKeyboardShortcutsModal() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
                <h3 class="text-2xl font-bold text-gray-800 mb-6">Keyboard Shortcuts</h3>
                <div class="space-y-4">
                    <div class="flex justify-between items-center">
                        <span class="text-gray-700">Home</span>
                        <kbd class="px-2 py-1 bg-gray-200 rounded text-sm">Ctrl + H</kbd>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-700">DSA Learning</span>
                        <kbd class="px-2 py-1 bg-gray-200 rounded text-sm">Ctrl + D</kbd>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-700">Programming</span>
                        <kbd class="px-2 py-1 bg-gray-200 rounded text-sm">Ctrl + P</kbd>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-700">Career Paths</span>
                        <kbd class="px-2 py-1 bg-gray-200 rounded text-sm">Ctrl + C</kbd>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-700">Search</span>
                        <kbd class="px-2 py-1 bg-gray-200 rounded text-sm">/</kbd>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-700">Close Modals</span>
                        <kbd class="px-2 py-1 bg-gray-200 rounded text-sm">Esc</kbd>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-700">This Help</span>
                        <kbd class="px-2 py-1 bg-gray-200 rounded text-sm">?</kbd>
                    </div>
                </div>
                <button class="w-full mt-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Got it!
                </button>
            </div>
        `;
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.tagName === 'BUTTON') {
                modal.remove();
            }
        });
        
        document.body.appendChild(modal);
    }

    // Tooltip system
    setupTooltips() {
        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.id = 'tooltip';
        tooltip.className = 'fixed bg-gray-800 text-white px-3 py-2 rounded-lg text-sm pointer-events-none z-50 opacity-0 transition-opacity duration-200';
        document.body.appendChild(tooltip);

        // Add tooltips to elements with title attribute
        document.addEventListener('mouseover', (e) => {
            const target = e.target.closest('[title], [data-tooltip]');
            if (target) {
                const text = target.getAttribute('title') || target.getAttribute('data-tooltip');
                if (text) {
                    this.showTooltip(text, e.pageX, e.pageY);
                    // Remove title to prevent default tooltip
                    if (target.hasAttribute('title')) {
                        target.setAttribute('data-original-title', text);
                        target.removeAttribute('title');
                    }
                }
            }
        });

        document.addEventListener('mouseout', (e) => {
            const target = e.target.closest('[data-original-title], [data-tooltip]');
            if (target) {
                this.hideTooltip();
                // Restore title attribute
                const originalTitle = target.getAttribute('data-original-title');
                if (originalTitle) {
                    target.setAttribute('title', originalTitle);
                    target.removeAttribute('data-original-title');
                }
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (tooltip.style.opacity === '1') {
                tooltip.style.left = (e.pageX + 10) + 'px';
                tooltip.style.top = (e.pageY - 30) + 'px';
            }
        });
    }

    showTooltip(text, x, y) {
        const tooltip = document.getElementById('tooltip');
        tooltip.textContent = text;
        tooltip.style.left = (x + 10) + 'px';
        tooltip.style.top = (y - 30) + 'px';
        tooltip.style.opacity = '1';
    }

    hideTooltip() {
        const tooltip = document.getElementById('tooltip');
        tooltip.style.opacity = '0';
    }

    // Code syntax highlighting
    setupCodeHighlighting() {
        // Simple syntax highlighting for code blocks
        document.querySelectorAll('.code-block').forEach(block => {
            this.highlightCode(block);
        });
    }

    highlightCode(codeBlock) {
        let code = codeBlock.innerHTML;
        
        // Highlight keywords
        code = code.replace(/\b(function|const|let|var|if|else|for|while|return|class|import|export)\b/g, 
            '<span class="keyword">$1</span>');
        
        // Highlight strings
        code = code.replace(/(["'`])(.*?)\1/g, '<span class="string">$1$2$1</span>');
        
        // Highlight comments
        code = code.replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>');
        code = code.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>');
        
        codeBlock.innerHTML = code;
    }

    // Theme toggle functionality
    setupThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'fixed top-4 right-4 w-10 h-10 bg-white border border-gray-300 rounded-full shadow-lg hover:shadow-xl transition-all z-40';
        themeToggle.innerHTML = '<i class="fas fa-moon text-gray-600"></i>';
        themeToggle.title = 'Toggle Dark Mode';
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            this.enableDarkMode();
            themeToggle.innerHTML = '<i class="fas fa-sun text-yellow-500"></i>';
        }
        
        themeToggle.addEventListener('click', () => {
            if (document.body.classList.contains('dark-mode')) {
                this.disableDarkMode();
                themeToggle.innerHTML = '<i class="fas fa-moon text-gray-600"></i>';
            } else {
                this.enableDarkMode();
                themeToggle.innerHTML = '<i class="fas fa-sun text-yellow-500"></i>';
            }
        });
        
        document.body.appendChild(themeToggle);
    }

    enableDarkMode() {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        
        // Add dark mode styles
        if (!document.getElementById('darkModeStyles')) {
            const darkStyles = document.createElement('style');
            darkStyles.id = 'darkModeStyles';
            darkStyles.textContent = `
                .dark-mode {
                    background: #1a1a1a !important;
                    color: #ffffff !important;
                }
                .dark-mode .bg-white {
                    background: #2a2a2a !important;
                    color: #ffffff !important;
                }
                .dark-mode .text-gray-800 {
                    color: #ffffff !important;
                }
                .dark-mode .text-gray-600 {
                    color: #cccccc !important;
                }
                .dark-mode .border-gray-200 {
                    border-color: #404040 !important;
                }
                .dark-mode nav {
                    background: rgba(42, 42, 42, 0.9) !important;
                }
            `;
            document.head.appendChild(darkStyles);
        }
    }

    disableDarkMode() {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }

    // Enhanced notification system
    setupNotificationSystem() {
        this.notificationQueue = [];
        this.activeNotifications = new Set();
        this.maxNotifications = 3;
    }

    showNotification(message, type = 'info', duration = 5000, actions = []) {
        const notification = document.createElement('div');
        const id = Date.now().toString();
        
        notification.id = `notification-${id}`;
        notification.className = `notification ${type} fixed top-6 right-6 max-w-sm p-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
        
        const iconMap = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        
        notification.innerHTML = `
            <div class="flex items-start space-x-3">
                <i class="${iconMap[type] || iconMap.info} text-xl"></i>
                <div class="flex-1">
                    <p class="font-medium">${message}</p>
                    ${actions.length > 0 ? `
                        <div class="flex space-x-2 mt-2">
                            ${actions.map(action => `
                                <button class="px-3 py-1 bg-white bg-opacity-20 rounded text-sm hover:bg-opacity-30 transition-colors" 
                                        onclick="${action.handler}">${action.text}</button>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
                <button class="text-white hover:text-gray-200 transition-colors" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Position notification
        const existingNotifications = document.querySelectorAll('.notification');
        notification.style.top = (24 + (existingNotifications.length * 80)) + 'px';
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Auto-remove
        if (duration > 0) {
            setTimeout(() => {
                this.removeNotification(notification);
            }, duration);
        }
        
        this.activeNotifications.add(id);
        return id;
    }

    removeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
                this.repositionNotifications();
            }
        }, 300);
    }

    repositionNotifications() {
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach((notification, index) => {
            notification.style.top = (24 + (index * 80)) + 'px';
        });
    }

    // Focus search functionality
    focusSearch() {
        const searchInput = document.getElementById('searchInput') || 
                          document.getElementById('chatInput');
        if (searchInput) {
            searchInput.focus();
        } else {
            // Create temporary search input if none exists
            this.createQuickSearch();
        }
    }

    createQuickSearch() {
        const searchOverlay = document.createElement('div');
        searchOverlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-32 z-50';
        
        searchOverlay.innerHTML = `
            <div class="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
                <input type="text" id="quickSearchInput" 
                       placeholder="Search DSA problems, topics, career paths..."
                       class="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600">
                <div id="quickSearchResults" class="mt-4 max-h-64 overflow-y-auto"></div>
            </div>
        `;
        
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) {
                searchOverlay.remove();
            }
        });
        
        document.body.appendChild(searchOverlay);
        document.getElementById('quickSearchInput').focus();
        
        // Setup search functionality
        this.setupQuickSearch();
    }

    setupQuickSearch() {
        const searchInput = document.getElementById('quickSearchInput');
        const searchResults = document.getElementById('quickSearchResults');
        
        let searchTimeout;
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();
            
            if (query.length > 2) {
                searchTimeout = setTimeout(() => {
                    this.performQuickSearch(query, searchResults);
                }, 300);
            } else {
                searchResults.innerHTML = '';
            }
        });
        
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                e.target.closest('.fixed').remove();
            }
        });
    }

    async performQuickSearch(query, resultsContainer) {
        // Mock search results - in real app, this would use the data manager
        const mockResults = [
            { title: 'Two Sum Problem', type: 'DSA Problem', section: 'dsa' },
            { title: 'Binary Search Algorithm', type: 'DSA Topic', section: 'dsa' },
            { title: 'JavaScript Fundamentals', type: 'Programming Course', section: 'programming' },
            { title: 'Full Stack Developer Path', type: 'Career Path', section: 'careers' }
        ].filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase())
        );
        
        if (mockResults.length > 0) {
            resultsContainer.innerHTML = mockResults.map(result => `
                <div class="quick-search-result p-3 hover:bg-gray-50 cursor-pointer rounded-lg border-b" 
                     data-section="${result.section}">
                    <h4 class="font-semibold text-gray-800">${result.title}</h4>
                    <p class="text-sm text-gray-600">${result.type}</p>
                </div>
            `).join('');
            
            // Add click listeners
            resultsContainer.querySelectorAll('.quick-search-result').forEach(item => {
                item.addEventListener('click', () => {
                    const section = item.dataset.section;
                    window.navigationManager.navigateToSection(section);
                    item.closest('.fixed').remove();
                });
            });
        } else {
            resultsContainer.innerHTML = '<div class="p-3 text-gray-500 text-center">No results found</div>';
        }
    }

    // Close all modals
    closeAllModals() {
        document.querySelectorAll('.fixed[class*="z-50"]').forEach(modal => {
            if (modal.classList.contains('bg-black')) { // Likely a modal backdrop
                modal.remove();
            }
        });
    }

    // Performance monitoring
    setupPerformanceMonitoring() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.entryType === 'navigation') {
                        console.log('Page load time:', entry.loadEventEnd - entry.loadEventStart);
                    }
                });
            });
            
            observer.observe({ entryTypes: ['navigation'] });
        }
    }
}

// Initialize interactive features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.interactiveFeatures = new InteractiveFeatures();
    
    // Make available to main app
    if (window.techGuideHub) {
        window.techGuideHub.interactiveFeatures = window.interactiveFeatures;
    }
});