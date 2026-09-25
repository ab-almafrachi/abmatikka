// Language switcher
document.addEventListener("DOMContentLoaded", () => {
  const languageOptions = document.querySelectorAll(".lang-option");
  if (!languageOptions.length) return;

  const languageTargets = {
    fi: document.querySelector('link[rel="alternate"][hreflang="fi"]')?.href,
    en: document.querySelector('link[rel="alternate"][hreflang="en"]')?.href
  };

  languageOptions.forEach((option) => {
    const isEnglish = option.getAttribute("aria-label") === "English";
    const language = isEnglish ? "en" : "fi";
    const target = languageTargets[language];

    if (target) {
      option.dataset.languageTarget = target;
    }

    option.addEventListener("click", (event) => {
      event.preventDefault();

      const destination = option.dataset.languageTarget || languageTargets[language];
      if (!destination) return;

      if (option.classList.contains("active")) {
        window.location.reload();
        return;
      }

      window.location.assign(destination);
    });
  });
});

// Hamburger menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

function setMenuState(isOpen) {
  if (!hamburger || !navLinks) return;

  hamburger.classList.toggle("active", isOpen);
  navLinks.classList.toggle("active", isOpen);
  hamburger.setAttribute("aria-expanded", String(isOpen));
  const isEnglish = document.documentElement.lang === "en";

  hamburger.setAttribute(
    "aria-label",
    isOpen
      ? (isEnglish ? "Close menu" : "Sulje valikko")
      : (isEnglish ? "Open menu" : "Avaa valikko")
  );
}

if (hamburger && navLinks) {
hamburger.addEventListener("click", () => {
const isOpen = hamburger.getAttribute("aria-expanded") === "true";
setMenuState(!isOpen);
});

document.addEventListener("keydown", event => {
if (event.key === "Escape") {
setMenuState(false);
}
});
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"], a[href^="/#"]').forEach(link => {
  link.addEventListener("click", e => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const targetSelector = targetId.startsWith("/#") ? targetId.slice(1) : targetId;
    const target = document.querySelector(targetSelector);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    setMenuState(false);
  });
});

// FAQ accordion
document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    const faqItem = button.closest(".faq-item");

    if (!faqItem) return;

    faqItem.classList.toggle("active");
  });
});

// Booking form logic
document.addEventListener("DOMContentLoaded", () => {
const typeSelect = document.getElementById("type");
const placeGroup = document.getElementById("place-group");
const placeInput = document.getElementById("place");

if (typeSelect && placeGroup && placeInput) {
function updateTeachingMode() {
if (typeSelect.value === "lahi") {
placeGroup.style.display = "flex";
placeInput.required = true;
} else {
placeGroup.style.display = "none";
placeInput.required = false;
placeInput.value = "";
}
}

typeSelect.addEventListener("change", updateTeachingMode);

updateTeachingMode();

}
});

const GA_ID = "G-5XBF9J3QQ0";

window.dataLayer = window.dataLayer || [];

function gtag() {
  dataLayer.push(arguments);
}

window.gtag = gtag;

gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 1000
});

/* -----------------------------
   STATE STORAGE
------------------------------ */
const CONSENT_VERSION = "v2";

function saveConsent(state) {
  localStorage.setItem("cookie_consent", JSON.stringify({
    version: CONSENT_VERSION,
    analytics: state.analytics,
    timestamp: Date.now()
  }));
}

function getConsent() {
  try {
    const raw = localStorage.getItem("cookie_consent");
    if (!raw) return null;

    const consent = JSON.parse(raw);

    if (consent.version !== CONSENT_VERSION) {
      localStorage.removeItem("cookie_consent");
      return null;
    }

    return consent;
  } catch {
    return null;
  }
}

/* -----------------------------
   CONSENT APPLY
------------------------------ */
function applyConsent(analyticsAllowed) {

  gtag('consent', 'update', {
    analytics_storage: analyticsAllowed ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });

  if (analyticsAllowed) {
    loadGA();
  }
}

/* -----------------------------
   UI HELPERS
------------------------------ */
function show(el) { if (el) el.style.display = "block"; }
function hide(el) { if (el) el.style.display = "none"; }

/* -----------------------------
   INIT
------------------------------ */
document.addEventListener("DOMContentLoaded", () => {

  const banner = document.getElementById("cookie-banner");
  const modal = document.getElementById("cookie-modal");

  const acceptBtn = document.getElementById("cookie-accept");
  const rejectBtn = document.getElementById("cookie-reject");
  const settingsBtn = document.getElementById("cookie-settings-floating");

  const saveBtn = document.getElementById("cookie-save");
  const analyticsToggle = document.getElementById("analytics-toggle");

  const existing = getConsent();

  const floatingSettings =
    document.getElementById("cookie-settings-floating");

  if (existing) {
    floatingSettings.style.display = "block";
    } else {
    floatingSettings.style.display = "none";
  }

  if (!existing) {
    show(banner);
  } else {
    applyConsent(existing.analytics);
  }

  /* -------------------------
     MAIN BUTTONS
  -------------------------- */

  acceptBtn?.addEventListener("click", () => {
    saveConsent({ analytics: true });
    applyConsent(true);

    hide(banner);
    floatingSettings.style.display = "block";
});

rejectBtn?.addEventListener("click", () => {
    saveConsent({ analytics: false });
    applyConsent(false);

    hide(banner);
    floatingSettings.style.display = "block";
});

  settingsBtn?.addEventListener("click", () => {
    const consent = getConsent();
    analyticsToggle.checked = consent ? consent.analytics : false;
    show(modal);
  });

  saveBtn?.addEventListener("click", () => {
    const value = analyticsToggle.checked;

    saveConsent({ analytics: value });
    applyConsent(value);

    hide(modal);
    hide(banner);

    floatingSettings.style.display = "block";
});

});

let gaLoaded = false;

function loadGA() {
  if (gaLoaded) return;

  gaLoaded = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;

  script.onload = () => {
    gtag("js", new Date());
    gtag("config", GA_ID, {
    anonymize_ip: true,
    send_page_view: true
    });
  };

  document.head.appendChild(script);
}

