/* =========================================================
   Razeena R — Portfolio Script
   - Theme switcher (dark / peacock) with localStorage
   - Smooth scroll active nav link
   - Reveal-on-scroll animation
   - Typewriter hero subtitle
   - Skill bars animate on view
   - Contact form (client-side validation)
   - Mobile menu toggle, ripple, back-to-top, resume download
   ========================================================= */

(() => {
  /* ---------- THEME SWITCHER ---------- */
  const THEMES = ["dark", "peacock"];
  const STORAGE_KEY = "razeena.portfolio.theme";
  const DEFAULT_THEME = "dark";

  const applyTheme = (theme) => {
    if (!THEMES.includes(theme)) theme = DEFAULT_THEME;
    document.documentElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  };

  // Migrate any old "light" preference to dark, then apply.
  const stored = localStorage.getItem(STORAGE_KEY);
  const savedTheme = THEMES.includes(stored) ? stored : DEFAULT_THEME;
  applyTheme(savedTheme);

  const themeSwitcher = document.getElementById("themeSwitcher");
  const themeBtn = document.getElementById("themeBtn");
  const themeMenu = document.getElementById("themeMenu");

  themeBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    themeSwitcher.classList.toggle("open");
  });

  themeMenu?.querySelectorAll("button[data-theme-set]").forEach((btn) => {
    btn.addEventListener("click", () => {
      applyTheme(btn.dataset.themeSet);
      themeSwitcher.classList.remove("open");
    });
  });

  document.addEventListener("click", (e) => {
    if (!themeSwitcher?.contains(e.target)) {
      themeSwitcher?.classList.remove("open");
    }
  });

  /* ---------- NAVBAR ---------- */
  const navbar = document.getElementById("navbar");
  const navLinks = document.getElementById("navLinks");
  const hamburger = document.getElementById("hamburger");
  const toTop = document.getElementById("toTop");

  const onScroll = () => {
    if (window.scrollY > 12) navbar?.classList.add("scrolled");
    else navbar?.classList.remove("scrolled");

    // back-to-top
    if (window.scrollY > 500) toTop?.classList.add("show");
    else toTop?.classList.remove("show");

    // active link
    let current = "";
    document.querySelectorAll("section[id]").forEach((sec) => {
      const top = sec.offsetTop - 110;
      if (window.scrollY >= top) current = sec.id;
    });
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`,
      );
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile hamburger
  hamburger?.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks?.classList.toggle("open");
  });
  navLinks?.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      hamburger?.classList.remove("open");
      navLinks?.classList.remove("open");
    }),
  );

  /* ---------- TYPEWRITER ---------- */
  const typedEl = document.getElementById("typed");
  const phrases = [
    "AI & Data Science Student",
    "Full Stack Developer",
    "Python · Flask · React",
    "Crafting AI-powered apps",
  ];
  let pIdx = 0,
    cIdx = 0,
    deleting = false;

  const typeLoop = () => {
    if (!typedEl) return;
    const phrase = phrases[pIdx];
    if (!deleting) {
      cIdx++;
      typedEl.textContent = phrase.slice(0, cIdx);
      if (cIdx === phrase.length) {
        deleting = true;
        return setTimeout(typeLoop, 1600);
      }
      return setTimeout(typeLoop, 70);
    } else {
      cIdx--;
      typedEl.textContent = phrase.slice(0, cIdx);
      if (cIdx === 0) {
        deleting = false;
        pIdx = (pIdx + 1) % phrases.length;
      }
      return setTimeout(typeLoop, 35);
    }
  };
  typeLoop();

  /* ---------- REVEAL ON SCROLL ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  const skillBars = document.querySelectorAll(".bar");

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  revealEls.forEach((el) => io.observe(el));

  const barIo = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          barIo.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 },
  );
  skillBars.forEach((b) => barIo.observe(b));

  /* ---------- BUTTON RIPPLE ---------- */
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  /* ---------- BACK TO TOP ---------- */
  toTop?.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );

  /* ---------- CONTACT FORM (client-side) ---------- */
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const email = (data.get("email") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();

    status.className = "form-status";
    if (!name || !email || !message) {
      status.textContent = "Please fill in all fields.";
      status.classList.add("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = "Please enter a valid email address.";
      status.classList.add("error");
      return;
    }

    // Open default mail client with the message pre-filled.
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(
      `${message}\n\n— ${name}\n${email}`,
    );
    window.location.href = `mailto:razeena.aids@gmail.com?subject=${subject}&body=${body}`;

    status.textContent = "Opening your email client… Thanks for reaching out!";
    status.classList.add("success");
    form.reset();
  });

  /* ---------- DOWNLOAD RESUME (graceful) ---------- */
  const resumeBtn = document.getElementById("downloadResume");
  resumeBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    // Generate a printable resume on the fly so the button is always functional.
    const resumeHtml = `<!doctype html><html><head><meta charset="utf-8"><title>Razeena R — Resume</title>
      <style>
        body { font-family: -apple-system, Segoe UI, Roboto, sans-serif; max-width: 780px; margin: 32px auto; color: #0f172a; padding: 0 24px; }
        h1 { margin: 0 0 4px; font-size: 28px; }
        h2 { margin: 24px 0 8px; font-size: 16px; text-transform: uppercase; letter-spacing: .08em; color: #2563eb; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; }
        .row { color: #475569; font-size: 14px; margin-bottom: 16px; }
        ul { margin: 6px 0 12px 18px; }
        li { margin: 4px 0; }
        .item { margin-bottom: 14px; }
        .item strong { display: block; }
        .item span { color: #64748b; font-size: 13px; }
      </style></head><body>
      <h1>Razeena R</h1>
      <div class="row">Tenkasi, Tamil Nadu · +91 93852 88326 · razeena.aids@gmail.com<br>
        linkedin.com/in/razeena-r-4400a32aa · github.com/Razeena-04 · hackerrank.com/profile/razeena_aids</div>
      <h2>Summary</h2>
      <p>Data Science undergraduate building AI-powered web apps with Python and Flask. Skilled in efficient data workflows and user-focused full-stack solutions.</p>
      <h2>Education</h2>
      <div class="item"><strong>B.Tech in AI & Data Science — Panimalar Engineering College</strong><span>2023 – 2027 · CGPA 8.41 / 10.0</span></div>
      <h2>Skills</h2>
      <p><strong>Languages:</strong> Python, Java, SQL<br><strong>Web:</strong> HTML, CSS, JavaScript, React<br><strong>Tools:</strong> GitHub, VS Code, Jupyter, AWS, Flask, Firebase<br><strong>Concepts:</strong> OOP, Data Structures, MVC</p>
      <h2>Internships</h2>
      <div class="item"><strong>Data Science Intern — VCODEZ</strong><span>Jun 2025 – Jul 2025</span>
        <ul><li>Analyzed real-time datasets with Python & Pandas.</li><li>Optimized data cleaning pipelines, reducing processing time by 30%.</li></ul></div>
      <div class="item"><strong>Web Development Intern — Robowaves</strong><span>Feb 2025 – Apr 2025</span>
        <ul><li>Built responsive web applications using React.js and Firebase.</li><li>Handled deployment and secure backend storage.</li></ul></div>
      <h2>Projects</h2>
      <div class="item"><strong>GoalSplit AI</strong><span>Flask · OpenAI API</span>
        <p>AI-powered task decomposition system with real-time progress tracking.</p></div>
      <div class="item"><strong>Ultimate Freelancer Dashboard</strong><span>Chart.js · LocalStorage</span>
        <p>Dashboard for earnings and project timelines with dynamic visualizations.</p></div>
      <div class="item"><strong>School Management System</strong><span>Java · MVC</span>
        <p>Console application for managing students and teachers using OOP.</p></div>
      <h2>Certifications & Achievements</h2>
      <ul>
        <li>Infosys Springboard — Data Science Foundation (Nov 2025)</li>
        <li>Infosys Springboard — Front End Web Developer (Nov 2025)</li>
        <li>Infosys Springboard — Java Foundation (Mar 2026)</li>
        <li>NPTEL — Python for Data Science, IIT Madras (Elite, 2025)</li>
        <li>British Council — English Proficiency CEFR B1 (2024)</li>
        <li>All India Rank — ICAT Examination</li>
        <li>Paper Presentation — ICoNIC International Conference (2025)</li>
        <li>Project Presentation — PECTEM 2K24</li>
      </ul>
      <script>window.onload = () => window.print();<\/script>
      </body></html>`;
    const w = window.open("", "_blank");
    if (w) {
      w.document.write(resumeHtml);
      w.document.close();
    }
  });

  /* ---------- FOOTER YEAR ---------- */
  const yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
