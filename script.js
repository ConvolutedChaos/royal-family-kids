/* Royal Family KIDS — shared site script */
(function () {
  "use strict";

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Contact form ----------
     This is a static site with no server, so the form opens the visitor's
     email app with a pre-filled message to Jonathan. */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var to = form.getAttribute("data-to");
      var name = form.elements.name.value.trim();
      var email = form.elements.email.value.trim();
      var phone = form.elements.phone.value.trim();
      var topic = form.elements.topic.value;
      var message = form.elements.message.value.trim();

      var subject = "RFK Website: " + topic + " (from " + name + ")";
      var body =
        message +
        "\n\n---\n" +
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        (phone ? "Phone: " + phone + "\n" : "") +
        "Topic: " + topic;

      window.location.href =
        "mailto:" + to +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      var status = document.getElementById("form-status");
      if (status) {
        status.textContent =
          "Your email app should open with your message ready to send. If nothing happened, email " +
          to + " directly.";
      }
    });
  }

  /* ---------- Give page countdown ---------- */
  var countdown = document.getElementById("countdown");
  if (countdown) {
    var target = countdown.getAttribute("data-url");
    var secondsEl = document.getElementById("seconds");
    var stopBtn = document.getElementById("stop-redirect");
    var remaining = parseInt(countdown.getAttribute("data-seconds"), 10) || 8;

    // (Visitors without JavaScript are redirected by the <noscript> meta refresh.)
    var timer = setInterval(function () {
      remaining -= 1;
      if (secondsEl) secondsEl.textContent = remaining;
      if (remaining <= 0) {
        clearInterval(timer);
        window.location.href = target;
      }
    }, 1000);

    if (stopBtn) {
      stopBtn.addEventListener("click", function () {
        clearInterval(timer);
        countdown.textContent = "Automatic redirect cancelled. Use the button above when you're ready.";
      });
    }
  }
})();
