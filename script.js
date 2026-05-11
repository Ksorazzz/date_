(function () {
  var main   = document.getElementById("screen-main");
  var loader = document.getElementById("screen-loader");
  var accept = document.getElementById("btn-accept");

  if (!accept) return;

  // If already accepted — go straight to success
  if (localStorage.getItem("accepted")) {
    window.location.replace("success.html");
    return;
  }

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var delay   = reduced ? 0 : 1600;

  accept.addEventListener("click", function (e) {
    e.preventDefault();

    // Mark as accepted immediately so double-tap doesn't fire twice
    localStorage.setItem("accepted", "1");

    // Notify via Telegram
    fetch("https://api.telegram.org/bot8736222408:AAHHaMAgUyIBWXKRdZXjDu-EGQnKCW74Zz0/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: 566256430,
        text: "💕 Она нажала Accept!"
      })
    }).catch(function () {});

    main.hidden = true;
    loader.hidden = false;

    setTimeout(function () {
      if (!reduced && document.startViewTransition) {
        document.startViewTransition(function () {
          window.location.href = "success.html";
        });
      } else {
        window.location.href = "success.html";
      }
    }, delay);
  });
})();
