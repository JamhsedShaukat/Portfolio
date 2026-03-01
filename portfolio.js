/* ========================================
   Jamshed Shaukat — Portfolio JavaScript
   Modern vanilla JS (no jQuery dependency)
   ======================================== */

document.addEventListener("DOMContentLoaded", () => {
  // ================================
  // CURSOR GLOW EFFECT
  // ================================
  const cursorGlow = document.getElementById("cursorGlow");
  if (cursorGlow && window.innerWidth > 768) {
    document.addEventListener("mousemove", (e) => {
      requestAnimationFrame(() => {
        cursorGlow.style.left = e.clientX + "px";
        cursorGlow.style.top = e.clientY + "px";
      });
    });
  }

  // ================================
  // NAVBAR SCROLL EFFECT
  // ================================
  const navbar = document.getElementById("navbar");
  const scrollTop = document.getElementById("scrollTop");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function onScroll() {
    const scrollY = window.scrollY;

    // Navbar background
    if (scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Scroll to top button
    if (scrollY > 500) {
      scrollTop.classList.add("visible");
    } else {
      scrollTop.classList.remove("visible");
    }

    // Active nav link
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // Initial call

  // ================================
  // SCROLL TO TOP
  // ================================
  scrollTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ================================
  // HAMBURGER MENU
  // ================================
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.style.overflow = navMenu.classList.contains("active")
      ? "hidden"
      : "";
  });

  // Close menu on link click
  navMenu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // ================================
  // TYPING ANIMATION
  // ================================
  const typingElement = document.getElementById("typingText");
  const words = [
    "React.js Developer",
    "MERN Stack Developer",
    "Full-Stack Engineer",
    "Next.js Developer",
    "AI Integrator",
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pause before deleting
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500; // Pause before typing next
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();

  // ================================
  // SCROLL REVEAL ANIMATION
  // ================================
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  // ================================
  // SMOOTH SCROLL FOR ALL ANCHOR LINKS
  // ================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ================================
  // CONTACT FORM
  // ================================
  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    // Open mailto with form data
    const mailtoLink = `mailto:jamshed.gpcnust@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    )}`;
    window.open(mailtoLink, "_blank");

    // Show success feedback
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
    btn.style.background = "linear-gradient(135deg, #22c55e, #16a34a)";

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = "";
      contactForm.reset();
    }, 3000);
  });

  // ================================
  // IFRAME FALLBACK
  // ================================
  document.querySelectorAll(".preview-wrapper iframe").forEach((iframe) => {
    iframe.addEventListener("error", () => {
      const wrapper = iframe.closest(".preview-wrapper");
      wrapper.classList.add("preview-placeholder");
      iframe.style.display = "none";

      const placeholder = document.createElement("div");
      placeholder.className = "placeholder-content";
      placeholder.innerHTML = `
        <i class="fas fa-globe"></i>
        <span>Preview Unavailable</span>
      `;
      wrapper.insertBefore(placeholder, wrapper.firstChild);
    });

    // Also handle load timeout
    setTimeout(() => {
      try {
        // Try to detect if iframe loaded (cross-origin will throw)
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        if (!doc || !doc.body || doc.body.innerHTML === "") {
          throw new Error("Empty");
        }
      } catch (e) {
        // Cross-origin or blocked — that's fine, iframe still shows
      }
    }, 5000);
  });
});
