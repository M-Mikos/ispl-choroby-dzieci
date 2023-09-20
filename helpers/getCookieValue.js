/**
 * Function for getting cookie value.
 * 
 * @param {string} name Cookie name
 * @returns {string} Cookie value
 */

const getCookieValue = (name) => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name))
    ?.split("=")[1];
};

export default getCookieValue;
