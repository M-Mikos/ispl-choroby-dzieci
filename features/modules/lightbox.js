/**
 * Function generates simple lightbox from gallery images. Lightbox supports navigation by buttons, keyboard arrow and swipe gestures. For better expirience, this feature sholud be paired with modal module.
 *
 * @see `module:modal.js`
 * @param {HTMLElement} gallery DOM element that contains the images to be included in the gallery. All children image elements will be included. Gallery images should have "data-src-gallery" attribute with source path to lightbox version of image.
 * @param {HTMLElement} root DOM element serving as injection point for generated lightbox markup. Root element should be placed inside modal content element.
 */

const lightbox = (gallery, root) => {
  const galleryImages = gallery.querySelectorAll("img");

  // Generating lightbox slider markup

  const lightboxSlidesMarkup = Array.from(galleryImages)
    .map((el) => {
      return `<li class="lightbox__item">
       <img class="lightbox__img" src="${el.dataset.srcGallery}"/>
      </li>
     `;
    })
    .join(" ");

  const lightboxContentMarkup = `<div class="lightbox__container">
      <ul class="lightbox__slides">${lightboxSlidesMarkup}</ul>
        <div class="lightbox__nav">
          <div class="nav__btn" rel="prev">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m10.8 12l3.9 3.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.212-.325T8.425 12q0-.2.063-.375T8.7 11.3l4.6-4.6q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7L10.8 12Z"/></svg>
          </div>
          <div class="nav__btn" rel="next">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12.6 12L8.7 8.1q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375q0 .2-.063.375t-.212.325l-4.6 4.6q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l3.9-3.9Z"/></svg>
          </div>
        </div>
      </div>`;

  root.insertAdjacentHTML("afterbegin", lightboxContentMarkup);

  // Setting lightbox position

  let initialX = 0;
  let slideDirection = null;
  let currentSlide;
  let sliderShift;

  const slider = document.querySelector(".lightbox__slides");

  const showCurrentSlide = () => {
    const sliderItemWidth =
      document.querySelector(".lightbox__item").clientWidth;
    sliderShift = -(sliderItemWidth + 50) * (currentSlide - 1);
    slider.style.transform = `translateX(${sliderShift}px)`;
  };

  const prevSlide = () => {
    if (currentSlide === 1) showCurrentSlide();
    else currentSlide = currentSlide - 1;
    showCurrentSlide();
  };
  const nextSlide = () => {
    if (currentSlide === galleryImages.length) showCurrentSlide();
    else currentSlide = currentSlide + 1;
    showCurrentSlide();
  };

  // Managing swipe events

  const beginSwipe = (e) => {
    initialX = e.touches[0].clientX;
  };

  const swipe = (e) => {
    const swipeLength = initialX - e.touches[0].clientX;

    slider.style.transform = `translateX(${sliderShift - swipeLength}px)`;

    if (swipeLength < -40) slideDirection = "left";
    else if (swipeLength > 40) slideDirection = "right";
    else slideDirection = null;
  };

  // Setting listeners

  const stopSwipe = (e) => {
    e.preventDefault();
    if (slideDirection === null) showCurrentSlide();
    if (slideDirection === "left") prevSlide();
    if (slideDirection === "right") nextSlide();
  };

  galleryImages.forEach((el, i) => {
    const displaySlide = () => {
      currentSlide = i + 1;
      showCurrentSlide();
    };
    el.addEventListener("click", displaySlide);
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        displaySlide();
      }
    });
  });

  document.querySelector(".lightbox__nav").addEventListener("click", (e) => {
    const navBtn = e.target.closest(".nav__btn");
    if (!navBtn) return;
    navBtn.attributes.rel.value === "prev" && prevSlide();
    navBtn.attributes.rel.value === "next" && nextSlide();
  });

  document.addEventListener("keydown", (e) => {
    if (
      window.getComputedStyle(document.getElementById("modal-lightbox"), null)
        .display === "none"
    )
      return;
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });

  slider.addEventListener("touchstart", beginSwipe, { passive: true });
  slider.addEventListener("touchmove", swipe, { passive: true });
  slider.addEventListener("touchend", stopSwipe);
};

export default lightbox;
