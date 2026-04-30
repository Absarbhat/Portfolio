// =========================
  // CURSOR
  // =========================
  const cursor = document.querySelector(".cursor");

  if (cursor) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.top = e.clientY + "px";
      cursor.style.left = e.clientX + "px";
    });
  }

  // =========================
  // SMOOTH SCROLL
  // =========================
  function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
      behavior: "smooth"
    });
  }

  // =========================
  // MOBILE MENU
  // =========================
  function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("show");
  }

  // Close menu on click
  document.querySelectorAll("#menu a").forEach(link => {
    link.addEventListener("click", () => {
      document.getElementById("menu").classList.remove("show");
    });
  });

  // =========================
  // GSAP ANIMATIONS (FINAL)
  // =========================
  gsap.registerPlugin(ScrollTrigger);

  // HERO
  gsap.from(".hero-title", {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

  gsap.from(".hero-sub", {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.3
  });

  gsap.from(".hero button", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2,
    delay: 0.5
  });

  // SECTIONS
  gsap.utils.toArray(".section").forEach(section => {
    gsap.from(section, {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
      }
    });
  });

  // =========================
  // NAV SCROLL EFFECT
  // =========================
  window.addEventListener("scroll", () => {
    document.querySelector(".nav")
      .classList.toggle("scrolled", window.scrollY > 50);
  });

  // =========================
  // MAGNETIC BUTTON EFFECT
  // =========================
  document.querySelectorAll("button, .github-btn").forEach(btn => {
    btn.addEventListener("mousemove", e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0,0)";
    });
  });

  // =========================
  // GITHUB PROJECTS (SMART)
  // =========================
  // =========================
  // GITHUB PROJECTS (FIXED)
  // =========================
  fetch("https://api.github.com/users/Absarbhat/repos")
  .then(res => {
    if (!res.ok) throw new Error("API failed");
    return res.json();
  })
  .then(data => {
    const container = document.getElementById("projects-container");
    if (!container) return;

    container.innerHTML = "";

    const projects = data
      .filter(repo => !repo.fork)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0, 4);

    if (projects.length === 0) throw new Error("No projects");

    projects.forEach(repo => {
      const div = document.createElement("div");
      div.classList.add("project-card");

      div.innerHTML = `
        <div class="project-top">
          <h3>${repo.name.replaceAll("-", " ")}</h3>
          <span>⭐ ${repo.stargazers_count}</span>
        </div>

        <p class="project-desc">
          ${repo.description || "A data-focused project showcasing practical problem solving."}
        </p>

        <div class="tech-stack">
          <span>${repo.language || "Code"}</span>
          <span>Html</span>
          <span>Java Script</span>
          <span>GitHub</span>
        </div>

        <a href="${repo.html_url}" target="_blank" class="github-btn">
          <i class="fab fa-github"></i> View on Github →
        </a>
      `;

      container.appendChild(div);
    });
  })
  .catch(() => {
    const container = document.getElementById("projects-container");

    container.innerHTML = `
      <div class="project-card">
        <h3>My Projects</h3>
        <p class="project-desc">
          Projects couldn’t load automatically. You can still view them on GitHub.
        </p>

        <a href="https://github.com/Absarbhat" target="_blank" class="github-btn">
          <i class="fab fa-github"></i> View GitHub →
        </a>
      </div>
    `;
  });
  // =========================
  // EMAILJS (FIXED)
  // =========================
  (function() {
    emailjs.init("dQNa7BG4h-XEz_JXv");
  })();

  document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();

    emailjs.sendForm("service_f0wzy3q", "template_1ggbuul", this)
      .then(() => {
        alert("Message sent successfully! ✅");
        this.reset();
      })
      .catch((error) => {
        alert("Failed to send message ❌");
        console.log(error);
      });
  });
  // =========================
// PREMIUM RADAR CHART
// =========================

const ctx = document.getElementById("radarChart");

if (ctx) {
  const isMobile = window.innerWidth <= 768;

  const radarLabels = isMobile
    ? ["Ana", "ML", "Viz", "ETL", "Cloud", "Stat"]
    : ["Analysis", "Machine Learning", "Visualization", "ETL", "Cloud", "Statistics"];

  new Chart(ctx, {
    type: "radar",

    data: {
      labels: radarLabels,

      datasets: [{
        label: "Skill Level",
        data: [90, 80, 85, 75, 65, 82],
        backgroundColor: "rgba(56,189,248,0.25)",
        borderColor: "#38bdf8",
        borderWidth: 2.5,
        pointBackgroundColor: "#3b82f6",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: isMobile ? 3 : 4,
        pointHoverRadius: 7
      }]
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      scales: {
        r: {
          min: 0,
          max: 100,

          ticks: {
            display: false,
            backdropColor: "transparent"
          },

          grid: {
            color: "rgba(255,255,255,0.16)"
          },

          angleLines: {
            color: "rgba(56,189,248,0.38)"
          },

          pointLabels: {
            display: true,
            color: "#ffffff",
            padding: isMobile ? 10 : 8,
            font: {
              size: isMobile ? 10 : 11,
              weight: "500"
            }
          }
        }
      },

      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}
