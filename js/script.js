'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const lightIcon = document.querySelector('.light-icon');
const darkIcon = document.querySelector('.dark-icon');

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
const savedTheme = localStorage.getItem('theme') || (prefersDark.matches ? 'dark' : 'light');

// Function to apply theme and update elements
const applyTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  // Toggle icons
  lightIcon.style.display = theme === 'dark' ? 'none' : 'inline';
  darkIcon.style.display = theme === 'dark' ? 'inline' : 'none';

  // Update all service icons dynamically
  document.querySelectorAll(".service-icon-box img").forEach(img => {
    const currentSrc = img.getAttribute("src");

    if (theme === "light" && !currentSrc.includes("-sunset")) {
      img.setAttribute("src", currentSrc.replace(".svg", "-sunset.svg"));
    } else if (theme === "dark" && currentSrc.includes("-sunset")) {
      img.setAttribute("src", currentSrc.replace("-sunset.svg", ".svg"));
    }
  })
}

// Function to toggle theme
const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  applyTheme(newTheme);
};

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");


// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


// BELOW IS THE MODAL JS
document.addEventListener("DOMContentLoaded", function () {
  applyTheme(savedTheme);
  const form = document.querySelector(".form");
  const modal = document.getElementById("emailModal");
  const cancelBtn = document.getElementById("cancelBtn");
  const confirmBtn = document.getElementById("confirmBtn");

  let mailtoLink = "";

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Stop default form submission

    const name = document.querySelector("input[name='fullname']").value;
    const email = document.querySelector("input[name='email']").value;

    if (!name || !email) {
      alert("Please fill out both fields before sending.");
      return;
    }

    // Construct mailto link
    mailtoLink = `mailto:${encodeURIComponent(email)}?subject=Contact%20Form&body=Hello,%20my%20name%20is%20${encodeURIComponent(name)}.%20I%20would%20like%20to%20contact%20you.`;

    // Show modal (this prevents the form from proceeding immediately)
    modal.style.display = "flex";
  });

  cancelBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  confirmBtn.addEventListener("click", function () {
    modal.style.display = "none";
    window.location.href = mailtoLink; // Execute mailto only when the user confirms
  });

  // Close modal if clicking outside
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});

themeToggle.addEventListener("click", toggleTheme);