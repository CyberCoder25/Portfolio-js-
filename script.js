// to hide the loader
setTimeout(() => {
  document.getElementById('loader').classList.add('hide')
}, 2500);

// Smooth Scroll
function scrollTo(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Projects Data
const projects = [
  { icon: '🛡️', title: 'Security Scanner Pro', desc: 'ავტომატური ქსელის უსაფრთხოების მონიტორინგი და real-time დეტექცია', tags: ['Python', 'Security', 'AI'] },
  { icon: '🚀', title: 'E-Commerce Next', desc: 'სრული full-stack ონლაინ მაღაზია თანამედროვე tech stack-ით', tags: ['React', 'Node.js', 'MongoDB'] },
  { icon: '🎨', title: 'UI Framework X', desc: 'მოდერნული React კომპონენტების ბიბლიოთეკა ანიმაციებით', tags: ['React', 'TypeScript', 'CSS'] },
  { icon: '🔐', title: 'PassGuard Elite', desc: 'end-to-end დაშიფრული პაროლების მართვის სისტემა', tags: ['Encryption', 'Security', 'Electron'] },
  { icon: '📱', title: 'Mobile First App', desc: 'cross-platform მობილური აპლიკაცია React Native-ით', tags: ['React Native', 'Mobile', 'API'] },
  { icon: '🤖', title: 'AI Code Analyzer', desc: 'machine learning-ზე დაფუძნებული vulnerability detector', tags: ['Python', 'ML', 'Security'] }
];

// Skills Data
const skills = [
  { name: 'Python', level: 95 },
  { name: 'JavaScript/TS', level: 92 },
  { name: 'React/Next.js', level: 90 },
  { name: 'Cyber Security', level: 88 },
  { name: 'Node.js', level: 85 },
  { name: 'SQL/NoSQL', level: 82 },
  { name: 'Linux/DevOps', level: 87 },
  { name: 'Docker/K8s', level: 80 }
];


// Render Projects
function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  
  grid.innerHTML = projects.map(p => `
    <div class="project">
      <div class="project-content">
        <div class="project-icon">${p.icon}</div>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
        <div class="project-tags">
          ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// Render Skills
function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  if (!grid) return;
  
  grid.innerHTML = skills.map(s => `
    <div class="skill">
      <div class="skill-header">
        <div class="skill-name">${s.name}</div>
        <div class="skill-percent">${s.level}%</div>
      </div>
      <div class="skill-bar">
        <div class="skill-fill" data-level="${s.level}"></div>
      </div>
    </div>
  `).join('');

  setTimeout(() => {
    document.querySelectorAll('.skill-fill').forEach(el => {
      el.style.width = el.dataset.level + '%';
    });
  }, 300);
}

// Theme Toggle
function toggleTheme() {
  document.body.classList.toggle('light');
  
  // Save preference to localStorage (optional)
  const isLight = document.body.classList.contains('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Load saved theme (optional)
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light');
  }
}

// Form Submit Handler
function handleSubmit(e) {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(e.target);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message')
  };
  
  // Here you can add actual form submission logic
  // For now, just show success message
  alert('✓ შეტყობინება წარმატებით გაიგზავნა!');
  
  // Reset form
  e.target.reset();
  
  // Optional: Send to backend/email service
  // sendToBackend(data);
}

// Custom Cursor
document.addEventListener('mousemove', (e) => {
  const cursor = document.getElementById('cursor');
  if (cursor) {
    cursor.style.left = e.clientX - 16 + 'px';
    cursor.style.top = e.clientY - 16 + 'px';
  }
});

// Interactive cursor on hover
document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.getElementById('cursor');
  const interactiveElements = document.querySelectorAll('button, a, .project, .service-card');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (cursor) cursor.style.transform = 'scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
      if (cursor) cursor.style.transform = 'scale(1)';
    });
  });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  renderProjects();
  renderSkills();
  
  // Add active class to nav links on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const linkHref = link.getAttribute('onclick');
      if (linkHref && linkHref.includes(current)) {
        link.classList.add('active');
      }
    });
  });
});

// Service Cards Animation on Scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100);
    }
  });
}, observerOptions);

// Observe service cards when page loads
document.addEventListener('DOMContentLoaded', () => {
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
  });
});