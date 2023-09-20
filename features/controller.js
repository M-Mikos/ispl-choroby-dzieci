/**
 * This file controls the launch of JavaScript modules. It enables multiple use of the same component (for example module.js), and helps to controll module functions arguments. Moreover, controller uses imported setting from config.js file.
 *
 *The MVC architecture provides some form of inspiration for this solution. The website is modelless (except for the config.js file), all UI state is stored locally within the modules. In this pattern, the controller.js file is a script that controls the initialization of viewer modules
 */

import fixedHeaderContentShift from "./modules/fixedHeaderContentShift.js";
import lazyLoading from "./modules/lazyLoading.js";
import smoothScrolling from "./modules/smoothScrolling.js";
import topBarInfo from "./modules/topBarInfo.js";
import mobileMenu from "./modules/mobileMenu.js";
import navigationIndicator from "./modules/navigationIndicator.js";
import modal from "./modules/modal.js";
import lightbox from "./modules/lightbox.js";
import cookieConsent from "./modules/cookieConsent.js";

import { topBarMessage } from "../config.js";
import displayCurrentYear from "./modules/displayCurrentYear.js";

const navLinks = document.querySelectorAll(".js-nav-link");
const smoothScrollingElements = [
  ...document.querySelectorAll("*[data-scroll-target-id]"),
];
const lazyLoadingMedia = document.querySelectorAll("*[data-src]");
const header = document.querySelector(".header");
const mobileMenuTriggers = [
  document.querySelector(".js-menu-trigger"),
  ...document.querySelectorAll(".js-nav-link"),
];
const menu = document.querySelector(".menu");
const overlay = document.querySelector(".overlay--menu");

const gallery = document.querySelector(".gallery__grid");
const lightboxContainer = document.querySelector(".js-lightbox-root");

const cookieConsentContainer = document.querySelector(".cookie-consent__root");

const modalGPDR = document.getElementById("modal-GPDR");
const modalGPDRTriggers = [
  modalGPDR,
  document.querySelector(".js-GPDR-modal-trigger"),
  document.querySelector("#modal-GPDR .modal__close .icon-close"),
];

const modalPrivacyPolicy = document.getElementById("modal-privacy-policy");
const modalPrivacyPolicyTriggers = [
  modalPrivacyPolicy,
  document.querySelector(".js-privacy-policy-trigger"),
  document.querySelector("#modal-privacy-policy .modal__close .icon-close"),
];

const modalCookieConsent = document.getElementById("modal-cookie-consent");
const modalCookieConsentHiddenTrigger = document.getElementById(
  "cookie-consent__trigger"
);
const modalCookieConsentTriggers = [modalCookieConsentHiddenTrigger];

const modalLightbox = document.getElementById("modal-lightbox");
const modalLightboxTriggers = [
  modalLightbox,
  document.querySelector("#modal-lightbox .modal__close .icon-close"),
  ...document.querySelectorAll(".js-lightbox-trigger"),
];
const currentYearRoot = document.querySelector(".js-current-year");

const initJS = () => {
  topBarInfo(header, topBarMessage);
  fixedHeaderContentShift(header);
  smoothScrolling(smoothScrollingElements, header);
  mobileMenu(mobileMenuTriggers, menu, overlay);
  navigationIndicator(navLinks);
  modal(modalGPDR, modalGPDRTriggers, true);
  modal(modalPrivacyPolicy, modalPrivacyPolicyTriggers, true);
  modal(modalLightbox, modalLightboxTriggers, true);
  modal(modalCookieConsent, modalCookieConsentTriggers, false);
  cookieConsent(cookieConsentContainer, modalCookieConsentHiddenTrigger);
  lazyLoading(lazyLoadingMedia);
  lightbox(gallery, lightboxContainer);
  displayCurrentYear(currentYearRoot);
};

initJS();
