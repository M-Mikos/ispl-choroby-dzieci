/**
 * Function accepcts array of DOM elements and adds smooth scrolling function on click, according to element's "data-scroll-target-id" attribute. Function listens to enter key press for keyboard navigation users.
 *
 * @param {Array} navElements Array of DOM elements. Every element should have "data-scroll-target-id" attribute, with scroll target element ID as a value.
 * @param {HTMLElement} offsetElement Scroll target elements recive top scroll margin equal to height of this element. Useful for preventing content hide below fixed header on scroll to target. Optional.
 */

const smoothScrolling = (navElements, offsetElement) => {
  // generate array of scroll target elements
  navElements.forEach((element) => {
    const scrollTarget = document.getElementById(
      element.dataset.scrollTargetId
    );

    // add top margin value as offset (useful in case of fixed header)
    if (offsetElement)
      scrollTarget.style[
        "scroll-margin-top"
      ] = `${offsetElement.offsetHeight}px`;

    // main scroll function
    const scroll = () => {
      scrollTarget.scrollIntoView({ behavior: "smooth" });
    };

    // setting listeners
    element.addEventListener("click", scroll);
    element.addEventListener("keydown", (e) => {
      if (e.key === "Enter") scroll();
    });
  });
};

export default smoothScrolling;
