// ============ THEME TOGGLE ============
(function () {
  const THEME_KEY = "porto_theme";
  const root = document.documentElement;
  const getInitialTheme = () => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return "light";
  };
  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  };
  applyTheme(getInitialTheme());
  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("themeToggle");
    if (!toggle) return;
    toggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      applyTheme(current === "dark" ? "light" : "dark");
    });
  });
})();

// ============ DATA PROYEK — EDIT DI SINI ============
const PROJECTS = [
  {
    title: "Animasi Juara 2 INDONERIS 2024",
    desc: "Produksi aset visual dan animasi gerak untuk entri kompetisi nasional bidang IT (Kategori Animasi).",
    category: "motion",
    catLabel: "Motion Grafis & Animasi",
    placeholder: "[Masukkan Thumbnail Animasi INDONERIS di sini]",
  },
  {
    title: "Desain Aplikasi POS Toko Pertanian",
    desc: "Perancangan antarmuka pengguna (UI) dan penyusunan presentasi untuk proyek audit sistem kasir Android.",
    category: "uiux",
    catLabel: "UI/UX Design",
    placeholder: "[Masukkan Thumbnail Figma/Aplikasi POS di sini]",
  },
  {
    title: "Komik Digital World Book Day",
    desc: "Perancangan desain komik pendek digital yang diikutsertakan dalam kompetisi perpustakaan regional Bank Indonesia.",
    category: "lainnya",
    catLabel: "Desain Digital",
    placeholder: "[Masukkan Thumbnail Komik Digital di sini]",
  },
  {
    title: "Web Development Project",
    desc: "Proyek pengembangan perangkat lunak berbasis web yang diikutsertakan pada ajang INDONERIS 2025.",
    category: "web",
    catLabel: "Web Development",
    placeholder: "[Masukkan Screenshot Web di sini]",
  },
];

function renderProjects(filter) {
  const grid = document.getElementById("projectGrid");
  grid.innerHTML = "";
  const list = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
  list.forEach((p) => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <div class="thumb"><span>${p.placeholder}</span></div>
      <div class="card-body">
        <div class="card-cat">${p.catLabel}</div>
        <div class="card-title">${p.title}</div>
        <div class="card-desc">${p.desc}</div>
      </div>`;
    grid.appendChild(card);
  });
  const addCard = document.createElement("div");
  addCard.className = "add-card";
  addCard.innerHTML = `<div class="plus">+</div><p>Tambahkan proyek kamu di sini</p>`;
  grid.appendChild(addCard);
}
renderProjects("all");
document.querySelectorAll(".filter-btn").forEach((b) => b.classList.add("active"));

document.getElementById("filterTabs").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  const allBtns = document.querySelectorAll(".filter-btn");
  if (btn.dataset.filter === "all") {
    allBtns.forEach((b) => b.classList.add("active"));
  } else {
    allBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  }
  renderProjects(btn.dataset.filter);
});

// ============ NAV: scrolled state + mobile menu ============
const header = document.getElementById("siteHeader");
window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 8));
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }),
);

// ============ REVEAL ON SCROLL ============
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealEls = document.querySelectorAll(".reveal");
if (reduceMotion) {
  revealEls.forEach((el) => el.classList.add("in"));
} else {
  const rio = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          rio.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  revealEls.forEach((el) => rio.observe(el));
}
