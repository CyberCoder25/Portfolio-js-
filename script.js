// projects data
const projects = [
  { icon: '🛡️', title: 'Security Scanner Pro', desc: 'ავტომატური ქსელის უსაფრთხოების მონიტორინგი და real-time დეტექცია', tags: ['Python', 'Security', 'AI'] },
  { icon: '🚀', title: 'E-Commerce Next', desc: 'სრული full-stack ონლაინ მაღაზია თანამედროვე tech stack-ით', tags: ['React', 'Node.js', 'MongoDB'] },
  { icon: '🎨', title: 'UI Framework X', desc: 'მოდერნული React კომპონენტების ბიბლიოთეკა ანიმაციებით', tags: ['React', 'TypeScript', 'CSS'] },
  { icon: '🔐', title: 'PassGuard Elite', desc: 'end-to-end დაშიფრული პაროლების მართვის სისტემა', tags: ['Encryption', 'Security', 'Electron'] },
  { icon: '📱', title: 'Mobile First App', desc: 'cross-platform მობილური აპლიკაცია React Native-ით', tags: ['React Native', 'Mobile', 'API'] },
  { icon: '🤖', title: 'AI Code Analyzer', desc: 'machine learning-ზე დაფუძნებული vulnerability detector', tags: ['Python', 'ML', 'Security'] }
];

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
];

// sanitize function (optional, DOM elements უკვე უსაფრთხოა)
function sanitize(str) {
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.textContent;
}

// toggle menu
function toggleMenu() {
  const nav = document.querySelector('.nav-links');
  nav.classList.toggle('active');

  if (nav.classList.contains('active')) {
    // Slide-in effect
    nav.style.transform = 'translateX(0)';
    nav.style.opacity = '1';
  } else {
    nav.style.transform = 'translateX(100%)';
    nav.style.opacity = '0';
  }
}


// scroll to section
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.querySelector('.nav-links').classList.remove('active');
  }
}

// toggle theme
function toggleTheme() {
  document.body.classList.toggle('light');
}

// render projects (DOM-ით, innerHTML არ გამოიყენება)
function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  grid.textContent = ''; // სუფთა
  projects.forEach(p => {
    const card = document.createElement('div');
    card.className = 'project';

    const icon = document.createElement('div');
    icon.className = 'project-icon';
    icon.textContent = p.icon;
    card.appendChild(icon);

    const title = document.createElement('h3');
    title.className = 'project-title';
    title.textContent = p.title;
    card.appendChild(title);

    const desc = document.createElement('p');
    desc.className = 'project-desc';
    desc.textContent = p.desc;
    card.appendChild(desc);

    const tagsDiv = document.createElement('div');
    tagsDiv.className = 'project-tags';
    p.tags.forEach(t => {
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = t;
      tagsDiv.appendChild(tag);
    });
    card.appendChild(tagsDiv);

    grid.appendChild(card);
  });
}

// render skills (DOM-ით)
function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  grid.textContent = '';
  skills.forEach(s => {
    const skill = document.createElement('div');
    skill.className = 'skill';

    const header = document.createElement('div');
    header.className = 'skill-header';

    const name = document.createElement('div');
    name.className = 'skill-name';
    name.textContent = s.name;
    header.appendChild(name);

    const percent = document.createElement('div');
    percent.className = 'skill-percent';
    percent.textContent = s.level + '%';
    header.appendChild(percent);

    skill.appendChild(header);

    const bar = document.createElement('div');
    bar.className = 'skill-bar';

    const fill = document.createElement('div');
    fill.className = 'skill-fill';
    fill.dataset.level = s.level;
    bar.appendChild(fill);

    skill.appendChild(bar);
    grid.appendChild(skill);
  });

  setTimeout(() => {
    document.querySelectorAll('.skill-fill').forEach(el => {
      el.style.width = el.dataset.level + '%';
    });
  }, 300);
}

// handle contact form
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.querySelector('[name="name"]').value.trim();
  const email = form.querySelector('[name="email"]').value.trim();
  const message = form.querySelector('[name="message"]').value.trim();

  if (!name || !email || !message) {
    alert('გთხოვ, შეავსე ყველა ველი.');
    return;
  }

  fetch('http://localhost:5000/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message })
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) alert(data.error);
    else {
      alert(data.success);
      form.reset();
    }
  })
  .catch(err => {
    console.error(err);
    alert('რაღაც მოხდა, სცადეთ მოგვიანებით.');
  });
}

// loader hide
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hide');
  }, 2500);
});

// scroll animation observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

// initialize everything
document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  renderSkills();

  // scroll animations
  const cards = document.querySelectorAll('.project, .service-card, .skill');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });

  // burger menu
  document.getElementById('burger').addEventListener('click', toggleMenu);

  // nav buttons scroll
  document.getElementById('projectsBtn').addEventListener('click', () => scrollToSection('projects'));
  document.getElementById('skillsBtn').addEventListener('click', () => scrollToSection('skills'));
  document.getElementById('servicesBtn').addEventListener('click', () => scrollToSection('services'));
  document.getElementById('contactBtn').addEventListener('click', () => scrollToSection('contact'));

  // theme toggle
  document.querySelectorAll('.nav-links button')[4].addEventListener('click', toggleTheme);

  // contact form
  document.getElementById('contactForm').addEventListener('submit', handleSubmit);
});
