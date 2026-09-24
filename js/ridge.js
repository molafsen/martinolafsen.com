/* Draws the mountain ridge line once on page load. Respects
   prefers-reduced-motion by showing the finished line immediately. */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var path = document.querySelector(".ridge .ridge-line");
    if (!path || typeof path.getTotalLength !== "function") return;

    var reduce = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var length = path.getTotalLength();
    path.style.strokeDasharray = length;

    if (reduce) {
      path.style.strokeDashoffset = 0;
      return;
    }

    path.style.strokeDashoffset = length;
    path.style.transition = "stroke-dashoffset 1.8s ease";

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        path.style.strokeDashoffset = 0;
      });
    });
  });
})();
