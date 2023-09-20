/**
 * Function accepcts array of DOM elements and changing element src attribute on intersection with viewport, according to element's "data-src" attribute.
 * Function requires "lazy-loaded" CSS class with blur filter.
 *
 * @param {HTMLElement} media Array of DOM elements. Every element should have "data-src" attribute, with final media path as a value.
 */

const lazyLoading = (media) => {
  const loadMedia = (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      // Replace lazy loaded source with final source
      entry.target.src = entry.target.dataset.src;
      entry.target.addEventListener("load", () => {
        // removing filter and observer on load
        entry.target.classList.remove("lazy-loaded");
        observer.unobserve(entry.target);
      });
    });
  };

  // Adding fillter
  media.forEach((el) => {
    el.classList.add("lazy-loaded");
  });

  // Setting intersection observer
  const lazyLoadObserver = new IntersectionObserver(loadMedia, {
    root: null,
    rootMargin: "768px",
    threshold: 0,
  });

  media.forEach((el) => {
    lazyLoadObserver.observe(el);
  });
};

export default lazyLoading;
