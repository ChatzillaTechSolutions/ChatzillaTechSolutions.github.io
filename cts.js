const navigationBar = document.querySelector('.navigation-bar');
const navLinks = document.querySelector('.nav-links');
const navImage = document.querySelector('.nav-image');
const loginButton = document.querySelector('.login-button');

window.addEventListener('scroll', function() {
    if (window.scrollY > 0) {
        navigationBar.classList.add('scrolled');
        navLinks.classList.add('scrolled');
        navImage.classList.add('scrolled');
        loginButton.classList.add('scrolled');
    } else {
        navigationBar.classList.remove('scrolled');
        navLinks.classList.remove('scrolled');
        navImage.classList.remove('scrolled');
        loginButton.classList.remove('scrolled');
    }
});

const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const wrapper = document.querySelector('.wrapper');
const btnPopup = document.querySelector('.login-button');
const iconClose = document.querySelector('.icon-close');

registerLink.addEventListener('click', (event) => {
  event.preventDefault();
  wrapper.classList.add('active');
});

loginLink.addEventListener('click', (event) => {
  event.preventDefault();
  wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', () => {
  wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', () => {
  wrapper.classList.remove('active-popup');
});

document.addEventListener('click', (event) => {
  if (!wrapper.contains(event.target) && !btnPopup.contains(event.target)) {
    wrapper.classList.remove('active-popup');
  }
});

const skillsSection = document.querySelector('.skills');
const skillsContinuedSection = document.querySelector('.skills-continued');

function enableHorizontalScroll() {
    skillsContinuedSection.style.overflowX = 'auto';
    skillsContinuedSection.style.overflowY = 'hidden';
}

function enableVerticalScroll() {
    skillsContinuedSection.style.overflowX = 'hidden';
    skillsContinuedSection.style.overflowY = 'hidden';
}

function onScroll() {
    const scrollPosition = window.scrollY;
    const skillsSectionHeight = skillsSection.getBoundingClientRect().height;
    const skillsContinuedSectionTop = skillsContinuedSection.offsetTop;
    const skillsContinuedSectionBottom = skillsContinuedSectionTop + skillsContinuedSection.getBoundingClientRect().height;

    if (scrollPosition >= skillsContinuedSectionTop && scrollPosition <= skillsContinuedSectionBottom) {
        enableHorizontalScroll();
    } else {
        enableVerticalScroll();
    }
}

let currentBox = 1;
const numBoxes = 4;
let isScrolling = false;

function updateCounterBox() {
  const counter = document.querySelector('.counter');
  const updatedCounter = `${currentBox.toString().padStart(2, '0')} - ${numBoxes.toString().padStart(2, '0')}`;
  counter.textContent = updatedCounter;
}

function scrollToBox(boxNumber, center = false) {
  isScrolling = true;
  const skillsBox = document.querySelector(`.skills-continued-list`);
  const boxToScroll = document.querySelector(`.skills-continued-list > .skills-box-more:nth-child(${boxNumber})`);
  const topOffset = center ? boxToScroll.offsetTop + (boxToScroll.offsetHeight - window.innerHeight) / 2 : boxToScroll.offsetTop;
  skillsBox.scrollTo({ top: topOffset, behavior: 'smooth' });
}

function handleIntersection(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
      if (currentBox !== index + 1) {
        currentBox = index + 1;
        updateCounterBox();
      }
    }
  });
}

const observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });

const skillBoxes = document.querySelectorAll('.skills-continued-list > .skills-box-more');
skillBoxes.forEach(box => observer.observe(box));

function scrollToNext() {
  if (currentBox < numBoxes) {
    currentBox++;
    updateCounterBox();
    scrollToBox(currentBox, true);
  }
}

function scrollToPrev() {
  if (currentBox > 1) {
    currentBox--;
    updateCounterBox();
    scrollToBox(currentBox, true);
  }
}

document.querySelector('.counter-arrows-l').addEventListener('click', () => {
  scrollToPrev();
});

document.querySelector('.counter-arrows-r').addEventListener('click', () => {
  scrollToNext();
});

window.addEventListener('scroll', () => {
  isScrolling = false;
  handleIntersection(skillBoxes);
});

updateCounterBox();

function toggleModal() {
  var modal = document.querySelector(".modal");
  var modalContent = document.querySelector(".modal-content");
  var displayStyle = window.getComputedStyle(modal).display;

  if (displayStyle === "none") {
    modal.style.display = "block";
    modalContent.style.display = "block";
  } else {
    modal.style.display = "none";
    modalContent.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var reviewButto = document.querySelector(".review-button"); //fix typo reviewButton(n)//
  var modal = document.querySelector(".modal");
  var modalContent = document.querySelector(".modal-content");

  reviewButton.addEventListener("click", toggleModal);

  document.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
      modalContent.style.display = "none";
    }
  });
});

const starLeft = document.getElementById("star1");
const starRight = document.getElementById("star5");
const starRange = document.querySelectorAll(".star-rating-form input[type='radio'][value!='1'][value!='5']");

starLeft.addEventListener("click", function () {
  starLeft.checked = true;
  starRange.forEach((star, index) => {
    star.checked = true;
  });
});

starRight.addEventListener("click", function () {
  starRight.checked = true;
  starRange.forEach((star, index) => {
    star.checked = false;
  });
  starLeft.checked = false;
});

starRange.forEach((star, index) => {
  star.addEventListener("click", function () {
    starRight.checked = false;
    starRange.forEach((star, idx) => {
      star.checked = idx > index;
    });
    starLeft.checked = true;
  });
});
