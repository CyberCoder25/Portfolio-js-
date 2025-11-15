'use strict';

// project section
const PROJECTS = [
  {
    icon: '🛡️',
    title: 'Security Scanner Pro',
    desc: 'Automated network security monitoring and real-time threat detection',
    tags: ['Python', 'Security', 'AI']
  },
  {
    icon: '🚀',
    title: 'E-Commerce Next',
    desc: 'Comprehensive full-stack e-commerce platform built with a modern technology stack',
    tags: ['React', 'Node.js', 'MongoDB']
  },
  {
    icon: '🎨',
    title: 'UI Framework X',
    desc: 'Modern React component library featuring seamless animations and optimized UI patterns',
    tags: ['React', 'TypeScript', 'CSS']
  },
  {
    icon: '🔐',
    title: 'PassGuard Elite',
    desc: 'End-to-end encrypted password management system ensuring zero-knowledge security',
    tags: ['Encryption', 'Security', 'Electron']
  },
  {
    icon: '📱',
    title: 'Mobile First App',
    desc: 'Cross-platform mobile application engineered with React Native for optimal performance',
    tags: ['React Native', 'Mobile', 'API']
  },
  {
    icon: '🤖',
    title: 'AI Code Analyzer',
    desc: 'Machine learning–driven vulnerability detection engine for proactive threat mitigation',
    tags: ['Python', 'ML', 'Security']
  }
];

// skill section
const SKILLS = [
  { name: 'Python', level: 95 },
  { name: 'JavaScript/TS', level: 92 },
  { name: 'React/Next.js', level: 90 },
  { name: 'Cyber Security', level: 88 },
  { name: 'Node.js', level: 85 },
  { name: 'SQL/NoSQL', level: 82 },
  { name: 'Linux/DevOps', level: 87 },
  { name: 'Docker/K8s', level: 80 }
];

// loader
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const mainContent = document.getElementById("mainContent");

  // show loading while page loads
  loader.classList.remove("hide");
  mainContent.style.visibility = "hidden";

  // when page finishes loading
  window.addEventListener("load", () => {
    const loaderFill = document.querySelector(".loader-fill");

    // pause effect
    loaderFill.addEventListener("animationend", () => {
      setTimeout(() => {
        loader.classList.add("hide");
        mainContent.style.visibility = "visible";
      }, 500); // smooth transition effect
    });
  });
});

// accessible toast messages replaces alerts
function ensureToast() {
  let t = document.querySelector('.site-toast');
  if (t) return t;
  t = document.createElement('div');
  t.className = 'site-toast';
  t.setAttribute('role', 'status');
  t.setAttribute('aria-live', 'polite');
  document.body.appendChild(t);
  return t;
}

function showMessage(msg, ms = 4500) {
  const t = ensureToast();
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._hide);
  t._hide = setTimeout(() => t.classList.remove('show'), ms);
}

// light mode default
// translate light mode
const lightModeContent = {
  ka: {
    lighting: '● AVAILABLE FOR WORK',
    insteadName: 'თამთა ხუციშვილი',
    heroDesc: 'მე გთავაზობთ უსაფრთხო, საიმედო და მომხმარებლზე მორგებულ ვებსაიტებს, აპლიკაციებს, ქსელებისა და საოფისე სისტემებს სრული კიბერუსაფრთხოების პრინციპების დაცვით. სწრაფ, პროფესიონალურ და თქვენს საჭიროებებზე მორგებულ სერვისებს.',
    contactTitle: 'დაგვიკავშირდით',
    projectBtn:'ნახე პროექტები',
    projectsTitle: 'ჩემი პროექტები',
    projectsIntro:'უახლესი და ინოვაციური პროექტები სხვადასხვა ტექნოლოგიით',
    skillsTitle: 'ტექნიკური უნარები',
    skillsText:'ტექნოლოგიები, რომლებსაც ვიყენებ',
    servTitle:'სერვისები',
    servText:'პროფესიონალური კიბერუსაფრთხოების აუდიტი და IT სერვისები თქვენი ბიზნესისთვის',
    qustionTitle:'არ იცი რომელი პაკეტი გჭირდება?',
    questionText:'მიიღეთ უფასო კონსულტაცია და მე დაგეხმარებით სწორი არჩევანის გაკეთებაში',
    cont:'დაგვიკავშირდი',
    contBTN:'დაგვიკავშირდი',
    contText:'მოგვწერეთ თქვენი პროექტის დეტალები და მიიღეთ ინდივიდუალური შეთავაზება',
    themeToggle:'🌓',
    sendBTN:'გაგზავნა →',
    projBtn:'პროექტები',
    ski:'უნარები',
    serv:'სერვისები',
    con:'კონტაქტი'
  },
  en: {
    lighting: '● AVAILABLE FOR WORK',
    insteadName: 'Tamta Khutsishvili',
    heroDesc: 'I provide secure, reliable, and user-friendly websites, applications, networks, and office systems with full cybersecurity protection. Fast, professional, and tailored to your needs.',
    contactTitle: 'Contact Me',
    projectBtn: 'See projects',
    projectsTitle: 'Portfolio',
    projectsIntro: 'Latest projects built with modern technologies, ensuring secure and reliable solutions for your business.',
    skillsTitle: 'My Expertise',
    skillsText:'Main Skills and Capabilities',
    servTitle:'Services',
    servText: 'Professional IT Services and Cybersecurity Solutions for Your Business',
    qustionTitle:'Not sure which package fits your business needs?',
    questionText:'Schedule a free consultation and we"ll guide you to the perfect solution tailored for your company.',
    cont:'Contact Us',
    contBTN:'Contact Us',
    contText:'Share your project details with us and receive a tailored proposal',
    themeToggle:'🌓',
    sendBTN:'Send →',
    projBtn:'PROJECTS',
    ski:'SKILLS',
    serv:'SERVICES',
    con:'CONTACT'
  }
};

//translate dark mode
// dark mode
const darkModeContent = {
  ka: {
    lighting: '● Full-Stack | CyberSec | Ethical Hacker',
    insteadName: 'Full-Stack დეველოპერი',
    heroDesc: 'გთავაზობთ robust და end-to-end secure ვებ და აპლიკაციების ეკოსისტემების შექმნას Python, JS/TypeScript და C გამოყენებით და scalable არქიტექტურების უზრუნველყოფით. ჩვენთან OWASP standards-ის დაცვა, penetration-hardened endpoints, encrypted network workflows, Full-Stack Development და Software Security-ის პრინციპების სრული ინტეგრაცია უზრუნველყოფს CyberSecurity–ს სრულ კონტროლს.',
    contactTitle:'კომუნიკაცია [ end-to-end encrypted ]',
    projectBtn:'👇',
    projectsTitle: 'პროექტები და Codebase',
    projectsIntro: 'ინოვაციური და cutting-edge პროექტები, სადაც კოდი აერთიანებს offensive და defensive არქიტექტურებს — თანამედროვე ტექნოლოგიებისა და კიბერუსაფრთხოების სტანდარტების სრულად გათვალისწინებით',
    skillsTitle: 'ტექნიკური უნარები',
    skillsText: 'პროგრამული ენები და Cybersecurity უნარები',
    servTitle:'სერვისები',
    servText:'პროფესიონალური კიბერუსაფრთხოების აუდიტი და IT სერვისები თქვენი ბიზნესისთვის',
    qustionTitle:'გაქვს იდეა?',
    questionText:'მოდი ერთად შევარჩიოთ საუკეთესო პაკეტი იდეის განსახორციელებლად',
    cont:'დაგვიკავშირდი',
    contBTN:'დაგვიკავშირდი',
    contText:'მოგვწერეთ თქვენი პროექტის დეტალები და მიიღეთ ინდივიდუალური შეთავაზება',
    themeToggle:'⚡',
    sendBTN:'გაგზავნა →',
    projBtn:'პროექტები',
    ski:'უნარები',
    serv:'სერვისები',
    con:'კონტაქტი'
  },
  en: {
    lighting: '● Full-Stack | CyberSec | Ethical Hacker',
    insteadName: 'CyberSecurity Explorer and Full-Stack developer',
    heroDesc: 'Engineering robust, end-to-end secure web and application ecosystems. Leveraging Python, JS/TypeScript, and C for scalable architectures while enforcing OWASP standards, penetration-hardened endpoints, and encrypted network workflows.',
    contactTitle: 'Secure Communication',
    projectBtn:'Let`s craft the future → ',
    projectsTitle: 'Security Projects & Codebase',
    projectsIntro:'Cutting-edge and innovative projects leveraging diverse technologies and advanced security practices.',
    skillsTitle: 'Skill Matrix',
    skillsText: 'Deep expertise in Full-Stack Development and Cyber Security practices, leveraging modern technologies for secure and scalable solutions',
    servTitle:'Services',
    servText: 'Comprehensive Cybersecurity Audit and Advanced IT Solutions for Your Business',
    qustionTitle:'Not sure which package fits your setup?',
    questionText:'Need a hand picking the right package? Let"s chat and find the best fit for your setup.',
    cont:'Contact Us',
    contBTN:'Contact Us',
    contText:'Send us your project details and let"s craft a secure, custom solution together',
    themeToggle:'⚡',
    sendBTN:'Send →',
    projBtn:'PROJECTS',
    ski:'SKILLS',
    serv:'SERVICES',
    con:'CONTACT'
  }
};

// 2 state management
let currentLang = 'ka';
let isDarkMode = false;
// prevent duplicate submissions
let isSubmitting = false;

// 3 dom cache
const DOM = {};

function cacheDOM() {
  DOM.projectsGrid = document.getElementById('projectsGrid');
  DOM.skillsGrid = document.getElementById('skillsGrid');
  DOM.burger = document.getElementById('burger');
  DOM.navLinks = document.querySelector('.nav-links');
  DOM.themeToggle = document.getElementById('themeToggle');
  DOM.langToggle = document.getElementById('langToggle');
  DOM.langFlag = document.getElementById('langFlag');
  DOM.langText = document.getElementById('langText');
  DOM.contactForm = document.getElementById('contactForm');
  DOM.body = document.body;
}

// 4 utility function
// to create element safely
function createElement(tag, className = '', textContent = '') {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (textContent) el.textContent = textContent;
  return el;
}

// sanitize input xss protection
function sanitizeInput(str) {
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
}

// validate email
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// safe content update
function setElementContent(element, content) {
  if (!element) return;
  element.textContent = sanitizeInput(content);
}

// 5. render function
function renderProjects() {
  if (!DOM.projectsGrid) return;

  const fragment = document.createDocumentFragment();

  PROJECTS.forEach((project, index) => {
    const card = createElement('div', 'project');
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.05}s`;

    const icon = createElement('div', 'project-icon', project.icon);
    const title = createElement('h3', 'project-title', project.title);
    const desc = createElement('p', 'project-desc', project.desc);
    const tagsDiv = createElement('div', 'project-tags');

    project.tags.forEach(tag => {
      tagsDiv.appendChild(createElement('span', 'tag', tag));
    });

    card.append(icon, title, desc, tagsDiv);
    fragment.appendChild(card);
  });

  DOM.projectsGrid.innerHTML = '';
  DOM.projectsGrid.appendChild(fragment);

  // trigger animation
  setTimeout(() => {
    document.querySelectorAll('.project').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }, 100);
}

function renderSkills() {
  if (!DOM.skillsGrid) return;

  const fragment = document.createDocumentFragment();

  SKILLS.forEach((skill, index) => {
    const card = createElement('div', 'skill');
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.05}s`;

    const header = createElement('div', 'skill-header');
    header.appendChild(createElement('div', 'skill-name', skill.name));
    header.appendChild(createElement('div', 'skill-percent', `${skill.level}%`));

    const bar = createElement('div', 'skill-bar');
    const fill = createElement('div', 'skill-fill');
    fill.dataset.level = skill.level;
    bar.appendChild(fill);

    card.append(header, bar);
    fragment.appendChild(card);
  });

  DOM.skillsGrid.innerHTML = '';
  DOM.skillsGrid.appendChild(fragment);

  // trigger animations
  setTimeout(() => {
    document.querySelectorAll('.skill').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      const fill = el.querySelector('.skill-fill');
      if (fill) fill.style.width = `${fill.dataset.level}%`;
    });
  }, 100);
}

// 6. theme and language management
function updateContent(isDark, lang) {
  const content = isDark ? darkModeContent[lang] : lightModeContent[lang];
  if (!content) return;

  Object.keys(content).forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      setElementContent(element, content[id]);
    }
  });
}

function toggleTheme() {
  isDarkMode = !isDarkMode;

  if (isDarkMode) {
    DOM.body.classList.add('dark');
  } else {
    DOM.body.classList.remove('dark');
  }

  updateContent(isDarkMode, currentLang);
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

function switchLanguage(newLang) {
  currentLang = newLang;
  updateContent(isDarkMode, currentLang);

  // update language toggle button
  if (DOM.langFlag && DOM.langText) {
    DOM.langFlag.textContent = currentLang === 'ka' ? '🇬🇪' : '🇺🇸';
    DOM.langText.textContent = currentLang === 'ka' ? 'EN' : 'KA';
  }

  localStorage.setItem('language', currentLang);
}

function loadPreferences() {
  try {
    // load theme default is light
    const savedTheme = localStorage.getItem('theme');
    isDarkMode = savedTheme === 'dark';

    if (isDarkMode) {
      DOM.body.classList.add('dark');
    } else {
      DOM.body.classList.remove('dark');
    }

    // load language default is georgia
    const savedLang = localStorage.getItem('language') || 'ka';
    currentLang = savedLang;

    // update content
    updateContent(isDarkMode, currentLang);

    // update language toggle
    if (DOM.langFlag && DOM.langText) {
      DOM.langFlag.textContent = currentLang === 'ka' ? '🇬🇪' : '🇺🇸';
      DOM.langText.textContent = currentLang === 'ka' ? 'EN' : 'KA';
    }
  } catch (e) {
    console.warn('failed to load preferences:', e);
  }
}

// 7 navigation function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    closeMenu();
  }
}

function toggleMenu() {
  if (!DOM.burger || !DOM.navLinks) return;
  DOM.burger.classList.toggle('active');
  DOM.navLinks.classList.toggle('active');
}

function closeMenu() {
  if (!DOM.burger || !DOM.navLinks) return;
  DOM.burger.classList.remove('active');
  DOM.navLinks.classList.remove('active');
}

// 8 form handling with backend api
// Form handling with backend API
async function handleSubmit(e) {
  e.preventDefault();
  e.stopPropagation();

  if (isSubmitting) {
    return;
  }
  isSubmitting = true;

  const formData = new FormData(e.target);
  const name = sanitizeInput(formData.get('name').trim());
  const email = sanitizeInput(formData.get('email').trim());
  const message = sanitizeInput(formData.get('message').trim());

  // Client-side validation
  if (!name || name.length < 2) {
    showMessage(currentLang === 'ka' ? 'გთხოვთ შეიყვანოთ სწორი სახელი (მინიმუმ 2 სიმბოლო)' : 'Please enter a valid name (minimum 2 characters)');
    isSubmitting = false;
    return;
  }

  if (!validateEmail(email)) {
    showMessage(currentLang === 'ka' ? 'გთხოვთ შეიყვანოთ სწორი ელ. ფოსტა' : 'Please enter a valid email');
    isSubmitting = false;
    return;
  }

  if (!message || message.length < 10) {
    showMessage(currentLang === 'ka' ? 'გთხოვთ შეიყვანოთ უფრო დეტალური შეტყობინება (მინიმუმ 10 სიმბოლო)' : 'Please enter a more detailed message (minimum 10 characters)');
    isSubmitting = false;
    return;
  }

  const submitBtn = e.target.querySelector('button[id="sendBTN"]');
  if (!submitBtn) {
    isSubmitting = false;
    return;
  }

  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = currentLang === 'ka' ? 'იგზავნება...' : 'Sending...';

  try {
    // Get API configuration
    const apiBase = window.CONFIG?.API_URL || 'http://localhost:5000/api';
    const csrfEndpoint = window.CONFIG?.ENDPOINTS?.CSRF_TOKEN || '/csrf-token';
    const contactEndpoint = window.CONFIG?.ENDPOINTS?.CONTACT || '/contact';

    console.log('🔧 Using API:', apiBase);

    // Fetch CSRF token for security
    let csrfToken = null;
    try {
      const csrfResponse = await fetch(apiBase + csrfEndpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (csrfResponse.ok) {
        const csrfData = await csrfResponse.json();
        csrfToken = csrfData.csrfToken;
        console.log('✅ CSRF token received');
      }
    } catch (csrfError) {
      console.warn('⚠️ CSRF token fetch failed:', csrfError);
    }

    // Set up request timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    // Send contact form data to backend
    const response = await fetch(apiBase + contactEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(csrfToken && { 'X-CSRF-Token': csrfToken })
      },
      body: JSON.stringify({ name, email, message }),
      signal: controller.signal,
      credentials: 'include'
    });

    clearTimeout(timeoutId);

    const data = await response.json();

    // Handle response status
    if (response.ok) {
      showMessage(currentLang === 'ka' ? '✅ მადლობა! თქვენი შეტყობინება წარმატებით გაიგზავნა.' : '✅ Thank you! Your message was sent successfully.');
      e.target.reset();
    } else if (response.status === 429) {
      showMessage(currentLang === 'ka' ? '⏱️ ძალიან ბევრი მცდელობა. გთხოვთ ცოტა ხნის შემდეგ სცადოთ.' : '⏱️ Too many requests. Please try again later.');
    } else if (response.status === 400) {
      const errorMsg = data.errors?.join(', ') || data.message || 'validation failed';
      showMessage(currentLang === 'ka' ? '❌ დაშვებული შეცდომა: ' + errorMsg : '❌ error: ' + errorMsg);
    } else {
      throw new Error(data.message || 'failed to send message');
    }
  } catch (error) {
    console.error('❌ Submit error:', error);
    
    if (error.name === 'AbortError') {
      showMessage(currentLang === 'ka' ? '⏱️ მოთხოვნა ვადაგადაცილდა. გთხოვთ ხელახლა სცადოთ.' : '⏱️ request timeout. please try again.');
    } else {
      showMessage(currentLang === 'ka' ? '❌ შეცდომა! გთხოვთ სცადოთ მოგვიანებით ან დაგვიკავშირდით პირდაპირ.' : '❌ error! please try again later or contact us directly.');
    }
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
    isSubmitting = false;
  }
}

// 9 scroll animation
function setupScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          if (entry.target.classList.contains('skill')) {
            const fill = entry.target.querySelector('.skill-fill');
            if (fill) fill.style.width = `${fill.dataset.level}%`;
          }
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  const elements = document.querySelectorAll('.service-card');
  elements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });
}

// 10 event listeners
function setupEventListeners() {
  // burger menu toggle
  if (DOM.burger) {
    DOM.burger.addEventListener('click', toggleMenu);
  }

  // theme toggle
  if (DOM.themeToggle) {
    DOM.themeToggle.addEventListener('click', toggleTheme);
  }

  // language toggle
  if (DOM.langToggle) {
    DOM.langToggle.addEventListener('click', () => {
      const newLang = currentLang === 'ka' ? 'en' : 'ka';
      switchLanguage(newLang);
    });
  }

  // contact form - attach submit handler directly to form
  if (DOM.contactForm) {
    DOM.contactForm.addEventListener('submit', handleSubmit);
  }

  // scroll buttons event delegation
  document.addEventListener('click', (e) => {
    const scrollBtn = e.target.closest('[data-scroll]');
    if (scrollBtn) {
      e.preventDefault();
      const target = scrollBtn.dataset.scroll;
      scrollToSection(target);
    }
  });

  // close menu on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav') && DOM.navLinks && DOM.navLinks.classList.contains('active')) {
      closeMenu();
    }
  });

  // close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && DOM.navLinks && DOM.navLinks.classList.contains('active')) {
      closeMenu();
    }
  });
}

// 11 initialization
function init() {
  // cache dom elements
  cacheDOM();

  // load saved preferences
  loadPreferences();

  // render content
  renderProjects();
  renderSkills();

  // setup animations
  setupScrollAnimations();

  // setup event listeners
  setupEventListeners();

  console.log('portfolio initialized successfully!');
}

// 12 start application
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}