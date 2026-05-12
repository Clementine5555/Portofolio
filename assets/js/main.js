/* ═══════════════════════════════════════════
   MAIN.JS — Portfolio by Risky Fadillah
   ═══════════════════════════════════════════ */

// ── Supabase Init ──────────────────────────────────────────
let db = null;
try {
  if (typeof SUPABASE_URL !== 'undefined' && typeof SUPABASE_ANON_KEY !== 'undefined') {
    const { createClient } = supabase;
    db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('%c Supabase connected ✓', 'color: #c9973a; font-weight: bold');
  } else {
    console.warn('Supabase credentials not found. Add config.js from config.example.js');
  }
} catch (e) {
  console.warn('Supabase init error:', e.message);
}

// ── Navbar ─────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ── Mobile Menu ────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('mobile-open');
  document.body.style.overflow = navLinks.classList.contains('mobile-open') ? 'hidden' : '';
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('mobile-open');
    document.body.style.overflow = '';
  });
});

// ── Scroll Reveal ──────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Load Projects from Supabase ─────────────────────────────
async function loadProjects() {
  const grid     = document.getElementById('projectsGrid');
  const noProj   = document.getElementById('noProjects');

  if (!db) {
    // No Supabase — show demo projects
    renderProjects(getDemoProjects(), grid, noProj);
    return;
  }

  try {
    const { data, error } = await db
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (!data || data.length === 0) {
      renderProjects(getDemoProjects(), grid, noProj);
    } else {
      renderProjects(data, grid, noProj);
    }
  } catch (err) {
    console.error('Supabase fetch error:', err.message);
    renderProjects(getDemoProjects(), grid, noProj);
  }
}

function renderProjects(projects, grid, noProj) {
  grid.innerHTML = '';

  if (!projects.length) {
    noProj.style.display = 'block';
    return;
  }

  projects.forEach((p, i) => {
    const techArr = Array.isArray(p.tech_stack)
      ? p.tech_stack
      : (p.tech_stack ? p.tech_stack.split(',').map(t => t.trim()) : []);

    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.transitionDelay = `${i * 0.08}s`;

    const imageHtml = p.image_url
      ? `<img src="${p.image_url}" alt="${p.title}" class="project-img" loading="lazy">`
      : `<div class="project-img-placeholder">${p.emoji || '🚀'}</div>`;

    const techHtml = techArr.map(t => `<span>${t}</span>`).join('');

    const linksHtml = [
      p.demo_url  ? `<a href="${p.demo_url}" target="_blank" class="project-link">Live Demo ↗</a>` : '',
      p.github_url ? `<a href="${p.github_url}" target="_blank" class="project-link">GitHub ↗</a>` : ''
    ].filter(Boolean).join('');

    card.innerHTML = `
      ${imageHtml}
      <div class="project-body">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.description || ''}</p>
        <div class="project-tech">${techHtml}</div>
        <div class="project-links">${linksHtml}</div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Demo projects kalau belum setup Supabase
function getDemoProjects() {
  return [
    {
      title: 'DeFi Analyst Course',
      description: 'AI-powered 6-phase self-learning course covering AMM mechanics, impermanent loss, lending/borrowing, staking, stablecoin types, and DeFi risk taxonomy.',
      tech_stack: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
      demo_url: 'https://clementine5555.github.io',
      github_url: 'https://github.com/Clementine5555',
      emoji: '📊',
    },
    {
      title: 'CODE FEST 001 Event Docs',
      description: 'Complete event documentation system for a national IT competition — rundowns, RAB budget, Gantt timeline, guidebook, and TOR for 500+ participants.',
      tech_stack: ['Word', 'Excel', 'Event Management'],
      demo_url: null,
      github_url: null,
      emoji: '🎯',
    },
    {
      title: 'Financial Data Portfolio',
      description: 'Growing collection of SQL queries, Excel models, and data visualizations focused on financial and market analysis.',
      tech_stack: ['SQL', 'Excel', 'Python', 'Data Analysis'],
      demo_url: null,
      github_url: 'https://github.com/Clementine5555',
      emoji: '💹',
    }
  ];
}

// ── Init ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadProjects();
});
