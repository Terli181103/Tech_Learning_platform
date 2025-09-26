// Main JavaScript for TechGuide Hub
class TechGuideHub {
    constructor() {
        this.currentUser = null;
        this.currentSection = 'home';
        this.learningProgress = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadUserData();
        this.initializeCharts();
        this.setupSmoothScrolling();
        this.loadDSAContent();
    }

    setupEventListeners() {
        // Navigation event listeners
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target.getAttribute('href').substring(1);
                this.navigateToSection(target);
            });
        });

        // Button event listeners
        const startLearningBtn = document.getElementById('startLearningBtn');
        const explorePathsBtn = document.getElementById('explorePathsBtn');
        
        if (startLearningBtn) {
            startLearningBtn.addEventListener('click', () => {
                this.navigateToSection('dsa');
            });
        }
        
        if (explorePathsBtn) {
            explorePathsBtn.addEventListener('click', () => {
                this.navigateToSection('careers');
            });
        }

        // Feature card clicks
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const button = e.currentTarget.querySelector('button');
                if (button) {
                    const section = this.extractSectionFromButton(button.textContent);
                    this.navigateToSection(section);
                }
            });
        });
    }

    extractSectionFromButton(buttonText) {
        if (buttonText.includes('DSA')) return 'dsa';
        if (buttonText.includes('Programming')) return 'programming';
        if (buttonText.includes('Paths')) return 'careers';
        if (buttonText.includes('Dashboard')) return 'dashboard';
        if (buttonText.includes('Resume')) return 'dashboard';
        if (buttonText.includes('Jobs')) return 'ai-assistant';
        return 'home';
    }

    navigateToSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.section-content').forEach(section => {
            section.classList.add('hidden');
        });

        // Update current section
        this.currentSection = sectionName;

        // Show target section based on sectionName
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
                this.loadSectionContent(sectionName);
            }
            
            this.scrollToTop();
        }

        // Update navigation active state
        this.updateNavigationState(sectionName);
    }

    updateNavigationState(activeSection) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('text-blue-600');
            if (link.getAttribute('href') === `#${activeSection}`) {
                link.classList.add('text-blue-600');
            }
        });
    }

    loadSectionContent(sectionName) {
        switch (sectionName) {
            case 'dsa':
                this.loadDSASection();
                break;
            case 'programming':
                this.loadProgrammingSection();
                break;
            case 'careers':
                this.loadCareersSection();
                break;
            case 'dashboard':
                this.loadDashboardSection();
                break;
            case 'ai-assistant':
                this.loadAISection();
                break;
        }
    }

    loadDSASection() {
        const dsaSection = document.getElementById('dsaSection');
        if (dsaSection && dsaSection.querySelector('.container').children.length <= 1) {
            dsaSection.querySelector('.container').innerHTML = `
                <h2 class="text-4xl font-bold text-center text-gray-800 mb-16">Data Structures & Algorithms Mastery</h2>
                
                <!-- Learning Path Overview -->
                <div class="grid lg:grid-cols-3 gap-8 mb-16">
                    <div class="lg:col-span-2">
                        <div class="bg-white rounded-2xl p-8 shadow-lg">
                            <h3 class="text-2xl font-bold text-gray-800 mb-6">Your DSA Learning Journey</h3>
                            <div class="space-y-6">
                                <div class="learning-path completed">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <h4 class="font-semibold text-gray-800">Fundamentals</h4>
                                            <p class="text-gray-600 text-sm">Time Complexity, Space Complexity, Basic Concepts</p>
                                        </div>
                                        <div class="text-green-600">
                                            <i class="fas fa-check-circle text-xl"></i>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="learning-path current">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <h4 class="font-semibold text-gray-800">Arrays & Strings</h4>
                                            <p class="text-gray-600 text-sm">Two Pointers, Sliding Window, Prefix Sum</p>
                                        </div>
                                        <div class="text-blue-600">
                                            <div class="w-8 h-8 border-2 border-blue-600 rounded-full flex items-center justify-center">
                                                <div class="w-3 h-3 bg-blue-600 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-3 w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-blue-600 h-2 rounded-full" style="width: 65%"></div>
                                    </div>
                                </div>
                                
                                <div class="learning-path">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <h4 class="font-semibold text-gray-800">Linked Lists</h4>
                                            <p class="text-gray-600 text-sm">Fast & Slow Pointers, Reversal, Merging</p>
                                        </div>
                                        <div class="text-gray-400">
                                            <i class="fas fa-lock text-xl"></i>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="learning-path">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <h4 class="font-semibold text-gray-800">Trees & Graphs</h4>
                                            <p class="text-gray-600 text-sm">Binary Trees, BST, DFS, BFS, Shortest Path</p>
                                        </div>
                                        <div class="text-gray-400">
                                            <i class="fas fa-lock text-xl"></i>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="learning-path">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <h4 class="font-semibold text-gray-800">Dynamic Programming</h4>
                                            <p class="text-gray-600 text-sm">Knapsack, LCS, Stock Problems, Game Theory</p>
                                        </div>
                                        <div class="text-gray-400">
                                            <i class="fas fa-lock text-xl"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="space-y-6">
                        <div class="bg-white rounded-2xl p-6 shadow-lg">
                            <h4 class="font-bold text-gray-800 mb-4">Progress Stats</h4>
                            <div class="space-y-4">
                                <div>
                                    <div class="flex justify-between text-sm text-gray-600 mb-1">
                                        <span>Problems Solved</span>
                                        <span>127/500</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-green-600 h-2 rounded-full" style="width: 25%"></div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex justify-between text-sm text-gray-600 mb-1">
                                        <span>Time Spent</span>
                                        <span>45 hours</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-blue-600 h-2 rounded-full" style="width: 60%"></div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex justify-between text-sm text-gray-600 mb-1">
                                        <span>Streak</span>
                                        <span>12 days</span>
                                    </div>
                                    <div class="text-orange-600 text-2xl font-bold">🔥</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-white rounded-2xl p-6 shadow-lg">
                            <h4 class="font-bold text-gray-800 mb-4">Today's Challenge</h4>
                            <div class="border-l-4 border-blue-600 pl-4">
                                <h5 class="font-semibold text-gray-800">Two Sum Problem</h5>
                                <p class="text-gray-600 text-sm mb-2">Find two numbers that add up to target</p>
                                <span class="difficulty-easy">Easy</span>
                            </div>
                            <button class="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                Solve Now
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Current Topic: Arrays & Strings -->
                <div class="bg-white rounded-2xl p-8 shadow-lg mb-12">
                    <div class="flex items-center justify-between mb-8">
                        <h3 class="text-2xl font-bold text-gray-800">Arrays & Strings Mastery</h3>
                        <span class="skill-level intermediate">Intermediate</span>
                    </div>
                    
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div class="topic-card completed">
                            <div class="flex items-center justify-between mb-3">
                                <h4 class="font-semibold text-gray-800">Two Pointers</h4>
                                <i class="fas fa-check-circle text-green-600"></i>
                            </div>
                            <p class="text-gray-600 text-sm mb-4">Master the two-pointer technique for array problems</p>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-500">8/8 problems</span>
                                <button class="text-green-600 font-semibold text-sm">Review</button>
                            </div>
                        </div>
                        
                        <div class="topic-card in-progress">
                            <div class="flex items-center justify-between mb-3">
                                <h4 class="font-semibold text-gray-800">Sliding Window</h4>
                                <div class="w-6 h-6 border-2 border-orange-500 rounded-full flex items-center justify-center">
                                    <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
                                </div>
                            </div>
                            <p class="text-gray-600 text-sm mb-4">Learn sliding window pattern for subarray problems</p>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-500">5/12 problems</span>
                                <button class="text-orange-600 font-semibold text-sm">Continue</button>
                            </div>
                        </div>
                        
                        <div class="topic-card">
                            <div class="flex items-center justify-between mb-3">
                                <h4 class="font-semibold text-gray-800">Prefix Sum</h4>
                                <i class="fas fa-lock text-gray-400"></i>
                            </div>
                            <p class="text-gray-600 text-sm mb-4">Efficient range sum queries and optimizations</p>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-500">0/10 problems</span>
                                <button class="text-gray-400 font-semibold text-sm">Locked</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Practice Problems Section -->
                <div class="bg-white rounded-2xl p-8 shadow-lg">
                    <h3 class="text-2xl font-bold text-gray-800 mb-8">Practice Problems</h3>
                    
                    <div class="grid gap-4">
                        ${this.generatePracticeProblems()}
                    </div>
                </div>
            `;
        }
    }

    generatePracticeProblems() {
        const problems = [
            { name: "Two Sum", difficulty: "easy", status: "solved", topic: "Arrays", time: "O(n)" },
            { name: "Maximum Subarray", difficulty: "easy", status: "solved", topic: "Dynamic Programming", time: "O(n)" },
            { name: "Sliding Window Maximum", difficulty: "hard", status: "attempted", topic: "Sliding Window", time: "O(n)" },
            { name: "Longest Substring Without Repeating", difficulty: "medium", status: "new", topic: "Sliding Window", time: "O(n)" },
            { name: "Merge Intervals", difficulty: "medium", status: "new", topic: "Arrays", time: "O(n log n)" },
            { name: "Trapping Rain Water", difficulty: "hard", status: "new", topic: "Two Pointers", time: "O(n)" }
        ];

        return problems.map(problem => `
            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
                <div class="flex items-center space-x-4">
                    <div class="w-8 h-8 flex items-center justify-center rounded-full ${problem.status === 'solved' ? 'bg-green-100 text-green-600' : problem.status === 'attempted' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}">
                        ${problem.status === 'solved' ? '<i class="fas fa-check text-sm"></i>' : problem.status === 'attempted' ? '<i class="fas fa-clock text-sm"></i>' : '<i class="fas fa-code text-sm"></i>'}
                    </div>
                    <div>
                        <h4 class="font-semibold text-gray-800">${problem.name}</h4>
                        <div class="flex items-center space-x-3 text-sm text-gray-600">
                            <span>${problem.topic}</span>
                            <span>•</span>
                            <span>${problem.time}</span>
                        </div>
                    </div>
                </div>
                <div class="flex items-center space-x-3">
                    <span class="difficulty-${problem.difficulty}">${problem.difficulty}</span>
                    <button class="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                        ${problem.status === 'solved' ? 'Review' : 'Solve'}
                    </button>
                </div>
            </div>
        `).join('');
    }

    loadProgrammingSection() {
        const programmingSection = document.getElementById('programmingSection');
        if (programmingSection && programmingSection.querySelector('.container').children.length <= 1) {
            programmingSection.querySelector('.container').innerHTML = `
                <h2 class="text-4xl font-bold text-center text-gray-800 mb-16">Programming Fundamentals</h2>
                
                <div class="grid lg:grid-cols-4 gap-8">
                    <!-- Programming Languages -->
                    <div class="lg:col-span-3 space-y-8">
                        ${this.generateProgrammingLanguages()}
                    </div>
                    
                    <!-- Progress Sidebar -->
                    <div class="space-y-6">
                        <div class="bg-white rounded-2xl p-6 shadow-lg">
                            <h4 class="font-bold text-gray-800 mb-4">Overall Progress</h4>
                            <canvas id="programmingProgressChart" width="200" height="200"></canvas>
                        </div>
                        
                        <div class="bg-white rounded-2xl p-6 shadow-lg">
                            <h4 class="font-bold text-gray-800 mb-4">Current Project</h4>
                            <div class="border-l-4 border-green-600 pl-4">
                                <h5 class="font-semibold text-gray-800">Portfolio Website</h5>
                                <p class="text-gray-600 text-sm">HTML, CSS, JavaScript</p>
                                <div class="mt-2 w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-green-600 h-2 rounded-full" style="width: 80%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Initialize programming progress chart
            setTimeout(() => {
                this.initProgrammingChart();
            }, 100);
        }
    }

    generateProgrammingLanguages() {
        const languages = [
            {
                name: "HTML & CSS",
                icon: "fab fa-html5",
                color: "orange",
                progress: 90,
                topics: ["Semantic HTML", "CSS Flexbox", "CSS Grid", "Responsive Design", "Animations"],
                projects: ["Landing Page", "Portfolio", "Blog Layout"]
            },
            {
                name: "JavaScript",
                icon: "fab fa-js-square",
                color: "yellow",
                progress: 75,
                topics: ["ES6+ Features", "DOM Manipulation", "Async/Await", "Fetch API", "Local Storage"],
                projects: ["Todo App", "Weather App", "Calculator"]
            },
            {
                name: "Python",
                icon: "fab fa-python",
                color: "blue",
                progress: 60,
                topics: ["Data Types", "Functions", "OOP", "File Handling", "Web Scraping"],
                projects: ["Data Analysis", "Web Scraper", "API Server"]
            },
            {
                name: "Database & Backend",
                icon: "fas fa-database",
                color: "green",
                progress: 40,
                topics: ["SQL Basics", "MySQL", "API Design", "Authentication", "Deployment"],
                projects: ["REST API", "User System", "Blog Backend"]
            }
        ];

        return languages.map(lang => `
            <div class="bg-white rounded-2xl p-8 shadow-lg">
                <div class="flex items-center justify-between mb-6">
                    <div class="flex items-center space-x-4">
                        <div class="w-12 h-12 bg-${lang.color}-100 text-${lang.color}-600 rounded-xl flex items-center justify-center">
                            <i class="${lang.icon} text-2xl"></i>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-gray-800">${lang.name}</h3>
                            <p class="text-gray-600">Progress: ${lang.progress}%</p>
                        </div>
                    </div>
                    <div class="w-16 h-16">
                        <svg class="skill-progress-ring w-full h-full" viewBox="0 0 42 42">
                            <circle class="background" cx="21" cy="21" r="15.915"/>
                            <circle class="progress" cx="21" cy="21" r="15.915" 
                                    stroke-dasharray="${lang.progress} ${100 - lang.progress}" 
                                    stroke-dashoffset="0"/>
                        </svg>
                        <div class="text-center text-sm font-bold text-gray-800 -mt-10">
                            ${lang.progress}%
                        </div>
                    </div>
                </div>
                
                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="font-semibold text-gray-800 mb-3">Topics Covered</h4>
                        <ul class="space-y-2">
                            ${lang.topics.map(topic => `
                                <li class="flex items-center space-x-2">
                                    <i class="fas fa-check text-green-600 text-xs"></i>
                                    <span class="text-gray-600 text-sm">${topic}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    
                    <div>
                        <h4 class="font-semibold text-gray-800 mb-3">Practice Projects</h4>
                        <div class="space-y-2">
                            ${lang.projects.map(project => `
                                <div class="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                    <span class="text-gray-700 text-sm">${project}</span>
                                    <button class="text-blue-600 text-sm hover:text-blue-700">View</button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="mt-6 pt-4 border-t">
                    <button class="w-full bg-${lang.color}-600 text-white py-2 rounded-lg hover:bg-${lang.color}-700 transition-colors">
                        Continue Learning
                    </button>
                </div>
            </div>
        `).join('');
    }

    loadCareersSection() {
        const careersSection = document.getElementById('careersSection');
        if (careersSection && careersSection.querySelector('.container').children.length <= 1) {
            careersSection.querySelector('.container').innerHTML = `
                <h2 class="text-4xl font-bold text-center text-gray-800 mb-16">Career Path Explorer</h2>
                
                <!-- Career Assessment -->
                <div class="bg-white rounded-2xl p-8 shadow-lg mb-12">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6">Discover Your Ideal Tech Career</h3>
                    <p class="text-gray-600 mb-6">Answer a few questions to get personalized career recommendations based on your interests and skills.</p>
                    
                    <div class="grid md:grid-cols-3 gap-6 mb-8">
                        <div class="text-center">
                            <div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                                <i class="fas fa-brain text-2xl"></i>
                            </div>
                            <h4 class="font-semibold text-gray-800 mb-2">Interest Assessment</h4>
                            <p class="text-gray-600 text-sm">Discover what excites you most in technology</p>
                        </div>
                        
                        <div class="text-center">
                            <div class="w-16 h-16 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                                <i class="fas fa-cogs text-2xl"></i>
                            </div>
                            <h4 class="font-semibold text-gray-800 mb-2">Skill Evaluation</h4>
                            <p class="text-gray-600 text-sm">Assess your current technical abilities</p>
                        </div>
                        
                        <div class="text-center">
                            <div class="w-16 h-16 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                                <i class="fas fa-route text-2xl"></i>
                            </div>
                            <h4 class="font-semibold text-gray-800 mb-2">Personalized Roadmap</h4>
                            <p class="text-gray-600 text-sm">Get a customized learning path</p>
                        </div>
                    </div>
                    
                    <div class="text-center">
                        <button class="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                            Take Career Assessment
                        </button>
                    </div>
                </div>

                <!-- Career Paths Grid -->
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${this.generateCareerPaths()}
                </div>

                <!-- Market Trends -->
                <div class="bg-white rounded-2xl p-8 shadow-lg mt-12">
                    <h3 class="text-2xl font-bold text-gray-800 mb-8">Industry Trends & Job Market</h3>
                    <div class="grid md:grid-cols-2 gap-8">
                        <div>
                            <canvas id="jobMarketChart" style="height: 300px;"></canvas>
                        </div>
                        <div>
                            <h4 class="font-bold text-gray-800 mb-4">Top Skills in Demand</h4>
                            <div class="space-y-4">
                                <div class="flex items-center justify-between">
                                    <span class="text-gray-700">Full Stack Development</span>
                                    <div class="flex items-center space-x-2">
                                        <div class="w-32 bg-gray-200 rounded-full h-2">
                                            <div class="bg-blue-600 h-2 rounded-full" style="width: 95%"></div>
                                        </div>
                                        <span class="text-sm text-gray-600">95%</span>
                                    </div>
                                </div>
                                
                                <div class="flex items-center justify-between">
                                    <span class="text-gray-700">Data Science & ML</span>
                                    <div class="flex items-center space-x-2">
                                        <div class="w-32 bg-gray-200 rounded-full h-2">
                                            <div class="bg-green-600 h-2 rounded-full" style="width: 88%"></div>
                                        </div>
                                        <span class="text-sm text-gray-600">88%</span>
                                    </div>
                                </div>
                                
                                <div class="flex items-center justify-between">
                                    <span class="text-gray-700">Cybersecurity</span>
                                    <div class="flex items-center space-x-2">
                                        <div class="w-32 bg-gray-200 rounded-full h-2">
                                            <div class="bg-red-600 h-2 rounded-full" style="width: 82%"></div>
                                        </div>
                                        <span class="text-sm text-gray-600">82%</span>
                                    </div>
                                </div>
                                
                                <div class="flex items-center justify-between">
                                    <span class="text-gray-700">Cloud Computing</span>
                                    <div class="flex items-center space-x-2">
                                        <div class="w-32 bg-gray-200 rounded-full h-2">
                                            <div class="bg-purple-600 h-2 rounded-full" style="width: 78%"></div>
                                        </div>
                                        <span class="text-sm text-gray-600">78%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Initialize job market chart
            setTimeout(() => {
                this.initJobMarketChart();
            }, 100);
        }
    }

    generateCareerPaths() {
        const careers = [
            {
                title: "Full Stack Developer",
                icon: "fas fa-layer-group",
                color: "blue",
                salary: "$75,000 - $120,000",
                growth: "+22%",
                description: "Build complete web applications from frontend to backend",
                skills: ["React/Vue", "Node.js", "Databases", "APIs", "DevOps"],
                timeToJob: "6-12 months",
                difficulty: "Medium"
            },
            {
                title: "Data Scientist",
                icon: "fas fa-chart-bar",
                color: "green",
                salary: "$85,000 - $140,000",
                growth: "+31%",
                description: "Extract insights from data using ML and statistical analysis",
                skills: ["Python", "Machine Learning", "SQL", "Statistics", "Visualization"],
                timeToJob: "8-15 months",
                difficulty: "Hard"
            },
            {
                title: "Cybersecurity Analyst",
                icon: "fas fa-shield-alt",
                color: "red",
                salary: "$70,000 - $115,000",
                growth: "+28%",
                description: "Protect organizations from cyber threats and vulnerabilities",
                skills: ["Network Security", "Ethical Hacking", "Risk Assessment", "Compliance", "Forensics"],
                timeToJob: "6-10 months",
                difficulty: "Medium"
            },
            {
                title: "AI/ML Engineer",
                icon: "fas fa-robot",
                color: "purple",
                salary: "$90,000 - $160,000",
                growth: "+40%",
                description: "Develop intelligent systems and machine learning models",
                skills: ["Python", "TensorFlow", "Deep Learning", "Neural Networks", "MLOps"],
                timeToJob: "10-18 months",
                difficulty: "Hard"
            },
            {
                title: "Mobile Developer",
                icon: "fas fa-mobile-alt",
                color: "indigo",
                salary: "$70,000 - $125,000",
                growth: "+19%",
                description: "Create mobile applications for iOS and Android platforms",
                skills: ["React Native", "Flutter", "Swift", "Kotlin", "UI/UX"],
                timeToJob: "5-9 months",
                difficulty: "Medium"
            },
            {
                title: "DevOps Engineer",
                icon: "fas fa-infinity",
                color: "orange",
                salary: "$80,000 - $135,000",
                growth: "+25%",
                description: "Streamline development and deployment processes",
                skills: ["Docker", "Kubernetes", "AWS/Azure", "CI/CD", "Monitoring"],
                timeToJob: "7-12 months",
                difficulty: "Medium"
            }
        ];

        return careers.map(career => `
            <div class="career-path-card bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer">
                <div class="flex items-start justify-between mb-4">
                    <div class="w-12 h-12 bg-${career.color}-100 text-${career.color}-600 rounded-xl flex items-center justify-center">
                        <i class="${career.icon} text-xl"></i>
                    </div>
                    <div class="text-right">
                        <div class="text-sm text-gray-500">Projected Growth</div>
                        <div class="font-bold text-green-600">${career.growth}</div>
                    </div>
                </div>
                
                <h3 class="text-xl font-bold text-gray-800 mb-2">${career.title}</h3>
                <p class="text-gray-600 text-sm mb-4">${career.description}</p>
                
                <div class="space-y-3 mb-6">
                    <div class="flex items-center justify-between text-sm">
                        <span class="text-gray-600">Salary Range:</span>
                        <span class="font-semibold text-gray-800">${career.salary}</span>
                    </div>
                    
                    <div class="flex items-center justify-between text-sm">
                        <span class="text-gray-600">Time to Job:</span>
                        <span class="font-semibold text-gray-800">${career.timeToJob}</span>
                    </div>
                    
                    <div class="flex items-center justify-between text-sm">
                        <span class="text-gray-600">Difficulty:</span>
                        <span class="skill-level ${career.difficulty.toLowerCase()}">${career.difficulty}</span>
                    </div>
                </div>
                
                <div class="mb-6">
                    <h4 class="font-semibold text-gray-800 mb-2">Key Skills Required:</h4>
                    <div class="flex flex-wrap gap-2">
                        ${career.skills.map(skill => `
                            <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs">${skill}</span>
                        `).join('')}
                    </div>
                </div>
                
                <button class="w-full bg-${career.color}-600 text-white py-2 rounded-lg hover:bg-${career.color}-700 transition-colors">
                    View Learning Path
                </button>
            </div>
        `).join('');
    }

    loadDashboardSection() {
        const dashboardSection = document.getElementById('dashboardSection');
        if (dashboardSection && dashboardSection.querySelector('.container').children.length <= 1) {
            dashboardSection.querySelector('.container').innerHTML = `
                <h2 class="text-4xl font-bold text-center text-gray-800 mb-16">Learning Dashboard</h2>
                
                <!-- Dashboard Overview -->
                <div class="grid lg:grid-cols-4 gap-6 mb-12">
                    <div class="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="text-3xl font-bold">127</h3>
                                <p class="text-blue-100">Problems Solved</p>
                            </div>
                            <i class="fas fa-code text-3xl text-blue-200"></i>
                        </div>
                    </div>
                    
                    <div class="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="text-3xl font-bold">45h</h3>
                                <p class="text-green-100">Study Time</p>
                            </div>
                            <i class="fas fa-clock text-3xl text-green-200"></i>
                        </div>
                    </div>
                    
                    <div class="bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-2xl p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="text-3xl font-bold">12</h3>
                                <p class="text-orange-100">Day Streak</p>
                            </div>
                            <i class="fas fa-fire text-3xl text-orange-200"></i>
                        </div>
                    </div>
                    
                    <div class="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="text-3xl font-bold">75%</h3>
                                <p class="text-purple-100">Overall Progress</p>
                            </div>
                            <i class="fas fa-trophy text-3xl text-purple-200"></i>
                        </div>
                    </div>
                </div>

                <!-- Charts Section -->
                <div class="grid lg:grid-cols-2 gap-8 mb-12">
                    <div class="bg-white rounded-2xl p-6 shadow-lg">
                        <h3 class="text-xl font-bold text-gray-800 mb-4">Learning Progress Over Time</h3>
                        <canvas id="progressChart" style="height: 300px;"></canvas>
                    </div>
                    
                    <div class="bg-white rounded-2xl p-6 shadow-lg">
                        <h3 class="text-xl font-bold text-gray-800 mb-4">Skill Distribution</h3>
                        <canvas id="skillChart" style="height: 300px;"></canvas>
                    </div>
                </div>

                <!-- Recent Activity & Resume Builder -->
                <div class="grid lg:grid-cols-3 gap-8">
                    <div class="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg">
                        <h3 class="text-xl font-bold text-gray-800 mb-6">Recent Activity</h3>
                        <div class="timeline">
                            <div class="timeline-item completed">
                                <h4 class="font-semibold text-gray-800">Completed Two Sum Problem</h4>
                                <p class="text-gray-600 text-sm">Solved using HashMap approach in O(n) time</p>
                                <span class="text-xs text-gray-500">2 hours ago</span>
                            </div>
                            
                            <div class="timeline-item completed">
                                <h4 class="font-semibold text-gray-800">Finished JavaScript Module</h4>
                                <p class="text-gray-600 text-sm">Completed all exercises on Async/Await</p>
                                <span class="text-xs text-gray-500">1 day ago</span>
                            </div>
                            
                            <div class="timeline-item">
                                <h4 class="font-semibold text-gray-800">Started Sliding Window Chapter</h4>
                                <p class="text-gray-600 text-sm">Beginning advanced array techniques</p>
                                <span class="text-xs text-gray-500">2 days ago</span>
                            </div>
                            
                            <div class="timeline-item">
                                <h4 class="font-semibold text-gray-800">Career Assessment Completed</h4>
                                <p class="text-gray-600 text-sm">Recommended path: Full Stack Developer</p>
                                <span class="text-xs text-gray-500">3 days ago</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-2xl p-6 shadow-lg">
                        <h3 class="text-xl font-bold text-gray-800 mb-6">Resume Builder</h3>
                        
                        <div class="space-y-4 mb-6">
                            <div class="flex items-center justify-between">
                                <span class="text-gray-700">Profile Completeness</span>
                                <span class="font-semibold text-gray-800">85%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-blue-600 h-2 rounded-full" style="width: 85%"></div>
                            </div>
                        </div>
                        
                        <div class="space-y-3 mb-6">
                            <div class="flex items-center space-x-3">
                                <i class="fas fa-check text-green-600"></i>
                                <span class="text-gray-700 text-sm">Personal Information</span>
                            </div>
                            <div class="flex items-center space-x-3">
                                <i class="fas fa-check text-green-600"></i>
                                <span class="text-gray-700 text-sm">Skills & Technologies</span>
                            </div>
                            <div class="flex items-center space-x-3">
                                <i class="fas fa-check text-green-600"></i>
                                <span class="text-gray-700 text-sm">Project Portfolio</span>
                            </div>
                            <div class="flex items-center space-x-3">
                                <i class="fas fa-times text-orange-600"></i>
                                <span class="text-gray-700 text-sm">Work Experience</span>
                            </div>
                            <div class="flex items-center space-x-3">
                                <i class="fas fa-times text-orange-600"></i>
                                <span class="text-gray-700 text-sm">Certifications</span>
                            </div>
                        </div>
                        
                        <button class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors mb-3">
                            Build Resume
                        </button>
                        
                        <button class="w-full border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                            Preview Resume
                        </button>
                    </div>
                </div>
            `;
            
            // Initialize dashboard charts
            setTimeout(() => {
                this.initDashboardCharts();
            }, 100);
        }
    }

    loadAISection() {
        const aiSection = document.getElementById('aiSection');
        if (aiSection && aiSection.querySelector('.container').children.length <= 1) {
            aiSection.querySelector('.container').innerHTML = `
                <h2 class="text-4xl font-bold text-center text-gray-800 mb-16">AI Learning Assistant & Job Matcher</h2>
                
                <!-- AI Chat Interface -->
                <div class="grid lg:grid-cols-3 gap-8 mb-12">
                    <div class="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-xl font-bold text-gray-800">AI Learning Assistant</h3>
                            <div class="flex items-center space-x-2">
                                <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <span class="text-sm text-gray-600">Online</span>
                            </div>
                        </div>
                        
                        <div id="chatMessages" class="h-96 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg">
                            <div class="ai-chat-bubble ai">
                                <p>Hello! I'm your AI learning assistant. I can help you with:</p>
                                <ul class="mt-2 space-y-1 text-sm">
                                    <li>• Explaining DSA concepts</li>
                                    <li>• Providing coding hints</li>
                                    <li>• Career guidance</li>
                                    <li>• Resume recommendations</li>
                                    <li>• Job matching based on your skills</li>
                                </ul>
                                <p class="mt-2">What would you like to learn today?</p>
                            </div>
                        </div>
                        
                        <div class="flex space-x-2">
                            <input type="text" id="chatInput" placeholder="Ask me anything about programming, DSA, or career advice..." 
                                   class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600">
                            <button id="sendChatBtn" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                        
                        <!-- Quick Actions -->
                        <div class="flex flex-wrap gap-2 mt-4">
                            <button class="quick-action-btn px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                                Explain Binary Search
                            </button>
                            <button class="quick-action-btn px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                                Career Advice
                            </button>
                            <button class="quick-action-btn px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                                Resume Tips
                            </button>
                            <button class="quick-action-btn px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                                Job Recommendations
                            </button>
                        </div>
                    </div>
                    
                    <!-- AI Features Sidebar -->
                    <div class="space-y-6">
                        <div class="bg-white rounded-2xl p-6 shadow-lg">
                            <h4 class="font-bold text-gray-800 mb-4">Smart Features</h4>
                            <div class="space-y-4">
                                <div class="flex items-center space-x-3">
                                    <i class="fas fa-brain text-blue-600"></i>
                                    <span class="text-gray-700 text-sm">Personalized Learning Path</span>
                                </div>
                                <div class="flex items-center space-x-3">
                                    <i class="fas fa-lightbulb text-yellow-600"></i>
                                    <span class="text-gray-700 text-sm">Smart Problem Hints</span>
                                </div>
                                <div class="flex items-center space-x-3">
                                    <i class="fas fa-chart-line text-green-600"></i>
                                    <span class="text-gray-700 text-sm">Progress Analysis</span>
                                </div>
                                <div class="flex items-center space-x-3">
                                    <i class="fas fa-briefcase text-purple-600"></i>
                                    <span class="text-gray-700 text-sm">Job Matching Algorithm</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-white rounded-2xl p-6 shadow-lg">
                            <h4 class="font-bold text-gray-800 mb-4">AI Insights</h4>
                            <div class="space-y-3">
                                <div class="p-3 bg-blue-50 rounded-lg">
                                    <p class="text-sm text-gray-700">You're making great progress in Arrays! Try focusing on Dynamic Programming next.</p>
                                </div>
                                <div class="p-3 bg-green-50 rounded-lg">
                                    <p class="text-sm text-gray-700">Your JavaScript skills are job-ready. Consider applying for junior developer positions.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Job Recommendations -->
                <div class="bg-white rounded-2xl p-8 shadow-lg">
                    <div class="flex items-center justify-between mb-8">
                        <h3 class="text-2xl font-bold text-gray-800">AI-Powered Job Recommendations</h3>
                        <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Refresh Recommendations
                        </button>
                    </div>
                    
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${this.generateJobRecommendations()}
                    </div>
                </div>
            `;
            
            // Setup AI chat functionality
            this.setupAIChat();
        }
    }

    generateJobRecommendations() {
        const jobs = [
            {
                title: "Junior Frontend Developer",
                company: "TechStart Inc.",
                location: "Remote",
                salary: "$55,000 - $70,000",
                match: 92,
                skills: ["HTML", "CSS", "JavaScript", "React"],
                description: "Build responsive web interfaces for our growing startup",
                type: "Full-time",
                posted: "2 days ago"
            },
            {
                title: "Python Developer Intern",
                company: "DataFlow Solutions",
                location: "New York, NY",
                salary: "$40,000 - $50,000",
                match: 85,
                skills: ["Python", "SQL", "Data Analysis"],
                description: "Work on data processing pipelines and automation tools",
                type: "Internship",
                posted: "1 week ago"
            },
            {
                title: "Full Stack Developer",
                company: "CloudTech Corp",
                location: "San Francisco, CA",
                salary: "$75,000 - $95,000",
                match: 78,
                skills: ["React", "Node.js", "MongoDB", "AWS"],
                description: "Develop end-to-end web applications for enterprise clients",
                type: "Full-time",
                posted: "3 days ago"
            },
            {
                title: "Junior Data Analyst",
                company: "Analytics Pro",
                location: "Chicago, IL",
                salary: "$50,000 - $65,000",
                match: 71,
                skills: ["SQL", "Python", "Excel", "Tableau"],
                description: "Analyze business data and create insightful reports",
                type: "Full-time",
                posted: "5 days ago"
            },
            {
                title: "Web Developer",
                company: "Creative Agency",
                location: "Remote",
                salary: "$45,000 - $60,000",
                match: 68,
                skills: ["HTML", "CSS", "JavaScript", "WordPress"],
                description: "Create stunning websites for creative agency clients",
                type: "Contract",
                posted: "1 day ago"
            },
            {
                title: "Software Engineering Intern",
                company: "BigTech Solutions",
                location: "Seattle, WA",
                salary: "$35,000 - $45,000",
                match: 65,
                skills: ["Java", "Python", "Git", "Agile"],
                description: "Join our engineering team and work on large-scale systems",
                type: "Internship",
                posted: "4 days ago"
            }
        ];

        return jobs.map(job => `
            <div class="job-card">
                <div class="flex items-start justify-between mb-4">
                    <div>
                        <h4 class="font-bold text-gray-800 text-lg mb-1">${job.title}</h4>
                        <p class="text-gray-600 mb-2">${job.company} • ${job.location}</p>
                        <div class="flex items-center space-x-2">
                            <span class="job-match-score ${job.match >= 80 ? 'high' : job.match >= 65 ? 'medium' : 'low'}">${job.match}% Match</span>
                            <span class="badge ${job.type === 'Internship' ? 'new' : job.type === 'Contract' ? 'popular' : 'free'}">${job.type}</span>
                        </div>
                    </div>
                    <button class="text-gray-400 hover:text-gray-600">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                
                <p class="text-gray-700 text-sm mb-4">${job.description}</p>
                
                <div class="mb-4">
                    <p class="font-semibold text-gray-800 mb-2">${job.salary}</p>
                    <div class="flex flex-wrap gap-1">
                        ${job.skills.map(skill => `
                            <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">${skill}</span>
                        `).join('')}
                    </div>
                </div>
                
                <div class="flex items-center justify-between pt-4 border-t">
                    <span class="text-sm text-gray-500">Posted ${job.posted}</span>
                    <div class="flex space-x-2">
                        <button class="px-3 py-1 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50">
                            Save
                        </button>
                        <button class="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    setupAIChat() {
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendChatBtn');
        const chatMessages = document.getElementById('chatMessages');
        const quickActionBtns = document.querySelectorAll('.quick-action-btn');

        const sendMessage = () => {
            const message = chatInput.value.trim();
            if (message) {
                this.addChatMessage(message, 'user');
                chatInput.value = '';
                
                // Simulate AI response
                setTimeout(() => {
                    this.addChatMessage(this.getAIResponse(message), 'ai');
                }, 1000);
            }
        };

        sendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        quickActionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const message = btn.textContent;
                this.addChatMessage(message, 'user');
                
                setTimeout(() => {
                    this.addChatMessage(this.getAIResponse(message), 'ai');
                }, 1000);
            });
        });
    }

    addChatMessage(message, sender) {
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-chat-bubble ${sender}`;
        messageDiv.innerHTML = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    getAIResponse(message) {
        const responses = {
            'explain binary search': 'Binary Search is a divide-and-conquer algorithm that finds a target value in a sorted array. It works by repeatedly dividing the search interval in half. If the target is less than the middle element, search the left half; otherwise, search the right half. Time complexity: O(log n).',
            'career advice': 'Based on your progress, I recommend focusing on: 1) Complete your DSA fundamentals, 2) Build 2-3 portfolio projects, 3) Practice system design basics, 4) Start applying to junior positions. Your JavaScript skills are strong!',
            'resume tips': 'Here are key resume tips: 1) Highlight your technical projects with GitHub links, 2) Include specific technologies used, 3) Quantify your achievements (e.g., "Improved performance by 30%"), 4) Keep it concise (1-2 pages), 5) Use action verbs like "Developed", "Implemented", "Optimized".',
            'job recommendations': 'Based on your skills and progress, I recommend these positions: 1) Junior Frontend Developer (92% match), 2) Python Developer Intern (85% match), 3) Full Stack Developer (78% match). Focus on completing your React projects to increase your match score!'
        };

        const key = message.toLowerCase().trim();
        return responses[key] || 'I understand your question! Based on your learning progress, I recommend continuing with your current DSA topics and building more practical projects. Would you like specific guidance on any programming concept or career path?';
    }

    initializeCharts() {
        // Initialize charts when sections are loaded
        setTimeout(() => {
            if (document.getElementById('progressChart')) {
                this.initDashboardCharts();
            }
            if (document.getElementById('jobMarketChart')) {
                this.initJobMarketChart();
            }
            if (document.getElementById('programmingProgressChart')) {
                this.initProgrammingChart();
            }
        }, 1000);
    }

    initDashboardCharts() {
        // Progress Chart
        const progressCtx = document.getElementById('progressChart');
        if (progressCtx) {
            new Chart(progressCtx, {
                type: 'line',
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
                    datasets: [{
                        label: 'Problems Solved',
                        data: [5, 12, 25, 45, 78, 127],
                        borderColor: '#3B82F6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.4
                    }, {
                        label: 'Study Hours',
                        data: [3, 8, 15, 22, 32, 45],
                        borderColor: '#10B981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Skill Chart
        const skillCtx = document.getElementById('skillChart');
        if (skillCtx) {
            new Chart(skillCtx, {
                type: 'doughnut',
                data: {
                    labels: ['DSA', 'JavaScript', 'Python', 'HTML/CSS', 'Databases'],
                    datasets: [{
                        data: [75, 85, 60, 90, 45],
                        backgroundColor: [
                            '#3B82F6',
                            '#F59E0B',
                            '#10B981',
                            '#EF4444',
                            '#8B5CF6'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
    }

    initJobMarketChart() {
        const ctx = document.getElementById('jobMarketChart');
        if (ctx) {
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Full Stack', 'Data Science', 'Mobile Dev', 'DevOps', 'Cybersecurity', 'AI/ML'],
                    datasets: [{
                        label: 'Job Openings (thousands)',
                        data: [45, 32, 28, 25, 22, 18],
                        backgroundColor: [
                            '#3B82F6',
                            '#10B981',
                            '#F59E0B',
                            '#EF4444',
                            '#8B5CF6',
                            '#06B6D4'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }

    initProgrammingChart() {
        const ctx = document.getElementById('programmingProgressChart');
        if (ctx) {
            new Chart(ctx, {
                type: 'polarArea',
                data: {
                    labels: ['HTML/CSS', 'JavaScript', 'Python', 'Backend'],
                    datasets: [{
                        data: [90, 75, 60, 40],
                        backgroundColor: [
                            'rgba(249, 115, 22, 0.6)',
                            'rgba(251, 191, 36, 0.6)',
                            'rgba(59, 130, 246, 0.6)',
                            'rgba(34, 197, 94, 0.6)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
    }

    setupSmoothScrolling() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    loadUserData() {
        // Load user data from localStorage or API
        const userData = localStorage.getItem('techGuideUser');
        if (userData) {
            this.currentUser = JSON.parse(userData);
        }
    }

    loadDSAContent() {
        // This method would integrate with the Labuladong content
        // For now, we'll use the structured content we've created
        console.log('DSA content loaded from structured curriculum');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.techGuideHub = new TechGuideHub();
});