window.AsShiftGame = {
  markup: function () {
    return [
      '<div class="head"><div><h3>Aggregate supply shifts</h3>',
      "<p>Get ready — your aggregate supply reflexes are about to be tested. Predict whether aggregate supply shifts left or right. You’ve got two minutes.</p>",
      '</div><div class="scorebox" aria-live="polite"><p class="score-main"><span id="score-points">0</span> / <span id="score-attempts">0</span></p>',
      '<p class="score-sub" id="score-sub">correct out of attempts</p></div></div>',
      '<div class="scenario" id="scenario"><p>Ten questions are being prepared.</p></div>',
      '<div class="chart-wrap" id="play-chart" hidden><p class="chart-title" id="chart-title">Aggregate supply</p>',
      '<svg class="chart" id="chart" viewBox="0 0 680 400" role="img" aria-labelledby="chart-title chart-note">',
      '<line x1="78" y1="36" x2="78" y2="332" stroke="#1c1915" stroke-width="2" />',
      '<polygon points="78,28 73,42 83,42" fill="#1c1915" />',
      '<line x1="78" y1="332" x2="620" y2="332" stroke="#1c1915" stroke-width="2" />',
      '<polygon points="632,332 618,327 618,337" fill="#1c1915" />',
      '<text x="88" y="40" fill="#5c5348" font-size="15" font-family="Financier Text, Georgia, Palatino Linotype, Palatino, serif">Price level</text>',
      '<text id="x-label" x="616" y="378" text-anchor="end" fill="#5c5348" font-size="15" font-family="Financier Text, Georgia, Palatino Linotype, Palatino, serif">Real national output</text>',
      '<line id="lras-line" x1="400" y1="58" x2="400" y2="332" stroke="#1c1915" stroke-width="3" opacity="0" />',
      '<text id="lras-label" x="408" y="78" fill="#1c1915" font-size="15" font-weight="700" font-family="Financier Display, Georgia, Palatino Linotype, Palatino, serif" opacity="0">LRAS</text>',
      '<text id="yfe-label" x="384" y="350" fill="#1c1915" font-size="16" font-weight="700" font-family="Financier Display, Georgia, Palatino Linotype, Palatino, serif" opacity="0">Yfe</text>',
      '<line id="lras1-line" x1="400" y1="58" x2="400" y2="332" stroke="#166534" stroke-width="3" opacity="0" />',
      '<text id="lras1-label" x="408" y="78" fill="#166534" font-size="15" font-weight="700" font-family="Financier Display, Georgia, Palatino Linotype, Palatino, serif" opacity="0">LRAS1</text>',
      '<text id="yfe1-label" x="432" y="350" fill="#166534" font-size="16" font-weight="700" font-family="Financier Display, Georgia, Palatino Linotype, Palatino, serif" opacity="0">Yfe1</text>',
      '<line id="sras-line" x1="190" y1="312" x2="530" y2="102" stroke="#2563eb" stroke-width="3" opacity="0" />',
      '<text id="sras-label" x="468" y="118" fill="#2563eb" font-size="15" font-weight="700" font-family="Financier Display, Georgia, Palatino Linotype, Palatino, serif" opacity="0">SRAS</text>',
      '<line id="sras1-line" x1="190" y1="312" x2="530" y2="102" stroke="#166534" stroke-width="3" opacity="0" />',
      '<text id="sras1-label" x="468" y="118" fill="#166534" font-size="15" font-weight="700" font-family="Financier Display, Georgia, Palatino Linotype, Palatino, serif" opacity="0">SRAS1</text>',
      '<line id="eq-line" x1="400" y1="188" x2="400" y2="332" stroke="#5c5348" stroke-width="1.5" stroke-dasharray="5 4" opacity="0" />',
      '<circle id="eq-dot" cx="400" cy="188" r="5" fill="#9a3412" opacity="0" />',
      '<text id="y-label" x="392" y="350" fill="#1c1915" font-size="16" font-weight="700" text-anchor="middle" font-family="Financier Display, Georgia, Palatino Linotype, Palatino, serif" opacity="0">Y</text>',
      '<line id="y1-line" x1="440" y1="180" x2="440" y2="332" stroke="#5c5348" stroke-width="1.5" stroke-dasharray="5 4" opacity="0" />',
      '<circle id="y1-dot" cx="440" cy="180" r="5" fill="#9a3412" opacity="0" />',
      '<text id="y1-label" x="440" y="352" fill="#1c1915" font-size="16" font-weight="700" text-anchor="middle" font-family="Financier Display, Georgia, Palatino Linotype, Palatino, serif" opacity="0">Y1</text>',
      '<line id="p-line" x1="78" y1="180" x2="280" y2="180" stroke="#1c1915" stroke-width="1.5" stroke-dasharray="5 4" opacity="0" />',
      '<text id="p-label" x="68" y="184" fill="#1c1915" font-size="16" font-weight="700" text-anchor="end" font-family="Financier Display, Georgia, Palatino Linotype, Palatino, serif" opacity="0">P</text>',
      '<line id="p1-line" x1="78" y1="160" x2="280" y2="160" stroke="#1c1915" stroke-width="1.5" stroke-dasharray="5 4" opacity="0" />',
      '<text id="p1-label" x="68" y="164" fill="#1c1915" font-size="16" font-weight="700" text-anchor="end" font-family="Financier Display, Georgia, Palatino Linotype, Palatino, serif" opacity="0">P1</text>',
      '<line id="ad-line" x1="168" y1="78" x2="500" y2="292" stroke="#9a3412" stroke-width="3" opacity="0" />',
      '<text id="ad-label" x="176" y="70" fill="#9a3412" font-size="15" font-weight="700" font-family="Financier Display, Georgia, Palatino Linotype, Palatino, serif" opacity="0">AD</text>',
      '<line id="arrow-line" stroke="#1c1915" stroke-width="2.5" opacity="0" />',
      '<polygon id="arrow-head" fill="#1c1915" opacity="0" />',
      "</svg>",
      '<p class="chart-note" id="chart-note">A shift left is a decrease in aggregate supply. A shift right is an increase in aggregate supply. The price level has not changed, so this is a shift of the curve, not a movement along it.</p>',
      "</div>",
      '<div class="shift-row" id="shift-row" hidden>',
      '<button type="button" id="btn-left" disabled>Decrease in aggregate supply — shift left</button>',
      '<button type="button" id="btn-right" disabled>Increase in aggregate supply — shift right</button>',
      '<button type="button" id="btn-next" disabled>Next question</button>',
      "</div>",
      '<div class="feedback" id="feedback" aria-live="polite"></div>',
      '<div class="tools">',
      '<button type="button" class="ghost" id="btn-save" disabled>Save diagram</button>',
      '<button type="button" class="ghost" id="btn-reset">Reset score</button>',
      "</div>",
      '<ol class="log" id="log" hidden></ol>'
    ].join("");
  },
  mount: function (root, opts) {
    if (!root) return;
    if ((opts && opts.embedded) || !root.querySelector("#btn-left")) root.innerHTML = window.AsShiftGame.markup();
    window.AsShiftGame.bind(root);
  },
  bind: function (root) {
    function byId(id) { return root.querySelector("#" + id); }
    var SHIFT = 50;
    var CATEGORIES = [
      {
        id: "inputs",
        label: "Input prices",
        scenarios: [
          {
            id: "in1",
            topic: "Oil prices",
            shift: "left",
            span: "short",
            text: "The price of oil rises.",
            why: "Oil is a cost of production. A higher oil price raises firms’ costs, so they supply less real output at each price level and the aggregate supply curve shifts left."
          },
          {
            id: "in2",
            topic: "Oil prices",
            shift: "right",
            span: "short",
            text: "The price of oil falls.",
            why: "Oil is a cost of production. A lower oil price cuts firms’ costs, so they supply more real output at each price level and the aggregate supply curve shifts right."
          },
          {
            id: "in3",
            topic: "Energy prices",
            shift: "left",
            span: "short",
            text: "Energy prices rise.",
            why: "Energy is an input. Higher energy prices raise costs, so firms supply less at each price level and the aggregate supply curve shifts left."
          },
          {
            id: "in4",
            topic: "Energy prices",
            shift: "right",
            span: "short",
            text: "Energy prices fall.",
            why: "Cheaper energy lowers costs of production. Firms supply more at each price level, so the aggregate supply curve shifts right."
          },
          {
            id: "in5",
            topic: "Raw materials",
            shift: "left",
            span: "short",
            text: "The price of imported raw materials rises.",
            why: "Raw materials are a cost of production. Dearer inputs mean firms supply less at each price level, so the aggregate supply curve shifts left."
          },
          {
            id: "in6",
            topic: "Raw materials",
            shift: "right",
            span: "short",
            text: "The price of raw materials falls.",
            why: "Cheaper raw materials lower costs. Firms supply more at each price level, so the aggregate supply curve shifts right."
          }
        ]
      },
      {
        id: "wages",
        label: "Nominal wages",
        scenarios: [
          {
            id: "w1",
            topic: "Pay settlements",
            shift: "left",
            span: "short",
            text: "Nominal wages rise across the economy.",
            why: "Nominal wages are a cost of production. Higher wages raise unit costs, so firms supply less at each price level and the aggregate supply curve shifts left."
          },
          {
            id: "w2",
            topic: "Pay settlements",
            shift: "right",
            span: "short",
            text: "Nominal wages fall as the labour market adjusts.",
            why: "Lower nominal wages cut firms’ costs. They supply more at each price level, so the aggregate supply curve shifts right."
          },
          {
            id: "w3",
            topic: "Trade unions",
            shift: "left",
            span: "short",
            text: "Trade unions negotiate a higher nominal pay settlement.",
            why: "A higher pay settlement raises labour costs. Firms supply less at each price level, so the aggregate supply curve shifts left."
          },
          {
            id: "w4",
            topic: "Pay settlements",
            shift: "right",
            span: "short",
            text: "Workers accept smaller nominal wage rises.",
            why: "Slower nominal wage growth keeps costs down. Firms supply more at each price level, so the aggregate supply curve shifts right."
          },
          {
            id: "w5",
            topic: "Minimum wage",
            shift: "left",
            span: "short",
            text: "The national minimum wage is increased.",
            why: "A higher minimum wage raises labour costs for firms. They supply less at each price level, so the aggregate supply curve shifts left."
          },
          {
            id: "w6",
            topic: "Wage pressure",
            shift: "right",
            span: "short",
            text: "Weaker demand for labour slows the growth of nominal wages.",
            why: "Slower growth of nominal wages reduces cost pressure. Firms supply more at each price level, so the aggregate supply curve shifts right."
          }
        ]
      },
      {
        id: "productivity",
        label: "Productivity",
        scenarios: [
          {
            id: "p1",
            topic: "Labour productivity",
            shift: "right",
            span: "both",
            text: "Labour productivity rises.",
            why: "Higher productivity means more output from the same inputs. Unit costs fall and productive capacity rises, so the aggregate supply curve shifts right."
          },
          {
            id: "p2",
            topic: "Labour productivity",
            shift: "left",
            span: "both",
            text: "Labour productivity falls.",
            why: "Lower productivity means less output from the same inputs. Unit costs rise and productive capacity falls, so the aggregate supply curve shifts left."
          },
          {
            id: "p3",
            topic: "Technology",
            shift: "right",
            span: "both",
            text: "Firms adopt technology that raises output per worker.",
            why: "Better technology raises productivity. Unit costs fall and the economy can produce more, so the aggregate supply curve shifts right."
          },
          {
            id: "p4",
            topic: "Skills",
            shift: "right",
            span: "both",
            text: "The skills of the workforce improve.",
            why: "A more skilled workforce produces more from the same hours of work. Capacity rises and unit costs fall, so the aggregate supply curve shifts right."
          },
          {
            id: "p5",
            topic: "Training",
            shift: "left",
            span: "both",
            text: "Firms cut training and output per worker falls.",
            why: "Less training lowers productivity. Unit costs rise and productive capacity falls, so the aggregate supply curve shifts left."
          },
          {
            id: "p6",
            topic: "Capital productivity",
            shift: "right",
            span: "both",
            text: "New capital equipment produces more output from the same inputs.",
            why: "More productive capital cuts unit costs and raises capacity, so the aggregate supply curve shifts right."
          }
        ]
      },
      {
        id: "taxes",
        label: "Business taxes",
        scenarios: [
          {
            id: "t1",
            topic: "Business taxes",
            shift: "left",
            span: "short",
            text: "The government raises taxes on firms.",
            why: "A tax on firms raises the cost of production. Firms supply less at each price level, so the aggregate supply curve shifts left."
          },
          {
            id: "t2",
            topic: "Business taxes",
            shift: "right",
            span: "short",
            text: "The government cuts taxes on firms.",
            why: "A lower tax on firms reduces the cost of production. Firms supply more at each price level, so the aggregate supply curve shifts right."
          },
          {
            id: "t3",
            topic: "Business rates",
            shift: "left",
            span: "short",
            text: "Business rates paid by firms rise.",
            why: "Business rates are a cost of production. Higher rates mean firms supply less at each price level, so the aggregate supply curve shifts left."
          },
          {
            id: "t4",
            topic: "Business rates",
            shift: "right",
            span: "short",
            text: "Business rates paid by firms are cut.",
            why: "Lower business rates reduce a cost of production. Firms supply more at each price level, so the aggregate supply curve shifts right."
          },
          {
            id: "t5",
            topic: "Employment tax",
            shift: "left",
            span: "short",
            text: "Employers’ National Insurance contributions rise.",
            why: "National Insurance paid by employers is a tax on labour. Higher contributions raise costs, so the aggregate supply curve shifts left."
          },
          {
            id: "t6",
            topic: "Indirect tax",
            shift: "right",
            span: "short",
            text: "Indirect taxes paid by firms are cut.",
            why: "A lower indirect tax reduces the cost of supplying output. Firms supply more at each price level, so the aggregate supply curve shifts right."
          }
        ]
      },
      {
        id: "subsidies",
        label: "Subsidies",
        scenarios: [
          {
            id: "s1",
            topic: "Production subsidy",
            shift: "right",
            span: "short",
            text: "The government increases subsidies paid to firms.",
            why: "A subsidy paid to firms lowers their costs. They supply more at each price level, so the aggregate supply curve shifts right."
          },
          {
            id: "s2",
            topic: "Production subsidy",
            shift: "left",
            span: "short",
            text: "Subsidies paid to firms are removed.",
            why: "Removing a subsidy raises firms’ costs. They supply less at each price level, so the aggregate supply curve shifts left."
          },
          {
            id: "s3",
            topic: "Production subsidy",
            shift: "right",
            span: "short",
            text: "A new production subsidy is introduced.",
            why: "A production subsidy cuts the cost of each unit supplied. Firms supply more at each price level, so the aggregate supply curve shifts right."
          },
          {
            id: "s4",
            topic: "Production subsidy",
            shift: "left",
            span: "short",
            text: "The production subsidy paid to firms is reduced.",
            why: "A smaller subsidy leaves firms with higher costs. They supply less at each price level, so the aggregate supply curve shifts left."
          },
          {
            id: "s5",
            topic: "Energy subsidy",
            shift: "right",
            span: "short",
            text: "The government subsidises firms’ energy bills.",
            why: "A subsidy on energy lowers a cost of production. Firms supply more at each price level, so the aggregate supply curve shifts right."
          },
          {
            id: "s6",
            topic: "Production subsidy",
            shift: "left",
            span: "short",
            text: "A subsidy that had lowered firms’ production costs is withdrawn.",
            why: "Without the subsidy, production costs rise. Firms supply less at each price level, so the aggregate supply curve shifts left."
          }
        ]
      },
      {
        id: "regulation",
        label: "Regulation",
        scenarios: [
          {
            id: "g1",
            topic: "Compliance costs",
            shift: "left",
            span: "short",
            text: "Tighter environmental regulation raises firms’ compliance costs.",
            why: "Higher compliance costs raise the cost of production. Firms supply less at each price level, so the aggregate supply curve shifts left."
          },
          {
            id: "g2",
            topic: "Deregulation",
            shift: "right",
            span: "short",
            text: "Deregulation cuts firms’ compliance costs.",
            why: "Lower compliance costs reduce the cost of production. Firms supply more at each price level, so the aggregate supply curve shifts right."
          },
          {
            id: "g3",
            topic: "Health and safety",
            shift: "left",
            span: "short",
            text: "New health and safety rules raise firms’ costs.",
            why: "The new rules make production more expensive. Firms supply less at each price level, so the aggregate supply curve shifts left."
          },
          {
            id: "g4",
            topic: "Paperwork",
            shift: "right",
            span: "short",
            text: "The government removes unnecessary paperwork for firms.",
            why: "Less paperwork cuts the cost of doing business. Firms supply more at each price level, so the aggregate supply curve shifts right."
          },
          {
            id: "g5",
            topic: "Planning rules",
            shift: "left",
            span: "both",
            text: "Planning rules stop firms building new capacity.",
            why: "If firms cannot expand, productive capacity is held down and costs of operating rise. The aggregate supply curve shifts left."
          },
          {
            id: "g6",
            topic: "Planning rules",
            shift: "right",
            span: "both",
            text: "Planning rules are relaxed so firms can expand capacity.",
            why: "Firms can now add capacity. The economy can produce more, so the aggregate supply curve shifts right."
          }
        ]
      },
      {
        id: "shocks",
        label: "Supply shocks",
        scenarios: [
          {
            id: "k1",
            topic: "Weather",
            shift: "left",
            span: "short",
            text: "A drought destroys harvests.",
            why: "A drought is a negative supply shock. Less is produced at each price level, so the aggregate supply curve shifts left."
          },
          {
            id: "k2",
            topic: "Weather",
            shift: "right",
            span: "short",
            text: "Good weather produces a bumper harvest.",
            why: "A bumper harvest is a positive supply shock. More is produced at each price level, so the aggregate supply curve shifts right."
          },
          {
            id: "k3",
            topic: "Geopolitics",
            shift: "left",
            span: "short",
            text: "A war disrupts oil supplies.",
            why: "A geopolitical shock that cuts oil supplies raises energy costs. Firms supply less at each price level, so the aggregate supply curve shifts left."
          },
          {
            id: "k4",
            topic: "Geopolitics",
            shift: "right",
            span: "short",
            text: "A conflict ends and major shipping routes reopen.",
            why: "Reopened routes make inputs available again and lower costs. Firms supply more at each price level, so the aggregate supply curve shifts right."
          },
          {
            id: "k5",
            topic: "Weather",
            shift: "right",
            span: "short",
            text: "Mild weather cuts firms’ heating and disruption costs.",
            why: "Lower disruption and energy use reduce costs. Firms supply more at each price level, so the aggregate supply curve shifts right."
          },
          {
            id: "k6",
            topic: "Geopolitics",
            shift: "left",
            span: "short",
            text: "A geopolitical conflict closes a major energy route.",
            why: "The closure is a negative supply shock. Energy becomes scarce and costs rise, so the aggregate supply curve shifts left."
          },
          {
            id: "k7",
            topic: "Disaster",
            shift: "left",
            span: "both",
            text: "An earthquake destroys factories and machinery.",
            why: "Destroyed capital is a negative supply shock. Costs rise for the output that remains, and productive capacity falls, so the aggregate supply curve shifts left."
          }
        ]
      },
      {
        id: "expectations",
        label: "Expectations of future inflation",
        scenarios: [
          {
            id: "e1",
            topic: "Expected inflation",
            shift: "left",
            span: "short",
            text: "Workers expect higher inflation and bargain for higher nominal wages now.",
            why: "Higher expected inflation is built into wage claims. Costs rise, so firms supply less at each price level and the aggregate supply curve shifts left."
          },
          {
            id: "e2",
            topic: "Expected inflation",
            shift: "right",
            span: "short",
            text: "Expected inflation falls, and workers accept smaller nominal wage rises.",
            why: "Lower expected inflation eases wage pressure. Costs fall, so firms supply more at each price level and the aggregate supply curve shifts right."
          },
          {
            id: "e3",
            topic: "Expected costs",
            shift: "left",
            span: "short",
            text: "Firms expect higher inflation and raise the costs they build into production.",
            why: "When firms expect the price level to keep rising, they face higher wage and input costs. They supply less at each price level, so the aggregate supply curve shifts left."
          },
          {
            id: "e4",
            topic: "Expected costs",
            shift: "right",
            span: "short",
            text: "Firms expect inflation to fall and plan for lower costs.",
            why: "Lower expected inflation means firms anticipate smaller rises in wages and input prices. They supply more at each price level, so the aggregate supply curve shifts right."
          }
        ]
      }
    ];

    var QUIZ_LENGTH = 10;
    var state = {
      mode: null,
      round: [],
      index: 0,
      scenario: null,
      answered: false,
      correct: 0,
      attempts: 0,
      log: [],
      timeUp: false,
      span: "short",
      gap: null,
      section: null,
      label: ""
    };
    var clockTimer = null;
    var clockEnd = 0;
    var clockLeft = 120;
    var clockRunning = false;

    var scenarioEl = byId("scenario");
    var titleEl = byId("chart-title");
    var noteEl = byId("chart-note");
    var feedbackEl = byId("feedback");
    var logEl = byId("log");
    var btnLeft = byId("btn-left");
    var btnRight = byId("btn-right");
    var btnNext = byId("btn-next");
    var btnSave = byId("btn-save");
    var sras1Line = byId("sras1-line");
    var sras1Label = byId("sras1-label");
    var lras1Line = byId("lras1-line");
    var lras1Label = byId("lras1-label");
    var yfe1Label = byId("yfe1-label");
    var arrowLine = byId("arrow-line");
    var arrowHead = byId("arrow-head");
    var shiftToken = 0;

    var SRAS = { x1: 190, y1: 312, x2: 530, y2: 102 };
    var LRAS_X = 400;
    var GAPS = {
      lras: {
        label: "On LRAS",
        x: 400,
        note: "AD meets SRAS on LRAS. The economy starts at full-employment output Yfe. Decide whether aggregate supply shifts left or right."
      },
      positive: {
        label: "Positive output gap",
        x: 440,
        note: "AD meets SRAS to the right of LRAS. The economy starts with a positive output gap: real output Y is above Yfe. Decide whether aggregate supply shifts left or right."
      },
      negative: {
        label: "Negative output gap",
        x: 360,
        note: "AD meets SRAS to the left of LRAS. The economy starts with a negative output gap: real output Y is below Yfe. Decide whether aggregate supply shifts left or right."
      }
    };
    var CLASSICAL_GUIDES = ["lras-line", "lras-label", "yfe-label", "sras-line", "sras-label"];

    function shiftWord(shift) {
      return shift === "left" ? "left" : "right";
    }

    function supplyWord(shift) {
      return shift === "left" ? "a decrease in aggregate supply" : "an increase in aggregate supply";
    }

    function shiftColour(dx) {
      return dx < 0 ? "#9f1239" : "#166534";
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

    function bestKey() {
      return "as-mixed-best-left";
    }

    function readBest() {
      try { return Number(localStorage.getItem(bestKey())) || 0; } catch (err) { return 0; }
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
        try { localStorage.setItem(bestKey(), String(clockLeft)); } catch (err) {}
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

    function setShown(id, on) {
      var el = byId(id);
      if (el) el.setAttribute("opacity", on ? "1" : "0");
    }

    function hideShift() {
      shiftToken += 1;
      [sras1Line, sras1Label, lras1Line, lras1Label, yfe1Label, arrowLine, arrowHead].forEach(function (el) {
        if (el) el.setAttribute("opacity", "0");
      });
      setShown("y1-line", false);
      setShown("y1-dot", false);
      setShown("y1-label", false);
      setShown("p1-line", false);
      setShown("p1-label", false);
    }

    function srasY(x) {
      var t = (x - SRAS.x1) / (SRAS.x2 - SRAS.x1);
      return SRAS.y1 + t * (SRAS.y2 - SRAS.y1);
    }

    function adThrough(xEq, yEq, xRight) {
      var slope = 0.64;
      var x1 = 150;
      var x2 = xRight || 610;
      var y1 = yEq - (xEq - x1) * slope;
      var y2 = yEq + (x2 - xEq) * slope;
      var yMin = 56;
      var yMax = 314;
      if (y1 < yMin) {
        x1 = xEq - (yEq - yMin) / slope;
        y1 = yMin;
      }
      if (y2 > yMax) {
        x2 = xEq + (yMax - yEq) / slope;
        y2 = yMax;
      }
      return { x1: Math.round(x1), y1: Math.round(y1), x2: Math.round(x2), y2: Math.round(y2) };
    }

    function placeAxisTitle() {
      var xLabel = byId("x-label");
      xLabel.setAttribute("text-anchor", "end");
      xLabel.setAttribute("x", "616");
      xLabel.setAttribute("y", "378");
    }

    function placeCentred(el, x, y) {
      el.setAttribute("text-anchor", "middle");
      el.setAttribute("x", String(Math.round(x)));
      el.setAttribute("y", String(Math.round(y)));
      el.setAttribute("fill", "#1c1915");
    }

    function placeOutput(el, x) {
      placeCentred(el, x, 352);
      el.setAttribute("opacity", "1");
    }

    function placeLowerLeft(el, x, y) {
      el.setAttribute("text-anchor", "end");
      el.setAttribute("x", String(Math.round(x - 8)));
      el.setAttribute("y", String(Math.round(y - 6)));
      el.setAttribute("fill", "#1c1915");
    }

    function placeAdLine(line) {
      var adLine = byId("ad-line");
      adLine.setAttribute("x1", String(line.x1));
      adLine.setAttribute("y1", String(line.y1));
      adLine.setAttribute("x2", String(line.x2));
      adLine.setAttribute("y2", String(line.y2));
      adLine.setAttribute("opacity", "1");
      var label = byId("ad-label");
      label.setAttribute("fill", "#1c1915");
      label.setAttribute("opacity", "1");
      if (line.y2 > 292 || line.x2 > 560) {
        label.setAttribute("text-anchor", "end");
        label.setAttribute("x", String(Math.round(line.x2 - 8)));
        label.setAttribute("y", String(Math.round(line.y2 - 10)));
      } else {
        label.setAttribute("text-anchor", "start");
        label.setAttribute("x", String(Math.round(line.x2 + 10)));
        label.setAttribute("y", String(Math.round(line.y2 + 6)));
      }
    }

    function showDrop(id, x, yStart) {
      var line = byId(id);
      line.setAttribute("x1", String(Math.round(x)));
      line.setAttribute("x2", String(Math.round(x)));
      line.setAttribute("y1", String(Math.round(yStart)));
      line.setAttribute("y2", "332");
      line.setAttribute("opacity", "1");
    }

    function placePrice(x, y, xStop) {
      var line = byId("p-line");
      var end = xStop == null ? x : xStop;
      line.setAttribute("x1", "78");
      line.setAttribute("x2", String(Math.round(end)));
      line.setAttribute("y1", String(Math.round(y)));
      line.setAttribute("y2", String(Math.round(y)));
      line.setAttribute("opacity", end > 100 ? "1" : "0");
      var label = byId("p-label");
      label.setAttribute("text-anchor", "end");
      label.setAttribute("x", "68");
      label.setAttribute("y", String(Math.round(y + 5)));
      label.setAttribute("opacity", "1");
    }

    function hidePrice() {
      setShown("p-line", false);
      setShown("p-label", false);
    }

    function placeArrow(xStart, xEnd, y, colour, opacity) {
      arrowLine.setAttribute("x1", String(xStart));
      arrowLine.setAttribute("y1", String(y));
      arrowLine.setAttribute("x2", String(xEnd));
      arrowLine.setAttribute("y2", String(y));
      arrowLine.setAttribute("stroke", colour);
      arrowLine.setAttribute("stroke-width", "3");
      arrowLine.setAttribute("opacity", String(opacity));
      var head = xEnd < xStart
        ? (xEnd + "," + y + " " + (xEnd + 12) + "," + (y - 6) + " " + (xEnd + 12) + "," + (y + 6))
        : (xEnd + "," + y + " " + (xEnd - 12) + "," + (y - 6) + " " + (xEnd - 12) + "," + (y + 6));
      arrowHead.setAttribute("points", head);
      arrowHead.setAttribute("fill", colour);
      arrowHead.setAttribute("opacity", String(opacity));
    }

    function newEquilibrium(dx) {
      var xEq = state.gap && GAPS[state.gap] ? GAPS[state.gap].x : LRAS_X;
      var yEq = srasY(xEq);
      var srasS = (SRAS.y2 - SRAS.y1) / (SRAS.x2 - SRAS.x1);
      var adS = 0.64;
      var x = xEq + dx * srasS / (srasS - adS);
      var y = yEq + (x - xEq) * adS;
      return { x: x, y: y };
    }

    function placeP1(x, y, opacity) {
      var line = byId("p1-line");
      line.setAttribute("x1", "78");
      line.setAttribute("x2", String(Math.round(x)));
      line.setAttribute("y1", String(Math.round(y)));
      line.setAttribute("y2", String(Math.round(y)));
      line.setAttribute("opacity", String(opacity));
      var pY = parseFloat(byId("p-label").getAttribute("y")) || y + 5;
      var labelY = y + 5;
      if (Math.abs(labelY - pY) < 16) labelY = y < pY ? pY - 16 : pY + 16;
      var label = byId("p1-label");
      label.textContent = "P1";
      label.setAttribute("text-anchor", "end");
      label.setAttribute("x", "68");
      label.setAttribute("y", String(Math.round(labelY)));
      label.setAttribute("opacity", String(opacity));
    }

    function hideNewEquilibrium() {
      setShown("y1-line", false);
      setShown("y1-dot", false);
      setShown("y1-label", false);
      setShown("p1-line", false);
      setShown("p1-label", false);
    }

    function placeY1(x, y, opacity) {
      showDrop("y1-line", x, y);
      byId("y1-line").setAttribute("opacity", String(opacity));
      var dot = byId("y1-dot");
      dot.setAttribute("cx", String(Math.round(x)));
      dot.setAttribute("cy", String(Math.round(y)));
      dot.setAttribute("opacity", String(opacity));
      var taken = [];
      ["y-label", "yfe-label", "yfe1-label"].forEach(function (id) {
        var el = byId(id);
        if (!el || el.getAttribute("opacity") === "0") return;
        taken.push(parseFloat(el.getAttribute("x")));
      });
      var labelX = x;
      taken.forEach(function (nx) {
        if (Math.abs(labelX - nx) < 24) labelX = x < nx ? nx - 26 : nx + 26;
      });
      var label = byId("y1-label");
      label.textContent = "Y1";
      placeOutput(label, labelX);
      label.setAttribute("opacity", String(opacity));
    }

    function placeSrasShift(dx, opacity) {
      var x1 = SRAS.x1 + dx;
      var x2 = SRAS.x2 + dx;
      sras1Line.setAttribute("x1", String(x1));
      sras1Line.setAttribute("y1", String(SRAS.y1));
      sras1Line.setAttribute("x2", String(x2));
      sras1Line.setAttribute("y2", String(SRAS.y2));
      sras1Line.setAttribute("stroke", shiftColour(dx));
      sras1Line.setAttribute("opacity", String(opacity));
      placeLowerLeft(byId("sras-label"), SRAS.x1, SRAS.y1);
      placeLowerLeft(sras1Label, x1, SRAS.y1 + 18);
      sras1Label.setAttribute("opacity", String(opacity));
      var y = (SRAS.y1 + SRAS.y2) / 2;
      var xStart = (SRAS.x1 + SRAS.x2) / 2;
      placeArrow(xStart, xStart + dx, y, "#1c1915", opacity);
    }

    function placeLrasShift(dx, opacity) {
      var x = LRAS_X + dx;
      lras1Line.setAttribute("x1", String(x));
      lras1Line.setAttribute("x2", String(x));
      lras1Line.setAttribute("y1", "58");
      lras1Line.setAttribute("y2", "332");
      lras1Line.setAttribute("stroke", shiftColour(dx));
      lras1Line.setAttribute("opacity", String(opacity));
      lras1Label.setAttribute("fill", "#1c1915");
      if (dx < 0) {
        lras1Label.setAttribute("text-anchor", "end");
        lras1Label.setAttribute("x", String(Math.round(x - 8)));
      } else {
        lras1Label.setAttribute("text-anchor", "start");
        lras1Label.setAttribute("x", String(Math.round(x + 8)));
      }
      lras1Label.setAttribute("y", "52");
      lras1Label.setAttribute("opacity", String(opacity));
      yfe1Label.textContent = "Yfe1";
      placeOutput(yfe1Label, x);
      var inset = 8;
      var xFrom = LRAS_X;
      var xTo = x;
      if (xTo > xFrom) {
        xFrom += inset;
        xTo -= inset;
      } else {
        xFrom -= inset;
        xTo += inset;
      }
      placeArrow(xFrom, xTo, 120, "#1c1915", opacity);
    }

    function animateShift(dir) {
      var token = ++shiftToken;
      var target = dir === "left" ? -SHIFT : SHIFT;
      var start = performance.now();
      var duration = 520;
      var lrasOnly = state.span === "both";
      function frame(now) {
        var t = Math.min(1, (now - start) / duration);
        var eased = 1 - Math.pow(1 - t, 3);
        var dx = target * eased;
        var opacity = 0.25 + 0.75 * eased;
        if (token !== shiftToken) return;
        if (lrasOnly) {
          placeLrasShift(dx, opacity);
          hideNewEquilibrium();
        } else {
          placeSrasShift(dx, opacity);
          if (Math.abs(dx) > 12) {
            var next = newEquilibrium(dx);
            placeY1(next.x, next.y, opacity);
            placeP1(next.x, next.y, opacity);
          } else {
            hideNewEquilibrium();
          }
        }
        if (t < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
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

    function layoutClassical(gapId) {
      var gap = GAPS[gapId];
      var yEq = Math.round(srasY(gap.x));
      var ad = adThrough(gap.x, yEq);
      CLASSICAL_GUIDES.forEach(function (id) { setShown(id, true); });
      var onLras = gapId === "lras";
      setShown("eq-line", !onLras);
      setShown("y-label", !onLras);
      setShown("eq-dot", true);
      var eqLine = byId("eq-line");
      eqLine.setAttribute("x1", String(gap.x));
      eqLine.setAttribute("y1", String(yEq));
      eqLine.setAttribute("x2", String(gap.x));
      eqLine.setAttribute("y2", "332");
      var dot = byId("eq-dot");
      dot.setAttribute("cx", String(gap.x));
      dot.setAttribute("cy", String(yEq));
      if (!onLras) placeOutput(byId("y-label"), gap.x);
      placeOutput(byId("yfe-label"), LRAS_X);
      var lrasLabel = byId("lras-label");
      lrasLabel.textContent = "LRAS";
      placeCentred(lrasLabel, LRAS_X, 48);
      lrasLabel.setAttribute("opacity", "1");
      placeLowerLeft(byId("sras-label"), SRAS.x1, SRAS.y1);
      byId("sras-label").setAttribute("opacity", "1");
      placeAxisTitle();
      placeAdLine(ad);
      placePrice(gap.x, yEq);
    }

    function assignNamed(round, key, order) {
      var bag = [];
      while (bag.length < round.length) bag = bag.concat(shuffle(order));
      round.forEach(function (item, i) { item[key] = bag[i]; });
    }

    function assignDiagrams(round) {
      round.forEach(function (item) { item.mode = "classical"; });
      assignNamed(round, "gap", ["lras", "positive", "negative"]);
    }

    function showScenario() {
      var item = state.round[state.index];
      var s = item.scenario;
      state.scenario = s;
      state.answered = false;
      state.mode = item.mode;
      state.label = item.label;
      state.span = s.span || "short";
      hideShift();
      layoutClassical(item.gap);
      var point = GAPS[item.gap];
      var modeLabel = "Classical response";
      state.gap = item.gap;
      var chartWrap = byId("play-chart");
      var shiftRow = byId("shift-row");
      if (chartWrap) chartWrap.hidden = false;
      if (shiftRow) shiftRow.hidden = false;
      scenarioEl.innerHTML =
        '<p class="q-count">Question ' + (state.index + 1) + " of " + QUIZ_LENGTH + "</p>" +
        '<p class="cat-title">' + modeLabel + " · " + item.label + "</p>" +
        "<p>" + s.text + "</p>" +
        '<p class="ask">What happens to the aggregate supply curve?</p>';
      titleEl.textContent = point ? modeLabel + " — " + point.label : "Aggregate supply";
      noteEl.textContent = point
        ? point.note
        : "Decide whether aggregate supply shifts left or right. A change in the price level would be a movement along the curve, not a shift.";
      feedbackEl.className = "feedback";
      feedbackEl.innerHTML = "";
      btnLeft.disabled = false;
      btnRight.disabled = false;
      btnLeft.className = "";
      btnRight.className = "";
      btnNext.disabled = true;
      btnNext.textContent = "Next question";
      if (btnSave) btnSave.disabled = false;
      byId("chart").setAttribute("aria-label", point.label + ". Aggregate supply before the change. Category: " + item.label + ".");
    }

    function startRound() {
      ensureClock();
      state.round = buildRound();
      assignDiagrams(state.round);
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
      var item = state.round[state.index];
      var point = item && item.gap ? item.gap : "diagram";
      var name = "aggregate-supply-classical-" + point + "-q" + (state.index + 1);
      if (state.answered && state.scenario) name += "-shift-" + state.scenario.shift;
      return name + ".png";
    }

    function saveDiagram() {
      var chart = byId("chart");
      if (!chart || !state.mode) return;
      var vb = (chart.getAttribute("viewBox") || "0 0 680 400").split(/[\s,]+/).map(Number);
      var w = vb[2] || 680;
      var h = vb[3] || 400;
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

    function classicalResult(gap, shift, span) {
      var right = shift === "right";
      if (span === "both") {
        var line = right
          ? "LRAS shifts right and SRAS stays where it is. Full-employment output rises to Yfe1. The short-run equilibrium does not move."
          : "LRAS shifts left and SRAS stays where it is. Full-employment output falls to Yfe1. The short-run equilibrium does not move.";
        if (gap === "lras") {
          line += right
            ? " Y is now below Yfe1, so a negative output gap opens."
            : " Y is now above Yfe1, so a positive output gap opens.";
        }
        return line;
      }
      var line = right
        ? "SRAS shifts right and LRAS stays at Yfe. Along AD, the price level falls and real output rises. That change in output is a short-run effect."
        : "SRAS shifts left and LRAS stays at Yfe. Along AD, the price level rises and real output falls. This is cost-push inflation.";
      if (gap === "lras") {
        line += right
          ? " The economy started at Yfe, so a positive output gap opens."
          : " The economy started at Yfe, so a negative output gap opens.";
      }
      return line;
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
        ? "Correct. The aggregate supply curve shifts " + shiftWord(s.shift) + ". That is " + supplyWord(s.shift) + "."
        : "Not this time. You chose a shift " + shiftWord(choice) + ". The aggregate supply curve shifts " + shiftWord(s.shift) + ", which is " + supplyWord(s.shift) + ".";
      feedbackEl.className = "feedback " + (hit ? "ok" : "bad");
      feedbackEl.innerHTML = "<p><strong>" + lead + "</strong></p><p>" + s.why + "</p>";
      feedbackEl.innerHTML += "<p>" + classicalResult(state.gap, s.shift, state.span) + "</p>";
      if (finished) {
        stopClock();
        feedbackEl.innerHTML += "<p>Set complete. " + state.correct + " correct out of " + state.attempts + " attempts. " + beatLine() + "</p>";
        renderClock();
      }
      if (state.span === "both") {
        noteEl.textContent = "LRAS1 is long-run aggregate supply after the change. SRAS has not moved. A shift left is a decrease in aggregate supply. A shift right is an increase.";
      } else {
        noteEl.textContent = "SRAS1 is short-run aggregate supply after the change. LRAS has not moved. A shift left is a decrease in aggregate supply. A shift right is an increase.";
      }
      byId("chart").setAttribute("aria-label", "Aggregate supply shifts " + shiftWord(s.shift) + ", " + supplyWord(s.shift) + ".");
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
    byId("btn-reset").addEventListener("click", function () {
      startRound();
    });
    if (btnSave) btnSave.addEventListener("click", saveDiagram);

    startRound();
  }
};
