// JavaScript for interactive features in the portfolio site

document.addEventListener('DOMContentLoaded', () => {
  /* Theme toggle functionality */
  const themeBtn = document.getElementById('theme-toggle');
  const THEME_KEY = 'theme';

  function applyTheme(mode) {
    document.body.classList.remove('dark');
    document.body.classList.remove('light');
    if (mode === 'dark') document.body.classList.add('dark');
    if (mode === 'light') document.body.classList.add('light');
  }

  // Initialise theme based on saved preference
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === 'dark' || savedTheme === 'light') {
    applyTheme(savedTheme);
  }

  themeBtn.addEventListener('click', () => {
    // Determine current theme
    const isDark = document.body.classList.contains('dark');
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });

  /* Personalized greeting */
  const greetingEl = document.getElementById('greeting');
  const NAME_KEY = 'username';

  function updateGreeting() {
    let name = localStorage.getItem(NAME_KEY);
    if (!name) {
      // Prompt the user for their name until a non-empty value is entered
      let input = prompt('Welcome! Please enter your name:');
      while (input && input.trim() === '') {
        input = prompt('Name cannot be empty. Please enter your name:');
      }
      if (input) {
        name = input.trim();
        localStorage.setItem(NAME_KEY, name);
      }
    }
    if (!name) {
      greetingEl.textContent = 'Welcome';
      return;
    }
    const hour = new Date().getHours();
    let timeOfDay;
    if (hour < 12) {
      timeOfDay = 'Good morning';
    } else if (hour < 18) {
      timeOfDay = 'Good afternoon';
    } else {
      timeOfDay = 'Good evening';
    }
    greetingEl.textContent = `${timeOfDay}, ${name}!`;
  }

  updateGreeting();

  /* Navigation scroll */
  document.querySelectorAll('nav button').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const section = document.getElementById(targetId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* Intersection Observer for fade-in */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-section').forEach(sec => {
    observer.observe(sec);
  });

  /* Project filtering and searching */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const searchInput = document.getElementById('project-search');
  const emptyMessage = document.getElementById('projects-empty');

  function updateProjects() {
    const activeBtn = document.querySelector('.filter-btn.active');
    const activeFilter = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
    const term = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;
    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const matchesFilter = activeFilter === 'all' || category === activeFilter;
      const text = card.textContent.toLowerCase();
      const matchesSearch = text.includes(term);
      if (matchesFilter && matchesSearch) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });
    emptyMessage.hidden = visibleCount !== 0;
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateProjects();
    });
  });

  searchInput.addEventListener('input', updateProjects);

  /* Skills collapse */
  const toggleSkillsBtn = document.getElementById('toggle-skills');
  const skillsList = document.getElementById('skills-list');
  toggleSkillsBtn.addEventListener('click', () => {
    const collapsed = skillsList.classList.toggle('collapsed');
    toggleSkillsBtn.setAttribute('aria-expanded', String(!collapsed));
    toggleSkillsBtn.textContent = collapsed ? 'Show Skills' : 'Hide Skills';
  });

  /* Quote fetching */
  const quoteBtn = document.getElementById('get-quote');
  const quoteTextEl = document.querySelector('.quote-text');
  const quoteAuthorEl = document.querySelector('.quote-author');
  quoteBtn.addEventListener('click', async () => {
    quoteBtn.disabled = true;
    quoteBtn.textContent = 'Loading…';
    quoteTextEl.textContent = '';
    quoteAuthorEl.textContent = '';
    try {
      const response = await fetch('https://api.quotable.io/random');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      quoteTextEl.textContent = `“${data.content}”`;
      quoteAuthorEl.textContent = `— ${data.author}`;
    } catch (err) {
      quoteTextEl.textContent = 'Failed to load quote. Please try again later.';
      quoteAuthorEl.textContent = '';
    } finally {
      quoteBtn.disabled = false;
      quoteBtn.textContent = 'Get a Quote';
    }
  });

  /* Contact form validation */
  const form = document.getElementById('contact-form');
  const successEl = document.getElementById('contact-success');
  form.addEventListener('submit', event => {
    event.preventDefault();
    let valid = true;
    const fieldIds = ['name', 'email', 'message'];
    const errorSpans = form.querySelectorAll('.error-message');
    fieldIds.forEach((id, idx) => {
      const input = document.getElementById(id);
      const errorSpan = errorSpans[idx];
      errorSpan.textContent = '';
      input.classList.remove('invalid');
      const value = input.value.trim();
      if (value === '') {
        errorSpan.textContent = 'This field is required.';
        input.classList.add('invalid');
        valid = false;
      } else if (id === 'email') {
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(value)) {
          errorSpan.textContent = 'Please enter a valid email.';
          input.classList.add('invalid');
          valid = false;
        }
      }
    });
    if (valid) {
      form.reset();
      form.classList.add('hidden');
      successEl.classList.remove('hidden');
    }
  });
});