async (e) => {
  e.preventDefault();
  e.stopPropagation();

  const dropdownContents = document.querySelectorAll(`.dropdown-content`);
  dropdownContents.forEach((e) => e.classList.remove("visible"));

  const dropdownContent = document.querySelector(`#dropdown${index}`);

  const currentElement = e.target;
  dropdownContent.classList.toggle("visible");

  function handleOutsideClick(e) {
    if (
      !currentElement.contains(e.target) &&
      !dropdownContent.contains(e.target)
    ) {
      dropdownContent.classList.remove("visible");
    }

    document.removeEventListener("click", handleOutsideClick);
  }

  document.addEventListener("click", handleOutsideClick);
};
