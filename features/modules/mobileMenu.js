/**
 * Function enables the mobile menu feature on screens narrower than 1024px. It supports opening with a trigger ("js-menu-trigger" class), and closing with multiple elements (such as navigation elements). Moreover, function manages styles for trigger button and overlay
 * Function requires "hidden" class with "display:none" CSS property
 *
 * @param {Array} triggers list of DOM elements for toggling the mobile menu. The list should contain element with "js-menu-trigger" class.
 * @param {HTMLElement} menu DOM element with menu navigation list
 * @param {HTMLElement} overlay An overlay elemen to hide body under modal.
 */

const mobileMenu = (triggers, menu, overlay) => {
  // selecting menu trigger button
  const triggerBtn = triggers.filter((element) =>
    element.classList.contains("js-menu-trigger")
  )[0];

  const toggle = () => {
    // toggling menu
    if (window.matchMedia("(min-width: 1024px)").matches) return;
    menu.classList.toggle("header__menu--mobile-hidden");
    // toggling trigger btn icon
    triggerBtn.classList.toggle("header__menu-trigger--active");
    // toggling overlay
    overlay.classList.toggle("hidden");
  };

  // setting listeners
  triggers.forEach((element) => element.addEventListener("click", toggle));
};

export default mobileMenu;
