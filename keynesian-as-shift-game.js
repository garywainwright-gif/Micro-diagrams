window.KeynesianAsGame = {
  mount: function (root) {
    if (root) this.bind(root);
  },
  bind: function (root) {
    function byId(id) { return root.querySelector("#" + id); }

    var GEO = {
      OX: 78,
      OY: 318,
      TOP: 46,
      FLAT_Y: 268,
      JOIN_Y: 190,
      YFE: 398,
      SHIFT: 84,
      FLAT_X0: 146,
      ELBOW: 78
    };

    var CATEGORIES = [
      {
        id: "inputs",
        label: "Input prices",
        scenarios: [
          { id: "in1", topic: "Oil prices", shift: "left", text: "The price of oil rises.", why: "Oil is a cost of production. A higher oil price raises firms’ costs, so they supply less real output at each price level and the aggregate supply curve shifts left." },
          { id: "in2", topic: "Oil prices", shift: "right", text: "The price of oil falls.", why: "Oil is a cost of production. A lower oil price cuts firms’ costs, so they supply more real output at each price level and the aggregate supply curve shifts right." },
          { id: "in3", topic: "Energy prices", shift: "left", text: "Energy prices rise.", why: "Energy is an input. Higher energy prices raise costs, so firms supply less at each price level and the aggregate supply curve shifts left." },
          { id: "in4", topic: "Energy prices", shift: "right", text: "Energy prices fall.", why: "Cheaper energy lowers costs of production. Firms supply more at each price level, so the aggregate supply curve shifts right." },
          { id: "in5", topic: "Raw materials", shift: "left", text: "The price of imported raw materials rises.", why: "Raw materials are a cost of production. Dearer inputs mean firms supply less at each price level, so the aggregate supply curve shifts left." },
          { id: "in6", topic: "Raw materials", shift: "right", text: "The price of raw materials falls.", why: "Cheaper raw materials lower costs. Firms supply more at each price level, so the aggregate supply curve shifts right." }
        ]
      },
      {
        id: "wages",
        label: "Nominal wages",
        scenarios: [
          { id: "w1", topic: "Pay settlements", shift: "left", text: "Nominal wages rise across the economy.", why: "Nominal wages are a cost of production. Higher wages raise unit costs, so firms supply less at each price level and the aggregate supply curve shifts left." },
          { id: "w2", topic: "Pay settlements", shift: "right", text: "Nominal wages fall as the labour market adjusts.", why: "Lower nominal wages cut firms’ costs. They supply more at each price level, so the aggregate supply curve shifts right." },
          { id: "w3", topic: "Trade unions", shift: "left", text: "Trade unions negotiate a higher nominal pay settlement.", why: "A higher pay settlement raises labour costs. Firms supply less at each price level, so the aggregate supply curve shifts left." },
          { id: "w4", topic: "Pay settlements", shift: "right", text: "Workers accept smaller nominal wage rises.", why: "Slower nominal wage growth keeps costs down. Firms supply more at each price level, so the aggregate supply curve shifts right." },
          { id: "w5", topic: "Minimum wage", shift: "left", text: "The national minimum wage is increased.", why: "A higher minimum wage raises labour costs for firms. They supply less at each price level, so the aggregate supply curve shifts left." },
          { id: "w6", topic: "Wage pressure", shift: "right", text: "Weaker demand for labour slows the growth of nominal wages.", why: "Slower growth of nominal wages reduces cost pressure. Firms supply more at each price level, so the aggregate supply curve shifts right." }
        ]
      },
      {
        id: "productivity",
        label: "Productivity",
        scenarios: [
          { id: "p1", topic: "Labour productivity", shift: "right", text: "Labour productivity rises.", why: "Higher productivity means more output from the same inputs. Unit costs fall and productive capacity rises, so the aggregate supply curve shifts right." },
          { id: "p2", topic: "Labour productivity", shift: "left", text: "Labour productivity falls.", why: "Lower productivity means less output from the same inputs. Unit costs rise and productive capacity falls, so the aggregate supply curve shifts left." },
          { id: "p3", topic: "Technology", shift: "right", text: "Firms adopt technology that raises output per worker.", why: "Better technology raises productivity. Unit costs fall and the economy can produce more, so the aggregate supply curve shifts right." },
          { id: "p4", topic: "Skills", shift: "right", text: "The skills of the workforce improve.", why: "A more skilled workforce produces more from the same hours of work. Capacity rises and unit costs fall, so the aggregate supply curve shifts right." },
          { id: "p5", topic: "Training", shift: "left", text: "Firms cut training and output per worker falls.", why: "Less training lowers productivity. Unit costs rise and productive capacity falls, so the aggregate supply curve shifts left." },
          { id: "p6", topic: "Capital productivity", shift: "right", text: "New capital equipment produces more output from the same inputs.", why: "More productive capital cuts unit costs and raises capacity, so the aggregate supply curve shifts right." }
        ]
      },
      {
        id: "taxes",
        label: "Business taxes",
        scenarios: [
          { id: "t1", topic: "Business taxes", shift: "left", text: "The government raises taxes on firms.", why: "A tax on firms raises the cost of production. Firms supply less at each price level, so the aggregate supply curve shifts left." },
          { id: "t2", topic: "Business taxes", shift: "right", text: "The government cuts taxes on firms.", why: "A lower tax on firms reduces the cost of production. Firms supply more at each price level, so the aggregate supply curve shifts right." },
          { id: "t3", topic: "Business rates", shift: "left", text: "Business rates paid by firms rise.", why: "Business rates are a cost of production. Higher rates mean firms supply less at each price level, so the aggregate supply curve shifts left." },
          { id: "t4", topic: "Business rates", shift: "right", text: "Business rates paid by firms are cut.", why: "Lower business rates reduce a cost of production. Firms supply more at each price level, so the aggregate supply curve shifts right." },
          { id: "t5", topic: "Employment tax", shift: "left", text: "Employers’ National Insurance contributions rise.", why: "National Insurance paid by employers is a tax on labour. Higher contributions raise costs, so the aggregate supply curve shifts left." },
          { id: "t6", topic: "Indirect tax", shift: "right", text: "Indirect taxes paid by firms are cut.", why: "A lower indirect tax reduces the cost of supplying output. Firms supply more at each price level, so the aggregate supply curve shifts right." }
        ]
      },
      {
        id: "subsidies",
        label: "Subsidies",
        scenarios: [
          { id: "s1", topic: "Production subsidy", shift: "right", text: "The government increases subsidies paid to firms.", why: "A subsidy paid to firms lowers their costs. They supply more at each price level, so the aggregate supply curve shifts right." },
          { id: "s2", topic: "Production subsidy", shift: "left", text: "Subsidies paid to firms are removed.", why: "Removing a subsidy raises firms’ costs. They supply less at each price level, so the aggregate supply curve shifts left." },
          { id: "s3", topic: "Production subsidy", shift: "right", text: "A new production subsidy is introduced.", why: "A production subsidy cuts the cost of each unit supplied. Firms supply more at each price level, so the aggregate supply curve shifts right." },
          { id: "s4", topic: "Production subsidy", shift: "left", text: "The production subsidy paid to firms is reduced.", why: "A smaller subsidy leaves firms with higher costs. They supply less at each price level, so the aggregate supply curve shifts left." },
          { id: "s5", topic: "Energy subsidy", shift: "right", text: "The government subsidises firms’ energy bills.", why: "A subsidy on energy lowers a cost of production. Firms supply more at each price level, so the aggregate supply curve shifts right." },
          { id: "s6", topic: "Production subsidy", shift: "left", text: "A subsidy that had lowered firms’ production costs is withdrawn.", why: "Without the subsidy, production costs rise. Firms supply less at each price level, so the aggregate supply curve shifts left." }
        ]
      },
      {
        id: "regulation",
        label: "Regulation",
        scenarios: [
          { id: "g1", topic: "Compliance costs", shift: "left", text: "Tighter environmental regulation raises firms’ compliance costs.", why: "Higher compliance costs raise the cost of production. Firms supply less at each price level, so the aggregate supply curve shifts left." },
          { id: "g2", topic: "Deregulation", shift: "right", text: "Deregulation cuts firms’ compliance costs.", why: "Lower compliance costs reduce the cost of production. Firms supply more at each price level, so the aggregate supply curve shifts right." },
          { id: "g3", topic: "Health and safety", shift: "left", text: "New health and safety rules raise firms’ costs.", why: "The new rules make production more expensive. Firms supply less at each price level, so the aggregate supply curve shifts left." },
          { id: "g4", topic: "Paperwork", shift: "right", text: "The government removes unnecessary paperwork for firms.", why: "Less paperwork cuts the cost of doing business. Firms supply more at each price level, so the aggregate supply curve shifts right." },
          { id: "g5", topic: "Planning rules", shift: "left", text: "Planning rules stop firms building new capacity.", why: "If firms cannot expand, productive capacity is held down and costs of operating rise. The aggregate supply curve shifts left." },
          { id: "g6", topic: "Planning rules", shift: "right", text: "Planning rules are relaxed so firms can expand capacity.", why: "Firms can now add capacity. The economy can produce more, so the aggregate supply curve shifts right." }
        ]
      },
      {
        id: "shocks",
        label: "Supply shocks",
        scenarios: [
          { id: "k1", topic: "Weather", shift: "left", text: "A drought destroys harvests.", why: "A drought is a negative supply shock. Less is produced at each price level, so the aggregate supply curve shifts left." },
          { id: "k2", topic: "Weather", shift: "right", text: "Good weather produces a bumper harvest.", why: "A bumper harvest is a positive supply shock. More is produced at each price level, so the aggregate supply curve shifts right." },
          { id: "k3", topic: "Geopolitics", shift: "left", text: "A war disrupts oil supplies.", why: "A geopolitical shock that cuts oil supplies raises energy costs. Firms supply less at each price level, so the aggregate supply curve shifts left." },
          { id: "k4", topic: "Geopolitics", shift: "right", text: "A conflict ends and major shipping routes reopen.", why: "Reopened routes make inputs available again and lower costs. Firms supply more at each price level, so the aggregate supply curve shifts right." },
          { id: "k5", topic: "Weather", shift: "right", text: "Mild weather cuts firms’ heating and disruption costs.", why: "Lower disruption and energy use reduce costs. Firms supply more at each price level, so the aggregate supply curve shifts right." },
          { id: "k6", topic: "Geopolitics", shift: "left", text: "A geopolitical conflict closes a major energy route.", why: "The closure is a negative supply shock. Energy becomes scarce and costs rise, so the aggregate supply curve shifts left." },
          { id: "k7", topic: "Disaster", shift: "left", text: "An earthquake destroys factories and machinery.", why: "Destroyed capital is a negative supply shock. Costs rise for the output that remains, and productive capacity falls, so the aggregate supply curve shifts left." }
        ]
      },
      {
        id: "expectations",
        label: "Expectations of future inflation",
        scenarios: [
          { id: "e1", topic: "Expected inflation", shift: "left", text: "Workers expect higher inflation and bargain for higher nominal wages now.", why: "Higher expected inflation is built into wage claims. Costs rise, so firms supply less at each price level and the aggregate supply curve shifts left." },
          { id: "e2", topic: "Expected inflation", shift: "right", text: "Expected inflation falls, and workers accept smaller nominal wage rises.", why: "Lower expected inflation eases wage pressure. Costs fall, so firms supply more at each price level and the aggregate supply curve shifts right." },
          { id: "e3", topic: "Expected costs", shift: "left", text: "Firms expect higher inflation and raise the costs they build into production.", why: "When firms expect the price level to keep rising, they face higher wage and input costs. They supply less at each price level, so the aggregate supply curve shifts left." },
          { id: "e4", topic: "Expected costs", shift: "right", text: "Firms expect inflation to fall and plan for lower costs.", why: "Lower expected inflation means firms anticipate smaller rises in wages and input prices. They supply more at each price level, so the aggregate supply curve shifts right." }
        ]
      }
    ];

    var QUIZ_LENGTH = 10;
    var state = {
      round: [],
      index: 0,
      scenario: null,
      answered: false,
      correct: 0,
      attempts: 0,
      log: [],
      timeUp: false,
      label: ""
    };
    var clockTimer = null;
    var clockEnd = 0;
    var clockLeft = 120;
    var clockRunning = false;
    var shiftToken = 0;

    var scenarioEl = byId("scenario");
    var titleEl = byId("chart-title");
    var noteEl = byId("chart-note");
    var feedbackEl = byId("feedback");
    var logEl = byId("log");
    var btnLeft = byId("btn-left");
    var btnRight = byId("btn-right");
    var btnNext = byId("btn-next");
    var btnSave = byId("btn-save");
    var asCurve = byId("as-curve");
    var asLabel = byId("as-label");
    var as1Curve = byId("as1-curve");
    var as1Label = byId("as1-label");
    var yfeLine = byId("yfe-line");
    var yfeLabel = byId("yfe-label");
    var yfe1Line = byId("yfe1-line");
    var yfe1Label = byId("yfe1-label");
    var arrowLine = byId("arrow-line");
    var arrowHead = byId("arrow-head");

    function r(n) { return Math.round(n); }

    function curveD(yfe) {
      var radius = GEO.ELBOW;
      var bend = yfe - radius;
      if (bend < GEO.FLAT_X0 + 16) bend = GEO.FLAT_X0 + 16;
      return "M " + GEO.FLAT_X0 + " " + GEO.FLAT_Y +
        " H " + r(bend) +
        " A " + radius + " " + radius + " 0 0 0 " + r(yfe) + " " + GEO.JOIN_Y +
        " V " + GEO.TOP;
    }

    function shiftWord(shift) { return shift === "left" ? "left" : "right"; }

    function supplyWord(shift) {
      return shift === "left" ? "a decrease in aggregate supply" : "an increase in aggregate supply";
    }

    function shiftColour(dx) { return dx < 0 ? "#9f1239" : "#166534"; }

    function yfeHtml(withOne) {
      var label = 'Y<tspan dy="7" font-size="11">fe</tspan>';
      if (withOne) label += '<tspan dy="-7" font-size="16">1</tspan>';
      return label;
    }

    function setShown(el, on) {
      if (el) el.setAttribute("opacity", on ? "1" : "0");
    }

    function placeBase() {
      asCurve.setAttribute("d", curveD(GEO.YFE));
      asCurve.setAttribute("stroke", "#1c1915");
      asCurve.setAttribute("opacity", "1");
      asLabel.setAttribute("x", String(GEO.YFE));
      asLabel.setAttribute("y", String(GEO.TOP - 14));
      asLabel.setAttribute("opacity", "1");
      yfeLine.setAttribute("x1", String(GEO.YFE));
      yfeLine.setAttribute("x2", String(GEO.YFE));
      yfeLine.setAttribute("y1", String(GEO.JOIN_Y));
      yfeLine.setAttribute("y2", String(GEO.OY));
      yfeLine.setAttribute("opacity", "1");
      yfeLabel.setAttribute("x", String(GEO.YFE));
      yfeLabel.setAttribute("y", String(GEO.OY + 24));
      yfeLabel.innerHTML = yfeHtml(false);
      yfeLabel.setAttribute("opacity", "1");
    }

    function hideShift() {
      shiftToken += 1;
      [as1Curve, as1Label, yfe1Line, yfe1Label, arrowLine, arrowHead].forEach(function (el) {
        setShown(el, false);
      });
    }

    function placeArrow(x0, x1, opacity) {
      var y = GEO.TOP + 34;
      var dir = x1 >= x0 ? 1 : -1;
      var start = x0 + dir * 12;
      var end = x1 - dir * 14;
      if ((end - start) * dir < 16) {
        setShown(arrowLine, false);
        setShown(arrowHead, false);
        return;
      }
      arrowLine.setAttribute("x1", String(r(start)));
      arrowLine.setAttribute("y1", String(y));
      arrowLine.setAttribute("x2", String(r(end)));
      arrowLine.setAttribute("y2", String(y));
      arrowLine.setAttribute("stroke", "#1c1915");
      arrowLine.setAttribute("opacity", String(opacity));
      var head = dir < 0
        ? (r(end) + "," + y + " " + r(end + 12) + "," + (y - 6) + " " + r(end + 12) + "," + (y + 6))
        : (r(end) + "," + y + " " + r(end - 12) + "," + (y - 6) + " " + r(end - 12) + "," + (y + 6));
      arrowHead.setAttribute("points", head);
      arrowHead.setAttribute("fill", "#1c1915");
      arrowHead.setAttribute("opacity", String(opacity));
    }

    function placeShift(dx, opacity) {
      var x = GEO.YFE + dx;
      var colour = shiftColour(dx);
      as1Curve.setAttribute("d", curveD(x));
      as1Curve.setAttribute("stroke", colour);
      as1Curve.setAttribute("opacity", String(opacity));
      var showLabel = Math.abs(dx) > 26 ? opacity : 0;
      as1Label.setAttribute("x", String(r(x)));
      as1Label.setAttribute("y", String(GEO.TOP - 14));
      as1Label.setAttribute("fill", colour);
      as1Label.setAttribute("opacity", String(showLabel));
      yfe1Line.setAttribute("x1", String(r(x)));
      yfe1Line.setAttribute("x2", String(r(x)));
      yfe1Line.setAttribute("y1", String(GEO.JOIN_Y));
      yfe1Line.setAttribute("y2", String(GEO.OY));
      yfe1Line.setAttribute("stroke", colour);
      yfe1Line.setAttribute("opacity", String(opacity));
      yfe1Label.setAttribute("x", String(r(x)));
      yfe1Label.setAttribute("y", String(GEO.OY + 24));
      yfe1Label.innerHTML = yfeHtml(true);
      yfe1Label.setAttribute("fill", colour);
      yfe1Label.setAttribute("opacity", String(showLabel));
      placeArrow(GEO.YFE, x, opacity);
    }

    function animateShift(dir) {
      var token = ++shiftToken;
      var target = dir === "left" ? -GEO.SHIFT : GEO.SHIFT;
      var start = performance.now();
      var duration = 520;
      function frame(now) {
        if (token !== shiftToken) return;
        var t = Math.min(1, (now - start) / duration);
        var eased = 1 - Math.pow(1 - t, 3);
        placeShift(target * eased, 0.25 + 0.75 * eased);
        if (t < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    function keynesResult(shift) {
      if (shift === "right") {
        return "The Keynesian aggregate supply curve shifts right from AS to AS1. Full-employment output rises from Yfe to Yfe1. The horizontal section, where there is spare capacity, is longer, so the economy can produce more real output before the price level rises.";
      }
      return "The Keynesian aggregate supply curve shifts left from AS to AS1. Full-employment output falls from Yfe to Yfe1. The horizontal section is shorter, so the economy reaches full capacity at a lower level of real national output.";
    }

    function ensureClock() {
      if (byId("clock")) return;
      var score = root.querySelector(".scorebox");
      if (!score || !score.parentNode) return;
      var box = document.createElement("div");
      box.className = "scorebox clockbox";
      box.innerHTML = '<p class="score-main" id="clock" role="timer" aria-label="Time left to beat the clock" data-seconds="120">2:00</p><p class="score-sub" id="clock-sub">Beat the clock</p>';
      score.parentNode.insertBefore(box, score);
    }

    function formatClock(total) {
      var minutes = Math.floor(total / 60);
      var seconds = total % 60;
      return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }

    function clockSeconds() {
      var el = byId("clock");
      var n = el ? Number(el.getAttribute("data-seconds")) : 0;
      return n > 0 ? n : 120;
    }

    function readBest() {
      try { return Number(localStorage.getItem("keynesian-as-best-left")) || 0; } catch (err) { return 0; }
    }

    function renderClock() {
      var clock = byId("clock");
      var sub = byId("clock-sub");
      var box = clock ? clock.closest(".clockbox") : null;
      if (!clock || !sub) return;
      clock.textContent = formatClock(clockLeft);
      var best = readBest();
      var bestText = best ? " Best left " + formatClock(best) + "." : "";
      if (state.timeUp) {
        sub.textContent = "Time is up." + bestText;
        if (box) box.className = "scorebox clockbox out";
      } else if (!clockRunning && state.attempts === QUIZ_LENGTH && clockLeft > 0) {
        sub.textContent = "You beat the clock." + bestText;
        if (box) box.className = "scorebox clockbox done";
      } else {
        sub.textContent = "Beat the clock." + bestText;
        if (box) box.className = "scorebox clockbox" + (clockRunning && clockLeft <= 15 ? " urgent" : "");
      }
    }

    function stopClock() {
      clockRunning = false;
      if (clockTimer) {
        clearInterval(clockTimer);
        clockTimer = null;
      }
    }

    function timeUp() {
      if (state.index === QUIZ_LENGTH - 1 && state.answered) {
        renderClock();
        return;
      }
      state.timeUp = true;
      btnLeft.disabled = true;
      btnRight.disabled = true;
      btnNext.disabled = false;
      btnNext.textContent = "New set of 10 questions";
      var msg = "Time is up. " + state.correct + " correct out of " + state.attempts + (state.attempts === 1 ? " attempt." : " attempts.");
      if (!state.answered) {
        feedbackEl.className = "feedback bad";
        feedbackEl.innerHTML = "<p><strong>" + msg + "</strong></p>";
      } else {
        feedbackEl.innerHTML += "<p><strong>" + msg + "</strong></p>";
      }
      renderClock();
    }

    function tickClock() {
      if (!clockRunning) return;
      clockLeft = Math.max(0, Math.round((clockEnd - Date.now()) / 1000));
      if (clockLeft > 0) {
        renderClock();
        return;
      }
      stopClock();
      timeUp();
    }

    function startClock() {
      stopClock();
      state.timeUp = false;
      clockLeft = clockSeconds();
      clockEnd = Date.now() + clockLeft * 1000;
      clockRunning = true;
      renderClock();
      clockTimer = setInterval(tickClock, 250);
    }

    function recordBest() {
      if (clockLeft <= 0) return "out";
      var previous = readBest();
      if (clockLeft > previous) {
        try { localStorage.setItem("keynesian-as-best-left", String(clockLeft)); } catch (err) {}
        return "best";
      }
      if (clockLeft === previous) return "tie";
      return "ok";
    }

    function beatLine() {
      var mark = recordBest();
      if (mark === "out") return "The clock ran out as you finished.";
      var line = "You beat the clock with " + formatClock(clockLeft) + " left.";
      if (mark === "best") return line + " That is your best time left.";
      if (mark === "tie") return line + " That matches your best time left.";
      return line + " Your best time left is " + formatClock(readBest()) + ".";
    }

    function renderScore() {
      byId("score-points").textContent = String(state.correct);
      byId("score-attempts").textContent = String(state.attempts);
      var sub = byId("score-sub");
      if (state.attempts === 0) sub.textContent = "correct out of attempts";
      else sub.textContent = "correct out of " + state.attempts + (state.attempts === 1 ? " attempt" : " attempts");
    }

    function renderLog() {
      logEl.innerHTML = "";
      if (!state.log.length) {
        logEl.hidden = true;
        return;
      }
      logEl.hidden = false;
      state.log.slice(0, 8).forEach(function (item) {
        var li = document.createElement("li");
        var mark = document.createElement("span");
        mark.className = item.hit ? "hit" : "miss";
        mark.textContent = item.hit ? "Correct" : "Incorrect";
        li.appendChild(mark);
        li.appendChild(document.createTextNode(" — " + item.topic + ": you chose " + item.chose + ", the curve shifts " + item.answer + "."));
        logEl.appendChild(li);
      });
    }

    function shuffle(list) {
      var copy = list.slice();
      for (var i = copy.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var hold = copy[i];
        copy[i] = copy[j];
        copy[j] = hold;
      }
      return copy;
    }

    function buildRound() {
      var round = [];
      var leftCount = 0;
      var rightCount = 0;
      shuffle(CATEGORIES).forEach(function (cat) {
        var prefer = leftCount <= rightCount ? "left" : "right";
        var pool = cat.scenarios.filter(function (s) { return s.shift === prefer; });
        if (!pool.length) pool = cat.scenarios.slice();
        var scenario = shuffle(pool)[0];
        if (scenario.shift === "left") leftCount += 1;
        else rightCount += 1;
        round.push({ scenario: scenario, label: cat.label });
      });
      var used = {};
      round.forEach(function (item) { used[item.scenario.id] = true; });
      var extraLeft = [];
      var extraRight = [];
      CATEGORIES.forEach(function (cat) {
        cat.scenarios.forEach(function (scenario) {
          if (used[scenario.id]) return;
          var item = { scenario: scenario, label: cat.label };
          if (scenario.shift === "left") extraLeft.push(item);
          else extraRight.push(item);
        });
      });
      extraLeft = shuffle(extraLeft);
      extraRight = shuffle(extraRight);
      while (round.length < QUIZ_LENGTH && (extraLeft.length || extraRight.length)) {
        var preferLeft = leftCount <= rightCount;
        var source = preferLeft && extraLeft.length ? extraLeft : extraRight.length ? extraRight : extraLeft;
        var item = source.pop();
        if (item.scenario.shift === "left") leftCount += 1;
        else rightCount += 1;
        round.push(item);
      }
      return shuffle(round);
    }

    function showScenario() {
      var item = state.round[state.index];
      var s = item.scenario;
      state.scenario = s;
      state.answered = false;
      state.label = item.label;
      hideShift();
      placeBase();
      var chartWrap = byId("play-chart");
      var shiftRow = byId("shift-row");
      if (chartWrap) chartWrap.hidden = false;
      if (shiftRow) shiftRow.hidden = false;
      scenarioEl.innerHTML =
        '<p class="q-count">Question ' + (state.index + 1) + " of " + QUIZ_LENGTH + "</p>" +
        '<p class="cat-title">Keynesian aggregate supply · ' + item.label + "</p>" +
        "<p>" + s.text + "</p>" +
        '<p class="ask">What happens to the Keynesian aggregate supply curve?</p>';
      titleEl.textContent = "Keynesian aggregate supply";
      noteEl.textContent = "The curve is horizontal while there is spare capacity, then it rises, and it is vertical at full-employment output Yfe. Decide whether it shifts left or right.";
      feedbackEl.className = "feedback";
      feedbackEl.innerHTML = "";
      btnLeft.disabled = false;
      btnRight.disabled = false;
      btnLeft.className = "";
      btnRight.className = "";
      btnNext.disabled = true;
      btnNext.textContent = "Next question";
      if (btnSave) btnSave.disabled = false;
      byId("chart").setAttribute("aria-label", "Keynesian aggregate supply, vertical at full-employment output Yfe. Category: " + item.label + ".");
    }

    function startRound() {
      ensureClock();
      state.round = buildRound();
      state.index = 0;
      state.correct = 0;
      state.attempts = 0;
      state.log = [];
      state.timeUp = false;
      renderScore();
      renderLog();
      showScenario();
      startClock();
    }

    function downloadFile(blob, name) {
      var url = URL.createObjectURL(blob);
      var link = document.createElement("a");
      link.href = url;
      link.download = name;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    }

    function diagramFileName() {
      var name = "keynesian-aggregate-supply-q" + (state.index + 1);
      if (state.answered && state.scenario) name += "-shift-" + state.scenario.shift;
      return name + ".png";
    }

    function saveDiagram() {
      var chart = byId("chart");
      if (!chart || !state.round.length) return;
      var vb = (chart.getAttribute("viewBox") || "0 0 720 410").split(/[\s,]+/).map(Number);
      var w = vb[2] || 720;
      var h = vb[3] || 410;
      var clone = chart.cloneNode(true);
      clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      clone.setAttribute("width", String(w));
      clone.setAttribute("height", String(h));
      var xml = new XMLSerializer().serializeToString(clone);
      var svgBlob = new Blob([xml], { type: "image/svg+xml;charset=utf-8" });
      var url = URL.createObjectURL(svgBlob);
      var image = new Image();
      var file = diagramFileName();
      image.onload = function () {
        var scale = 2;
        var canvas = document.createElement("canvas");
        canvas.width = w * scale;
        canvas.height = h * scale;
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
        canvas.toBlob(function (png) {
          if (png) downloadFile(png, file);
          else downloadFile(svgBlob, file.replace(/\.png$/, ".svg"));
        }, "image/png");
      };
      image.onerror = function () {
        URL.revokeObjectURL(url);
        downloadFile(svgBlob, file.replace(/\.png$/, ".svg"));
      };
      image.src = url;
    }

    function answer(choice) {
      if (state.timeUp || state.answered || !state.scenario) return;
      state.answered = true;
      state.attempts += 1;
      var s = state.scenario;
      var hit = choice === s.shift;
      if (hit) state.correct += 1;
      state.log.unshift({
        topic: s.topic,
        chose: shiftWord(choice),
        answer: shiftWord(s.shift),
        hit: hit
      });
      btnLeft.disabled = true;
      btnRight.disabled = true;
      var finished = state.index === QUIZ_LENGTH - 1;
      btnNext.disabled = false;
      btnNext.textContent = finished ? "New set of 10 questions" : "Next question";
      var chosenBtn = choice === "left" ? btnLeft : btnRight;
      var otherBtn = choice === "left" ? btnRight : btnLeft;
      chosenBtn.className = hit ? "ok" : "bad";
      otherBtn.className = hit ? "dim" : "ok";
      animateShift(s.shift);
      var lead = hit
        ? "Correct. The Keynesian aggregate supply curve shifts " + shiftWord(s.shift) + ". That is " + supplyWord(s.shift) + "."
        : "Not this time. You chose a shift " + shiftWord(choice) + ". The Keynesian aggregate supply curve shifts " + shiftWord(s.shift) + ", which is " + supplyWord(s.shift) + ".";
      feedbackEl.className = "feedback " + (hit ? "ok" : "bad");
      feedbackEl.innerHTML = "<p><strong>" + lead + "</strong></p><p>" + s.why + "</p><p>" + keynesResult(s.shift) + "</p>";
      if (finished) {
        stopClock();
        feedbackEl.innerHTML += "<p>Set complete. " + state.correct + " correct out of " + state.attempts + " attempts. " + beatLine() + "</p>";
        renderClock();
      }
      noteEl.textContent = "AS1 is the Keynesian aggregate supply curve after the change. Yfe1 is the new full-employment level of real national output. A shift left is a decrease in aggregate supply. A shift right is an increase.";
      byId("chart").setAttribute("aria-label", "The Keynesian aggregate supply curve shifts " + shiftWord(s.shift) + " from AS to AS1. Full-employment output moves from Yfe to Yfe1.");
      renderScore();
      renderLog();
    }

    btnLeft.addEventListener("click", function () { answer("left"); });
    btnRight.addEventListener("click", function () { answer("right"); });
    btnNext.addEventListener("click", function () {
      if (state.timeUp) {
        startRound();
        return;
      }
      if (!state.answered) return;
      if (state.index >= QUIZ_LENGTH - 1) {
        startRound();
        return;
      }
      state.index += 1;
      showScenario();
    });
    byId("btn-reset").addEventListener("click", function () { startRound(); });
    if (btnSave) btnSave.addEventListener("click", saveDiagram);

    startRound();
  }
};
