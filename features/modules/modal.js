/**
 * Function for managing modal visibility state. 
 * Function requires "hidden" and "no-scroll" CSS classes, as well as modal element with correct markup (details below).
 *
 * @param {HTMLElement} modal modal DOM element with following  markup:
 * `<div id="${modal-id}" class="modal overlay">
      <div class="modal__content">
          <div class="modal__close"><span class="icon-close"></span></div>
          ${content}
        </div>
      </div>`.
 * @param {Array} triggers array of elements for modal triggers.
 * @param {boolean} escapeClose boolean value that allows you to control whether the window can be turned off using the Escape key
 */

const modal = (modal, triggers, escapeClose) => {
  const toggleModal = (e) => {
    e.stopPropagation();
    if (triggers.includes(e.target)) {
      modal.classList.toggle("hidden");
      document.querySelector("body").classList.toggle("no-scroll");
    }
  };

  // setting event listeners on triggers
  triggers.forEach((el) => {
    el.addEventListener("click", toggleModal);
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        toggleModal(e);
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    // Return if modal is hidden
    if (window.getComputedStyle(modal, null).display === "none") return;

    // Return if Esape closing is disabled
    if (!escapeClose) return;

    // Hide on escape key press
    if (e.key === "Escape") {
      modal.classList.add("hidden");
      document.querySelector("body").classList.remove("no-scroll");
    }
  });
};
export default modal;
