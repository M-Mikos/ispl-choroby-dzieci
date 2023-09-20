/**
 *
 * Function selects first sibling of header element and generates shift via margin property. It prevents from hiding page content under the header. Usefull when header size hight depends on another script execution.
 *
 * Note: Using this function can affect user expirience by increasing content shift after script execution (Layout Content Shift)
 *
 * @param {HTMLElement} header Site header DOM element.
 */

const fixedHeaderContentShift = (header) => {
  const afterHeaderElement = header.nextElementSibling;
  afterHeaderElement.style["margin-top"] = `${header.offsetHeight}px`;
};

export default fixedHeaderContentShift;
