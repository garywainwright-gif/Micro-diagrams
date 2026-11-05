window.SupplyShiftGame = {
  markup: function () { return "\u003cdiv class=\"head\"\u003e\u003cdiv\u003e\u003ch3\u003eSupply curve shifts\u003c/h3\u003e\u003cp\u003eGet ready — your Supply reflexes are about to be tested. Predict the direction of movement of the supply curve in the diagram based on the scenario given. Your mission: rack up as many points as possible before time runs out. You’ve got two minutes. The clock is ticking. Beat it — or watch your score freeze at zero.\u003c/p\u003e\u003c/div\u003e\u003cdiv class=\"scorebox\" aria-live=\"polite\"\u003e\u003cp class=\"score-main\"\u003e\u003cspan id=\"score-points\"\u003e0\u003c/span\u003e / \u003cspan id=\"score-attempts\"\u003e0\u003c/span\u003e\u003c/p\u003e\u003cp class=\"score-sub\" id=\"score-sub\"\u003ecorrect out of attempts\u003c/p\u003e\u003c/div\u003e\u003c/div\u003e\n\u003cdiv class=\"scenario\" id=\"scenario\"\u003e\r\n        \u003cp\u003eTen questions are being prepared.\u003c/p\u003e\r\n      \u003c/div\u003e\r\n      \u003cdiv class=\"chart-wrap\"\u003e\r\n        \u003cp class=\"chart-title\" id=\"chart-title\"\u003eSupply\u003c/p\u003e\r\n        \u003csvg class=\"chart\" id=\"chart\" viewBox=\"0 0 680 400\" role=\"img\" aria-labelledby=\"chart-title chart-note\"\u003e\r\n          \u003cline x1=\"78\" y1=\"36\" x2=\"78\" y2=\"332\" stroke=\"#1c1915\" stroke-width=\"2\" /\u003e\r\n          \u003cpolygon points=\"78,28 73,42 83,42\" fill=\"#1c1915\" /\u003e\r\n          \u003cline x1=\"78\" y1=\"332\" x2=\"620\" y2=\"332\" stroke=\"#1c1915\" stroke-width=\"2\" /\u003e\r\n          \u003cpolygon points=\"632,332 618,327 618,337\" fill=\"#1c1915\" /\u003e\r\n          \u003ctext x=\"88\" y=\"40\" fill=\"#5c5348\" font-size=\"15\" font-family=\"Financier Text, Georgia, Palatino Linotype, Palatino, serif\"\u003ePrice\u003c/text\u003e\r\n          \u003ctext x=\"548\" y=\"356\" fill=\"#5c5348\" font-size=\"15\" font-family=\"Financier Text, Georgia, Palatino Linotype, Palatino, serif\"\u003eQuantity\u003c/text\u003e\r\n          \u003cline id=\"s-line\" x1=\"170\" y1=\"292\" x2=\"460\" y2=\"78\" stroke=\"#9a3412\" stroke-width=\"3\" /\u003e\r\n          \u003ctext id=\"s-label\" x=\"468\" y=\"74\" fill=\"#9a3412\" font-size=\"18\" font-weight=\"700\" font-family=\"Financier Display, Georgia, Palatino Linotype, Palatino, serif\"\u003eS\u003c/text\u003e\r\n          \u003cline id=\"s1-line\" x1=\"170\" y1=\"292\" x2=\"460\" y2=\"78\" stroke=\"#166534\" stroke-width=\"3\" opacity=\"0\" /\u003e\r\n          \u003ctext id=\"s1-label\" x=\"468\" y=\"74\" fill=\"#166534\" font-size=\"18\" font-weight=\"700\" font-family=\"Financier Display, Georgia, Palatino Linotype, Palatino, serif\" opacity=\"0\"\u003eS1\u003c/text\u003e\r\n          \u003cline id=\"arrow-line\" stroke=\"#1c1915\" stroke-width=\"2.5\" opacity=\"0\" /\u003e\r\n          \u003cpolygon id=\"arrow-head\" fill=\"#1c1915\" opacity=\"0\" /\u003e\r\n        \u003c/svg\u003e\r\n        \u003cp class=\"chart-note\" id=\"chart-note\"\u003eS slopes upwards. A shift left is a decrease in supply. A shift right is an increase in supply. The price of this good has not changed, so this is a shift of the curve, not a movement along it.\u003c/p\u003e\r\n      \u003c/div\u003e\r\n      \u003cdiv class=\"shift-row\"\u003e\r\n        \u003cbutton type=\"button\" id=\"btn-left\" disabled\u003eDecrease in supply — shift left\u003c/button\u003e\r\n        \u003cbutton type=\"button\" id=\"btn-right\" disabled\u003eIncrease in supply — shift right\u003c/button\u003e\r\n      \u003c/div\u003e\r\n      \u003cdiv class=\"feedback\" id=\"feedback\" aria-live=\"polite\"\u003e\u003c/div\u003e\r\n      \u003cdiv class=\"tools\"\u003e\r\n        \u003cbutton type=\"button\" id=\"btn-next\" disabled\u003eNext question\u003c/button\u003e\r\n        \u003cbutton type=\"button\" class=\"ghost\" id=\"btn-save\" disabled\u003eSave diagram\u003c/button\u003e\r\n        \u003cbutton type=\"button\" class=\"ghost\" id=\"btn-reset\"\u003eReset score\u003c/button\u003e\r\n      \u003c/div\u003e\r\n      \u003col class=\"log\" id=\"log\" hidden\u003e\u003c/ol\u003e"; },
  mount: function (root, opts) {
    if (!root) return;
    if ((opts && opts.embedded) || !root.querySelector("#btn-left")) root.innerHTML = window.SupplyShiftGame.markup();
    window.SupplyShiftGame.bind(root);
  },
  bind: function (root) {
    function byId(id) { return root.querySelector("#" + id); }
var S = { x1: 170, y1: 292, x2: 460, y2: 78 };
      var SHIFT = 72;
      var CATEGORIES = [
        {
          id: "costs",
          label: "Cost of production",
          scenarios: [
            {
              id: "c1",
              good: "cars",
              shift: "left",
              text: "The price of steel used to make cars rises.",
              why: "This is a rise in the cost of production. Higher costs mean firms supply fewer cars at each price, so the supply curve shifts left."
            },
            {
              id: "c2",
              good: "bread",
              shift: "right",
              text: "The energy prices paid by bakeries fall.",
              why: "This is a fall in the cost of production. Lower costs mean bakeries supply more bread at each price, so the supply curve shifts right."
            },
            {
              id: "c3",
              good: "clothes",
              shift: "left",
              text: "Wages paid to clothing workers rise.",
              why: "Labour is a cost of production. Higher wages raise costs, so the supply curve for clothes shifts left."
            },
            {
              id: "c4",
              good: "chocolate",
              shift: "right",
              text: "The cost of cocoa beans falls.",
              why: "Cocoa is a cost of production. A lower raw-material cost increases supply, so the supply curve for chocolate shifts right."
            }
          ]
        },
        {
          id: "technology",
          label: "Technology",
          scenarios: [
            {
              id: "t1",
              good: "cars",
              shift: "right",
              text: "Car makers introduce robots that assemble cars faster.",
              why: "This is an improvement in technology. Firms can produce more at each price, so the supply curve for cars shifts right."
            },
            {
              id: "t2",
              good: "bread",
              shift: "right",
              text: "A bakery installs ovens that produce more loaves from the same ingredients.",
              why: "Better technology raises output from the same inputs. The supply curve for bread shifts right."
            },
            {
              id: "t3",
              good: "wheat",
              shift: "left",
              text: "A farm’s irrigation system fails, so it returns to an older method that yields less wheat.",
              why: "The farm has lost the improved technology. Less can be produced at each price, so the supply curve for wheat shifts left."
            },
            {
              id: "t4",
              good: "packaged food",
              shift: "right",
              text: "A factory installs software that cuts waste in production.",
              why: "Improved technology lowers the resources needed per unit. The supply curve for packaged food shifts right."
            }
          ]
        },
        {
          id: "productivity",
          label: "Productivity",
          scenarios: [
            {
              id: "p1",
              good: "bicycles",
              shift: "right",
              text: "After training, workers produce more bicycles per hour.",
              why: "Higher productivity means more output from the same inputs. The supply curve for bicycles shifts right."
            },
            {
              id: "p2",
              good: "cars",
              shift: "left",
              text: "Output per worker in a car plant falls.",
              why: "Lower productivity means less output from the same inputs. The supply curve for cars shifts left."
            },
            {
              id: "p3",
              good: "wheat",
              shift: "right",
              text: "A farm harvests more wheat from each hectare.",
              why: "Higher productivity increases supply. The supply curve for wheat shifts right."
            },
            {
              id: "p4",
              good: "clothes",
              shift: "left",
              text: "Output per worker in a clothing factory falls.",
              why: "Lower productivity decreases supply. The supply curve for clothes shifts left."
            }
          ]
        },
        {
          id: "tax",
          label: "Indirect tax and subsidies",
          scenarios: [
            {
              id: "x1",
              good: "sugary drinks",
              shift: "left",
              text: "The government puts an indirect tax on sugary drinks.",
              why: "An indirect tax raises the cost of supplying the good. The supply curve for sugary drinks shifts left."
            },
            {
              id: "x2",
              good: "rail journeys",
              shift: "right",
              text: "The government pays a subsidy to rail companies.",
              why: "A subsidy lowers the cost of supplying the good. The supply curve for rail journeys shifts right."
            },
            {
              id: "x3",
              good: "flights",
              shift: "right",
              text: "The indirect tax on flights is cut.",
              why: "A lower indirect tax reduces the cost of supply. The supply curve for flights shifts right."
            },
            {
              id: "x4",
              good: "solar panels",
              shift: "left",
              text: "A subsidy paid to solar-panel makers is removed.",
              why: "Removing a subsidy raises the cost of supply. The supply curve for solar panels shifts left."
            }
          ]
        },
        {
          id: "other",
          label: "Price of other goods",
          scenarios: [
            {
              id: "o1",
              good: "wheat",
              shift: "left",
              text: "A farmer can grow wheat or barley. The price of barley rises.",
              why: "The firm can switch to the other good. Barley now pays more, so less wheat is supplied at each price and the supply curve for wheat shifts left."
            },
            {
              id: "o2",
              good: "trainers",
              shift: "right",
              text: "A factory can make trainers or boots. The price of boots falls.",
              why: "Boots are now less profitable, so the firm makes more trainers. The supply curve for trainers shifts right."
            },
            {
              id: "o3",
              good: "petrol",
              shift: "left",
              text: "A refinery can produce petrol or diesel. The price of diesel rises.",
              why: "Diesel now pays more, so the refinery supplies less petrol at each price. The supply curve for petrol shifts left."
            },
            {
              id: "o4",
              good: "potatoes",
              shift: "right",
              text: "A farmer can grow potatoes or carrots. The price of carrots falls.",
              why: "Carrots are now less profitable, so more land is used for potatoes. The supply curve for potatoes shifts right."
            }
          ]
        },
        {
          id: "firms",
          label: "Number of suppliers",
          scenarios: [
            {
              id: "n1",
              good: "coffee-shop drinks",
              shift: "right",
              text: "New firms enter the coffee-shop market.",
              why: "More suppliers increase market supply. The supply curve for coffee-shop drinks shifts right."
            },
            {
              id: "n2",
              good: "flights on the route",
              shift: "left",
              text: "Several airlines stop flying a route.",
              why: "Fewer suppliers decrease market supply. The supply curve for flights on the route shifts left."
            },
            {
              id: "n3",
              good: "strawberries",
              shift: "right",
              text: "More farmers start growing strawberries.",
              why: "A larger number of suppliers increases market supply. The supply curve for strawberries shifts right."
            },
            {
              id: "n4",
              good: "bread",
              shift: "left",
              text: "Bakeries close in a town.",
              why: "Fewer suppliers decrease market supply. The supply curve for bread shifts left."
            }
          ]
        },
        {
          id: "joint",
          label: "Joint supply",
          scenarios: [
            {
              id: "j1",
              good: "leather",
              shift: "right",
              text: "More cattle are slaughtered for beef.",
              why: "Beef and leather are in joint supply: producing more beef also produces more hides. The supply curve for leather shifts right."
            },
            {
              id: "j2",
              good: "leather",
              shift: "left",
              text: "Fewer cattle are slaughtered for beef.",
              why: "Beef and leather are in joint supply. Less beef means fewer hides, so the supply curve for leather shifts left."
            },
            {
              id: "j3",
              good: "wool",
              shift: "right",
              text: "More sheep are kept for meat.",
              why: "Meat and wool are in joint supply. More sheep mean more wool is supplied, so the supply curve for wool shifts right."
            },
            {
              id: "j4",
              good: "wool",
              shift: "left",
              text: "Fewer sheep are kept for meat.",
              why: "Meat and wool are in joint supply. Fewer sheep mean less wool is supplied, so the supply curve for wool shifts left."
            }
          ]
        },
        {
          id: "competitive",
          label: "Competitive supply",
          scenarios: [
            {
              id: "k1",
              good: "barley",
              shift: "left",
              text: "Farmers use more of their land to grow wheat.",
              why: "Wheat and barley are in competitive supply: they use the same land. More wheat means less barley can be supplied, so the supply curve for barley shifts left."
            },
            {
              id: "k2",
              good: "barley",
              shift: "right",
              text: "Farmers use less of their land to grow wheat.",
              why: "Wheat and barley are in competitive supply. Less land used for wheat leaves more for barley, so the supply curve for barley shifts right."
            },
            {
              id: "k3",
              good: "yoghurt",
              shift: "left",
              text: "Dairies turn more of their milk into cheese.",
              why: "Cheese and yoghurt are in competitive supply: they use the same milk. More cheese means less yoghurt can be supplied, so the supply curve for yoghurt shifts left."
            },
            {
              id: "k4",
              good: "yoghurt",
              shift: "right",
              text: "Dairies turn less of their milk into cheese.",
              why: "Cheese and yoghurt are in competitive supply. Less milk used for cheese leaves more for yoghurt, so the supply curve for yoghurt shifts right."
            }
          ]
        }
      ];

      var QUIZ_LENGTH = 10;
      var BEST_KEY = "supply-shift-best-left";
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
      var s1Line = byId("s1-line");
      var s1Label = byId("s1-label");
      var arrowLine = byId("arrow-line");
      var arrowHead = byId("arrow-head");

      function shiftWord(shift) {
        return shift === "left" ? "left" : "right";
      }

      function supplyWord(shift) {
        return shift === "left" ? "a decrease in supply" : "an increase in supply";
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
        s1Line.setAttribute("opacity", "0");
        s1Label.setAttribute("opacity", "0");
        arrowLine.setAttribute("opacity", "0");
        arrowHead.setAttribute("opacity", "0");
        s1Line.setAttribute("x1", String(S.x1));
        s1Line.setAttribute("y1", String(S.y1));
        s1Line.setAttribute("x2", String(S.x2));
        s1Line.setAttribute("y2", String(S.y2));
      }

      function placeShift(dx, opacity) {
        var x1 = S.x1 + dx;
        var x2 = S.x2 + dx;
        var colour = dx < 0 ? "#9f1239" : "#166534";
        s1Line.setAttribute("x1", String(x1));
        s1Line.setAttribute("y1", String(S.y1));
        s1Line.setAttribute("x2", String(x2));
        s1Line.setAttribute("y2", String(S.y2));
        s1Line.setAttribute("stroke", colour);
        s1Line.setAttribute("opacity", String(opacity));
        s1Label.setAttribute("x", String(x2 + 8));
        s1Label.setAttribute("y", "74");
        s1Label.setAttribute("fill", colour);
        s1Label.setAttribute("opacity", String(opacity));
        var y = (S.y1 + S.y2) / 2;
        var xStart = (S.x1 + S.x2) / 2;
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
          "<p>" + s.text + "</p>" +
          "<p class=\"ask\">What happens to the supply curve for " + s.good + "?</p>";
        titleEl.textContent = "Supply of " + s.good;
        noteEl.textContent = "S is supply of " + s.good + " before the change. Decide whether S1 should sit to the left or the right.";
        feedbackEl.className = "feedback";
        feedbackEl.innerHTML = "";
        btnLeft.disabled = false;
        btnRight.disabled = false;
        btnLeft.className = "";
        btnRight.className = "";
        btnNext.disabled = true;
        btnNext.textContent = "Next question";
        if (btnSave) btnSave.disabled = false;
        byId("chart").setAttribute("aria-label", "Supply curve for " + s.good + " before the change. Category: " + item.label + ".");
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
          ? "Correct. The supply curve shifts " + shiftWord(s.shift) + ". That is " + supplyWord(s.shift) + "."
          : "Not this time. You chose a shift " + shiftWord(choice) + ". The supply curve shifts " + shiftWord(s.shift) + ", which is " + supplyWord(s.shift) + ".";
        feedbackEl.className = "feedback " + (hit ? "ok" : "bad");
        feedbackEl.innerHTML = "<p><strong>" + lead + "</strong></p><p>" + s.why + "</p>";
        if (finished) {
          stopClock();
          feedbackEl.innerHTML += "<p>Set complete. " + state.correct + " correct out of " + state.attempts + " attempts. " + beatLine() + "</p>";
          renderClock();
        }
        noteEl.textContent = "S1 is the supply curve after the change. A shift left is a decrease in supply. A shift right is an increase in supply.";
        byId("chart").setAttribute(
          "aria-label",
          "Supply of " + s.good + " shifts " + shiftWord(s.shift) + ", " + supplyWord(s.shift) + "."
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
        var name = "supply-" + good + "-q" + (state.index + 1);
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