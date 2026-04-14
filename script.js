document.addEventListener("DOMContentLoaded", () => {

  // ===== SELECTORS =====
  const nav = document.querySelector("nav");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");

  const contactForm = document.getElementById("contact-form");
  const statusMsg = document.getElementById("status");

  const timeField = document.getElementById("time");
  const replyToField = document.getElementById("reply_to");
  const emailField = document.getElementById("email");

  // ===== AUTO TIME =====
  if (timeField) {
    timeField.value = new Date().toLocaleString();
  }

  // ===== SYNC EMAIL =====
  if (emailField && replyToField) {
    emailField.addEventListener("input", () => {
      replyToField.value = emailField.value;
    });
  }

  // ===== MOBILE MENU =====
  if (mobileMenuBtn && navLinks) {

    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");

      mobileMenuBtn.innerHTML = navLinks.classList.contains("active")
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });

    // Close menu when clicking link
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navLinks.classList.remove("active");
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  }

  // ===== NAVBAR SCROLL EFFECT =====
  window.addEventListener("scroll", () => {
    if (!nav) return;

    if (window.scrollY > 50) {
      nav.style.padding = "15px 0";
      nav.style.background = "rgba(2,6,23,0.9)";
      nav.style.backdropFilter = "blur(12px)";
    } else {
      nav.style.padding = "20px 0";
      nav.style.background = "rgba(2,6,23,0.95)";
      nav.style.backdropFilter = "blur(8px)";
    }
  });

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // ===== SECTION REVEAL (PERFORMANCE OPTIMIZED) =====
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "all 0.6s ease";
    observer.observe(section);
  });

  // ===== EMAILJS FORM =====
  if (contactForm && statusMsg) {

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      statusMsg.style.color = "#22c55e";
      statusMsg.innerText = "⏳ Sending message...";

      emailjs.sendForm("Shivam_1913", "template_uzlhfj9", this)
        .then(() => {

          // Auto-reply
          emailjs.send("Shivam_1913", "template_7dx8jze", {
            name: contactForm.name.value,
            email: contactForm.email.value,
            message: contactForm.message.value,
          });

          statusMsg.innerText = "✅ Message sent successfully!";
          contactForm.reset();

          if (timeField) timeField.value = new Date().toLocaleString();
          if (replyToField) replyToField.value = "";

        })
        .catch((error) => {
          statusMsg.style.color = "tomato";
          statusMsg.innerText = "❌ Failed to send message. Try again.";
          console.error(error);
        });
    });
  }

});