/**
 * Function for setting cookie
 *
 * @param {string} name Cookie name
 * @param {string} value Cookie value
 * @param {number} exdays Cookie expiration days
 */

const setCookie = (name, value, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

export default setCookie;
