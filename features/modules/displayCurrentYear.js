/**
 * Simple function for displaying current year.
 *
 * @param {HTMLElement} root DOM element serving as injection point for year string.
 */

const displayCurrentYear = (root) => {
  const year = new Date(Date.now());
  root.insertAdjacentHTML("afterbegin", year.getFullYear());
};

export default displayCurrentYear;
