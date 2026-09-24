/* Language detection + switching. Loaded synchronously in <head>
   so the correct language is set before first paint (no FOUC).
   Each page defines window.PAGE_TITLE_EN / window.PAGE_TITLE_NO
   before this script is loaded. */
(function () {
  "use strict";

  var STORAGE_KEY = "lang";

  function detectLang() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "no") return stored;
    } catch (e) {}

    var nav = (navigator.language || navigator.userLanguage || "").toLowerCase();
    if (nav.indexOf("nb") === 0 || nav.indexOf("nn") === 0 || nav.indexOf("no") === 0) {
      return "no";
    }
    return "en";
  }

  function applyTitle(lang) {
    var title = lang === "no" ? window.PAGE_TITLE_NO : window.PAGE_TITLE_EN;
    if (title) document.title = title;
  }

  function setLang(lang) {
    document.documentElement.setAttribute("lang", lang);
    applyTitle(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
  }

  var current = detectLang();
  document.documentElement.setAttribute("lang", current);
  applyTitle(current);

  window.__setLang = setLang;
  window.__getLang = function () {
    return document.documentElement.getAttribute("lang") === "no" ? "no" : "en";
  };

  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.querySelector("[data-lang-toggle]");
    if (!toggle) return;

    function updateToggleLabel() {
      var lang = window.__getLang();
      toggle.textContent = lang === "no" ? "EN" : "NO";
      toggle.setAttribute(
        "aria-label",
        lang === "no" ? "Switch to English" : "Bytt til norsk"
      );
    }

    toggle.addEventListener("click", function () {
      var next = window.__getLang() === "no" ? "en" : "no";
      setLang(next);
      updateToggleLabel();
    });

    updateToggleLabel();
  });
})();
