// Data management and API integration for TechGuide Hub
class DataManager {
    constructor() {
        this.apiBase = 'tables/';
        this.cache = new Map();
        this.init();
    }

    init() {
        this.setupOfflineStorage();
        this.loadInitialData();
    }

    // Generic API methods
    async apiCall(endpoint, method = 'GET', data = null) {
        const config = {
            method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
            config.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(this.apiBase + endpoint, config);
            
            if (!response.ok) {
                throw new Error(`API call failed: ${response.status} ${response.statusText}`);
            }

            // Handle 204 No Content responses (like DELETE)
            if (response.status === 204) {
                return { success: true };
            }

            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // User management
    async createUser(userData) {
        const user = {
            name: userData.name,
            email: userData.email,
            year_of_study: userData.year,
            password_hash: userData.password, // In production, this would be hashed
            profile_avatar: null,
            bio: '',
            skills: [],
            interests: [],
            career_goals: [],
            profile_completeness: 20,
            last_login: new Date().toISOString(),
            created_at: new Date().toISOString(),
            is_active: true
        };

        try {
            const result = await this.apiCall('users', 'POST', user);
            
            // Initialize user's learning progress
            await this.initializeUserProgress(result.id);
            
            return result;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    async getUserById(userId) {
        try {
            return await this.apiCall(`users/${userId}`);
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    }

    async updateUser(userId, updates) {
        try {
            return await this.apiCall(`users/${userId}`, 'PATCH', updates);
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }

    // Learning progress management
    async initializeUserProgress(userId) {
        const progressEntries = [
            {
                user_id: userId,
                category: 'dsa',
                subcategory: 'arrays',
                problems_solved: 0,
                time_spent_minutes: 0,
                current_streak: 0,
                longest_streak: 0,
                skill_level: 'beginner',
                completion_percentage: 0,
                last_activity: new Date().toISOString(),
                achievements: [],
                notes: ''
            },
            {
                user_id: userId,
                category: 'dsa',
                subcategory: 'strings',
                problems_solved: 0,
                time_spent_minutes: 0,
                current_streak: 0,
                longest_streak: 0,
                skill_level: 'beginner',
                completion_percentage: 0,
                last_activity: new Date().toISOString(),
                achievements: [],
                notes: ''
            },
            {
                user_id: userId,
                category: 'programming',
                subcategory: 'javascript',
                problems_solved: 0,
                time_spent_minutes: 0,
                current_streak: 0,
                longest_streak: 0,
                skill_level: 'beginner',
                completion_percentage: 0,
                last_activity: new Date().toISOString(),
                achievements: [],
                notes: ''
            }
        ];

        try {
            for (const progress of progressEntries) {
                await this.apiCall('learning_progress', 'POST', progress);
            }
        } catch (error) {
            console.error('Error initializing progress:', error);
        }
    }

    async getUserProgress(userId, category = null) {
        try {
            let endpoint = `learning_progress?user_id=${userId}`;
            if (category) {
                endpoint += `&category=${category}`;
            }
            
            const response = await this.apiCall(endpoint);
            return response.data || [];
        } catch (error) {
            console.error('Error fetching user progress:', error);
            return [];
        }
    }

    async updateProgress(progressId, updates) {
        try {
            return await this.apiCall(`learning_progress/${progressId}`, 'PATCH', updates);
        } catch (error) {
            console.error('Error updating progress:', error);
            throw error;
        }
    }

    // DSA problems management
    async getDSAProblems(topic = null, difficulty = null, page = 1, limit = 20) {
        try {
            let endpoint = `dsa_problems?page=${page}&limit=${limit}`;
            if (topic) endpoint += `&topic=${topic}`;
            if (difficulty) endpoint += `&difficulty=${difficulty}`;
            
            const response = await this.apiCall(endpoint);
            return response.data || [];
        } catch (error) {
            console.error('Error fetching DSA problems:', error);
            return [];
        }
    }

    async getProblemById(problemId) {
        try {
            return await this.apiCall(`dsa_problems/${problemId}`);
        } catch (error) {
            console.error('Error fetching problem:', error);
            return null;
        }
    }

    // Problem attempts management
    async recordProblemAttempt(userId, problemId, attemptData) {
        const attempt = {
            user_id: userId,
            problem_id: problemId,
            status: attemptData.status,
            solution_code: attemptData.code || '',
            programming_language: attemptData.language || 'javascript',
            time_taken_minutes: attemptData.timeTaken || 0,
            hints_used: attemptData.hintsUsed || 0,
            attempts_count: attemptData.attemptsCount || 1,
            first_attempt_date: attemptData.firstAttempt || new Date().toISOString(),
            solved_date: attemptData.status === 'solved' ? new Date().toISOString() : null,
            user_notes: attemptData.notes || '',
            difficulty_rating: attemptData.difficultyRating || null
        };

        try {
            return await this.apiCall('user_problem_attempts', 'POST', attempt);
        } catch (error) {
            console.error('Error recording attempt:', error);
            throw error;
        }
    }

    async getUserAttempts(userId, status = null) {
        try {
            let endpoint = `user_problem_attempts?user_id=${userId}`;
            if (status) endpoint += `&status=${status}`;
            
            const response = await this.apiCall(endpoint);
            return response.data || [];
        } catch (error) {
            console.error('Error fetching user attempts:', error);
            return [];
        }
    }

    // Programming projects management
    async createProject(userId, projectData) {
        const project = {
            user_id: userId,
            title: projectData.title,
            description: projectData.description,
            category: projectData.category,
            technologies: projectData.technologies || [],
            github_url: projectData.githubUrl || '',
            live_demo_url: projectData.demoUrl || '',
            status: projectData.status || 'planning',
            completion_percentage: projectData.completion || 0,
            start_date: projectData.startDate || new Date().toISOString(),
            completion_date: null,
            featured: false
        };

        try {
            return await this.apiCall('programming_projects', 'POST', project);
        } catch (error) {
            console.error('Error creating project:', error);
            throw error;
        }
    }

    async getUserProjects(userId) {
        try {
            const response = await this.apiCall(`programming_projects?user_id=${userId}`);
            return response.data || [];
        } catch (error) {
            console.error('Error fetching user projects:', error);
            return [];
        }
    }

    async updateProject(projectId, updates) {
        try {
            return await this.apiCall(`programming_projects/${projectId}`, 'PATCH', updates);
        } catch (error) {
            console.error('Error updating project:', error);
            throw error;
        }
    }

    // Career assessments
    async createAssessment(userId, assessmentData) {
        const assessment = {
            user_id: userId,
            assessment_type: assessmentData.type,
            responses: assessmentData.responses,
            results: assessmentData.results || [],
            recommended_paths: assessmentData.recommendedPaths || [],
            skills_identified: assessmentData.skillsIdentified || [],
            improvement_areas: assessmentData.improvementAreas || [],
            completed_at: new Date().toISOString(),
            score: assessmentData.score || 0,
            is_active: true
        };

        try {
            return await this.apiCall('career_assessments', 'POST', assessment);
        } catch (error) {
            console.error('Error creating assessment:', error);
            throw error;
        }
    }

    async getUserAssessments(userId) {
        try {
            const response = await this.apiCall(`career_assessments?user_id=${userId}`);
            return response.data || [];
        } catch (error) {
            console.error('Error fetching assessments:', error);
            return [];
        }
    }

    // Job applications
    async createJobApplication(userId, jobData) {
        const application = {
            user_id: userId,
            job_title: jobData.title,
            company_name: jobData.company,
            job_url: jobData.url || '',
            application_status: 'applied',
            application_date: new Date().toISOString(),
            required_skills: jobData.requiredSkills || [],
            match_percentage: jobData.matchPercentage || 0,
            salary_range: jobData.salaryRange || '',
            location: jobData.location || '',
            job_type: jobData.type || 'full-time',
            notes: jobData.notes || '',
            response_date: null
        };

        try {
            return await this.apiCall('job_applications', 'POST', application);
        } catch (error) {
            console.error('Error creating job application:', error);
            throw error;
        }
    }

    async getUserApplications(userId) {
        try {
            const response = await this.apiCall(`job_applications?user_id=${userId}`);
            return response.data || [];
        } catch (error) {
            console.error('Error fetching applications:', error);
            return [];
        }
    }

    // Session tracking
    async startSession(userId, deviceInfo) {
        const session = {
            user_id: userId,
            session_start: new Date().toISOString(),
            session_end: null,
            duration_minutes: 0,
            pages_visited: [],
            actions_performed: [],
            problems_attempted: 0,
            problems_solved: 0,
            device_type: deviceInfo.type || 'desktop',
            browser: deviceInfo.browser || 'unknown',
            ip_address: deviceInfo.ip || '',
            location: deviceInfo.location || ''
        };

        try {
            const result = await this.apiCall('user_sessions', 'POST', session);
            // Store session ID for tracking
            sessionStorage.setItem('currentSessionId', result.id);
            return result;
        } catch (error) {
            console.error('Error starting session:', error);
            throw error;
        }
    }

    async updateSession(sessionId, updates) {
        try {
            return await this.apiCall(`user_sessions/${sessionId}`, 'PATCH', updates);
        } catch (error) {
            console.error('Error updating session:', error);
        }
    }

    async endSession(sessionId) {
        const sessionEnd = new Date().toISOString();
        const sessionStart = new Date(sessionStorage.getItem('sessionStart') || Date.now());
        const durationMinutes = Math.floor((new Date(sessionEnd) - sessionStart) / (1000 * 60));

        try {
            await this.updateSession(sessionId, {
                session_end: sessionEnd,
                duration_minutes: durationMinutes
            });
            sessionStorage.removeItem('currentSessionId');
        } catch (error) {
            console.error('Error ending session:', error);
        }
    }

    // Analytics and reporting
    async getAnalytics(userId, timeframe = '30d') {
        try {
            // This would aggregate data from multiple tables
            const [progress, attempts, sessions] = await Promise.all([
                this.getUserProgress(userId),
                this.getUserAttempts(userId),
                this.getUserSessions(userId, timeframe)
            ]);

            return {
                progress,
                attempts,
                sessions,
                summary: this.calculateAnalyticsSummary(progress, attempts, sessions)
            };
        } catch (error) {
            console.error('Error fetching analytics:', error);
            return null;
        }
    }

    calculateAnalyticsSummary(progress, attempts, sessions) {
        const totalProblems = attempts.length;
        const solvedProblems = attempts.filter(a => a.status === 'solved').length;
        const totalTime = sessions.reduce((sum, s) => sum + (s.duration_minutes || 0), 0);
        const avgSessionTime = sessions.length > 0 ? totalTime / sessions.length : 0;

        return {
            totalProblems,
            solvedProblems,
            solutionRate: totalProblems > 0 ? (solvedProblems / totalProblems) * 100 : 0,
            totalTimeMinutes: totalTime,
            avgSessionTimeMinutes: avgSessionTime,
            sessionsCount: sessions.length,
            progressCategories: this.groupProgressByCategory(progress)
        };
    }

    groupProgressByCategory(progress) {
        return progress.reduce((acc, p) => {
            if (!acc[p.category]) {
                acc[p.category] = {
                    totalTime: 0,
                    avgProgress: 0,
                    subcategories: []
                };
            }
            acc[p.category].totalTime += p.time_spent_minutes;
            acc[p.category].subcategories.push({
                name: p.subcategory,
                progress: p.completion_percentage,
                problems: p.problems_solved
            });
            return acc;
        }, {});
    }

    // Offline storage management
    setupOfflineStorage() {
        // Setup service worker for offline functionality
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        }
    }

    async loadInitialData() {
        try {
            // Load commonly used data into cache
            const problems = await this.getDSAProblems();
            this.cache.set('dsa_problems', problems);
        } catch (error) {
            console.error('Error loading initial data:', error);
        }
    }

    // Cache management
    getCachedData(key) {
        return this.cache.get(key);
    }

    setCachedData(key, data) {
        this.cache.set(key, data);
    }

    clearCache() {
        this.cache.clear();
    }

    // Search functionality
    async searchContent(query, filters = {}) {
        try {
            // This would implement full-text search across multiple tables
            const searchResults = {
                problems: [],
                projects: [],
                careers: []
            };

            // Search DSA problems
            const problems = await this.getDSAProblems();
            searchResults.problems = problems.filter(p => 
                p.title.toLowerCase().includes(query.toLowerCase()) ||
                p.description.toLowerCase().includes(query.toLowerCase()) ||
                p.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
            );

            return searchResults;
        } catch (error) {
            console.error('Error searching content:', error);
            return { problems: [], projects: [], careers: [] };
        }
    }

    // Data export functionality
    async exportUserData(userId, format = 'json') {
        try {
            const userData = {
                user: await this.getUserById(userId),
                progress: await this.getUserProgress(userId),
                attempts: await this.getUserAttempts(userId),
                projects: await this.getUserProjects(userId),
                assessments: await this.getUserAssessments(userId),
                applications: await this.getUserApplications(userId),
                exportDate: new Date().toISOString()
            };

            if (format === 'json') {
                return JSON.stringify(userData, null, 2);
            } else if (format === 'csv') {
                return this.convertToCSV(userData);
            }

            return userData;
        } catch (error) {
            console.error('Error exporting user data:', error);
            throw error;
        }
    }

    convertToCSV(data) {
        // Simple CSV conversion for basic data export
        let csv = 'Category,Subcategory,Progress,Problems Solved,Time Spent\n';
        
        data.progress.forEach(p => {
            csv += `${p.category},${p.subcategory},${p.completion_percentage}%,${p.problems_solved},${p.time_spent_minutes} min\n`;
        });

        return csv;
    }
}

// Initialize data manager
document.addEventListener('DOMContentLoaded', () => {
    window.dataManager = new DataManager();
    
    // Make available to main app
    if (window.techGuideHub) {
        window.techGuideHub.dataManager = window.dataManager;
    }
});