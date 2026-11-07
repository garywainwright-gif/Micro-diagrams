(function () {
  var startBtn = document.getElementById("startPractice");
  var revision = document.getElementById("revisionBlock");
  var practice = document.getElementById("practiceBlock");
  var startRow = document.getElementById("startPracticeRow");
  if (!startBtn || !revision || !practice) return;

  function showPractice() {
    revision.hidden = true;
    if (startRow) startRow.hidden = true;
    practice.hidden = false;
  }

  startBtn.addEventListener("click", function () {
    showPractice();
    window.scrollTo(0, 0);
  });

  if (/[?&]practice=1(?:&|$)/.test(location.search)) {
    showPractice();
  }
})();
