const slider = document.querySelector(".slides");

const btnSlider1 = document.querySelector(".btn-slider-1");
const btnSlider2 = document.querySelector(".btn-slider-2");
const btnSlider3 = document.querySelector(".btn-slider-3");

const slides = document.querySelectorAll(".slide");

let currentIndex = 1;
const maxIndex = slides.length - 1;

btnSlider1.addEventListener("click", () => {
  console.log("click");
  slider.style.transform = `translateX(-${0 * 100}%)`;
  btnSlider1.classList.add("active");
  btnSlider2.classList.remove("active");
  btnSlider3.classList.remove("active");
  currentIndex++;
});

btnSlider2.addEventListener("click", () => {
  console.log("click");
  slider.style.transform = `translateX(-${1 * 100}%)`;

  btnSlider1.classList.remove("active");
  btnSlider2.classList.add("active");
  btnSlider3.classList.remove("active");
  currentIndex++;
});

btnSlider3.addEventListener("click", () => {
  console.log("click");
  slider.style.transform = `translateX(-${2 * 100}%)`;
  btnSlider1.classList.remove("active");
  btnSlider2.classList.remove("active");
  btnSlider3.classList.add("active");
  currentIndex++;
});
