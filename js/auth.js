// Authentication and user management for TechGuide Hub
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.isLoggedIn = false;
        this.init();
    }

    init() {
        this.setupAuthEventListeners();
        this.loadUserFromStorage();
        this.checkAuthState();
    }

    setupAuthEventListeners() {
        // Modal event listeners
        document.getElementById('loginBtn').addEventListener('click', () => {
            this.showLoginModal();
        });

        document.getElementById('signupBtn').addEventListener('click', () => {
            this.showSignupModal();
        });

        document.getElementById('closeLoginModal').addEventListener('click', () => {
            this.hideLoginModal();
        });

        document.getElementById('closeSignupModal').addEventListener('click', () => {
            this.hideSignupModal();
        });

        // Form submissions
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin(e);
        });

        document.getElementById('signupForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSignup(e);
        });

        // Close modals when clicking outside
        document.getElementById('loginModal').addEventListener('click', (e) => {
            if (e.target.id === 'loginModal') {
                this.hideLoginModal();
            }
        });

        document.getElementById('signupModal').addEventListener('click', (e) => {
            if (e.target.id === 'signupModal') {
                this.hideSignupModal();
            }
        });
    }

    showLoginModal() {
        document.getElementById('loginModal').classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    hideLoginModal() {
        document.getElementById('loginModal').classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    showSignupModal() {
        document.getElementById('signupModal').classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    hideSignupModal() {
        document.getElementById('signupModal').classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    async handleLogin(e) {
        const form = e.target;
        const formData = new FormData(form);
        const email = formData.get('email') || form.querySelector('input[type="email"]').value;
        const password = formData.get('password') || form.querySelector('input[type="password"]').value;

        try {
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<span class="loading-spinner"></span> Logging in...';
            submitBtn.disabled = true;

            // Simulate API call (replace with actual authentication)
            const user = await this.authenticateUser(email, password);
            
            if (user) {
                this.setUser(user);
                this.hideLoginModal();
                this.showNotification('Login successful! Welcome back.', 'success');
                form.reset();
            } else {
                this.showNotification('Invalid email or password.', 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showNotification('Login failed. Please try again.', 'error');
        } finally {
            // Reset button state
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Login';
            submitBtn.disabled = false;
        }
    }

    async handleSignup(e) {
        const form = e.target;
        const formData = new FormData(form);
        const userData = {
            name: formData.get('name') || form.querySelector('input[type="text"]').value,
            email: formData.get('email') || form.querySelector('input[type="email"]').value,
            year: formData.get('year') || form.querySelector('select').value,
            password: formData.get('password') || form.querySelector('input[type="password"]').value
        };

        try {
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<span class="loading-spinner"></span> Creating Account...';
            submitBtn.disabled = true;

            // Validate form data
            if (!this.validateSignupData(userData)) {
                return;
            }

            // Simulate API call (replace with actual registration)
            const user = await this.registerUser(userData);
            
            if (user) {
                this.setUser(user);
                this.hideSignupModal();
                this.showNotification('Account created successfully! Welcome to TechGuide Hub.', 'success');
                form.reset();
                
                // Initialize user's learning data
                this.initializeUserLearningData();
            }
        } catch (error) {
            console.error('Signup error:', error);
            this.showNotification('Registration failed. Please try again.', 'error');
        } finally {
            // Reset button state
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Sign Up';
            submitBtn.disabled = false;
        }
    }

    validateSignupData(userData) {
        if (!userData.name || userData.name.length < 2) {
            this.showNotification('Please enter a valid name.', 'error');
            return false;
        }

        if (!userData.email || !this.isValidEmail(userData.email)) {
            this.showNotification('Please enter a valid email address.', 'error');
            return false;
        }

        if (!userData.year) {
            this.showNotification('Please select your year of study.', 'error');
            return false;
        }

        if (!userData.password || userData.password.length < 6) {
            this.showNotification('Password must be at least 6 characters long.', 'error');
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async authenticateUser(email, password) {
        // Simulate API authentication
        // In a real app, this would make an API call to your backend
        return new Promise((resolve) => {
            setTimeout(() => {
                // Check if user exists in localStorage (mock database)
                const users = JSON.parse(localStorage.getItem('techGuideUsers') || '[]');
                const user = users.find(u => u.email === email && u.password === password);
                
                if (user) {
                    // Remove password from returned user object
                    const { password, ...userWithoutPassword } = user;
                    resolve({
                        ...userWithoutPassword,
                        lastLogin: new Date().toISOString()
                    });
                } else {
                    resolve(null);
                }
            }, 1000);
        });
    }

    async registerUser(userData) {
        // Simulate API registration
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    // Check if user already exists
                    const users = JSON.parse(localStorage.getItem('techGuideUsers') || '[]');
                    const existingUser = users.find(u => u.email === userData.email);
                    
                    if (existingUser) {
                        this.showNotification('An account with this email already exists.', 'error');
                        resolve(null);
                        return;
                    }

                    // Create new user
                    const newUser = {
                        id: Date.now().toString(),
                        name: userData.name,
                        email: userData.email,
                        year: userData.year,
                        password: userData.password, // In real app, this would be hashed
                        createdAt: new Date().toISOString(),
                        profile: {
                            avatar: null,
                            bio: '',
                            skills: [],
                            interests: [],
                            goals: []
                        },
                        progress: {
                            dsa: {
                                problemsSolved: 0,
                                timeSpent: 0,
                                currentStreak: 0,
                                longestStreak: 0,
                                topics: {}
                            },
                            programming: {
                                languages: {},
                                projects: [],
                                certificates: []
                            },
                            career: {
                                assessmentCompleted: false,
                                recommendedPath: null,
                                applications: [],
                                interviews: []
                            }
                        }
                    };

                    users.push(newUser);
                    localStorage.setItem('techGuideUsers', JSON.stringify(users));

                    // Remove password from returned user object
                    const { password, ...userWithoutPassword } = newUser;
                    resolve(userWithoutPassword);
                } catch (error) {
                    reject(error);
                }
            }, 1000);
        });
    }

    setUser(user) {
        this.currentUser = user;
        this.isLoggedIn = true;
        
        // Store user in localStorage
        localStorage.setItem('techGuideCurrentUser', JSON.stringify(user));
        
        // Update UI
        this.updateAuthUI();
        
        // Track login event
        this.trackUserEvent('login', { userId: user.id });
    }

    updateAuthUI() {
        const loginBtn = document.getElementById('loginBtn');
        const signupBtn = document.getElementById('signupBtn');
        
        if (this.isLoggedIn && this.currentUser) {
            // Hide login/signup buttons and show user menu
            loginBtn.style.display = 'none';
            signupBtn.style.display = 'none';
            
            // Create user menu if it doesn't exist
            if (!document.getElementById('userMenu')) {
                this.createUserMenu();
            }
        } else {
            // Show login/signup buttons
            loginBtn.style.display = 'block';
            signupBtn.style.display = 'block';
            
            // Remove user menu if it exists
            const userMenu = document.getElementById('userMenu');
            if (userMenu) {
                userMenu.remove();
            }
        }
    }

    createUserMenu() {
        const userMenu = document.createElement('div');
        userMenu.id = 'userMenu';
        userMenu.className = 'relative';
        
        userMenu.innerHTML = `
            <button id="userMenuBtn" class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                    <span class="text-white text-sm font-semibold">${this.currentUser.name.charAt(0).toUpperCase()}</span>
                </div>
                <span class="text-gray-700 font-medium">${this.currentUser.name.split(' ')[0]}</span>
                <i class="fas fa-chevron-down text-gray-500 text-xs"></i>
            </button>
            
            <div id="userDropdown" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border hidden z-50">
                <div class="p-3 border-b">
                    <p class="font-semibold text-gray-800">${this.currentUser.name}</p>
                    <p class="text-sm text-gray-600">${this.currentUser.email}</p>
                    <span class="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded mt-1">${this.currentUser.year} Year</span>
                </div>
                
                <div class="py-1">
                    <a href="#dashboard" class="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                        <i class="fas fa-chart-line mr-2"></i>Dashboard
                    </a>
                    <a href="#" id="profileLink" class="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                        <i class="fas fa-user mr-2"></i>Profile
                    </a>
                    <a href="#" id="settingsLink" class="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                        <i class="fas fa-cog mr-2"></i>Settings
                    </a>
                </div>
                
                <div class="py-1 border-t">
                    <button id="logoutBtn" class="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors">
                        <i class="fas fa-sign-out-alt mr-2"></i>Logout
                    </button>
                </div>
            </div>
        `;
        
        // Insert user menu before login button
        const loginBtn = document.getElementById('loginBtn');
        loginBtn.parentNode.insertBefore(userMenu, loginBtn);
        
        // Setup dropdown functionality
        this.setupUserMenuListeners();
    }

    setupUserMenuListeners() {
        const userMenuBtn = document.getElementById('userMenuBtn');
        const userDropdown = document.getElementById('userDropdown');
        const logoutBtn = document.getElementById('logoutBtn');
        
        // Toggle dropdown
        userMenuBtn.addEventListener('click', () => {
            userDropdown.classList.toggle('hidden');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!userMenuBtn.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.add('hidden');
            }
        });
        
        // Logout functionality
        logoutBtn.addEventListener('click', () => {
            this.logout();
        });
        
        // Profile and settings links
        document.getElementById('profileLink').addEventListener('click', (e) => {
            e.preventDefault();
            this.showProfileModal();
        });
        
        document.getElementById('settingsLink').addEventListener('click', (e) => {
            e.preventDefault();
            this.showSettingsModal();
        });
    }

    logout() {
        // Clear user data
        this.currentUser = null;
        this.isLoggedIn = false;
        
        // Remove from localStorage
        localStorage.removeItem('techGuideCurrentUser');
        
        // Update UI
        this.updateAuthUI();
        
        // Navigate to home
        if (window.navigationManager) {
            window.navigationManager.navigateToSection('home');
        }
        
        // Show notification
        this.showNotification('You have been logged out successfully.', 'info');
        
        // Track logout event
        this.trackUserEvent('logout');
    }

    loadUserFromStorage() {
        const storedUser = localStorage.getItem('techGuideCurrentUser');
        if (storedUser) {
            try {
                this.currentUser = JSON.parse(storedUser);
                this.isLoggedIn = true;
            } catch (error) {
                console.error('Error parsing stored user:', error);
                localStorage.removeItem('techGuideCurrentUser');
            }
        }
    }

    checkAuthState() {
        // Update UI based on auth state
        this.updateAuthUI();
        
        // Check if user needs to complete profile
        if (this.isLoggedIn && this.currentUser) {
            this.checkProfileCompleteness();
        }
    }

    checkProfileCompleteness() {
        const user = this.currentUser;
        let completeness = 0;
        
        // Check profile fields
        if (user.profile.bio) completeness += 20;
        if (user.profile.skills.length > 0) completeness += 20;
        if (user.profile.interests.length > 0) completeness += 20;
        if (user.profile.goals.length > 0) completeness += 20;
        if (user.profile.avatar) completeness += 20;
        
        // Store completeness
        this.currentUser.profileCompleteness = completeness;
        
        // Show prompt if profile is incomplete
        if (completeness < 60) {
            setTimeout(() => {
                this.showProfileCompletionPrompt();
            }, 3000);
        }
    }

    showProfileCompletionPrompt() {
        const prompt = document.createElement('div');
        prompt.className = 'fixed bottom-4 left-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg max-w-sm z-50';
        prompt.innerHTML = `
            <div class="flex items-start space-x-3">
                <i class="fas fa-user-circle text-2xl"></i>
                <div class="flex-1">
                    <h4 class="font-semibold mb-1">Complete Your Profile</h4>
                    <p class="text-sm text-blue-100 mb-3">Get better recommendations by completing your profile (${this.currentUser.profileCompleteness}% complete)</p>
                    <div class="flex space-x-2">
                        <button onclick="this.parentElement.parentElement.parentElement.parentElement.remove()" class="px-3 py-1 bg-blue-500 rounded text-sm hover:bg-blue-400">
                            Complete Now
                        </button>
                        <button onclick="this.parentElement.parentElement.parentElement.parentElement.remove()" class="px-3 py-1 bg-transparent border border-blue-300 rounded text-sm hover:bg-blue-500">
                            Later
                        </button>
                    </div>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" class="text-blue-200 hover:text-white">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(prompt);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (prompt.parentElement) {
                prompt.remove();
            }
        }, 10000);
    }

    initializeUserLearningData() {
        // Initialize empty learning progress for new user
        const initialProgress = {
            dsa: {
                problemsSolved: 0,
                timeSpent: 0,
                currentStreak: 0,
                longestStreak: 0,
                lastActivity: null,
                topics: {
                    arrays: { completed: 0, total: 50, timeSpent: 0 },
                    strings: { completed: 0, total: 30, timeSpent: 0 },
                    linkedLists: { completed: 0, total: 25, timeSpent: 0 },
                    trees: { completed: 0, total: 40, timeSpent: 0 },
                    graphs: { completed: 0, total: 35, timeSpent: 0 },
                    dynamicProgramming: { completed: 0, total: 45, timeSpent: 0 }
                }
            },
            programming: {
                languages: {
                    javascript: { level: 'beginner', progress: 0, projects: [] },
                    python: { level: 'beginner', progress: 0, projects: [] },
                    html_css: { level: 'beginner', progress: 0, projects: [] }
                },
                totalProjects: 0,
                certificates: []
            },
            career: {
                assessmentCompleted: false,
                recommendedPath: null,
                skills: [],
                applications: [],
                interviews: []
            }
        };

        // Update user progress
        this.currentUser.progress = { ...this.currentUser.progress, ...initialProgress };
        this.updateUserInStorage();
    }

    updateUserInStorage() {
        if (this.isLoggedIn && this.currentUser) {
            localStorage.setItem('techGuideCurrentUser', JSON.stringify(this.currentUser));
            
            // Also update in users array
            const users = JSON.parse(localStorage.getItem('techGuideUsers') || '[]');
            const userIndex = users.findIndex(u => u.id === this.currentUser.id);
            if (userIndex !== -1) {
                users[userIndex] = { ...users[userIndex], ...this.currentUser };
                localStorage.setItem('techGuideUsers', JSON.stringify(users));
            }
        }
    }

    trackUserEvent(eventType, data = {}) {
        const eventData = {
            type: eventType,
            timestamp: new Date().toISOString(),
            userId: this.currentUser ? this.currentUser.id : null,
            ...data
        };

        // Store in session storage for analytics
        const events = JSON.parse(sessionStorage.getItem('userEvents') || '[]');
        events.push(eventData);
        sessionStorage.setItem('userEvents', JSON.stringify(events));
    }

    showNotification(message, type = 'info') {
        if (window.techGuideHub && window.techGuideHub.showNotification) {
            window.techGuideHub.showNotification(message, type);
        } else {
            // Fallback notification
            alert(message);
        }
    }

    // Profile and settings modals (simplified versions)
    showProfileModal() {
        // This would show a detailed profile editing modal
        this.showNotification('Profile editing feature coming soon!', 'info');
    }

    showSettingsModal() {
        // This would show user settings modal
        this.showNotification('Settings feature coming soon!', 'info');
    }
}

// Initialize auth manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.authManager = new AuthManager();
    
    // Make auth manager available to main app
    if (window.techGuideHub) {
        window.techGuideHub.authManager = window.authManager;
    }
});