// Navigation and routing functionality for TechGuide Hub
class NavigationManager {
    constructor() {
        this.currentSection = 'home';
        this.sectionHistory = [];
        this.init();
    }

    init() {
        this.setupNavigationListeners();
        this.setupMobileMenu();
        this.handleInitialRoute();
    }

    setupNavigationListeners() {
        // Desktop navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target.getAttribute('href').substring(1);
                this.navigateToSection(target);
            });
        });

        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.md\\:hidden button');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.section) {
                this.navigateToSection(e.state.section, false);
            }
        });
    }

    setupMobileMenu() {
        // Create mobile menu overlay
        const mobileMenu = document.createElement('div');
        mobileMenu.id = 'mobileMenu';
        mobileMenu.className = 'fixed inset-0 bg-white z-50 hidden';
        mobileMenu.innerHTML = `
            <div class="flex justify-between items-center p-4 border-b">
                <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                        <i class="fas fa-graduation-cap text-white"></i>
                    </div>
                    <h1 class="text-xl font-bold text-gray-800">TechGuide Hub</h1>
                </div>
                <button id="closeMobileMenu" class="p-2">
                    <i class="fas fa-times text-gray-700"></i>
                </button>
            </div>
            
            <div class="p-4">
                <nav class="space-y-4">
                    <a href="#home" class="mobile-nav-link block py-3 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                        <i class="fas fa-home mr-3"></i>Home
                    </a>
                    <a href="#dsa" class="mobile-nav-link block py-3 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                        <i class="fas fa-code mr-3"></i>DSA Learning
                    </a>
                    <a href="#programming" class="mobile-nav-link block py-3 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                        <i class="fas fa-laptop-code mr-3"></i>Programming
                    </a>
                    <a href="#careers" class="mobile-nav-link block py-3 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                        <i class="fas fa-route mr-3"></i>Career Paths
                    </a>
                    <a href="#dashboard" class="mobile-nav-link block py-3 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                        <i class="fas fa-chart-line mr-3"></i>Dashboard
                    </a>
                    <a href="#ai-assistant" class="mobile-nav-link block py-3 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                        <i class="fas fa-robot mr-3"></i>AI Assistant
                    </a>
                </nav>
                
                <div class="mt-8 pt-8 border-t space-y-3">
                    <button id="mobileLoginBtn" class="w-full py-2 px-4 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                        Login
                    </button>
                    <button id="mobileSignupBtn" class="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Sign Up
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(mobileMenu);
        
        // Setup mobile menu event listeners
        document.getElementById('closeMobileMenu').addEventListener('click', () => {
            this.closeMobileMenu();
        });

        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target.getAttribute('href').substring(1);
                this.navigateToSection(target);
                this.closeMobileMenu();
            });
        });

        // Mobile auth buttons
        document.getElementById('mobileLoginBtn').addEventListener('click', () => {
            window.techGuideHub.authManager.showLoginModal();
            this.closeMobileMenu();
        });

        document.getElementById('mobileSignupBtn').addEventListener('click', () => {
            window.techGuideHub.authManager.showSignupModal();
            this.closeMobileMenu();
        });
    }

    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }

    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    navigateToSection(sectionName, updateHistory = true) {
        // Validate section name
        const validSections = ['home', 'dsa', 'programming', 'careers', 'dashboard', 'ai-assistant'];
        if (!validSections.includes(sectionName)) {
            sectionName = 'home';
        }

        // Store previous section in history
        if (updateHistory && this.currentSection !== sectionName) {
            this.sectionHistory.push(this.currentSection);
            
            // Update browser URL
            const newUrl = sectionName === 'home' ? '/' : `/#${sectionName}`;
            history.pushState({ section: sectionName }, '', newUrl);
        }

        // Hide all sections
        document.querySelectorAll('.section-content').forEach(section => {
            section.classList.add('hidden');
            section.classList.remove('active');
        });

        // Update current section
        this.currentSection = sectionName;

        // Show target section
        if (sectionName === 'home') {
            // Show hero section and hide content sections
            document.getElementById('contentSections').classList.add('hidden');
            this.scrollToTop();
        } else {
            // Show content sections container
            document.getElementById('contentSections').classList.remove('hidden');
            
            // Show specific section
            const targetSection = document.getElementById(sectionName + 'Section');
            if (targetSection) {
                targetSection.classList.remove('hidden');
                setTimeout(() => {
                    targetSection.classList.add('active');
                }, 10);
                
                // Load section content if needed
                this.loadSectionContent(sectionName);
            }
            
            this.scrollToTop();
        }

        // Update navigation active state
        this.updateNavigationState(sectionName);
        
        // Analytics tracking
        this.trackNavigation(sectionName);
    }

    loadSectionContent(sectionName) {
        // Delegate to main app for content loading
        if (window.techGuideHub && window.techGuideHub.loadSectionContent) {
            window.techGuideHub.loadSectionContent(sectionName);
        }
    }

    updateNavigationState(activeSection) {
        // Update desktop navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('text-blue-600', 'font-bold');
            if (link.getAttribute('href') === `#${activeSection}`) {
                link.classList.add('text-blue-600', 'font-bold');
            }
        });

        // Update mobile navigation
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.classList.remove('bg-blue-50', 'text-blue-600');
            if (link.getAttribute('href') === `#${activeSection}`) {
                link.classList.add('bg-blue-50', 'text-blue-600');
            }
        });

        // Update page title
        this.updatePageTitle(activeSection);
    }

    updatePageTitle(sectionName) {
        const titles = {
            'home': 'TechGuide Hub - Complete B.Tech Learning Platform',
            'dsa': 'DSA Mastery - TechGuide Hub',
            'programming': 'Programming Fundamentals - TechGuide Hub',
            'careers': 'Career Path Explorer - TechGuide Hub',
            'dashboard': 'Learning Dashboard - TechGuide Hub',
            'ai-assistant': 'AI Learning Assistant - TechGuide Hub'
        };
        
        document.title = titles[sectionName] || titles['home'];
    }

    handleInitialRoute() {
        // Check URL hash and navigate to appropriate section
        const hash = window.location.hash;
        if (hash && hash.length > 1) {
            const section = hash.substring(1);
            this.navigateToSection(section, false);
        }
    }

    goBack() {
        if (this.sectionHistory.length > 0) {
            const previousSection = this.sectionHistory.pop();
            this.navigateToSection(previousSection, false);
            
            // Update browser history
            const newUrl = previousSection === 'home' ? '/' : `/#${previousSection}`;
            history.replaceState({ section: previousSection }, '', newUrl);
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    scrollToElement(elementId, offset = 0) {
        const element = document.getElementById(elementId);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            });
        }
    }

    trackNavigation(sectionName) {
        // Track navigation for analytics
        if (window.gtag) {
            window.gtag('event', 'page_view', {
                page_title: document.title,
                page_location: window.location.href,
                page_path: window.location.pathname + window.location.hash,
                section: sectionName
            });
        }
        
        // Store in session storage for internal analytics
        const navigationData = {
            section: sectionName,
            timestamp: Date.now(),
            referrer: this.sectionHistory.length > 0 ? this.sectionHistory[this.sectionHistory.length - 1] : 'direct'
        };
        
        const sessionNavigation = JSON.parse(sessionStorage.getItem('navigation') || '[]');
        sessionNavigation.push(navigationData);
        sessionStorage.setItem('navigation', JSON.stringify(sessionNavigation));
    }

    // Breadcrumb functionality
    generateBreadcrumb(sectionName) {
        const breadcrumbMap = {
            'home': [{ name: 'Home', path: 'home' }],
            'dsa': [
                { name: 'Home', path: 'home' },
                { name: 'DSA Learning', path: 'dsa' }
            ],
            'programming': [
                { name: 'Home', path: 'home' },
                { name: 'Programming', path: 'programming' }
            ],
            'careers': [
                { name: 'Home', path: 'home' },
                { name: 'Career Paths', path: 'careers' }
            ],
            'dashboard': [
                { name: 'Home', path: 'home' },
                { name: 'Dashboard', path: 'dashboard' }
            ],
            'ai-assistant': [
                { name: 'Home', path: 'home' },
                { name: 'AI Assistant', path: 'ai-assistant' }
            ]
        };

        return breadcrumbMap[sectionName] || breadcrumbMap['home'];
    }

    showBreadcrumb(sectionName) {
        const breadcrumb = this.generateBreadcrumb(sectionName);
        const breadcrumbContainer = document.getElementById('breadcrumb');
        
        if (breadcrumbContainer) {
            breadcrumbContainer.innerHTML = breadcrumb.map((item, index) => `
                <span class="breadcrumb-item ${index === breadcrumb.length - 1 ? 'active' : ''}">
                    ${index === breadcrumb.length - 1 
                        ? item.name 
                        : `<a href="#${item.path}" class="text-blue-600 hover:text-blue-800">${item.name}</a>`
                    }
                    ${index < breadcrumb.length - 1 ? '<i class="fas fa-chevron-right text-gray-400 mx-2"></i>' : ''}
                </span>
            `).join('');
        }
    }

    // Search functionality
    initializeSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');
        
        if (searchInput && searchResults) {
            let searchTimeout;
            
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                const query = e.target.value.trim();
                
                if (query.length > 2) {
                    searchTimeout = setTimeout(() => {
                        this.performSearch(query);
                    }, 300);
                } else {
                    searchResults.classList.add('hidden');
                }
            });
            
            // Close search results when clicking outside
            document.addEventListener('click', (e) => {
                if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                    searchResults.classList.add('hidden');
                }
            });
        }
    }

    performSearch(query) {
        // This would integrate with a search API or perform client-side search
        const mockResults = [
            { title: 'Binary Search Algorithm', section: 'dsa', type: 'Topic' },
            { title: 'JavaScript Fundamentals', section: 'programming', type: 'Course' },
            { title: 'Full Stack Developer Path', section: 'careers', type: 'Career' },
            { title: 'Resume Builder', section: 'dashboard', type: 'Tool' }
        ].filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase())
        );

        this.displaySearchResults(mockResults);
    }

    displaySearchResults(results) {
        const searchResults = document.getElementById('searchResults');
        
        if (results.length > 0) {
            searchResults.innerHTML = results.map(result => `
                <div class="search-result-item p-3 hover:bg-gray-50 cursor-pointer border-b" data-section="${result.section}">
                    <h4 class="font-semibold text-gray-800">${result.title}</h4>
                    <p class="text-sm text-gray-600">${result.type} in ${result.section}</p>
                </div>
            `).join('');
            
            searchResults.classList.remove('hidden');
            
            // Add click listeners to search results
            searchResults.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => {
                    const section = item.dataset.section;
                    this.navigateToSection(section);
                    searchResults.classList.add('hidden');
                });
            });
        } else {
            searchResults.innerHTML = '<div class="p-3 text-gray-500">No results found</div>';
            searchResults.classList.remove('hidden');
        }
    }

    // Progress navigation
    setupProgressNavigation() {
        // Add previous/next navigation for learning paths
        const progressNav = document.createElement('div');
        progressNav.className = 'fixed bottom-6 right-6 flex space-x-3 z-40';
        progressNav.innerHTML = `
            <button id="prevBtn" class="w-12 h-12 bg-white border border-gray-300 rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                <i class="fas fa-chevron-left text-gray-600"></i>
            </button>
            <button id="nextBtn" class="w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                <i class="fas fa-chevron-right"></i>
            </button>
        `;
        
        document.body.appendChild(progressNav);
        
        // Add event listeners
        document.getElementById('prevBtn').addEventListener('click', () => {
            this.goBack();
        });
        
        document.getElementById('nextBtn').addEventListener('click', () => {
            this.goToNextSection();
        });
    }

    goToNextSection() {
        const sectionOrder = ['home', 'dsa', 'programming', 'careers', 'dashboard', 'ai-assistant'];
        const currentIndex = sectionOrder.indexOf(this.currentSection);
        
        if (currentIndex < sectionOrder.length - 1) {
            const nextSection = sectionOrder[currentIndex + 1];
            this.navigateToSection(nextSection);
        }
    }
}

// Initialize navigation manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.navigationManager = new NavigationManager();
});