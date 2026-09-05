/* Open Mobile Drawer Navigation */
function openMainNav() {
  const sidebar = document.getElementById("hamburger-main-nav");
  const overlay = document.getElementById("sidebar-overlay");
  const openBtn = document.getElementById("openNavBtn");

  if (sidebar) {
    sidebar.classList.add("active");
    sidebar.setAttribute("aria-hidden", "false");
  }
  if (overlay) overlay.classList.add("active");
  if (openBtn) openBtn.setAttribute("aria-expanded", "true");
  
  document.body.style.overflow = "hidden";
}

/* Close Mobile Drawer Navigation */
function closeMainNav() {
  const sidebar = document.getElementById("hamburger-main-nav");
  const overlay = document.getElementById("sidebar-overlay");
  const openBtn = document.getElementById("openNavBtn");

  if (sidebar) {
    sidebar.classList.remove("active");
    sidebar.setAttribute("aria-hidden", "true");
  }
  if (overlay) overlay.classList.remove("active");
  if (openBtn) openBtn.setAttribute("aria-expanded", "false");

  document.body.style.overflow = "";
}

/* Select Lead Project Type in Step 1 */
function selectLeadOption(value) {
  const hiddenInput = document.getElementById("selectedProjectType");
  if (hiddenInput) {
    hiddenInput.value = value;
  }
  
  const step1 = document.getElementById("formStep1");
  const step2 = document.getElementById("formStep2");
  if (step1) step1.classList.add("d-none");
  if (step2) step2.classList.remove("d-none");
}

/* Reset multi-step form back to step 1 */
function resetFormSteps() {
  const step1 = document.getElementById("formStep1");
  const step2 = document.getElementById("formStep2");
  if (step1) step1.classList.remove("d-none");
  if (step2) step2.classList.add("d-none");
}

/* Submit lead via asynchronous AJAX call directly to free FormSubmit endpoint */
function handleLeadSubmit(event) {
  event.preventDefault();
  
  const form = document.getElementById("interactiveLeadForm");
  const name = document.getElementById("leadName").value.trim();
  const email = document.getElementById("leadEmail").value.trim();
  const message = document.getElementById("leadMessage").value.trim();
  const projectType = document.getElementById("selectedProjectType").value;
  const errorMsg = document.getElementById("formErrorMsg");
  const submitBtn = document.getElementById("submitBtn");

  if (!name || !email || !message || !email.includes("@")) {
    if (errorMsg) {
      errorMsg.innerText = "Please fill in all required fields accurately.";
      errorMsg.classList.remove("d-none");
    }
    return;
  }

  if (errorMsg) errorMsg.classList.add("d-none");
  if (submitBtn) {
    submitBtn.innerText = "Sending Message...";
    submitBtn.disabled = true;
  }

  fetch("https://formsubmit.co/ajax/doctoleemark@gmail.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "Name": name,
      "Email": email,
      "Project Type": projectType || "Not Specified",
      "Message": message,
      "_subject": "Mugcrater - New Project Inquiry",
      "_template": "table"
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success === "true" || data.success === true) {
      form.classList.add("d-none");
      document.getElementById("leadSuccessMsg").classList.remove("d-none");
    } else {
      if (submitBtn) {
        submitBtn.innerText = "Send Message →";
        submitBtn.disabled = false;
      }
      if (errorMsg) {
        errorMsg.innerText = "Error sending message. Please try again.";
        errorMsg.classList.remove("d-none");
      }
    }
  })
  .catch(error => {
    if (submitBtn) {
      submitBtn.innerText = "Send Message →";
      submitBtn.disabled = false;
    }
    if (errorMsg) {
      errorMsg.innerText = "An unexpected network error occurred. Please try again.";
      errorMsg.classList.remove("d-none");
    }
  });
}

/* Initialization on DOM Ready */
document.addEventListener("DOMContentLoaded", function () {
  
  // Dynamic Footer Current Year
  const currentYearElem = document.getElementById("currentYear");
  if (currentYearElem) {
    currentYearElem.textContent = `© ${new Date().getFullYear()} Mugcrater Web Development Services. All rights reserved.`;
  }

  // Sticky Header Scroll Listener
  const headerElem = document.getElementById("header");
  if (headerElem) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        headerElem.classList.add("header-scrolled");
      } else {
        headerElem.classList.remove("header-scrolled");
      }
    });
  }

  // Mobile Link Click Handler for Smooth Anchoring
  const sidebarLinks = document.querySelectorAll("#hamburger-main-nav a[href^='#']");
  sidebarLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      closeMainNav();

      if (targetId && targetId !== "#") {
        e.preventDefault();
        setTimeout(() => {
          const targetElem = document.querySelector(targetId);
          if (targetElem) {
            const headerOffset = 70;
            const elementPosition = targetElem.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
          }
        }, 200);
      }
    });
  });

  // ESC Key Listener to Close Sidebar
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeMainNav();
    }
  });
});