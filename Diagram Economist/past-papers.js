(function () {
  var BEST_KEY = "diagram-economist-mcq-best";

  var MACRO = [
    {
      topic: "Aggregate demand and supply",
      figure: "ad",
      fixed: true,
      stem: "In Figure 1, when",
      options: [
        "aggregate demand shifts from AD1 to AD2, cyclical unemployment is likely to be eliminated.",
        "aggregate demand shifts from AD1 to AD3, the rate of economic growth is equal to (Y3 − Y1).",
        "the economy is producing at Y1, there is a positive output gap.",
        "the economy is producing at Y2, there is no unemployment."
      ],
      answer: 3,
      why: "Y2 is where SRAS meets LRAS. That is full-employment output, so there is no unemployment."
    },
    {
      topic: "Aggregate supply",
      figure: "as",
      fixed: true,
      stem: "All other things being equal, which one of the following is most likely to explain the movement to the right of both the short-run and long-run aggregate supply curves?",
      options: [
        "A large increase in the availability of renewable energy within the economy",
        "An increase in employment and a depreciation of the exchange rate",
        "An increase in the natural rate of unemployment and the level of money wage rates",
        "A supply-side shock to the economy which increases the rate of inflation"
      ],
      answer: 0,
      why: "More renewable energy raises productive capacity, so long-run aggregate supply shifts right. It also cuts firms’ energy costs, so short-run aggregate supply shifts right."
    },
    {
      topic: "Aggregate demand",
      figure: "ad-fall",
      fixed: true,
      stem: "All other things being equal, the change in real national output from Y1 to Y2 is most likely to have been caused by an increase in the",
      options: [
        "government’s budget deficit.",
        "level of interest rates.",
        "size of the labour force.",
        "volume of exports."
      ],
      answer: 1,
      why: "Output falls from Y1 to Y2 because aggregate demand shifts left from AD1 to AD2. A higher interest rate reduces consumption and investment, so aggregate demand falls."
    },
    {
      topic: "Q28 — AD/LRAS",
      figure: "lras-rd",
      fixed: true,
      stem: "Government transfers spending from welfare towards R&D, shifting LRAS. What is the most likely effect?",
      options: [
        "Fewer economically active people",
        "Improved current account",
        "Larger budget deficit",
        "Positive output gap"
      ],
      answer: 1,
      why: "The spending is transferred, so the budget deficit need not grow. Research and development raises productive capacity, shifting LRAS from LRAS1 to LRAS2. A more productive economy can compete more successfully abroad, so the current account is most likely to improve."
    },
    {
      topic: "June 2022 — Q6: AD/AS",
      figure: "ad-fiscal",
      fixed: true,
      stem: "Which one of the following is the government most likely to increase if it wishes to use fiscal policy to reduce national output from Y1 to Y2?",
      options: [
        "Increase infrastructure expenditure",
        "Increase interest rates",
        "Increase income-tax rates",
        "Increase the budget deficit"
      ],
      answer: 2,
      why: "Output falls from Y1 to Y2 because aggregate demand shifts left from AD1 to AD2, and the price level falls from P1 to P2. A higher income-tax rate reduces disposable income and consumption, so aggregate demand falls. That is fiscal policy. More infrastructure spending or a larger budget deficit would raise aggregate demand. Interest rates are monetary policy."
    },
    {
      topic: "Q21 — Aggregate supply",
      figure: "as-growth",
      fixed: true,
      stem: "What is the impact of a shift in the aggregate supply curve from AS1 to AS2 in the diagram?",
      options: [
        "Long run economic growth",
        "Neither short run or long run economic growth",
        "Short run and long run economic growth",
        "Short run economic growth"
      ],
      answer: 0,
      why: "The vertical section of aggregate supply shifts right, from AS1 to AS2, so the economy’s full-capacity output is higher. That is long-run economic growth. Aggregate demand meets the curve on the horizontal section, which does not move, so the short-run price level and output stay the same."
    },
    {
      topic: "Q27 — Aggregate demand",
      figure: "ad-q27",
      fixed: true,
      stem: "What is likely to have caused the shift in Aggregate Demand shown in the diagram?",
      options: [
        "A decrease in consumer confidence",
        "A reduction in income tax rates",
        "An increase in corporation tax rates",
        "An increase in the price of oil"
      ],
      answer: 1,
      why: "Aggregate demand shifts right from AD1 to AD2. A lower income-tax rate raises disposable income and consumption, so aggregate demand increases. Lower consumer confidence or higher corporation tax would reduce aggregate demand. A higher oil price raises firms’ costs, so it shifts aggregate supply, not aggregate demand."
    },
    {
      topic: "Supply-side shock",
      figure: "oil-shock",
      fixed: true,
      stem: "Due to geopolitical disruption, exports of oil have been restricted. As oil is a key input for many industries, what is the most likely macroeconomic consequence of the supply disruption?",
      options: [
        "Lower inflation and lower unemployment",
        "Higher inflation and lower economic growth",
        "Lower inflation and higher economic growth",
        "Higher economic growth and higher productivity"
      ],
      answer: 1,
      why: "Restricted oil exports shift supply left from S to S1. The price level rises from P to P1, so inflation is higher, and output falls from Q to Q1, so economic growth is lower. That combination is higher inflation and lower economic growth."
    }
  ];

  var PAPERS = {
    macro: { title: "Macroeconomics diagrams", questions: MACRO }
  };

  var setupEl = document.getElementById("setup");
  var quizEl = document.getElementById("quiz");
  var resultsEl = document.getElementById("results");
  var optionsEl = document.getElementById("options");
  var stemEl = document.getElementById("stem");
  var topicEl = document.getElementById("topic");
  var progressEl = document.getElementById("progress");
  var timerEl = document.getElementById("timer");
  var fillEl = document.getElementById("fill");
  var whyEl = document.getElementById("why");
  var nextBtn = document.getElementById("next");
  var liveEl = document.getElementById("live");
  var scoreLine = document.getElementById("scoreLine");
  var scoreNote = document.getElementById("scoreNote");
  var reviewEl = document.getElementById("review");
  var modeButtons = document.querySelectorAll("[data-mode]");
  var paperButtons = document.querySelectorAll("[data-paper]");

  var SECONDS_PER_QUESTION = 60;
  var mode = "practice";
  var paperId = "macro";
  var deck = [];
  var index = 0;
  var chosen = null;
  var locked = false;
  var score = 0;
  var record = [];
  var timeLeft = SECONDS_PER_QUESTION;
  var questionTimer = null;
  var questionToken = 0;

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

  function deal(questions) {
    return shuffle(questions).map(function (question) {
      var pairs = question.options.map(function (text, optionIndex) {
        return { text: text, correct: optionIndex === question.answer };
      });
      if (!question.fixed) pairs = shuffle(pairs);
      return {
        topic: question.topic,
        stem: question.stem,
        why: question.why,
        figure: question.figure || "",
        options: pairs.map(function (pair) { return pair.text; }),
        answer: pairs.findIndex(function (pair) { return pair.correct; })
      };
    });
  }

  function readBest() {
    try {
      return JSON.parse(localStorage.getItem(BEST_KEY) || "{}") || {};
    } catch (err) {
      return {};
    }
  }

  function storedBest(id) {
    var best = readBest();
    var total = PAPERS[id].questions.length;
    var previous = Number(best[id]) || 0;
    if (previous > total) return 0;
    return previous;
  }

  function rememberBest() {
    var best = readBest();
    var previous = storedBest(paperId);
    if (score > previous) best[paperId] = score;
    try {
      localStorage.setItem(BEST_KEY, JSON.stringify(best));
    } catch (err) {
      /* The score still shows if storage is unavailable. */
    }
    return Math.max(previous, score);
  }

  function showBest() {
    var id;
    for (id in PAPERS) {
      if (!Object.prototype.hasOwnProperty.call(PAPERS, id)) continue;
      var node = document.querySelector('[data-best="' + id + '"]');
      if (!node) continue;
      var total = PAPERS[id].questions.length;
      var previous = storedBest(id);
      node.textContent = previous ? "Best score " + previous + " / " + total : total + " questions";
    }
  }

  function letter(optionIndex) {
    return String.fromCharCode(65 + optionIndex);
  }

  function show(section) {
    setupEl.hidden = section !== "setup";
    quizEl.hidden = section !== "quiz";
    resultsEl.hidden = section !== "results";
  }

  function setMode(nextMode) {
    mode = nextMode;
    modeButtons.forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.getAttribute("data-mode") === mode));
    });
  }

  function formatTime(seconds) {
    var mins = Math.floor(seconds / 60);
    var secs = seconds % 60;
    return mins + ":" + (secs < 10 ? "0" : "") + secs;
  }

  function clearQuestionTimer() {
    if (questionTimer) {
      clearInterval(questionTimer);
      questionTimer = null;
    }
  }

  function paintTimer() {
    if (!timerEl) return;
    timerEl.textContent = formatTime(timeLeft);
    timerEl.classList.toggle("is-low", timeLeft <= 10);
    timerEl.setAttribute("aria-label", timeLeft + " seconds left for this question");
  }

  function expireQuestion(token) {
    if (token !== questionToken) return;
    clearQuestionTimer();
    if (!locked) {
      locked = true;
      storeAnswer();
    }
    advance();
  }

  function startQuestionTimer(token) {
    clearQuestionTimer();
    timeLeft = SECONDS_PER_QUESTION;
    paintTimer();
    questionTimer = setInterval(function () {
      if (token !== questionToken) {
        clearQuestionTimer();
        return;
      }
      timeLeft -= 1;
      paintTimer();
      if (timeLeft <= 0) expireQuestion(token);
    }, 1000);
  }

  function renderQuestion() {
    questionToken += 1;
    var token = questionToken;
    var question = deck[index];
    chosen = null;
    locked = false;
    progressEl.textContent = "Question " + (index + 1) + " of " + deck.length;
    fillEl.style.width = (index / deck.length * 100) + "%";
    topicEl.textContent = question.topic;
    document.querySelectorAll("[data-figure]").forEach(function (chart) {
      chart.hidden = chart.getAttribute("data-figure") !== question.figure;
    });
    stemEl.textContent = question.stem;
    whyEl.hidden = true;
    whyEl.textContent = "";
    nextBtn.hidden = mode === "practice";
    nextBtn.disabled = true;
    nextBtn.textContent = index === deck.length - 1 ? "See the score" : "Next question";
    optionsEl.innerHTML = "";
    question.options.forEach(function (text, optionIndex) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "option";
      button.dataset.index = String(optionIndex);
      var mark = document.createElement("span");
      mark.className = "letter";
      mark.textContent = letter(optionIndex);
      button.appendChild(mark);
      button.appendChild(document.createTextNode(text));
      button.addEventListener("click", function () { pick(optionIndex); });
      optionsEl.appendChild(button);
    });
    liveEl.textContent = "Question " + (index + 1) + ". " + question.stem;
    startQuestionTimer(token);
    stemEl.focus();
  }

  function paintChoice() {
    var buttons = optionsEl.querySelectorAll(".option");
    buttons.forEach(function (button) {
      var optionIndex = Number(button.dataset.index);
      button.classList.toggle("is-picked", optionIndex === chosen && !locked);
    });
  }

  function storeAnswer() {
    var question = deck[index];
    var correct = chosen !== null && chosen === question.answer;
    if (correct) score += 1;
    record.push({
      stem: question.stem,
      options: question.options,
      answer: question.answer,
      chosen: chosen,
      why: question.why,
      correct: correct
    });
    return correct;
  }

  function reveal() {
    var question = deck[index];
    locked = true;
    var correct = storeAnswer();
    var buttons = optionsEl.querySelectorAll(".option");
    buttons.forEach(function (button) {
      var optionIndex = Number(button.dataset.index);
      button.disabled = true;
      button.classList.remove("is-picked");
      if (optionIndex === question.answer) button.classList.add("is-right");
      else if (optionIndex === chosen) button.classList.add("is-wrong");
    });
    whyEl.hidden = false;
    whyEl.textContent = (correct ? "Correct. " : "Answer " + letter(question.answer) + ". ") + question.why;
    liveEl.textContent = whyEl.textContent;
    nextBtn.hidden = false;
    nextBtn.disabled = false;
    fillEl.style.width = ((index + 1) / deck.length * 100) + "%";
  }

  function pick(optionIndex) {
    if (locked) return;
    chosen = optionIndex;
    if (mode === "paper") {
      paintChoice();
      nextBtn.disabled = false;
      return;
    }
    reveal();
  }

  function commitPaperAnswer() {
    if (chosen === null || locked) return;
    locked = true;
    storeAnswer();
    advance();
  }

  function advance() {
    clearQuestionTimer();
    questionToken += 1;
    if (index < deck.length - 1) {
      index += 1;
      renderQuestion();
      return;
    }
    finish();
  }

  function finish() {
    clearQuestionTimer();
    var total = deck.length;
    var best = rememberBest();
    var paper = PAPERS[paperId];
    scoreLine.textContent = score + " / " + total;
    scoreNote.textContent = score === total
      ? "Every question on " + paper.title + " was correct."
      : paper.title + ". Best score so far: " + best + " / " + total + ".";
    reviewEl.innerHTML = "";
    record.forEach(function (item, itemIndex) {
      var row = document.createElement("li");
      row.className = item.correct ? "hit" : "miss";
      var heading = document.createElement("p");
      heading.className = "review-stem";
      heading.textContent = (itemIndex + 1) + ". " + item.stem;
      var yours = document.createElement("p");
      yours.textContent = item.chosen === null
        ? "Your answer: no answer (time ran out)."
        : "Your answer: " + letter(item.chosen) + ". " + item.options[item.chosen];
      var right = document.createElement("p");
      right.textContent = item.correct
        ? "Correct."
        : "Correct answer: " + letter(item.answer) + ". " + item.options[item.answer];
      var because = document.createElement("p");
      because.className = "why";
      because.textContent = item.why;
      row.appendChild(heading);
      row.appendChild(yours);
      row.appendChild(right);
      row.appendChild(because);
      reviewEl.appendChild(row);
    });
    show("results");
    liveEl.textContent = "You scored " + score + " out of " + total + ".";
    document.getElementById("scoreHeading").focus();
  }

  function start(id) {
    clearQuestionTimer();
    paperId = id;
    deck = deal(PAPERS[id].questions);
    index = 0;
    score = 0;
    record = [];
    show("quiz");
    renderQuestion();
  }

  modeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setMode(button.getAttribute("data-mode"));
    });
  });

  paperButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      start(button.getAttribute("data-paper"));
    });
  });

  nextBtn.addEventListener("click", function () {
    if (mode === "paper" && !locked) {
      commitPaperAnswer();
      return;
    }
    if (!locked) return;
    advance();
  });

  document.getElementById("again").addEventListener("click", function () {
    start(paperId);
  });

  document.getElementById("backSetup").addEventListener("click", function () {
    clearQuestionTimer();
    showBest();
    show("setup");
  });

  document.addEventListener("keydown", function (event) {
    if (quizEl.hidden) return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    var key = event.key.toLowerCase();
    var optionIndex = -1;
    if (key === "a" || key === "1") optionIndex = 0;
    else if (key === "b" || key === "2") optionIndex = 1;
    else if (key === "c" || key === "3") optionIndex = 2;
    else if (key === "d" || key === "4") optionIndex = 3;
    if (optionIndex > -1) {
      event.preventDefault();
      pick(optionIndex);
      return;
    }
    if (key === "enter" && !nextBtn.disabled && !nextBtn.hidden) {
      event.preventDefault();
      nextBtn.click();
    }
  });

  setMode("practice");
  showBest();
  show("setup");
})();
