
/* =========================================
   1. MOBILE NAVIGATION
========================================= */

const menuButton = document.querySelector(".menu");
const navigation = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");

if (menuButton && navigation) {

  // Open and close mobile navigation
  menuButton.addEventListener("click", () => {

    const isOpen = navigation.classList.toggle("active");

    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );

  });


  // Close menu after clicking a navigation link
  navLinks.forEach((link) => {

    link.addEventListener("click", () => {

      navigation.classList.remove("active");

      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");

    });

  });


  // Close menu when clicking outside it
  document.addEventListener("click", (event) => {

    const clickedInsideMenu = navigation.contains(event.target);
    const clickedMenuButton = menuButton.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton) {

      navigation.classList.remove("active");

      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");

    }

  });

}


/* =========================================
   2. SCROLL REVEAL ANIMATION
========================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

  const observer = new IntersectionObserver(

    (entries, observerInstance) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          // Stop observing once the animation is triggered
          observerInstance.unobserve(entry.target);

        }

      });

    },

    {
      threshold: 0.12
    }

  );


  revealElements.forEach((element) => {
    observer.observe(element);
  });

} else {

  // Fallback for browsers without IntersectionObserver
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });

}


/* =========================================
   3. AUTOMATIC COPYRIGHT YEAR
========================================= */

const yearElement = document.getElementById("year");

if (yearElement) {

  yearElement.textContent = new Date().getFullYear();

}


/* =========================================
   4. CONTACT FORM VALIDATION
========================================= */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {

  contactForm.addEventListener("submit", (event) => {

    // Prevent default form submission
    event.preventDefault();

    const name = contactForm.elements["name"].value.trim();
    const email = contactForm.elements["email"].value.trim();
    const subject = contactForm.elements["subject"].value.trim();
    const message = contactForm.elements["message"].value.trim();


    // Check empty fields
    if (!name || !email || !subject || !message) {

      showFormMessage(
        "Please fill in all the fields.",
        "error"
      );

      return;

    }


    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

      showFormMessage(
        "Please enter a valid email address.",
        "error"
      );

      return;

    }


    // Show success-style feedback
    showFormMessage(
      "Your form looks valid! Message sending is not configured yet.",
      "success"
    );

    /*
      IMPORTANT:

      This form currently does NOT send an email
      or save the message anywhere.

      To receive actual messages, connect this form
      to a backend or a form service.

      For a Java backend, you can use:
      - Java Servlet
      - JDBC
      - MySQL

      Never rely only on frontend validation
      for security.
    */

    console.log("Contact form data:", {
      name,
      email,
      subject,
      message
    });

  });

}


/* =========================================
   5. FORM MESSAGE HELPER
========================================= */

function showFormMessage(message, type) {

  if (!formMessage) return;

  formMessage.textContent = message;

  if (type === "success") {

    formMessage.style.color = "#35e0c1";

  } else {

    formMessage.style.color = "#ff7777";

  }

}
