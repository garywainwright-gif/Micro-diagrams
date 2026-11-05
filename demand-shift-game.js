window.DemandShiftGame = {
  markup: function () { return "\u003cdiv class=\"head\"\u003e\u003cdiv\u003e\u003ch3\u003eDemand curve shifts\u003c/h3\u003e\u003cp\u003eGet ready — your demand‑and‑supply reflexes are about to be tested. A decrease in demand pushes the curve left. An increase sends it right. Simple… until the clock starts. You’ll face ten randomly selected questions, each tagged with its category so you know exactly what you’re up against. For every correct decision, you earn 1 point — and your score updates as you play, letting you see instantly how well you’re doing. Your mission: rack up as many points as possible before time runs out. You’ve got two minutes. The clock is ticking. Beat it — or watch your score freeze at zero.\u003c/p\u003e\u003c/div\u003e\u003cdiv class=\"scorebox\" aria-live=\"polite\"\u003e\u003cp class=\"score-main\"\u003e\u003cspan id=\"score-points\"\u003e0\u003c/span\u003e / \u003cspan id=\"score-attempts\"\u003e0\u003c/span\u003e\u003c/p\u003e\u003cp class=\"score-sub\" id=\"score-sub\"\u003ecorrect out of attempts\u003c/p\u003e\u003c/div\u003e\u003c/div\u003e\n\u003cdiv class=\"scenario\" id=\"scenario\"\u003e\r\n        \u003cp\u003eTen questions are being prepared.\u003c/p\u003e\r\n      \u003c/div\u003e\r\n      \u003cdiv class=\"chart-wrap\"\u003e\r\n        \u003cp class=\"chart-title\" id=\"chart-title\"\u003eDemand\u003c/p\u003e\r\n        \u003csvg class=\"chart\" id=\"chart\" viewBox=\"0 0 680 400\" role=\"img\" aria-labelledby=\"chart-title chart-note\"\u003e\r\n          \u003cline x1=\"78\" y1=\"36\" x2=\"78\" y2=\"332\" stroke=\"#1c1915\" stroke-width=\"2\" /\u003e\r\n          \u003cpolygon points=\"78,28 73,42 83,42\" fill=\"#1c1915\" /\u003e\r\n          \u003cline x1=\"78\" y1=\"332\" x2=\"620\" y2=\"332\" stroke=\"#1c1915\" stroke-width=\"2\" /\u003e\r\n          \u003cpolygon points=\"632,332 618,327 618,337\" fill=\"#1c1915\" /\u003e\r\n          \u003ctext x=\"88\" y=\"40\" fill=\"#5c5348\" font-size=\"15\" font-family=\"Financier Text, Georgia, Palatino Linotype, Palatino, serif\"\u003ePrice\u003c/text\u003e\r\n          \u003ctext x=\"548\" y=\"356\" fill=\"#5c5348\" font-size=\"15\" font-family=\"Financier Text, Georgia, Palatino Linotype, Palatino, serif\"\u003eQuantity\u003c/text\u003e\r\n          \u003cline id=\"d-line\" x1=\"168\" y1=\"78\" x2=\"500\" y2=\"292\" stroke=\"#9a3412\" stroke-width=\"3\" /\u003e\r\n          \u003ctext id=\"d-label\" x=\"150\" y=\"72\" fill=\"#9a3412\" font-size=\"18\" font-weight=\"700\" font-family=\"Financier Display, Georgia, Palatino Linotype, Palatino, serif\"\u003eD\u003c/text\u003e\r\n          \u003cline id=\"d1-line\" x1=\"168\" y1=\"78\" x2=\"500\" y2=\"292\" stroke=\"#166534\" stroke-width=\"3\" opacity=\"0\" /\u003e\r\n          \u003ctext id=\"d1-label\" x=\"150\" y=\"72\" fill=\"#166534\" font-size=\"18\" font-weight=\"700\" font-family=\"Financier Display, Georgia, Palatino Linotype, Palatino, serif\" opacity=\"0\"\u003eD1\u003c/text\u003e\r\n          \u003cline id=\"arrow-line\" stroke=\"#1c1915\" stroke-width=\"2.5\" opacity=\"0\" /\u003e\r\n          \u003cpolygon id=\"arrow-head\" fill=\"#1c1915\" opacity=\"0\" /\u003e\r\n        \u003c/svg\u003e\r\n        \u003cp class=\"chart-note\" id=\"chart-note\"\u003eD is demand before the change. A shift left is a decrease in demand. A shift right is an increase in demand. The price of this good has not changed, so this is a shift of the curve, not a movement along it.\u003c/p\u003e\r\n      \u003c/div\u003e\r\n      \u003cdiv class=\"shift-row\" id=\"shift-row\"\u003e\r\n        \u003cbutton type=\"button\" id=\"btn-left\" data-shift=\"left\" disabled\u003eDecrease in demand — shift left\u003c/button\u003e\r\n        \u003cbutton type=\"button\" id=\"btn-right\" data-shift=\"right\" disabled\u003eIncrease in demand — shift right\u003c/button\u003e\r\n      \u003c/div\u003e\r\n      \u003cdiv class=\"feedback\" id=\"feedback\" aria-live=\"polite\"\u003e\u003c/div\u003e\r\n      \u003cdiv class=\"tools\"\u003e\r\n        \u003cbutton type=\"button\" id=\"btn-next\" disabled\u003eNext question\u003c/button\u003e\r\n        \u003cbutton type=\"button\" class=\"ghost\" id=\"btn-save\" disabled\u003eSave diagram\u003c/button\u003e\r\n        \u003cbutton type=\"button\" class=\"ghost\" id=\"btn-reset\"\u003eReset score\u003c/button\u003e\r\n      \u003c/div\u003e\r\n      \u003col class=\"log\" id=\"log\" hidden\u003e\u003c/ol\u003e"; },
  mount: function (root, opts) {
    if (!root) return;
    if ((opts && opts.embedded) || !root.querySelector("#btn-left")) root.innerHTML = window.DemandShiftGame.markup();
    window.DemandShiftGame.bind(root);
  },
  bind: function (root) {
    function byId(id) { return root.querySelector("#" + id); }
var D = { x1: 168, y1: 78, x2: 500, y2: 292 };
      var SHIFT = 78;
      var CATEGORIES = [
        {
          id: "normal",
          label: "Normal goods",
          scenarios: [
            {
              id: "n1",
              good: "restaurant meals",
              shift: "right",
              text: "Household incomes rise.",
              why: "Restaurant meals are a normal good. Higher income increases demand for a normal good, so buyers want more restaurant meals at each price and the demand curve shifts right."
            },
            {
              id: "n2",
              good: "foreign holidays",
              shift: "left",
              text: "Household incomes fall.",
              why: "Foreign holidays are a normal good. Lower income decreases demand for a normal good, so buyers want fewer foreign holidays at each price and the demand curve shifts left."
            },
            {
              id: "n3",
              good: "new cars",
              shift: "right",
              text: "Incomes increase across the economy.",
              why: "New cars are a normal good. Demand for a normal good moves with income, so higher income shifts the demand curve for new cars to the right."
            },
            {
              id: "n4",
              good: "branded sportswear",
              shift: "left",
              text: "A recession cuts household incomes.",
              why: "Branded sportswear is a normal good. Lower income decreases demand for a normal good, so the demand curve for branded sportswear shifts left."
            }
          ]
        },
        {
          id: "inferior",
          label: "Inferior goods",
          scenarios: [
            {
              id: "i1",
              good: "bus travel",
              shift: "left",
              text: "Household incomes rise.",
              why: "Bus travel is an inferior good. When income rises, demand for an inferior good falls, so people switch away from bus travel and its demand curve shifts left."
            },
            {
              id: "i2",
              good: "value-range supermarket meals",
              shift: "right",
              text: "Household incomes fall.",
              why: "Value-range supermarket meals are an inferior good. When income falls, demand for an inferior good rises, so buyers want more value-range meals at each price and the demand curve shifts right."
            },
            {
              id: "i3",
              good: "instant noodles",
              shift: "left",
              text: "Incomes rise.",
              why: "Instant noodles are an inferior good. Higher income decreases demand for an inferior good, so the demand curve for instant noodles shifts left."
            },
            {
              id: "i4",
              good: "second-hand phones",
              shift: "right",
              text: "Incomes fall.",
              why: "Second-hand phones are an inferior good. Lower income increases demand for an inferior good, so the demand curve for second-hand phones shifts right."
            }
          ]
        },
        {
          id: "substitutes",
          label: "Substitutes",
          scenarios: [
            {
              id: "s1",
              good: "coffee",
              shift: "right",
              text: "The price of tea rises.",
              why: "Coffee is a substitute for tea. Tea is now dearer, so some buyers switch to coffee. Demand for coffee increases and the demand curve shifts right."
            },
            {
              id: "s2",
              good: "margarine",
              shift: "left",
              text: "The price of butter falls.",
              why: "Margarine is a substitute for butter. Butter is now cheaper, so some buyers switch away from margarine. Demand for margarine decreases and the demand curve shifts left."
            },
            {
              id: "s3",
              good: "Xbox consoles",
              shift: "right",
              text: "The price of a PlayStation rises.",
              why: "An Xbox is a substitute for a PlayStation. A dearer substitute increases demand for this good, so the demand curve for Xbox consoles shifts right."
            },
            {
              id: "s4",
              good: "chicken",
              shift: "left",
              text: "The price of beef falls.",
              why: "Chicken is a substitute for beef. A cheaper substitute decreases demand for this good, so the demand curve for chicken shifts left."
            }
          ]
        },
        {
          id: "complements",
          label: "Complements",
          scenarios: [
            {
              id: "c1",
              good: "cars",
              shift: "left",
              text: "The price of petrol rises.",
              why: "Petrol and cars are complements. A dearer complement makes the pair less attractive, so demand for cars decreases and the demand curve shifts left."
            },
            {
              id: "c2",
              good: "video games",
              shift: "right",
              text: "The price of games consoles falls.",
              why: "Consoles and video games are complements. A cheaper complement increases demand for the good used with it, so the demand curve for video games shifts right."
            },
            {
              id: "c3",
              good: "ink cartridges",
              shift: "left",
              text: "The price of printers rises.",
              why: "Printers and ink cartridges are complements. Fewer printers are bought when printers cost more, so demand for ink cartridges falls and the demand curve shifts left."
            },
            {
              id: "c4",
              good: "phone cases",
              shift: "right",
              text: "The price of smartphones falls.",
              why: "Smartphones and phone cases are complements. Cheaper phones mean more phones are bought, so demand for cases rises and the demand curve for phone cases shifts right."
            }
          ]
        },
        {
          id: "new-subs",
          label: "New product",
          scenarios: [
            {
              id: "ns1",
              good: "cinema tickets",
              shift: "left",
              text: "A new streaming service is introduced.",
              why: "The new streaming service is a close substitute for a trip to the cinema. A new substitute decreases demand for cinema tickets, so the demand curve shifts left."
            },
            {
              id: "ns2",
              good: "dairy milk",
              shift: "left",
              text: "A new oat milk is introduced.",
              why: "Oat milk is a substitute for dairy milk. Introducing a substitute decreases demand for the existing product, so the demand curve for dairy milk shifts left."
            },
            {
              id: "ns3",
              good: "the existing airline",
              shift: "left",
              text: "A new budget airline is introduced on the same route.",
              why: "The new airline is a substitute for the existing airline. Some passengers switch, so demand decreases and the demand curve shifts left."
            },
            {
              id: "ns4",
              good: "beef burgers",
              shift: "left",
              text: "A new plant-based burger is introduced.",
              why: "The plant-based burger is a substitute for beef burgers. A newly introduced substitute decreases demand for the original good, so the demand curve shifts left."
            }
          ]
        },
        {
          id: "derived",
          label: "Derived demand",
          scenarios: [
            {
              id: "d1",
              good: "bricks",
              shift: "right",
              text: "Demand for new houses increases.",
              why: "This is derived demand. Bricks are a resource used to build houses. More houses means builders want more bricks at each price, so the demand curve for bricks shifts right."
            },
            {
              id: "d2",
              good: "steel",
              shift: "left",
              text: "Demand for cars falls.",
              why: "This is derived demand. Steel is a common resource used to make cars. Fewer cars means less demand for steel, so the demand curve for steel shifts left."
            },
            {
              id: "d3",
              good: "lithium",
              shift: "right",
              text: "Demand for smartphones increases.",
              why: "This is derived demand. Lithium is a common resource used in smartphone batteries. Higher demand for smartphones raises demand for lithium, so the demand curve shifts right."
            },
            {
              id: "d4",
              good: "timber",
              shift: "left",
              text: "Demand for wooden furniture falls.",
              why: "This is derived demand. Timber is a common resource used to make wooden furniture. Lower demand for furniture lowers demand for timber, so the demand curve shifts left."
            }
          ]
        },
        {
          id: "composite",
          label: "Composite demand",
          scenarios: [
            {
              id: "p1",
              good: "crude oil",
              shift: "right",
              text: "Demand for fuel rises.",
              why: "This is composite demand. Crude oil is used as fuel and to make plastics. Higher demand for fuel increases demand for oil, so the demand curve for crude oil shifts right.",
              extra: "More oil is drawn into fuel, so less oil is supplied to plastics makers. The supply curve for plastics shifts left."
            },
            {
              id: "p2",
              good: "crude oil",
              shift: "left",
              text: "Demand for fuel falls.",
              why: "This is composite demand. Crude oil is used as fuel and to make plastics. Lower demand for fuel reduces demand for oil, so the demand curve for crude oil shifts left.",
              extra: "Less oil is needed as fuel, so more oil is available for plastics. The supply curve for plastics shifts right."
            },
            {
              id: "p3",
              good: "crude oil",
              shift: "right",
              text: "Demand for plastics rises.",
              why: "This is composite demand. Crude oil is used as fuel and to make plastics. Higher demand for plastics increases demand for oil, so the demand curve for crude oil shifts right.",
              extra: "More oil goes into plastics, so less is supplied as fuel. The supply curve for fuel shifts left."
            },
            {
              id: "p4",
              good: "crude oil",
              shift: "left",
              text: "Demand for plastics falls.",
              why: "This is composite demand. Crude oil is used as fuel and to make plastics. Lower demand for plastics reduces demand for oil, so the demand curve for crude oil shifts left.",
              extra: "Less oil is used for plastics, so more can be supplied as fuel. The supply curve for fuel shifts right."
            }
          ]
        }
      ];

      var QUIZ_LENGTH = 10;
      var BEST_KEY = "demand-shift-best-left";
      var state = {
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
      var d1Line = byId("d1-line");
      var d1Label = byId("d1-label");
      var arrowLine = byId("arrow-line");
      var arrowHead = byId("arrow-head");

      function shiftWord(shift) {
        return shift === "left" ? "left" : "right";
      }

      function demandWord(shift) {
        return shift === "left" ? "a decrease in demand" : "an increase in demand";
      }

      function ensureClock() {
        if (byId("clock")) return;
        var score = root.querySelector(".scorebox");
        if (!score || !score.parentNode) return;
        var box = document.createElement("div");
        box.className = "scorebox clockbox";
        box.innerHTML = "<p class=\"score-main\" id=\"clock\" role=\"timer\" aria-label=\"Time left to beat the clock\" data-seconds=\"120\">2:00</p><p class=\"score-sub\" id=\"clock-sub\">Beat the clock</p>";
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
        try { return Number(localStorage.getItem(BEST_KEY)) || 0; } catch (err) { return 0; }
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
          try { localStorage.setItem(BEST_KEY, String(clockLeft)); } catch (err) {}
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
          li.appendChild(document.createTextNode(" — " + item.good + ": you chose " + item.chose + ", the curve shifts " + item.answer + "."));
          logEl.appendChild(li);
        });
      }

      function hideShift() {
        d1Line.setAttribute("opacity", "0");
        d1Label.setAttribute("opacity", "0");
        arrowLine.setAttribute("opacity", "0");
        arrowHead.setAttribute("opacity", "0");
        d1Line.setAttribute("x1", String(D.x1));
        d1Line.setAttribute("y1", String(D.y1));
        d1Line.setAttribute("x2", String(D.x2));
        d1Line.setAttribute("y2", String(D.y2));
      }

      function placeShift(dx, opacity) {
        var x1 = D.x1 + dx;
        var x2 = D.x2 + dx;
        var colour = dx < 0 ? "#9f1239" : "#166534";
        d1Line.setAttribute("x1", String(x1));
        d1Line.setAttribute("y1", String(D.y1));
        d1Line.setAttribute("x2", String(x2));
        d1Line.setAttribute("y2", String(D.y2));
        d1Line.setAttribute("stroke", colour);
        d1Line.setAttribute("opacity", String(opacity));
        d1Label.setAttribute("x", String(x1 - 18));
        d1Label.setAttribute("y", "72");
        d1Label.setAttribute("fill", colour);
        d1Label.setAttribute("opacity", String(opacity));
        var y = (D.y1 + D.y2) / 2;
        var xStart = (D.x1 + D.x2) / 2;
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
      }

      function animateShift(dir) {
        var target = dir === "left" ? -SHIFT : SHIFT;
        var start = performance.now();
        var duration = 520;
        function frame(now) {
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

      function showScenario() {
        var item = state.round[state.index];
        var s = item.scenario;
        state.scenario = s;
        state.answered = false;
        hideShift();
        scenarioEl.innerHTML =
          "<p class=\"q-count\">Question " + (state.index + 1) + " of " + QUIZ_LENGTH + "</p>" +
          "<p class=\"cat-title\">" + item.label + "</p>" +
          "<p class=\"fact\">" + s.text + "</p>" +
          "<p class=\"ask\">What happens to the demand curve for " + s.good + "?</p>";
        titleEl.textContent = "Demand for " + s.good;
        noteEl.textContent = "D is demand for " + s.good + " before the change. Decide whether D1 should sit to the left or the right.";
        feedbackEl.className = "feedback";
        feedbackEl.innerHTML = "";
        btnLeft.disabled = false;
        btnRight.disabled = false;
        btnLeft.className = "";
        btnRight.className = "";
        btnNext.disabled = true;
        btnNext.textContent = "Next question";
        if (btnSave) btnSave.disabled = false;
        byId("chart").setAttribute("aria-label", "Demand curve for " + s.good + " before the change. Category: " + item.label + ".");
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

      function answer(choice) {
        if (state.timeUp || state.answered || !state.scenario) return;
        state.answered = true;
        state.attempts += 1;
        var s = state.scenario;
        var hit = choice === s.shift;
        if (hit) state.correct += 1;
        state.log.unshift({
          good: s.good,
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
          ? "Correct. The demand curve shifts " + shiftWord(s.shift) + ". That is " + demandWord(s.shift) + "."
          : "Not this time. You chose a shift " + shiftWord(choice) + ". The demand curve shifts " + shiftWord(s.shift) + ", which is " + demandWord(s.shift) + ".";
        feedbackEl.className = "feedback " + (hit ? "ok" : "bad");
        feedbackEl.innerHTML = "<p><strong>" + lead + "</strong></p><p>" + s.why + "</p>";
        if (s.extra) feedbackEl.innerHTML += "<p>" + s.extra + "</p>";
        if (finished) {
          stopClock();
          feedbackEl.innerHTML += "<p>Set complete. " + state.correct + " correct out of " + state.attempts + " attempts. " + beatLine() + "</p>";
          renderClock();
        }
        noteEl.textContent = "D1 is the demand curve after the change. A shift left is a decrease in demand. A shift right is an increase in demand.";
        byId("chart").setAttribute(
          "aria-label",
          "Demand for " + s.good + " shifts " + shiftWord(s.shift) + ", " + demandWord(s.shift) + "."
        );
        renderScore();
        renderLog();
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
        var s = state.scenario;
        var good = s && s.good ? String(s.good).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : "good";
        var name = "demand-" + good + "-q" + (state.index + 1);
        if (state.answered && s) name += "-shift-" + s.shift;
        return name + ".png";
      }

      function saveDiagram() {
        var chart = byId("chart");
        if (!chart || !state.scenario) return;
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
      if (btnSave) btnSave.addEventListener("click", saveDiagram);
      byId("btn-reset").addEventListener("click", function () {
        startRound();
      });

      startRound();
  }
};