(function () {
  var buttons = document.querySelectorAll("button.question");
  var inSub = /\/Diagram Economist\//i.test(decodeURIComponent(location.pathname));
  var base = inSub ? "../" : "";
  var i;
  function returnUrl() {
    var file = decodeURIComponent((location.pathname.split("/").pop() || "").split("?")[0]);
    var url = (inSub ? "Diagram Economist/" : "") + file;
    var query = location.search.replace(/^\?/, "");
    if (!/(?:^|&)practice=1(?:&|$)/.test(query)) {
      query = query ? query + "&practice=1" : "practice=1";
    }
    return url + (query ? "?" + query : "");
  }
  for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      var text = (this.textContent || "").replace(/\s+/g, " ").trim();
      if (!text) return;
      var answer = this.getAttribute("data-answer") || "";
      var starter = this.getAttribute("data-starter") || "";
      var href = base + "diagram-practice.html?question=" + encodeURIComponent(text);
      if (answer) href += "&answer=" + encodeURIComponent(answer);
      if (starter) href += "&starter=" + encodeURIComponent(starter);
      href += "&from=" + encodeURIComponent(returnUrl());
      window.location.href = href;
    });
  }
})();
