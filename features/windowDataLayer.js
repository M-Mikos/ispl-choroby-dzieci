/**
 * This file encapsulates script required by Google Tag Manager.
 */

const getCookieValue = (name) => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name))
    ?.split("=")[1];
};

function gtag() {
  dataLayer.push(arguments);
}

window.dataLayer = window.dataLayer || [];

if (!getCookieValue("cookie_consent")) {
  gtag("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "denied",
    personalization_storage: "denied",
    functionality_storage: "denied",
    security_storage: "denied",
  });
} else {
  gtag("consent", "default", JSON.parse(getCookieValue("cookie_consent")));
}

gtag("js", new Date());

gtag("config", "G-GQ8360WZT2");
