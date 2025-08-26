// Portfolio Website JavaScript

// Data from the application
const portfolioData = {
  "projects": [
    {
      "id": 1,
      "title": "E-Commerce Dashboard",
      "description": "Modern dashboard for online retail management with analytics and inventory tracking.",
      "category": "Web",
      "technologies": ["React", "Node.js", "MongoDB"],
      "image": "/api/placeholder/400/250"
    },
    {
      "id": 2,
      "title": "Mobile Banking App",
      "description": "Secure mobile banking application with biometric authentication and real-time transactions.",
      "category": "Mobile",
      "technologies": ["React Native", "Firebase", "TypeScript"],
      "image": "/api/placeholder/400/250"
    },
    {
      "id": 3,
      "title": "Brand Identity Design",
      "description": "Complete brand identity package including logo, guidelines, and marketing materials.",
      "category": "Design",
      "technologies": ["Figma", "Illustrator", "Photoshop"],
      "image": "/api/placeholder/400/250"
    },
    {
      "id": 4,
      "title": "Task Management System",
      "description": "Collaborative project management tool with team communication features.",
      "category": "Web",
      "technologies": ["Vue.js", "Python", "PostgreSQL"],
      "image": "/api/placeholder/400/250"
    },
    {
      "id": 5,
      "title": "Fitness Tracking App",
      "description": "Comprehensive fitness application with workout plans and progress tracking.",
      "category": "Mobile",
      "technologies": ["Flutter", "Dart", "SQLite"],
      "image": "/api/placeholder/400/250"
    },
    {
      "id": 6,
      "title": "Website Redesign",
      "description": "Complete website overhaul focusing on user experience and conversion optimization.",
      "category": "Design",
      "technologies": ["HTML5", "CSS3", "JavaScript"],
      "image": "/api/placeholder/400/250"
    }
  ],
  "skills": [
    {"name": "JavaScript", "level": 90, "category": "Technical"},
    {"name": "React", "level": 85, "category": "Technical"},
    {"name": "Python", "level": 80, "category": "Technical"},
    {"name": "Node.js", "level": 75, "category": "Technical"},
    {"name": "Figma", "level": 85, "category": "Design"},
    {"name": "Photoshop", "level": 80, "category": "Design"},
    {"name": "UI/UX Design", "level": 88, "category": "Design"},
    {"name": "Project Management", "level": 82, "category": "Soft Skills"}
  ]
};

// Theme Management
class ThemeManager {
  constructor() {
    // Remove localStorage usage as per instructions
    this.currentTheme = 'light';
    this.themeToggle = document.getElementById('theme-toggle');
    this.init();
  }

  init() {
    this.applyTheme();
    this.updateToggleIcon();
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme();
    this.updateToggleIcon();
  }

  applyTheme() {
    document.documentElement.setAttribute('data-color-scheme', this.currentTheme);
  }

  updateToggleIcon() {
    const icon = this.themeToggle?.querySelector('.theme-toggle__icon');
    if (icon) {
      icon.textContent = this.currentTheme === 'light' ? '🌙' : '☀️';
    }
  }
}

// Navigation Management
class NavigationManager {
  constructor() {
    this.navToggle = document.getElementById('nav-toggle');
    this.navMenu = document.getElementById('nav-menu');
    this.navLinks = document.querySelectorAll('.nav__link');
    this.init();
  }

  init() {
    if (this.navToggle && this.navMenu) {
      this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
    }
    this.initSmoothScrolling();
    this.initActiveNavigation();
    window.addEventListener('scroll', () => this.updateActiveNavigation());
  }

  toggleMobileMenu() {
    this.navMenu.classList.toggle('show');
  }

  initSmoothScrolling() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        
        if (targetId && targetId.startsWith('#')) {
          const targetSection = document.querySelector(targetId);
          
          if (targetSection) {
            const header = document.querySelector('.header');
            const headerHeight = header ? header.offsetHeight : 80;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (this.navMenu) {
              this.navMenu.classList.remove('show');
            }
          }
        }
      });
    });
  }

  initActiveNavigation() {
    this.sections = Array.from(document.querySelectorAll('section[id]'));
  }

  updateActiveNavigation() {
    const scrollPosition = window.scrollY + 100;
    
    this.sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        this.navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

// Portfolio Management
class PortfolioManager {
  constructor() {
    this.projects = portfolioData.projects;
    this.currentFilter = 'all';
    this.portfolioGrid = document.getElementById('portfolio-grid');
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.init();
  }

  init() {
    if (this.portfolioGrid) {
      this.renderProjects();
      this.initFilters();
    }
  }

  renderProjects(filter = 'all') {
    if (!this.portfolioGrid) return;
    
    const filteredProjects = filter === 'all' 
      ? this.projects 
      : this.projects.filter(project => project.category === filter);

    this.portfolioGrid.innerHTML = '';

    filteredProjects.forEach((project, index) => {
      const projectElement = this.createProjectElement(project);
      this.portfolioGrid.appendChild(projectElement);
      
      // Add staggered animation
      setTimeout(() => {
        projectElement.style.opacity = '1';
        projectElement.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }

  createProjectElement(project) {
    const projectDiv = document.createElement('div');
    projectDiv.className = 'portfolio__item';
    projectDiv.setAttribute('data-category', project.category);
    projectDiv.style.opacity = '0';
    projectDiv.style.transform = 'translateY(20px)';
    projectDiv.style.transition = 'all 0.5s ease';

    projectDiv.innerHTML = `
      <div class="portfolio__image">
        <span>Project Image</span>
        <div class="portfolio__overlay">
          <button class="btn btn--primary btn--sm">View Project</button>
          <button class="btn btn--outline btn--sm">View Code</button>
        </div>
      </div>
      <div class="portfolio__content">
        <h3 class="portfolio__title">${project.title}</h3>
        <p class="portfolio__description">${project.description}</p>
        <div class="portfolio__tech">
          ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
      </div>
    `;

    return projectDiv;
  }

  initFilters() {
    this.filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        this.currentFilter = filter;
        this.renderProjects(filter);
      });
    });
  }
}

// Skills Management
class SkillsManager {
  constructor() {
    this.skills = portfolioData.skills;
    this.skillsAnimated = false;
    this.init();
  }

  init() {
    this.renderSkills();
    this.initSkillsAnimation();
  }

  renderSkills() {
    const categories = ['Technical', 'Design', 'Soft Skills'];
    
    categories.forEach(category => {
      const categorySkills = this.skills.filter(skill => skill.category === category);
      const containerId = category === 'Technical' ? 'technical-skills' 
                        : category === 'Design' ? 'design-skills' 
                        : 'soft-skills';
      
      const container = document.getElementById(containerId);
      if (container) {
        container.innerHTML = '';
        
        categorySkills.forEach(skill => {
          const skillElement = this.createSkillElement(skill);
          container.appendChild(skillElement);
        });
      }
    });
  }

  createSkillElement(skill) {
    const skillDiv = document.createElement('div');
    skillDiv.className = 'skill-item';

    skillDiv.innerHTML = `
      <div class="skill-header">
        <span class="skill-name">${skill.name}</span>
        <span class="skill-level">${skill.level}%</span>
      </div>
      <div class="skill-bar">
        <div class="skill-progress" data-level="${skill.level}"></div>
      </div>
    `;

    return skillDiv;
  }

  initSkillsAnimation() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.skillsAnimated) {
          this.animateSkillBars();
          this.skillsAnimated = true;
        }
      });
    }, observerOptions);

    observer.observe(skillsSection);
  }

  animateSkillBars() {
    const progressBars = document.querySelectorAll('.skill-progress');
    
    progressBars.forEach((bar, index) => {
      const level = bar.getAttribute('data-level');
      setTimeout(() => {
        bar.style.width = `${level}%`;
      }, index * 150);
    });
  }
}

// Contact Form Management
class ContactFormManager {
  constructor() {
    this.contactForm = document.getElementById('contact-form');
    this.init();
  }

  init() {
    if (this.contactForm) {
      this.contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(this.contactForm);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };
    
    // Clear previous status messages
    this.clearStatusMessages();
    
    // Basic validation
    if (!this.validateForm(data)) {
      return;
    }

    // Simulate form submission
    this.showSubmissionStatus('Sending message...', 'info');
    
    setTimeout(() => {
      this.clearStatusMessages();
      this.showSubmissionStatus('Message sent successfully!', 'success');
      this.contactForm.reset();
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        this.clearStatusMessages();
      }, 5000);
    }, 1500);
  }

  validateForm(data) {
    const { name, email, subject, message } = data;
    
    if (!name || !name.trim()) {
      this.showSubmissionStatus('Please enter your name.', 'error');
      return false;
    }
    
    if (!email || !email.trim()) {
      this.showSubmissionStatus('Please enter your email.', 'error');
      return false;
    }
    
    if (!this.isValidEmail(email)) {
      this.showSubmissionStatus('Please enter a valid email address.', 'error');
      return false;
    }
    
    if (!subject || !subject.trim()) {
      this.showSubmissionStatus('Please enter a subject.', 'error');
      return false;
    }
    
    if (!message || !message.trim()) {
      this.showSubmissionStatus('Please enter your message.', 'error');
      return false;
    }
    
    return true;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  clearStatusMessages() {
    const existingMessages = this.contactForm.querySelectorAll('.form-status');
    existingMessages.forEach(msg => msg.remove());
  }

  showSubmissionStatus(message, type) {
    // Create new status message
    const statusDiv = document.createElement('div');
    statusDiv.className = `form-status status status--${type}`;
    statusDiv.textContent = message;
    statusDiv.style.marginBottom = 'var(--space-16)';

    // Insert before submit button
    const submitButton = this.contactForm.querySelector('button[type="submit"]');
    if (submitButton) {
      this.contactForm.insertBefore(statusDiv, submitButton);
    }
  }
}

// Scroll Animations
class ScrollAnimations {
  constructor() {
    this.animatedElements = new Set();
    this.init();
  }

  init() {
    this.initObserver();
  }

  initObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          this.animatedElements.add(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements for fade-in animations
    const animateElements = document.querySelectorAll('.about__content, .section-header, .contact__content');
    animateElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.8s ease';
      observer.observe(el);
    });
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all managers
  const themeManager = new ThemeManager();
  const navigationManager = new NavigationManager();
  const portfolioManager = new PortfolioManager();
  const skillsManager = new SkillsManager();
  const contactFormManager = new ContactFormManager();
  const scrollAnimations = new ScrollAnimations();

  // Add header scroll effect
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.style.backgroundColor = 'var(--color-surface)';
        header.style.backdropFilter = 'blur(20px)';
      } else {
        header.style.backgroundColor = 'var(--color-surface)';
        header.style.backdropFilter = 'blur(10px)';
      }
    });
  }

  // Add loading animation
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});