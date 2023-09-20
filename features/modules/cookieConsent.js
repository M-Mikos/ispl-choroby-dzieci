import getCookieValue from "../../helpers/getCookieValue.js";
import setCookie from "../../helpers/setCookie.js";
import gtag from "../../helpers/gtag.js";

/**
 * This function generates cookie constent banner, based on data fetched from cookieData.json file. Module have to be place inside modal component to effectively block access to the website.
 *
 * Module requires "hidden" and "flipped" CSS classes, as well as banner stylesheet (in this project contained in style.css file).
 * Module is connected to Google Tag Manager to execute user's cookie permissions.
 * For more information see README.md document.
 *
 * @see README.md
 * @requires module:"modal.js"
 * @requires getCookieValue.js
 * @requires setCookie.js
 * @requires gtag.js
 * @requires cookieData.json
 * @param {HTMLElement} root DOM element serving as injection point for generated cookie banner. Root element should be placed inside modal content element. To prevent user from accesing the page, closing modal should be possible only by giving cookie permission (no closing by "x" button or clicking on overlay)
 * @param {HTMLElement} trigger Hidden HTML element used for opening cookie banner modal by simulated event. The same element should be passed to modal module function as trigger.
 */

const cookieConsent = async (root, trigger) => {
  const cookieData = await fetch("cookieData.json").then((response) =>
    response.json()
  );

  const cookiesCategoryMarkup = (cookiesCategoryData) => {
    const cookiesGroupMarkup = (cookiesGroupData) => {
      return cookiesGroupData
        .map((provider) => {
          const cookieDetailsMarkup = provider.cookies
            .map((cookie) => {
              return `<li class="cookie">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-75 29-147t81-128.5q52-56.5 125-91T475-881q21 0 43 2t45 7q-9 45 6 85t45 66.5q30 26.5 71.5 36.5t85.5-5q-26 59 7.5 113t99.5 56q1 11 1.5 20.5t.5 20.5q0 82-31.5 154.5t-85.5 127q-54 54.5-127 86T480-80Zm-60-480q25 0 42.5-17.5T480-620q0-25-17.5-42.5T420-680q-25 0-42.5 17.5T360-620q0 25 17.5 42.5T420-560Zm-80 200q25 0 42.5-17.5T400-420q0-25-17.5-42.5T340-480q-25 0-42.5 17.5T280-420q0 25 17.5 42.5T340-360Zm260 40q17 0 28.5-11.5T640-360q0-17-11.5-28.5T600-400q-17 0-28.5 11.5T560-360q0 17 11.5 28.5T600-320ZM480-160q122 0 216.5-84T800-458q-50-22-78.5-60T683-603q-77-11-132-66t-68-132q-80-2-140.5 29t-101 79.5Q201-644 180.5-587T160-480q0 133 93.5 226.5T480-160Zm0-324Z"/></svg>
              <div class="cookie__details">
                <h5 class="cookie-details__title">${cookie.name}</h5>
                <p class="cookie-details__desc">
                      ${cookie.desc}
                </p>
                <div class="cookie-details__data">
                  <p>
                    Data ważności: <span class="cookie-details__duration">${cookie.duration}</span>
                  </p>
                  <p>
                    Typ: <span class="cookie-details__type">${cookie.type}</span>
                  </p>
                </div>
              </div>
            </li>`;
            })
            .join(" ");

          return `<li class="provider list">
        <div class="provider__name">
          <h4>${provider.name}</h4>
        </div>
        <div class="provider__details list">
          ${
            provider.desc
              ? `
          <div> 
            <h5>Opis usługi</h5> 
            <p>${provider.desc}</p>
          </div>`
              : ""
          } 
          ${
            provider.details_link
              ? `
          <div> 
            <h5>Szczegóły</h5> 
            <p> 
            <a href="${provider.details_link}">Kliknij tutaj, aby sprawdzić politykę prywatności dostawcy</a>
            </p>
          </div>`
              : ""
          } 
          ${
            provider.third_countries
              ? `
          <div> 
            <h5>Transfer danych do krajów trzecich</h5> 
            <p>${provider.third_countries}</p>
          </div>`
              : ""
          } 
          <div> 
            <h5>Szczegóły plików cookies</h5> 
            <ul class="cookie__list">${cookieDetailsMarkup}</ul>
          </div>
        </div>
      </li>`;
        })
        .join("");
    };

    return ` <div id="${cookiesCategoryData.id}" class="group list">
      <div class="group__title">
        <h3>${cookiesCategoryData.title}</h3>
        <div class="group__acceptance">
          <label for="${cookiesCategoryData.id}-checkbox">Zgoda:</label>
          <input
          class="group__checkbox"
            type="checkbox"
            name="${cookiesCategoryData.id}-checkbox"
            id="${cookiesCategoryData.id}-checkbox"
            ${cookiesCategoryData.necessary ? "checked disabled" : ""}
          />
          <button id="${
            cookiesCategoryData.id
          }__btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6l1.41-1.42Z"/></svg></button>
        </div>
      </div>
      <p>
        ${cookiesCategoryData.desc}
      </p>
      <ul id="${
        cookiesCategoryData.id
      }__details" class="providers__list hidden">
        ${cookiesGroupMarkup(cookiesCategoryData.providers)}
      </ul>     
    </div>`;
  };

  const cookieAgreementTabMarkup = `    
   <div class="logo">
      <img
        class="logo__img"
        src="assets/img/logo-ispl-choroby-dzieci-agnieszka-wodzynska.webp"
        alt="Logo ISPL Choroby Dzieci"
       />
         <strong>
         ISPL <span>Choroby Dzieci</span></strong>
    </div>
    <h2>Ta strona wykorzystuje pliki cookies</h2>
    <p>W celu optymalizacji naszej strony internetowej analizujemy zachowanie użytkowników na naszym serwisie. W&nbsp;tym celu -&nbsp;za Twoją zgodą&nbsp;-&nbsp;wykorzystujemy pliki cookies zapisywane na Twojej przeglądarce. Wyrażoną zgodę możesz w&nbsp;każej chwili wycofać według instrukcji dostępnych w&nbsp;naszej polityce prywatności.</p>
    `;

  const cookieSettingsTabMarkup = `<div class="settings-tab__title">
  <h2>Ustawienia prywatności</h2>
  <div id="close-cookie-settings" class="settings-tab__close"><span class="icon-close"></span></div>
</div>
<p class="settings-tab__desc">
  Tutaj możesz wybrać i dezaktywować poszczególne narzędzia wykorzystujące pliki
  cookies.
</p>
  <form id="cookie-consent-form">
   ${
     cookieData.functionality
       ? cookiesCategoryMarkup(cookieData.functionality)
       : ""
   }
   ${
     cookieData.personalization
       ? cookiesCategoryMarkup(cookieData.personalization)
       : ""
   }
   ${cookieData.security ? cookiesCategoryMarkup(cookieData.security) : ""}
   ${cookieData.analytics ? cookiesCategoryMarkup(cookieData.analytics) : ""}
   ${cookieData.ad ? cookiesCategoryMarkup(cookieData.ad) : ""}
  </form>`;

  const cookieConsentMarkup = `<div class="cookie-banner">
    <div class="content">
      <div class="agreement-tab">
      ${cookieAgreementTabMarkup}</div>
      <div class="settings-tab hidden">${cookieSettingsTabMarkup}</div>
    </div>
   <div class="buttons">
   <button id="cookie-settings" class="button button--settings">Dostosuj</button>
   <button id="cookie-reject" class="button">Odrzuć opcjonalne</button>
    <button id="cookie-save" class="button hidden">Zapisz ustawienia</button>
    <button id="cookie-accept" class="button">Akceptuj wszystkie</button>
  </div>
  </div>
 
`;

  root.insertAdjacentHTML("afterbegin", cookieConsentMarkup);

  const cookieAcceptAllBtn = document.getElementById("cookie-accept");
  const cookieSettingsBtn = document.getElementById("cookie-settings");
  const cookieRejectBtn = document.getElementById("cookie-reject");
  const cookieSaveBtn = document.getElementById("cookie-save");
  const cookieSettingsCloseBtn = document.getElementById(
    "close-cookie-settings"
  );
  const agreementTab = document.querySelector(".agreement-tab");
  const settingsTab = document.querySelector(".settings-tab");

  const toggleCookieConsentModal = () => {
    trigger.dispatchEvent(
      new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
      })
    );
  };

  const setCookieDetailsTriggers = () => {
    const setTrigger = (triggerId, dataId) => {
      const trigger = document.getElementById(triggerId);
      const data = document.getElementById(dataId);
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        data.classList.toggle("hidden");
        trigger.classList.toggle("flipped");
      });
    };
    Object.entries(cookieData).forEach((entry) => {
      if (!entry[1]) return;
      setTrigger(`${entry[1].id}__btn`, `${entry[1].id}__details`);
    });
  };

  const toggleSettings = () => {
    agreementTab.classList.toggle("hidden");
    settingsTab.classList.toggle("hidden");
    cookieSettingsBtn.classList.toggle("hidden");
    cookieSaveBtn.classList.toggle("hidden");
    cookieRejectBtn.classList.toggle("hidden");
  };

  const executeSettings = (acceptanceState) => {
    toggleCookieConsentModal();

    let consentMode;

    if (acceptanceState === "accept all") {
      consentMode = {
        ad_storage: "denied",
        analytics_storage: "granted",
        personalization_storage: "denied",
        functionality_storage: "granted",
        security_storage: "granted",
      };
    }

    if (acceptanceState === "reject") {
      consentMode = {
        ad_storage: "denied",
        analytics_storage: "denied",
        personalization_storage: "denied",
        functionality_storage: "granted",
        security_storage: "granted",
      };
    }
    if (acceptanceState === "custom") {
      const form = document.getElementById("cookie-consent-form");

      const formData = new FormData(form);
      const entries = Object.fromEntries(formData);

      console.log(entries);

      consentMode = {
        analytics_storage: entries["analytics-cookies-checkbox"]
          ? "granted"
          : "denied",
        ad_storage: entries["ad-cookies-checkbox"] ? "granted" : "denied",
        personalization_storage: entries["personalization-cookies-checkbox"]
          ? "granted"
          : "denied",
        functionality_storage: "granted",
        security_storage: "granted",
      };
    }

    gtag("consent", "update", consentMode);

    setCookie("cookie_consent", JSON.stringify(consentMode), 180);
  };

  setCookieDetailsTriggers();
  cookieSettingsBtn.addEventListener("click", toggleSettings);
  cookieSettingsCloseBtn.addEventListener("click", toggleSettings);

  cookieAcceptAllBtn.addEventListener("click", () =>
    executeSettings("accept all")
  );
  cookieRejectBtn.addEventListener("click", () => executeSettings("reject"));
  cookieSaveBtn.addEventListener("click", () => executeSettings("custom"));

  if (!getCookieValue("cookie_consent")) toggleCookieConsentModal();
};

export default cookieConsent;
