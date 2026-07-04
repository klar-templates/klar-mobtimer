/* =============================================
   THEME TOGGLE
   ============================================= */

const styleDefault = document.getElementById("style-default");
const styleTest = document.getElementById("style-test");

/* =============================================
   NAV SCROLL BEHAVIOR
   ============================================= */

const nav = document.getElementById("nav");

window.addEventListener(
  "scroll",
  () => {
    if (window.scrollY > 20) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  },
  { passive: true },
);

/* =============================================
   INTERSECTION OBSERVER — ANIMATE ON SCROLL
   ============================================= */

const observerOptions = {
  threshold: 0.12,
  rootMargin: "0px 0px -40px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation
const animTargets = document.querySelectorAll(
  ".feature-card, .step, .preview-window, .compare-card, .why-point, .stat",
);

animTargets.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition =
    "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
  observer.observe(el);
});

// Trigger for visible elements
const onVisible = (el) => {
  el.style.opacity = "1";
  el.style.transform = "translateY(0)";
};

const visibilityObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const siblings = el.parentElement.querySelectorAll(":scope > *");
      const index = Array.from(siblings).indexOf(el);
      setTimeout(() => onVisible(el), index * 60);
      visibilityObserver.unobserve(el);
    }
  });
}, observerOptions);

animTargets.forEach((el) => visibilityObserver.observe(el));

/* =============================================
   TIMER RING ANIMATION
   ============================================= */

// Animate the hero ring progress continuously
const heroRing = document.querySelector(".ring-progress");
const heroRingBreak = document.querySelector(".ring-progress-break");

function animateRing(ringEl, from, to, duration) {
  if (!ringEl) return;
  const circumference = 2 * Math.PI * 85;
  let start = null;

  function step(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased =
      progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;
    const current = from + (to - from) * eased;
    ringEl.style.setProperty("--progress", current);
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

// Subtle ring breathing effect
let ringProgress = 0.72;
let increasing = false;

function breatheRing() {
  if (!heroRing) return;
  if (increasing) {
    ringProgress += 0.001;
    if (ringProgress >= 0.75) increasing = false;
  } else {
    ringProgress -= 0.001;
    if (ringProgress <= 0.68) increasing = true;
  }
  heroRing.style.setProperty("--progress", ringProgress);
  requestAnimationFrame(breatheRing);
}

// breatheRing();

/* =============================================
   TIMER COUNTDOWN SIMULATION
   ============================================= */

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// Screenshot overlay timer
const screenshotTimer = document.getElementById("screenshot-timer");
const stepRingProgress = document.getElementById("step-ring-progress");
const stepMenubarTime = document.getElementById("step-menubar-time");
const screenshotTotal = 15 * 60;
let screenshotSeconds = 7 * 60 + 28;
setInterval(() => {
  screenshotSeconds = Math.max(0, screenshotSeconds - 1);
  if (screenshotSeconds === 0) screenshotSeconds = screenshotTotal;
  if (screenshotTimer)
    screenshotTimer.textContent = formatTime(screenshotSeconds);
  if (stepMenubarTime)
    stepMenubarTime.textContent = `Gabriel: ${formatTime(screenshotSeconds)}`;
}, 1000);

const timerDisplays = document.querySelectorAll(".timer-time");
const mobTimeDisplay = document.querySelector(".mob-time");
const miniTimeDisplay = document.querySelector(".mini-time");

let heroSeconds = 18 * 60 + 23;
let mobSeconds = 6 * 60 + 12;
let miniSeconds = 12 * 60 + 40;

setInterval(() => {
  heroSeconds = Math.max(0, heroSeconds - 1);
  mobSeconds = Math.max(0, mobSeconds - 1);
  miniSeconds = Math.max(0, miniSeconds - 1);

  if (timerDisplays[0]) timerDisplays[0].textContent = formatTime(heroSeconds);
  if (timerDisplays[1]) timerDisplays[1].textContent = formatTime(4 * 60 + 30); // break timer stays
  if (mobTimeDisplay) mobTimeDisplay.textContent = formatTime(mobSeconds);
  if (miniTimeDisplay) miniTimeDisplay.textContent = formatTime(miniSeconds);

  // Reset when done
  if (heroSeconds === 0) heroSeconds = 25 * 60;
  if (mobSeconds === 0) mobSeconds = 10 * 60;
  if (miniSeconds === 0) miniSeconds = 15 * 60;
}, 1000);

/* =============================================
   COPY SESSION CODE INTERACTION
   ============================================= */

const copyBtn = document.querySelector(".copy-btn");
if (copyBtn) {
  copyBtn.addEventListener("click", () => {
    copyBtn.textContent = "Copied!";
    copyBtn.style.color = "var(--accent-green)";
    copyBtn.style.borderColor = "rgba(74,222,128,0.3)";
    setTimeout(() => {
      copyBtn.textContent = "Copy";
      copyBtn.style.color = "";
      copyBtn.style.borderColor = "";
    }, 2000);
  });
}

/* =============================================
   SMOOTH NAV LINK HIGHLIGHTING
   ============================================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.style.color = "";
          link.classList.toggle(
            "nav-active",
            link.getAttribute("href") === `#${id}`,
          );
        });
      }
    });
  },
  { threshold: 0.4 },
);

sections.forEach((s) => sectionObserver.observe(s));

/* =============================================
   MOB FLOW SECTION — TOAST + TIMER ANIMATION
   ============================================= */

const flowToast = document.getElementById("flow-toast");
const flowTimeEl = document.getElementById("flow-time");
let flowSeconds = 5 * 60 + 30;
const flowCircumference = 2 * Math.PI * 42;
const flowRingProgress = document.querySelector(".flow-ring-progress");
const totalTurn = 10 * 60;

const names = ["Sarah", "Marcus", "Jordan", "Alex"];
let nameIndex = 0;

function updateFlowTimer() {
  flowSeconds = Math.max(0, flowSeconds - 1);
  if (flowTimeEl) flowTimeEl.textContent = formatTime(flowSeconds);

  if (flowSeconds === 0) {
    // Show toast
    if (flowToast) {
      nameIndex = (nameIndex + 1) % names.length;
      const toastName = flowToast.querySelector(".flow-toast-text span");
      if (toastName)
        toastName.textContent = `${names[nameIndex]} is now driving.`;
      flowToast.classList.add("visible");
      setTimeout(() => flowToast.classList.remove("visible"), 3500);
    }
    flowSeconds = totalTurn;
  }
}

setInterval(updateFlowTimer, 1000);

/* =============================================
   MOB SESSION CODE GLIMMER
   ============================================= */

const sessionCode = document.querySelector(".session-code");
if (sessionCode) {
  const codes = ["MOB-4F2K", "MOB-9X1P", "MOB-7R3T", "MOB-2M8Q"];
  let codeIndex = 0;
  setInterval(() => {
    codeIndex = (codeIndex + 1) % codes.length;
    sessionCode.style.opacity = "0";
    setTimeout(() => {
      sessionCode.textContent = codes[codeIndex];
      sessionCode.style.opacity = "1";
    }, 200);
    sessionCode.style.transition = "opacity 0.2s ease";
  }, 4000);
}

/* =============================================
   HERO PARALLAX
   ============================================= */

const heroGlow1 = document.querySelector(".hero-glow-1");
const heroGlow2 = document.querySelector(".hero-glow-2");

window.addEventListener(
  "mousemove",
  (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    if (heroGlow1)
      heroGlow1.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
    if (heroGlow2)
      heroGlow2.style.transform = `translate(${-x * 0.3}px, ${-y * 0.3}px)`;
  },
  { passive: true },
);

/* =============================================
   DOWNLOAD PASSWORD GATE
   ============================================= */

const DOWNLOAD_PASSWORD = "newsweb";

document.getElementById("download-btn").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("download-modal").classList.add("visible");
  setTimeout(() => document.getElementById("dl-password").focus(), 50);
});

function attemptDownload() {
  const val = document.getElementById("dl-password").value;
  if (val === DOWNLOAD_PASSWORD) {
    document.getElementById("download-modal").classList.remove("visible");
    document.getElementById("dl-password").value = "";
    document.getElementById("dl-error").classList.remove("visible");
    const a = document.createElement("a");
    a.href = "assets/Mob Timer.dmg";
    a.download = "Mob Timer.dmg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    document.getElementById("dl-error").classList.add("visible");
    document.getElementById("dl-password").select();
  }
}

document
  .getElementById("dl-confirm")
  .addEventListener("click", attemptDownload);

document.getElementById("dl-password").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    attemptDownload();
  } else {
    document.getElementById("dl-error").classList.remove("visible");
  }
});

document.getElementById("dl-cancel").addEventListener("click", () => {
  document.getElementById("download-modal").classList.remove("visible");
  document.getElementById("dl-password").value = "";
  document.getElementById("dl-error").classList.remove("visible");
});

document.getElementById("download-modal").addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    document.getElementById("dl-cancel").click();
  }
});

// =============================================
//  MOBILE MENU
// =============================================

(function() {
  const toggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-menu-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-menu-links a, .mobile-menu-download');

  if (!toggle || !mobileMenu || !overlay) return;

  let isOpen = false;

  function openMenu() {
    isOpen = true;
    toggle.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.remove('closing');
    mobileMenu.classList.add('open');
    overlay.classList.add('visible');
    document.body.classList.add('mobile-menu-open');
  }

  function closeMenu() {
    if (!isOpen) return;
    isOpen = false;
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.add('closing');
    mobileMenu.classList.remove('open');
    overlay.classList.remove('visible');
    document.body.classList.remove('mobile-menu-open');

    // After transition ends, remove closing class
    setTimeout(() => {
      if (!isOpen) {
        mobileMenu.classList.remove('closing');
      }
    }, 350);
  }

  toggle.addEventListener('click', () => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay.addEventListener('click', closeMenu);

  // Close on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeMenu();
    }
  });

  // Close if window resizes past breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && isOpen) {
      closeMenu();
    }
  });

  // Sync active link highlighting in mobile menu
  const mobileLinkEls = document.querySelectorAll('.mobile-menu-links a');
  const sectionObserverMobile = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          mobileLinkEls.forEach((link) => {
            link.classList.toggle(
              'nav-active',
              link.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    }, {
      threshold: 0.4
    }
  );

  document.querySelectorAll('section[id]').forEach((s) => sectionObserverMobile.observe(s));
})();
