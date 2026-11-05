(function () {
  var BEST_KEY = "diagram-economist-micro-mcq-best";

  var MICRO = [
    {
      topic: "Demand",
      figure: "bulbs",
      fixed: true,
      stem: "Assuming that electric light bulbs are a normal good, the shift in the demand curve from D1 to D2 and the rise in the equilibrium price from P1 to P2 can be explained by",
      options: [
        "an increase in household incomes.",
        "an increase in the price of electricity.",
        "a decrease in the rate of value added tax (VAT) on light bulbs.",
        "the introduction of a government subsidy to the producers of light bulbs."
      ],
      answer: 0,
      why: "Light bulbs are a normal good, so higher household incomes increase demand. Demand shifts right from D1 to D2, and the equilibrium price rises from P1 to P2. Electricity is a complement, so a higher electricity price would shift demand left. A lower rate of VAT, or a subsidy to producers, would shift supply right and lower the price."
    },
    {
      topic: "Labour market",
      figure: "monopsony",
      fixed: true,
      stem: "The diagram shows the marginal revenue product of labour (MRPL), the marginal cost of labour (MCL) and the average cost of labour (ACL). There is a single employer, but labour is supplied competitively. The employer’s profit-maximising wage and level of employment is a",
      options: [
        "wage of W1 and employment of L1.",
        "wage of W2 and employment of L2.",
        "wage of W3 and employment of L1.",
        "wage of W4 and employment of L2."
      ],
      answer: 0,
      why: "A single employer hires labour up to the point where the marginal cost of labour equals the marginal revenue product. That is L1. The wage is then read from the labour supply curve, ACL, so the wage paid is W1. W3 is the marginal revenue product at L1, not the wage. L2 and W2 are the competitive employment and wage, where MRPL crosses ACL."
    },
    {
      topic: "Demand",
      figure: "demand-right",
      fixed: true,
      stem: "The shift of the demand curve from D1 to D2 is most likely to have been caused by",
      options: [
        "a fall in the price of the good.",
        "a rise in consumer incomes, and the good is normal.",
        "an improvement in the technology used to produce the good.",
        "a rise in the price of a complement."
      ],
      answer: 1,
      why: "Higher income increases demand for a normal good, so the demand curve shifts right from D1 to D2. The price rises from P1 to P2 and the quantity rises from Q1 to Q2. A change in the good’s own price would move along the demand curve. Better technology shifts supply. A dearer complement shifts demand left."
    },
    {
      topic: "Supply",
      figure: "supply-left",
      fixed: true,
      stem: "The shift of supply from S1 to S2 is most likely to have been caused by",
      options: [
        "an increase in the costs of production.",
        "a successful advertising campaign for the good.",
        "a fall in the price of a complement.",
        "a fall in the market price of the good."
      ],
      answer: 0,
      why: "Higher costs mean firms supply less at each price, so supply shifts left from S1 to S2. The price rises from P1 to P2 and the quantity falls from Q1 to Q2. Advertising and a cheaper complement shift demand. A lower market price is a movement along supply."
    },
    {
      topic: "Price elasticity of demand",
      figure: "ped",
      fixed: true,
      stem: "Which statement about the diagram is correct?",
      options: [
        "D1 is more price elastic than D2.",
        "D2 is more price elastic than D1.",
        "D1 and D2 are both perfectly inelastic.",
        "A given price change changes quantity by the same amount on D1 and D2."
      ],
      answer: 1,
      why: "D2 is flatter than D1. For the same change in price, quantity demanded changes by more along D2, so demand is more price elastic."
    },
    {
      topic: "Indirect taxes",
      figure: "tax",
      fixed: true,
      stem: "The vertical distance between the supply curve S and the curve S + tax shows",
      options: [
        "the tax charged on each unit sold.",
        "the total tax revenue collected by the government.",
        "the consumer surplus that remains after the tax.",
        "the producer surplus that remains after the tax."
      ],
      answer: 0,
      why: "A specific tax shifts supply up by the amount of the tax per unit. That vertical gap is the tax on each unit. Total tax revenue is the gap multiplied by the quantity sold after the tax, Q2."
    },
    {
      topic: "Subsidies",
      figure: "subsidy",
      fixed: true,
      stem: "After the subsidy shifts supply from S to S + subsidy,",
      options: [
        "consumers pay a higher price and buy a smaller quantity.",
        "consumers pay a lower price and buy a larger quantity.",
        "the price received by producers is below the price paid by consumers.",
        "demand shifts to the right."
      ],
      answer: 1,
      why: "A subsidy reduces firms’ costs, so supply shifts right. The equilibrium moves from P1, Q1 to P2, Q2: the price consumers pay falls and the quantity rises."
    },
    {
      topic: "Consumer and producer surplus",
      figure: "surplus",
      fixed: true,
      stem: "At the equilibrium price P, consumer surplus is",
      options: [
        "the area below the demand curve and above the price, out to quantity Q.",
        "the area above the supply curve and below the price, out to quantity Q.",
        "the rectangle given by price times quantity.",
        "the area below both the demand curve and the supply curve."
      ],
      answer: 0,
      why: "Consumer surplus is the gap between what buyers are willing to pay, shown by the demand curve, and the price they actually pay. That is the area under demand and above P, up to Q."
    },
    {
      topic: "Externalities",
      figure: "externality",
      fixed: true,
      stem: "Compared with the socially efficient output, the free-market output is",
      options: [
        "too low, because producers ignore an external benefit.",
        "too high, because producers ignore an external cost.",
        "efficient, because marginal benefit equals marginal private cost.",
        "too low, because the supply curve is MSC rather than MPC."
      ],
      answer: 1,
      why: "The free market produces Qm, where marginal social benefit equals marginal private cost. The external cost means MSC lies above MPC, so the efficient output is Qs. Qm is greater than Qs."
    },
    {
      topic: "Production possibility frontier",
      figure: "ppf",
      fixed: true,
      stem: "Point A on the diagram represents",
      options: [
        "a combination of output that cannot be produced with current resources.",
        "productive efficiency.",
        "unemployed or inefficiently used resources.",
        "an increase in the productive capacity of the economy."
      ],
      answer: 2,
      why: "Point A is inside the frontier, so more of either good could be produced. Some resources are unemployed or not used efficiently. Point B is on the frontier, so it is productively efficient. Point C is outside the frontier and is unattainable."
    },
    {
      topic: "Maximum prices",
      figure: "max-price",
      fixed: true,
      stem: "A maximum price set at Pmax will cause",
      options: [
        "excess supply equal to Qd minus Qs.",
        "excess demand equal to Qd minus Qs.",
        "the equilibrium price to rise above Pe.",
        "a shift of the demand curve to the left."
      ],
      answer: 1,
      why: "Pmax is below the equilibrium price Pe, so quantity demanded is Qd and quantity supplied is Qs. Demand exceeds supply. The shortage is Qd minus Qs. The demand and supply curves do not shift."
    },
    {
      topic: "International trade",
      figure: "tariff",
      fixed: true,
      stem: "A tariff raises the price of solar panels from the world price PW to PT. The tariff revenue collected by the government is shown by the area",
      options: [
        "EFGH",
        "JFGK",
        "PWPTGK",
        "Q2FGQ3"
      ],
      answer: 1,
      why: "After the tariff, imports are the gap between domestic output Q2 and domestic demand Q3. The tariff on each import is PT minus PW. Government revenue is that rectangle, JFGK."
    },
    {
      topic: "Labour markets",
      figure: "labour",
      fixed: true,
      stem: "This diagram shows the demand (DL) and supply (SL) of labour. The initial trade union wage is W2. The trade union negotiates an increase in the wage from W2 to W3. All other things being equal, unemployment in this labour market will increase by",
      options: [
        "3 000",
        "5 000",
        "8 000",
        "16 000"
      ],
      answer: 2,
      why: "At W2, unemployment is 53 000 minus 45 000, which is 8 000. At W3 it is 56 000 minus 40 000, which is 16 000. Unemployment rises by 8 000."
    },
    {
      topic: "International trade",
      figure: "paper",
      fixed: true,
      stem: "Figure 8 shows the domestic demand (Dd) and supply (Sd) of paper. Sw is world supply with free trade, and Swt is world supply after a tariff of $10 per unit. Following the introduction of the tariff, what is the change in the amount the country has to pay to the rest of the world for the paper it imports?",
      options: [
        "US$2300 million",
        "US$3300 million",
        "US$4050 million",
        "US$5200 million"
      ],
      answer: 3,
      why: "Before the tariff, imports are 500 minus 125, which is 375 million units, and the country pays the world price: 20 \u00d7 375 = $7500 million. After the tariff, imports are 335 minus 220, which is 115 million units. Exporters still receive $20, so the payment is 20 \u00d7 115 = $2300 million. The payment falls by $5200 million."
    },
    {
      topic: "Price elasticity of supply",
      figure: "cakes",
      fixed: true,
      stem: "This diagram shows the supply curve for cakes. Which one of the following can be concluded? The supply of cakes",
      options: [
        "is less price inelastic when price increases from \u00a38 to \u00a310 than when it increases from \u00a310 to \u00a315.",
        "is more price inelastic when price increases from \u00a38 to \u00a310 than when it increases from \u00a310 to \u00a315.",
        "is price elastic when price increases from \u00a38 to \u00a310 and when it increases from \u00a310 to \u00a315.",
        "is unitary price elastic when price increases from \u00a38 to \u00a310 and when it increases from \u00a310 to \u00a315."
      ],
      answer: 1,
      why: "From \u00a38 to \u00a310, quantity rises from 100 to 120. PES = 20% / 25% = 0.8. From \u00a310 to \u00a315, quantity rises from 120 to 170. PES = 41.7% / 50% = 0.83. Both are inelastic, and supply is more price inelastic over the first price rise."
    },
    {
      topic: "Exchange rates",
      figure: "currency",
      fixed: true,
      stem: "The diagram below shows the value of a country\u2019s currency. What is most likely to have caused the change illustrated here?",
      options: [
        "A decrease in the marginal propensity to import.",
        "Contractionary monetary policy.",
        "Expansionary monetary policy.",
        "Supply side policy designed to increase labour productivity."
      ],
      answer: 2,
      why: "Supply of the currency shifts right from S1 to S2, so the exchange rate falls from P1 to P2 and the quantity rises from Q1 to Q2. Expansionary monetary policy lowers interest rates. Funds flow abroad, and more of this currency is supplied on the foreign exchange market. The currency depreciates. A lower marginal propensity to import would shift supply left. Contractionary monetary policy and higher labour productivity would raise demand for the currency and increase its value."
    },
    {
      topic: "Externalities",
      figure: "welfare-gain",
      fixed: true,
      stem: "The government wishes to eliminate the welfare loss shown in the diagram. Which policy is most likely to achieve this?",
      options: [
        "Impose an indirect tax on consumers.",
        "Introduce a production quota below Qe.",
        "Provide a subsidy to encourage consumption.",
        "Introduce a price floor above P\u2081."
      ],
      answer: 2,
      why: "MSB lies above MPB, so the free market underconsumes at Qe, where MPB equals MSC. The socially optimal output is Q\u2081, where MSB equals MSC. A subsidy can increase consumption from Qe towards Q\u2081 and remove the welfare loss shown by the shaded triangle. An indirect tax, a quota below Qe, or a price floor above P\u2081 would reduce consumption further."
    },
    {
      topic: "Market structures",
      figure: "contestable",
      fixed: true,
      stem: "If barriers to entry were removed and the market became more contestable, which outcome would be most likely in the long run?",
      options: [
        "Supernormal profits would encourage entry, shifting the firm's AC curve down.",
        "New firms would enter, shifting the monopolist's demand curve leftwards.",
        "Marginal revenue would increase above the demand curve.",
        "The monopolist would increase price to maintain profit."
      ],
      answer: 1,
      why: "The shaded area shows supernormal profit at Qm, where MC equals MR and price is Pm. If barriers fall and the market becomes more contestable, new firms enter. Each firm faces a smaller share of demand, so the monopolist's demand and marginal revenue curves shift left. Entry does not shift the firm's AC curve down, MR cannot lie above demand, and a higher price would attract entry rather than protect profit."
    }
  ];

  var PAPERS = {
    micro: { title: "Microeconomics diagrams", questions: MICRO }
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
  var paperId = "micro";
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
