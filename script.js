    // projects data
    const projects = [
      { icon: '🛡️', title: 'Security Scanner Pro', desc: 'ავტომატური ქსელის უსაფრთხოების მონიტორინგი და real-time დეტექცია', tags: ['Python', 'Security', 'AI'] },
      { icon: '🚀', title: 'E-Commerce Next', desc: 'სრული full-stack ონლაინ მაღაზია თანამედროვე tech stack-ით', tags: ['React', 'Node.js', 'MongoDB'] },
      { icon: '🎨', title: 'UI Framework X', desc: 'მოდერნული React კომპონენტების ბიბლიოთეკა ანიმაციებით', tags: ['React', 'TypeScript', 'CSS'] },
      { icon: '🔐', title: 'PassGuard Elite', desc: 'end-to-end დაშიფრული პაროლების მართვის სისტემა', tags: ['Encryption', 'Security', 'Electron'] },
      { icon: '📱', title: 'Mobile First App', desc: 'cross-platform მობილური აპლიკაცია React Native-ით', tags: ['React Native', 'Mobile', 'API'] },
      { icon: '🤖', title: 'AI Code Analyzer', desc: 'machine learning-ზე დაფუძნებული vulnerability detector', tags: ['Python', 'ML', 'Security'] }
    ]

    // skills data
    const skills = [
      { name: 'Python', level: 95 },
      { name: 'JavaScript/TS', level: 92 },
      { name: 'React/Next.js', level: 90 },
      { name: 'Cyber Security', level: 88 },
      { name: 'Node.js', level: 85 },
      { name: 'SQL/NoSQL', level: 82 },
      { name: 'Linux/DevOps', level: 87 },
      { name: 'Docker/K8s', level: 80 }
    ]

    // hide loader
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.getElementById('loader').classList.add('hide');
      }, 2500);
    });

    // toggle menu
    function toggleMenu() {
      const navLinks = document.querySelector('.nav-links');
      navLinks.classList.toggle('active');
    }

    // scroll to sec.
    function scrollToSection(id) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        document.querySelector('.nav-links').classList.remove('active');
      }
    }

    // toggle theme
    function toggleTheme() {
      document.body.classList.toggle('light');
    }

    // render project
    function renderProjects() {
      const grid = document.getElementById('projectsGrid');
      grid.innerHTML = projects.map(p => `
        <div class="project">
          <div class="project-tags">
            ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
        </div>
      `).join('');
    }

    // render skills
    function renderSkills() {
      const grid = document.getElementById('skillsGrid');
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

    // form submit
    function handleSubmit(e) {
      e.preventDefault();
      alert('✓ შეტყობინება წარმატებით გაიგზავნა!');
      e.target.reset();
    }

    // initialize
    document.addEventListener('DOMContentLoaded', () => {
      renderProjects();
      renderSkills();
    });

    // scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    window.addEventListener('load', () => {
      const cards = document.querySelectorAll('.project, .service-card, .skill');
      cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
      });
    });