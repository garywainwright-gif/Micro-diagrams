window.AdShiftGame = {
  markup: function () {
    return [
      '<div class="head"><div><h3>Aggregate demand shifts</h3>',
      "<p>Get ready — your aggregate demand reflexes are about to be tested. Predict whether aggregate demand shifts left or right. You’ve got two minutes.</p>",
      '</div><div class="scorebox" aria-live="polite"><p class="score-main"><span id="score-points">0</span> / <span id="score-attempts">0</span></p>',
      '<p class="score-sub" id="score-sub">correct out of attempts</p></div></div>',
      '<div class="scenario" id="scenario"><p>Ten questions are being prepared.</p></div>',
      '<div class="chart-wrap" id="play-chart" hidden><p class="chart-title" id="chart-title">Aggregate demand</p>',
      '<svg class="chart" id="chart" viewBox="0 0 680 400" role="img" aria-labelledby="chart-title chart-note">',
      '<line x1="78" y1="36" x2="78" y2="332" stroke="#1c1915" stroke-width="2" />',
      '<polygon points="78,28 73,42 83,42" fill="#1c1915" />',
      '<line x1="78" y1="332" x2="620" y2="332" stroke="#1c1915" stroke-width="2" />',
      '<polygon points="632,332 618,327 618,337" fill="#1c1915" />',
      '<text x="88" y="40" fill="#5c5348" font-size="15" font-family="Financier Text, Georgia, Palatino Linotype, Palatino, serif">Price level</text>',
      '<text id="x-label" x="430" y="356" fill="#5c5348" font-size="15" font-family="Financier Text, Georgia, Palatino Linotype, Palatino, serif">Real national output</text>',
      '<line id="lras-line" x1="400" y1="58" x2="400" y2="332" stroke="#1c1915" stroke-width="3" opacity="0" />',
      '<text id="lras-label" x="400" y="48" text-anchor="middle" fill="#1c1915" font-size="18" font-weight="700" font-family="Financier Display, Georgia, Palatino Linotype, Palatino, serif" opacity="0">LRAS</text>',
      '<text id="yfe-label" x="382" y="350" fill="#1c1915" font-size="16" font-weight="700" font-family="Financier Display, Georgia, Palatino Linotype, Palatino, serif" opacity="0">Yfe</text>',
      '<line id="sras-line" x1="210" y1="310" x2="580" y2="72" stroke="#2563eb" stroke-width="3" opacity="0" />',
      '<text id="sras-label" x="520" y="78" fill="#2563eb" font-size="18" font-weight="700" font-family="Financier Display, Georgia, Palatino Linotype, Palatino, serif" opacity="0">SRAS</text>',
      '<line id="eq-line" x1="400" y1="188" x2="400" y2="332" stroke="#5c5348" stroke-width="1.5" stroke-dasharray="5 4" opacity="0" />',
      '<circle id="eq-dot" cx="400" cy="188" r="5" fill="#9a3412" opacity="0" />',
      '<text id="y-label" x="392" y="350" fill="#9a3412" font-size="16" font-weight="700" font-family="Financier Display, Georgia, Palatino Linotype, Palatino, serif" opacity="0">Y</text>',
      '<line id="p-line" x1="78" y1="188" x2="400" y2="188" stroke="#5c5348" stroke-width="1.5" stroke-dasharray="5 4" opacity="0" />',
      '<text id="p-label" x="70" y="193" text-anchor="end" fill="#9a3412" font-size="16" font-weight="700" font-family="Financier Display, Georgia, Palatino Linotype, Palatino, serif" opacity="0">P</text>',
      '<line id="eq1-line" x1="400" y1="188" x2="400" y2="332" stroke="#5c5348" stroke-width="1.5" stroke-dasharray="5 4" opacity="0" />',
      '<circle id="eq1-dot" cx="400" cy="188" r="5" fill="#166534" opacity="0" />',
      '<text id="y1-label" x="392" y="350" text-anchor="middle" fill="#166534" font-size="16" font-weight="700" font-family="Financier Display, Georgia, Palatino Linotype, Palatino, serif" opacity="0">Y1</text>',
      '<line id="p1-line" x1="78" y1="188" x2="400" y2="188" stroke="#166534" stroke-width="1.5" stroke-dasharray="5 4" opacity="0" />',
      '<text id="p1-label" x="70" y="193" text-anchor="end" fill="#166534" font-size="16" font-weight="700" font-family="Financier Display, Georgia, Palatino Linotype, Palatino, serif" opacity="0">P1</text>',
      '<line id="ad-line" x1="168" y1="78" x2="500" y2="292" stroke="#9a3412" stroke-width="3" opacity="0" />',
      '<text id="ad-label" x="176" y="70" fill="#9a3412" font-size="18" font-weight="700" font-family="Financier Display, Georgia, Palatino Linotype, Palatino, serif" opacity="0">AD</text>',
      '<line id="ad1-line" x1="168" y1="78" x2="500" y2="292" stroke="#166534" stroke-width="3" opacity="0" />',
      '<text id="ad1-label" x="176" y="70" fill="#166534" font-size="18" font-weight="700" font-family="Financier Display, Georgia, Palatino Linotype, Palatino, serif" opacity="0">AD1</text>',
      '<line id="arrow-line" stroke="#1c1915" stroke-width="2.5" opacity="0" />',
      '<polygon id="arrow-head" fill="#1c1915" opacity="0" />',
      "</svg>",
      '<p class="chart-note" id="chart-note">AD slopes downwards. A shift left is a decrease in aggregate demand. A shift right is an increase in aggregate demand. The price level has not changed, so this is a shift of the curve, not a movement along it.</p>',
      "</div>",
      '<div class="shift-row" id="shift-row" hidden>',
      '<button type="button" id="btn-left" disabled>Decrease in aggregate demand — shift left</button>',
      '<button type="button" id="btn-right" disabled>Increase in aggregate demand — shift right</button>',
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
    if ((opts && opts.embedded) || !root.querySelector("#btn-left")) root.innerHTML = window.AdShiftGame.markup();
    window.AdShiftGame.bind(root);
  },
  bind: function (root) {
    function byId(id) { return root.querySelector("#" + id); }
    var AD = { x1: 168, y1: 78, x2: 500, y2: 292 };
    var SHIFT = 72;
    var CATEGORIES = [
      {
        id: "consumption",
        label: "Consumption",
        scenarios: [
          {
            id: "c1",
            topic: "Disposable income",
            shift: "right",
            text: "Household disposable incomes rise.",
            why: "Consumption is a component of aggregate demand. Higher disposable income means households spend more at each price level, so the AD curve shifts right."
          },
          {
            id: "c2",
            topic: "Income tax rise",
            shift: "left",
            text: "The government raises income tax.",
            why: "A higher income tax cuts disposable income. Households spend less at each price level, so consumption falls and the AD curve shifts left."
          },
          {
            id: "c3",
            topic: "Income tax cut",
            shift: "right",
            text: "The government cuts income tax.",
            why: "A lower income tax raises disposable income. Households spend more at each price level, so consumption rises and the AD curve shifts right."
          },
          {
            id: "c4",
            topic: "Expected income",
            shift: "left",
            text: "Households expect lower incomes next year and cut spending now.",
            why: "Lower expected income reduces consumption today. Spending falls at each price level, so the AD curve shifts left."
          },
          {
            id: "c5",
            topic: "Consumer confidence",
            shift: "right",
            text: "Households become more optimistic about the economy.",
            why: "Higher consumer confidence encourages households to spend more. Consumption rises at each price level, so the AD curve shifts right."
          },
          {
            id: "c6",
            topic: "Interest rates",
            shift: "right",
            text: "Interest rates fall, so borrowing becomes cheaper.",
            why: "Cheaper borrowing and a lower reward for saving encourage households to spend more. Consumption rises at each price level, so the AD curve shifts right."
          },
          {
            id: "c7",
            topic: "Wealth",
            shift: "right",
            text: "House prices and share prices rise, so household wealth increases.",
            why: "Households feel richer when house prices and the stock market rise. They spend more at each price level, so consumption rises and the AD curve shifts right."
          },
          {
            id: "c8",
            topic: "Expected prices",
            shift: "right",
            text: "Households expect prices to rise and bring purchases forward.",
            why: "If households expect inflation, they buy now rather than later. Consumption rises at each price level, so the AD curve shifts right."
          }
        ]
      },
      {
        id: "wealth",
        label: "Wealth",
        scenarios: [
          {
            id: "w1",
            topic: "House prices",
            shift: "right",
            text: "House prices rise and household wealth increases.",
            why: "A rise in wealth makes households feel richer, so they spend more. Consumption rises at each price level and the AD curve shifts right."
          },
          {
            id: "w2",
            topic: "Share prices",
            shift: "left",
            text: "Share prices fall sharply.",
            why: "A fall in share prices reduces household wealth. Households spend less at each price level, so consumption falls and the AD curve shifts left."
          },
          {
            id: "w3",
            topic: "Share prices",
            shift: "right",
            text: "Rising share prices make households wealthier.",
            why: "Higher wealth increases consumption. Households spend more at each price level, so the AD curve shifts right."
          },
          {
            id: "w4",
            topic: "House prices",
            shift: "left",
            text: "House prices fall and household wealth decreases.",
            why: "Households feel poorer and spend less. Consumption falls at each price level, so the AD curve shifts left."
          }
        ]
      },
      {
        id: "confidence",
        label: "Confidence",
        scenarios: [
          {
            id: "f1",
            topic: "Consumer confidence",
            shift: "right",
            text: "Households become more confident about keeping their jobs.",
            why: "Higher consumer confidence encourages spending. Consumption rises at each price level, so the AD curve shifts right."
          },
          {
            id: "f2",
            topic: "Consumer confidence",
            shift: "left",
            text: "Households fear a recession and postpone big purchases.",
            why: "Lower consumer confidence reduces consumption. Spending falls at each price level, so the AD curve shifts left."
          },
          {
            id: "f3",
            topic: "Business confidence",
            shift: "right",
            text: "Business confidence rises and firms bring forward investment projects.",
            why: "Higher business confidence increases investment. Investment is a component of aggregate demand, so the AD curve shifts right."
          },
          {
            id: "f4",
            topic: "Business confidence",
            shift: "left",
            text: "Business confidence falls and firms cancel planned investment.",
            why: "Lower business confidence reduces investment. Less is spent at each price level, so the AD curve shifts left."
          }
        ]
      },
      {
        id: "investment",
        label: "Investment",
        scenarios: [
          {
            id: "i1",
            topic: "Expected sales",
            shift: "right",
            text: "Firms expect sales to rise over the next year.",
            why: "Higher expected sales make new capital more worthwhile. Investment rises at each price level, so the AD curve shifts right."
          },
          {
            id: "i2",
            topic: "Corporation tax",
            shift: "left",
            text: "The government raises corporation tax.",
            why: "A higher corporation tax reduces post-tax profits. Firms invest less at each price level, so the AD curve shifts left."
          },
          {
            id: "i3",
            topic: "Corporation tax",
            shift: "right",
            text: "The government cuts corporation tax.",
            why: "A lower corporation tax raises the return on new capital. Firms invest more, so the AD curve shifts right."
          },
          {
            id: "i4",
            topic: "Spare capacity",
            shift: "left",
            text: "Firms already have spare capacity and see no need to expand.",
            why: "Spare capacity reduces the need for new capital. Investment falls at each price level, so the AD curve shifts left."
          },
          {
            id: "i5",
            topic: "Interest rates",
            shift: "right",
            text: "Interest rates fall, so borrowing for new capital becomes cheaper.",
            why: "A lower interest rate makes investment projects cheaper to finance. Firms invest more at each price level, so the AD curve shifts right."
          },
          {
            id: "i6",
            topic: "Business confidence",
            shift: "right",
            text: "Business confidence increases.",
            why: "Higher business confidence encourages firms to invest. Investment rises at each price level, so the AD curve shifts right."
          },
          {
            id: "i7",
            topic: "Expected profits",
            shift: "right",
            text: "Firms expect higher profits in the future.",
            why: "Higher expected profits make new capital more worthwhile. Investment rises at each price level, so the AD curve shifts right."
          },
          {
            id: "i8",
            topic: "Technology",
            shift: "right",
            text: "New technology leads firms to invest in better capital equipment.",
            why: "Spending on new capital equipment is investment. Investment rises at each price level, so the AD curve shifts right."
          },
          {
            id: "i9",
            topic: "Bank lending",
            shift: "right",
            text: "Banks become more willing to lend to firms.",
            why: "Easier access to credit lets firms finance more investment projects. Investment rises at each price level, so the AD curve shifts right."
          },
          {
            id: "i10",
            topic: "Investment incentives",
            shift: "right",
            text: "The government offers subsidies and grants for new investment.",
            why: "Subsidies and grants make investment projects cheaper for firms. Investment rises at each price level, so the AD curve shifts right."
          }
        ]
      },
      {
        id: "interest",
        label: "Interest rates",
        scenarios: [
          {
            id: "r1",
            topic: "Base rate",
            shift: "right",
            text: "The central bank cuts interest rates.",
            why: "A lower interest rate makes borrowing cheaper and saving less attractive. Consumption and investment rise, so the AD curve shifts right."
          },
          {
            id: "r2",
            topic: "Base rate",
            shift: "left",
            text: "The central bank raises interest rates.",
            why: "A higher interest rate raises the cost of borrowing and rewards saving. Consumption and investment fall, so the AD curve shifts left."
          },
          {
            id: "r3",
            topic: "Mortgage rates",
            shift: "right",
            text: "Mortgage rates fall.",
            why: "Cheaper mortgages leave households with more income to spend, and borrowing rises. Consumption increases, so the AD curve shifts right."
          },
          {
            id: "r4",
            topic: "Business loans",
            shift: "left",
            text: "The interest rate charged on business loans rises.",
            why: "Dearer loans make investment projects less worthwhile. Investment falls, so the AD curve shifts left."
          }
        ]
      },
      {
        id: "government",
        label: "Government spending",
        scenarios: [
          {
            id: "g1",
            topic: "Infrastructure",
            shift: "right",
            text: "The government increases spending on roads and railways.",
            why: "Government spending is a component of aggregate demand. Higher spending means more is bought at each price level, so the AD curve shifts right."
          },
          {
            id: "g2",
            topic: "Public services",
            shift: "left",
            text: "The government cuts spending on public services.",
            why: "Lower government spending reduces total spending in the economy. The AD curve shifts left."
          },
          {
            id: "g3",
            topic: "Schools and hospitals",
            shift: "right",
            text: "The government raises spending on schools and hospitals.",
            why: "Extra government spending increases aggregate demand. The AD curve shifts right."
          },
          {
            id: "g4",
            topic: "Budget cut",
            shift: "left",
            text: "A new budget reduces government spending.",
            why: "A fall in government spending reduces aggregate demand. The AD curve shifts left."
          }
        ]
      },
      {
        id: "exports",
        label: "Net exports",
        scenarios: [
          {
            id: "x1",
            topic: "Foreign incomes",
            shift: "right",
            text: "Incomes rise in the main export markets.",
            why: "Foreign buyers purchase more of this country’s exports. Net exports rise at each price level, so the AD curve shifts right."
          },
          {
            id: "x2",
            topic: "Foreign recession",
            shift: "left",
            text: "A recession hits the main trading partners.",
            why: "Foreign demand for exports falls. Net exports fall at each price level, so the AD curve shifts left."
          },
          {
            id: "x3",
            topic: "Foreign tariffs",
            shift: "right",
            text: "Trading partners remove tariffs on this country’s exports.",
            why: "Exports become easier to sell abroad. Net exports rise, so the AD curve shifts right."
          },
          {
            id: "x4",
            topic: "Foreign tariffs",
            shift: "left",
            text: "Trading partners place tariffs on this country’s exports.",
            why: "Exports fall. Net exports fall at each price level, so the AD curve shifts left."
          },
          {
            id: "x5",
            topic: "Global boom",
            shift: "right",
            text: "A global boom raises incomes abroad, so foreign buyers purchase more UK exports.",
            why: "Higher foreign incomes increase demand for UK exports. Net exports rise at each price level, so the AD curve shifts right."
          },
          {
            id: "x6",
            topic: "Competitiveness",
            shift: "right",
            text: "UK goods become more competitive as quality, branding and productivity improve.",
            why: "More competitive goods sell better abroad and replace some imports. Net exports rise at each price level, so the AD curve shifts right."
          }
        ]
      },
      {
        id: "exchange",
        label: "Exchange rate",
        scenarios: [
          {
            id: "e1",
            topic: "Depreciation",
            shift: "right",
            text: "The exchange rate depreciates, so exports become cheaper abroad.",
            why: "A lower exchange rate makes exports cheaper abroad and imports dearer at home. Net exports rise, so the AD curve shifts right."
          },
          {
            id: "e2",
            topic: "Appreciation",
            shift: "left",
            text: "The exchange rate appreciates.",
            why: "A higher exchange rate makes exports dearer abroad and imports cheaper at home. Net exports fall, so the AD curve shifts left."
          },
          {
            id: "e3",
            topic: "The pound",
            shift: "right",
            text: "The pound falls against the currencies of trading partners.",
            why: "A fall in the pound is a depreciation. Exports rise and imports fall, so net exports rise and the AD curve shifts right."
          },
          {
            id: "e4",
            topic: "The pound",
            shift: "left",
            text: "The pound rises against the currencies of trading partners.",
            why: "A rise in the pound is an appreciation. Exports fall and imports rise, so net exports fall and the AD curve shifts left."
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
      timeUp: false
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
    var responseEl = byId("response");
    var responseTitle = byId("response-title");
    var responseChart = byId("response-chart");
    var responseNote = byId("response-note");
    var FONT = "Financier Text, Georgia, Palatino Linotype, Palatino, serif";
    var DISPLAY = "Financier Display, Georgia, Palatino Linotype, Palatino, serif";
    var ad1Line = byId("ad1-line");
    var ad1Label = byId("ad1-label");
    var arrowLine = byId("arrow-line");
    var arrowHead = byId("arrow-head");
    var eq1Line = byId("eq1-line");
    var eq1Dot = byId("eq1-dot");
    var y1Label = byId("y1-label");
    var pLine = byId("p-line");
    var pLabel = byId("p-label");
    var p1Line = byId("p1-line");
    var p1Label = byId("p1-label");
    var shiftFrame = 0;

    function shiftWord(shift) {
      return shift === "left" ? "left" : "right";
    }

    function demandWord(shift) {
      return shift === "left" ? "a decrease in aggregate demand" : "an increase in aggregate demand";
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
      return "ad-mixed-best-left";
    }

    function readBest() {
      var key = bestKey();
      if (!key) return 0;
      try { return Number(localStorage.getItem(key)) || 0; } catch (err) { return 0; }
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
      if (state.attempts === 0) {
        sub.textContent = "correct out of attempts";
      } else {
        sub.textContent = "correct out of " + state.attempts + (state.attempts === 1 ? " attempt" : " attempts");
      }
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

    function hideShift() {
      shiftFrame += 1;
      ad1Line.setAttribute("opacity", "0");
      ad1Label.setAttribute("opacity", "0");
      arrowLine.setAttribute("opacity", "0");
      arrowHead.setAttribute("opacity", "0");
      if (eq1Line) eq1Line.setAttribute("opacity", "0");
      if (eq1Dot) eq1Dot.setAttribute("opacity", "0");
      if (y1Label) y1Label.setAttribute("opacity", "0");
      if (p1Line) p1Line.setAttribute("opacity", "0");
      if (p1Label) p1Label.setAttribute("opacity", "0");
      ad1Line.setAttribute("x1", String(AD.x1));
      ad1Line.setAttribute("y1", String(AD.y1));
      ad1Line.setAttribute("x2", String(AD.x2));
      ad1Line.setAttribute("y2", String(AD.y2));
    }

    function shiftedEquilibrium(dx) {
      var x1 = AD.x1 + dx;
      var y1 = AD.y1;
      var x2 = AD.x2 + dx;
      var y2 = AD.y2;
      var x3 = SRAS.x1;
      var y3 = SRAS.y1;
      var x4 = SRAS.x2;
      var y4 = SRAS.y2;
      var denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
      if (!denom) return null;
      var t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
      return {
        x: x1 + t * (x2 - x1),
        y: y1 + t * (y2 - y1)
      };
    }

    function placePrice(line, label, y, xEq, opacity, colour) {
      if (!line || !label) return;
      var py = Math.round(y);
      line.setAttribute("x1", "78");
      line.setAttribute("y1", String(py));
      line.setAttribute("x2", String(Math.round(xEq)));
      line.setAttribute("y2", String(py));
      line.setAttribute("stroke", colour);
      line.setAttribute("opacity", String(opacity));
      label.setAttribute("x", "70");
      label.setAttribute("y", String(py + 5));
      label.setAttribute("fill", colour);
      label.setAttribute("opacity", String(opacity));
    }

    function clearPriceY(y) {
      if (!pLabel || pLabel.getAttribute("opacity") === "0") return y;
      var py = Number(pLabel.getAttribute("y")) - 5;
      if (Math.abs(y - py) >= 16) return y;
      return y < py ? py - 16 : py + 16;
    }

    function labelBox(el, width) {
      if (!el || el.getAttribute("opacity") === "0") return null;
      var x = Number(el.getAttribute("x"));
      var anchor = el.getAttribute("text-anchor") || "start";
      var left = anchor === "middle" ? x - width / 2 : anchor === "end" ? x - width : x;
      return { left: left, right: left + width };
    }

    function clearLabelX(x) {
      var half = 11;
      var pad = 6;
      var boxes = [
        labelBox(byId("y-label"), 14),
        labelBox(byId("yfe-label"), 29)
      ].filter(Boolean);
      function crowded(center) {
        var left = center - half - pad;
        var right = center + half + pad;
        return boxes.some(function (box) {
          return right > box.left && left < box.right;
        });
      }
      if (!crowded(x)) return { x: x, y: 350 };
      for (var step = 1; step <= 14; step += 1) {
        if (!crowded(x - step)) return { x: x - step, y: 350 };
        if (!crowded(x + step)) return { x: x + step, y: 350 };
      }
      return { x: x, y: 368 };
    }

    function placeNewEquilibrium(dx, opacity, colour) {
      if (!eq1Line || !eq1Dot || !y1Label) return;
      var point = shiftedEquilibrium(dx);
      if (!point) return;
      var px = Math.round(point.x);
      var py = Math.round(point.y);
      eq1Line.setAttribute("x1", String(px));
      eq1Line.setAttribute("y1", String(py));
      eq1Line.setAttribute("x2", String(px));
      eq1Line.setAttribute("y2", "332");
      eq1Line.setAttribute("stroke", colour);
      eq1Line.setAttribute("opacity", String(opacity));
      eq1Dot.setAttribute("cx", String(px));
      eq1Dot.setAttribute("cy", String(py));
      eq1Dot.setAttribute("fill", colour);
      eq1Dot.setAttribute("opacity", String(opacity));
      var spot = clearLabelX(px);
      y1Label.setAttribute("x", String(Math.round(spot.x)));
      y1Label.setAttribute("y", String(spot.y));
      y1Label.setAttribute("fill", colour);
      y1Label.setAttribute("opacity", String(opacity));
      placePrice(p1Line, p1Label, clearPriceY(py), px, opacity, colour);
    }

    function placeShift(dx, opacity) {
      var x1 = AD.x1 + dx;
      var x2 = AD.x2 + dx;
      var colour = dx < 0 ? "#9f1239" : "#166534";
      ad1Line.setAttribute("x1", String(x1));
      ad1Line.setAttribute("y1", String(AD.y1));
      ad1Line.setAttribute("x2", String(x2));
      ad1Line.setAttribute("y2", String(AD.y2));
      ad1Line.setAttribute("stroke", colour);
      ad1Line.setAttribute("opacity", String(opacity));
      putCurveLabel(ad1Label, x1, AD.y1, x2, AD.y2);
      ad1Label.setAttribute("fill", colour);
      ad1Label.setAttribute("opacity", String(opacity));
      var y = (AD.y1 + AD.y2) / 2;
      var xStart = (AD.x1 + AD.x2) / 2;
      var xEnd = xStart + dx;
      arrowLine.setAttribute("x1", String(xStart));
      arrowLine.setAttribute("y1", String(y));
      arrowLine.setAttribute("x2", String(xEnd));
      arrowLine.setAttribute("y2", String(y));
      arrowLine.setAttribute("stroke", colour);
      arrowLine.setAttribute("opacity", String(opacity));
      var head = dx < 0
        ? (xEnd + "," + y + " " + (xEnd + 12) + "," + (y - 6) + " " + (xEnd + 12) + "," + (y + 6))
        : (xEnd + "," + y + " " + (xEnd - 12) + "," + (y - 6) + " " + (xEnd - 12) + "," + (y + 6));
      arrowHead.setAttribute("points", head);
      arrowHead.setAttribute("fill", colour);
      arrowHead.setAttribute("opacity", String(opacity));
      placeNewEquilibrium(dx, opacity, colour);
    }

    function animateShift(dir) {
      var amount = 58;
      var target = dir === "left" ? -amount : amount;
      var frameId = ++shiftFrame;
      var start = performance.now();
      var duration = 520;
      function frame(now) {
        if (frameId !== shiftFrame) return;
        var t = Math.min(1, (now - start) / duration);
        var eased = 1 - Math.pow(1 - t, 3);
        placeShift(target * eased, 0.25 + 0.75 * eased);
        if (t < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    function shuffle(list) {
      var copy = list.slice();
      for (var i = copy.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = copy[i];
        copy[i] = copy[j];
        copy[j] = t;
      }
      return copy;
    }

    function buildRound() {
      var pool = [];
      CATEGORIES.forEach(function (cat) {
        cat.scenarios.forEach(function (s) {
          pool.push({ scenario: s, label: cat.label });
        });
      });
      return shuffle(pool).slice(0, QUIZ_LENGTH);
    }

    function itemsFor(ids) {
      var list = [];
      CATEGORIES.forEach(function (cat) {
        if (ids.indexOf(cat.id) === -1) return;
        cat.scenarios.forEach(function (s) {
          list.push({ scenario: s, label: cat.label });
        });
      });
      return list;
    }

    function takeBalanced(pool, n) {
      var left = shuffle(pool.filter(function (item) { return item.scenario.shift === "left"; }));
      var right = shuffle(pool.filter(function (item) { return item.scenario.shift === "right"; }));
      var picked = [];
      var useRight = true;
      while (picked.length < n && (left.length || right.length)) {
        var source = useRight && right.length ? right : left.length ? left : right;
        if (!source.length) break;
        picked.push(source.pop());
        useRight = !useRight;
      }
      return picked;
    }

    function buildComponentRound() {
      var groups = [
        ["consumption"],
        ["investment"],
        ["government"],
        ["exports", "exchange"]
      ];
      var counts = [3, 3, 2, 2];
      var round = [];
      shuffle(groups).forEach(function (ids, i) {
        takeBalanced(itemsFor(ids), counts[i]).forEach(function (item) {
          round.push(item);
        });
      });
      return shuffle(round);
    }

    var SRAS = { x1: 210, y1: 310, x2: 580, y2: 72 };
    var LRAS_X = 400;
    var NORMAL_AD = { x1: 168, y1: 78, x2: 500, y2: 292 };
    var GAPS = {
      lras: {
        label: "On LRAS",
        x: 400,
        note: "AD meets SRAS on LRAS. The economy starts at full-employment output Yfe. There is no output gap. Decide whether AD shifts left or right."
      },
      positive: {
        label: "Positive output gap",
        x: 455,
        note: "AD meets SRAS to the right of LRAS. The economy starts with a positive output gap: real output Y is above Yfe. Decide whether AD shifts left or right."
      },
      negative: {
        label: "Negative output gap",
        x: 345,
        note: "AD meets SRAS to the left of LRAS. The economy starts with a negative output gap: real output Y is below Yfe. Decide whether AD shifts left or right."
      }
    };

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

    function labelAtCurveEnd(x1, y1, x2, y2) {
      if (y1 > 78 && x1 > 100) {
        return { x: Math.round(x1 + 8), y: Math.round(y1 - 10) };
      }
      var dx = x2 - x1;
      var dy = y2 - y1;
      var len = Math.sqrt(dx * dx + dy * dy) || 1;
      var ux = dx / len;
      var uy = dy / len;
      var px = uy;
      var py = -ux;
      if (py > 0) {
        px = -px;
        py = -py;
      }
      return {
        x: Math.round(x2 + ux * 10 + px * 2),
        y: Math.round(y2 + uy * 2 + py * 18)
      };
    }

    function putCurveLabel(el, x1, y1, x2, y2) {
      var spot = labelAtCurveEnd(x1, y1, x2, y2);
      el.setAttribute("text-anchor", "start");
      el.setAttribute("x", String(spot.x));
      el.setAttribute("y", String(spot.y));
    }

    function setShown(id, on) {
      var el = byId(id);
      if (el) el.setAttribute("opacity", on ? "1" : "0");
    }

    function placeAdLine(line) {
      AD.x1 = line.x1;
      AD.y1 = line.y1;
      AD.x2 = line.x2;
      AD.y2 = line.y2;
      var adLine = byId("ad-line");
      adLine.setAttribute("x1", String(line.x1));
      adLine.setAttribute("y1", String(line.y1));
      adLine.setAttribute("x2", String(line.x2));
      adLine.setAttribute("y2", String(line.y2));
      adLine.setAttribute("opacity", "1");
      var label = byId("ad-label");
      label.setAttribute("opacity", "1");
      putCurveLabel(label, line.x1, line.y1, line.x2, line.y2);
    }

    function layoutClassical(gapId) {
      var gap = GAPS[gapId];
      var yEq = Math.round(srasY(gap.x));
      var ad = adThrough(gap.x, yEq);
      ["lras-line", "lras-label", "yfe-label", "sras-line", "sras-label", "eq-dot"].forEach(function (id) {
        setShown(id, true);
      });
      var onLras = gapId === "lras";
      setShown("eq-line", !onLras);
      setShown("y-label", !onLras);
      var eqLine = byId("eq-line");
      eqLine.setAttribute("x1", String(gap.x));
      eqLine.setAttribute("y1", String(yEq));
      eqLine.setAttribute("x2", String(gap.x));
      eqLine.setAttribute("y2", "332");
      var dot = byId("eq-dot");
      dot.setAttribute("cx", String(gap.x));
      dot.setAttribute("cy", String(yEq));
      var yLabel = byId("y-label");
      yLabel.setAttribute("x", String(gap.x - 8));
      yLabel.setAttribute("y", "350");
      var yfe = byId("yfe-label");
      yfe.setAttribute("x", String(LRAS_X - 16));
      yfe.setAttribute("y", "350");
      var lrasLabel = byId("lras-label");
      lrasLabel.setAttribute("text-anchor", "middle");
      lrasLabel.setAttribute("x", String(LRAS_X));
      lrasLabel.setAttribute("y", "48");
      var xLabel = byId("x-label");
      xLabel.setAttribute("x", "96");
      xLabel.setAttribute("y", "376");
      placePrice(pLine, pLabel, yEq, gap.x, 1, "#9a3412");
      if (pLine) pLine.setAttribute("stroke", "#5c5348");
      placeAdLine(ad);
    }

    function assignNamed(round, key, order) {
      var bag = [];
      while (bag.length < round.length) bag = bag.concat(shuffle(order));
      round.forEach(function (item, i) { item[key] = bag[i]; });
    }

    function assignGaps(round) {
      assignNamed(round, "gap", ["lras", "positive", "negative"]);
    }

    function assignDiagrams(round) {
      round.forEach(function (item) { item.mode = "classical"; });
      assignGaps(round);
    }

    function showScenario() {
      var item = state.round[state.index];
      var s = item.scenario;
      state.scenario = s;
      state.answered = false;
      state.mode = item.mode;
      state.label = item.label;
      hideShift();
      layoutClassical(item.gap);
      var point = GAPS[item.gap];
      var modeLabel = "Classical response";
      var chartWrap = byId("play-chart");
      var shiftRow = byId("shift-row");
      if (chartWrap) chartWrap.hidden = false;
      if (shiftRow) shiftRow.hidden = false;
      scenarioEl.innerHTML =
        '<p class="q-count">Question ' + (state.index + 1) + " of " + QUIZ_LENGTH + "</p>" +
        '<p class="cat-title">' + (modeLabel ? modeLabel + " · " : "") + item.label + "</p>" +
        "<p>" + s.text + "</p>" +
        '<p class="ask">What happens to the aggregate demand curve?</p>';
      titleEl.textContent = point ? modeLabel + " — " + point.label : "Aggregate demand";
      noteEl.textContent = point
        ? point.note
        : "AD is aggregate demand before the change. Decide whether AD1 should sit to the left or the right. A change in the price level would be a movement along AD, not a shift.";
      feedbackEl.className = "feedback";
      feedbackEl.innerHTML = "";
      hideResponse();
      btnLeft.disabled = false;
      btnRight.disabled = false;
      btnLeft.className = "";
      btnRight.className = "";
      btnNext.disabled = true;
      btnNext.textContent = "Next question";
      if (btnSave) btnSave.disabled = false;
      byId("chart").setAttribute("aria-label", (point ? point.label + ". " : "") + "Aggregate demand curve before the change. Category: " + item.label + ".");
    }

    function startRound() {
      ensureClock();
      state.round = buildComponentRound();
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
      var name = "aggregate-demand-classical-" + point + "-q" + (state.index + 1);
      if (state.answered && state.scenario && state.scenario.shift) name += "-shift-" + state.scenario.shift;
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
        ? "Correct. The aggregate demand curve shifts " + shiftWord(s.shift) + ". That is " + demandWord(s.shift) + "."
        : "Not this time. You chose a shift " + shiftWord(choice) + ". The aggregate demand curve shifts " + shiftWord(s.shift) + ", which is " + demandWord(s.shift) + ".";
      feedbackEl.className = "feedback " + (hit ? "ok" : "bad");
      feedbackEl.innerHTML = "<p><strong>" + lead + "</strong></p><p>" + s.why + "</p>";
      feedbackEl.innerHTML += "<p>In the classical model, flexible wages and prices pull real output back to Yfe. The lasting effect of this shift is a change in the price level.</p>";
      if (finished) {
        stopClock();
        feedbackEl.innerHTML += "<p>Set complete. " + state.correct + " correct out of " + state.attempts + " attempts. " + beatLine() + "</p>";
        renderClock();
      }
      noteEl.textContent = "AD1 is aggregate demand after the change. The dotted lines mark the new equilibrium price level P1 and output Y1. A shift left is a decrease in aggregate demand. A shift right is an increase in aggregate demand.";
      byId("chart").setAttribute(
        "aria-label",
        "Aggregate demand shifts " + shiftWord(s.shift) + ", " + demandWord(s.shift) + "."
      );
      renderScore();
      renderLog();
    }

    function hideResponse() {
      if (!responseEl) return;
      responseEl.hidden = true;
      responseChart.innerHTML = "";
      responseNote.textContent = "";
    }

    function svgText(x, y, content, fill, size, weight, anchor) {
      return '<text x="' + x + '" y="' + y + '"' +
        (anchor ? ' text-anchor="' + anchor + '"' : "") +
        ' fill="' + fill + '" font-size="' + (size || 15) + '"' +
        (weight ? ' font-weight="' + weight + '"' : "") +
        ' font-family="' + (weight ? DISPLAY : FONT) + '">' + content + "</text>";
    }

    function axesMarkup() {
      return [
        '<line x1="78" y1="36" x2="78" y2="332" stroke="#1c1915" stroke-width="2" />',
        '<polygon points="78,28 73,42 83,42" fill="#1c1915" />',
        '<line x1="78" y1="332" x2="620" y2="332" stroke="#1c1915" stroke-width="2" />',
        '<polygon points="632,332 618,327 618,337" fill="#1c1915" />',
        svgText(88, 40, "Price level", "#5c5348", 15),
        svgText(250, 356, "Real national output", "#5c5348", 15)
      ].join("");
    }

    function adSegment(xEq, yEq) {
      var slope = 0.72;
      var x1 = 190;
      var x2 = 600;
      var y1 = yEq - (xEq - x1) * slope;
      var y2 = yEq + (x2 - xEq) * slope;
      if (y1 < 52) {
        x1 = xEq - (yEq - 52) / slope;
        y1 = 52;
      }
      if (y2 > 316) {
        x2 = xEq + (316 - yEq) / slope;
        y2 = 316;
      }
      return { x1: Math.round(x1), y1: Math.round(y1), x2: Math.round(x2), y2: Math.round(y2) };
    }

    function drawClassical(shift) {
      var up = shift === "right";
      var lras = 470;
      var yP = up ? 228 : 150;
      var yP1 = up ? 142 : 236;
      var ad = adSegment(lras, yP);
      var ad1 = adSegment(lras, yP1);
      var ad1Colour = up ? "#166534" : "#9f1239";
      var arrowY1 = up ? yP - 8 : yP + 8;
      var arrowY2 = up ? yP1 + 10 : yP1 - 10;
      var head = up
        ? (118 + "," + arrowY2 + " " + (118 - 6) + "," + (arrowY2 + 12) + " " + (118 + 6) + "," + (arrowY2 + 12))
        : (118 + "," + arrowY2 + " " + (118 - 6) + "," + (arrowY2 - 12) + " " + (118 + 6) + "," + (arrowY2 - 12));
      var adSpot = labelAtCurveEnd(ad.x1, ad.y1, ad.x2, ad.y2);
      var ad1Spot = labelAtCurveEnd(ad1.x1, ad1.y1, ad1.x2, ad1.y2);
      responseTitle.textContent = "Classical response";
      responseChart.innerHTML = [
        axesMarkup(),
        '<line x1="' + lras + '" y1="58" x2="' + lras + '" y2="332" stroke="#1c1915" stroke-width="3" />',
        svgText(lras, 48, "LRAS", "#1c1915", 18, "700", "middle"),
        svgText(lras - 16, 350, "Yfe", "#1c1915", 16, "700"),
        '<line x1="78" y1="' + yP + '" x2="' + lras + '" y2="' + yP + '" stroke="#5c5348" stroke-width="1.5" stroke-dasharray="5 4" />',
        '<line x1="78" y1="' + yP1 + '" x2="' + lras + '" y2="' + yP1 + '" stroke="#5c5348" stroke-width="1.5" stroke-dasharray="5 4" />',
        svgText(86, yP - 6, "P", "#5c5348", 16, "700"),
        svgText(86, yP1 - 6, "P1", "#5c5348", 16, "700"),
        '<line x1="' + ad.x1 + '" y1="' + ad.y1 + '" x2="' + ad.x2 + '" y2="' + ad.y2 + '" stroke="#9a3412" stroke-width="3" />',
        svgText(adSpot.x, adSpot.y, "AD", "#9a3412", 18, "700"),
        '<line x1="' + ad1.x1 + '" y1="' + ad1.y1 + '" x2="' + ad1.x2 + '" y2="' + ad1.y2 + '" stroke="' + ad1Colour + '" stroke-width="3" />',
        svgText(ad1Spot.x, ad1Spot.y, "AD1", ad1Colour, 18, "700"),
        '<circle cx="' + lras + '" cy="' + yP + '" r="4.5" fill="#9a3412" />',
        '<circle cx="' + lras + '" cy="' + yP1 + '" r="4.5" fill="' + ad1Colour + '" />',
        '<line x1="118" y1="' + arrowY1 + '" x2="118" y2="' + arrowY2 + '" stroke="#1c1915" stroke-width="2" />',
        '<polygon points="' + head + '" fill="#1c1915" />'
      ].join("");
      responseNote.textContent = up
        ? "LRAS is vertical at full-employment output Yfe. AD shifts right and the price level rises from P to P1. Real output stays at Yfe."
        : "LRAS is vertical at full-employment output Yfe. AD shifts left and the price level falls from P to P1. Real output stays at Yfe.";
      responseChart.setAttribute("aria-label", responseNote.textContent);
    }

    function showResponse() {
      if (!responseEl || !state.answered || !state.scenario) return;
      responseEl.hidden = false;
      drawClassical(state.scenario.shift);
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
