/**
 * Function adds optional info above header content. If info property is falsy, nothing is added.
 *
 * @param {HTMLElement} header Site header DOM element.
 * @param {string} info Info bar text content.
 */

const topBarInfo = (header, info) => {
  // return if there is no info
  if (!info) return;

  const topBarMarkup = `<div class="header__top-bar">${info}</div>`;
  header.insertAdjacentHTML("afterbegin", topBarMarkup);
};

export default topBarInfo;
