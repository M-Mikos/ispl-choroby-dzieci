/**
 *
 * Function marks header menu item as active, according to currently visible section. Function is fired on scroll and checks which section takes more than 50% of vieport height. Sections with height <= 50vh are ignored.
 *
 * Since the intersection observer fires callback when a certain percentage of the observed element is visible, it was not applicable here. The function uses logic that checks whether the visible part of the observed element occupies most of the height of the viewport.
 *
 * Function uses Lodash throttle function for better optimization.
 *
 * Function requires "menu__item--active" css class for highlighting menu items, and "menu__indicator" element for managing menu indicator position.
 *
 * @requires lodash.min.js
 * @param {Array} navItems array of navigation menu list items
 */

import throttle from "../../lib/lodashThrottle.js";

const navigationIndicator = (navItems) => {
  let currentSectionId = "start";
  const sections = [...navItems].map((element) =>
    document.getElementById(element.dataset.scrollTargetId)
  );

  const highlightNavItem = () => {
    const viewportHeight = window.innerHeight;
    const viewportTop = window.scrollY;
    const viewportBottom = window.scrollY + viewportHeight;

    // searching for currently visible section
    const [newCurrentSection] = sections.filter((element) => {
      const elementRect = element.getBoundingClientRect();
      const elementTop = elementRect.top + viewportTop;
      const elementBottom = elementRect.bottom + viewportTop;

      if (viewportBottom < elementTop || viewportTop > elementBottom)
        return false;

      const visibleTop = elementTop > viewportTop ? elementTop : viewportTop;
      const visibleBottom =
        elementBottom > viewportBottom ? viewportBottom : elementBottom;
      const visibleHeight = visibleBottom - visibleTop;

      if (visibleHeight / viewportHeight > 0.5) return true;
      return false;
    });

    // return if currently visible section didn't change
    if (!newCurrentSection || newCurrentSection.id === currentSectionId) return;

    // setting currently visible section
    currentSectionId = newCurrentSection.id;

    // managing menu style
    const activeNavItem = [...navItems].filter(
      (element) => element.dataset.scrollTargetId === currentSectionId
    )[0];

    const inactiveNavItem = [...navItems].filter(
      (element) => element.dataset.scrollTargetId !== currentSectionId
    );

    activeNavItem.classList.add("menu__item--active");

    [...inactiveNavItem].forEach((element) => {
      element.classList.remove("menu__item--active");
    });

    // managing indicator position
    const menuIndicator = document.querySelector(".menu__indicator");

    menuIndicator.style.left = `${
      activeNavItem.offsetLeft +
      activeNavItem.getBoundingClientRect().width / 2 -
      10
    }px`;
  };

  document.addEventListener(
    "scroll",
    throttle(highlightNavItem, 300, { trailing: true, leading: false })
  );
};

export default navigationIndicator;
