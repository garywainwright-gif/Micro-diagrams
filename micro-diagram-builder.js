/**
 * Micro diagram builder (A-level microeconomics).
 * A separate Macro diagram builder can sit alongside this later.
 *
 * Put this next to a word-cloud HTML file and add:
 *   <script src="micro-diagram-builder.js"></script>
 * Then, when that term’s definition is shown:
 *   MicroDiagramBuilder.mount(element, { axes: "price-quantity" });
 *
 * Use only the axis pair that page needs. Pairs for clouds not built yet stay unused.
 *
 * Axis ids:
 *   price-quantity, price-quantity-two, price-level-real-gdp, price-level-real-national-output, price-quantity-industry-firm, price-output-two, good-a-good-b, income-quantity, costs-output, output-factor,
 *   average-cost-output, revenue-output, price-revenue-output, costs-revenue-output, costs-revenue-price-output, rev-cost, pcb-quantity,
 *   ac-pound-output, rent-properties, wage-labour, wage-labour-two, wage-cost-revenue-labour, output-labour, revenue-labour
 *
 * Two-panel pairs (Industry left, Firm right):
 *   rev-cost — Cost / revenue (Marginal revenue board)
 *   price-quantity-two — two panels, both Price (vertical) and Quantity (horizontal)
 *   price-quantity-industry-firm — one button, two panels, both Price and Quantity (Industry left, Firm right)
 *   price-output-two — two panels, both Price (vertical) and Output (horizontal)
 *   wage-labour-two — two panels, both Wage rate (vertical) and Quantity of labour (horizontal)
 *
 * Optional: twinPanel, points, saveName, idleStatus, checkId
 * Practice picker:
 *   MicroDiagramBuilder.mountPractice(element);           // all questions in DIAGRAM_BANK
 *
 * checkId looks up DIAGRAM_BANK and adds “See the answer”.
 * Each question is one record: wording, allowed axes, and the uploaded answer picture.
 */
(function (global) {
  var AXIS_PRESETS = [
    { id: "price-quantity", label: "Price and quantity", yLabel: "Price", xLabel: "Quantity", button: "Price–quantity axes" },
    { id: "price-quantity-two", label: "Price and quantity (two panels)", yLabel: "Price", xLabel: "Quantity", button: "Two-panel price–quantity axes", twoPanel: true },
    { id: "price-level-real-gdp", label: "Price level and Real GDP", yLabel: "Price level", xLabel: "Real GDP", button: "Price level–Real GDP axes" },
    { id: "price-level-real-national-output", label: "Price level and real national output", yLabel: "Price level", xLabel: "Real national output", button: "Price level–real national output axes" },
    { id: "price-quantity-industry-firm", label: "Price and quantity (Industry and Firm)", yLabel: "Price", xLabel: "Quantity", button: "Industry and firm axes", twoPanel: true, panelTitles: true },
    { id: "price-output-two", label: "Price and output (two panels)", yLabel: "Price", xLabel: "Output", button: "Two-panel price–output axes", twoPanel: true },
    { id: "good-a-good-b", label: "Good A and Good B", yLabel: "Good B", xLabel: "Good A", button: "Good A–Good B axes" },
    { id: "income-quantity", label: "Income and quantity", yLabel: "Income", xLabel: "Quantity", button: "Income–quantity axes" },
    { id: "costs-output", label: "Costs and output", yLabel: "Costs", xLabel: "Output", button: "Costs–output axes" },
    { id: "output-factor", label: "Output and factor input", yLabel: "Output", xLabel: "Factor input", button: "Output–factor input axes" },
    { id: "average-cost-output", label: "Average cost and output", yLabel: "Average cost", xLabel: "Output", button: "Average cost–output axes" },
    { id: "revenue-output", label: "Revenue and output", yLabel: "Revenue", xLabel: "Output", button: "Revenue–output axes" },
    { id: "price-revenue-output", label: "Price / Revenue and output", yLabel: "Price / Revenue", xLabel: "Output", button: "Price / Revenue–output axes" },
    { id: "costs-revenue-output", label: "Costs and revenue and output", yLabel: "Costs and revenue", xLabel: "Output", button: "Costs and revenue–output axes" },
    { id: "costs-revenue-price-output", label: "Costs, revenue and price and output", yLabel: "Costs, Revenue and Price", xLabel: "Output", button: "Costs, revenue and price–output axes" },
    { id: "rev-cost", label: "Rev/cost and quantity (Industry and Firm)", yLabel: "Cost / revenue", xLabel: "Quantity", button: "cost/ revenue axis", twin: true, twinYLabel: "cost and revenue", twinXLabel: "Quantity" },
    { id: "pcb-quantity", label: "Price, costs, benefits and quantity", yLabel: "Price, costs, benefits", xLabel: "Quantity", button: "Price, costs, benefits axes" },
    { id: "ac-pound-output", label: "AC/£ and output", yLabel: "AC (£)", xLabel: "Output", button: "AC (£)–output axes" },
    { id: "rent-properties", label: "Rent price and quantity of properties", yLabel: "Rent price", xLabel: "Quantity of properties", button: "Rent–properties axes" },
    { id: "wage-labour", label: "Wage rate and quantity of labour", yLabel: "Wage rate", xLabel: "Quantity of labour", button: "Wage–labour axes" },
    { id: "wage-labour-two", label: "Wage rate and quantity of labour (two panels)", yLabel: "Wage rate", xLabel: "Quantity of labour", button: "Two-panel wage–labour axes", twoPanel: true },
    { id: "wage-cost-revenue-labour", label: "Wage rate cost and revenue product and quantity of labour", yLabel: "Wage rate cost and revenue product", xLabel: "Quantity of labour", button: "Wage rate cost and revenue product–labour axes" },
    { id: "output-labour", label: "Output and quantity of labour", yLabel: "Output", xLabel: "Quantity of labour", button: "Output–labour axes" },
    { id: "revenue-labour", label: "Revenue and quantity of labour", yLabel: "Revenue", xLabel: "Quantity of labour", button: "Revenue–labour axes" }
  ];

  var OWN_LABELS = {
    id: "own-labels",
    label: "Your own axis labels",
    yLabel: "",
    xLabel: "",
    button: "Your own axes",
    ownLabels: true
  };

  var LABEL_SUGGESTIONS = ["SRAS"];
  var labelListSeq = 0;

  var POINT_FILL = { "point-blue": "#2563eb", "point-amber": "#f59e0b", "point-red": "#ef4444" };
  var POINT_R = 8;
  var HANDLE_RADIUS = 6;
  var HIT_THRESH = 10;
  var ORTHO_SNAP_DEG = 15;

  function snapOrthoPoint(from, to) {
    var dx = to.x - from.x;
    var dy = to.y - from.y;
    if (!dx && !dy) return { x: to.x, y: to.y };
    var a = Math.abs(Math.atan2(dy, dx) * 180 / Math.PI);
    var fromHoriz = Math.min(a, 180 - a);
    var fromVert = Math.abs(90 - a);
    if (fromVert <= ORTHO_SNAP_DEG) return { x: from.x, y: to.y };
    if (fromHoriz <= ORTHO_SNAP_DEG) return { x: to.x, y: from.y };
    return { x: to.x, y: to.y };
  }

  var DIAGRAM_BANK = {
    "equilibrium-point": {
      id: "equilibrium-point",
      title: "Identify the equilibrium point",
      topic: "Demand",
      seriesTitle: "Changes in demand due to changes in consumer tastes.",
      question: "Identify the equilibrium point on a demand and supply diagram.",
      answerImage: "equilibrium-point.png",
      mount: {
        showAllAxes: true,
        points: true,
        checkId: "equilibrium-point",
        saveName: "equilibrium-point.png"
      }
    },
    "demand-increase": {
      id: "demand-increase",
      title: "Increase in demand",
      topic: "Demand",
      question: "Draw a diagram showing the result of an increase in demand.",
      extends: "equilibrium-point",
      mount: {
        showAllAxes: true,
        points: true,
        checkId: "demand-increase",
        saveName: "demand-increase.png"
      }
    },
    "demand-fall": {
      id: "demand-fall",
      title: "Fall in demand",
      topic: "Demand",
      question: "Draw a diagram showing the result of a fall in demand.",
      extends: "demand-increase",
      mount: {
        showAllAxes: true,
        points: true,
        checkId: "demand-fall",
        saveName: "demand-fall.png"
      }
    },
    "income-normal-equilibrium": {
      id: "income-normal-equilibrium",
      title: "Identify the equilibrium point",
      topic: "Demand",
      seriesTitle: "Changes in demand due to an increase in consumers income for a normal good.",
      question: "Identify the equilibrium point on a demand and supply diagram.",
      answerImage: "equilibrium-point.png",
      mount: {
        showAllAxes: true,
        points: true,
        checkId: "income-normal-equilibrium",
        saveName: "income-normal-equilibrium.png"
      }
    },
    "income-normal-increase": {
      id: "income-normal-increase",
      title: "Increase in demand",
      topic: "Demand",
      question: "Draw a diagram showing the effect on demand of an increase in consumers incomes for a normal good.",
      extends: "income-normal-equilibrium",
      mount: {
        showAllAxes: true,
        points: true,
        checkId: "income-normal-increase",
        saveName: "income-normal-increase.png"
      }
    },
    "income-normal-fall": {
      id: "income-normal-fall",
      title: "Fall in demand",
      topic: "Demand",
      question: "Draw a diagram showing the effect on demand of a decrease in consumers incomes for a normal good.",
      extends: "income-normal-increase",
      mount: {
        showAllAxes: true,
        points: true,
        checkId: "income-normal-fall",
        saveName: "income-normal-fall.png"
      }
    },
    "income-inferior-equilibrium": {
      id: "income-inferior-equilibrium",
      title: "Identify the equilibrium point",
      topic: "Demand",
      seriesTitle: "Changes in demand due to changes in consumers incomes for an inferior good.",
      question: "Identify the equilibrium point on a demand and supply diagram.",
      answerImage: "equilibrium-point.png",
      mount: {
        showAllAxes: true,
        points: true,
        checkId: "income-inferior-equilibrium",
        saveName: "income-inferior-equilibrium.png"
      }
    },
    "income-inferior-decrease": {
      id: "income-inferior-decrease",
      title: "Increase in demand",
      topic: "Demand",
      question: "Draw a diagram showing the effect on demand of a decrease in consumers incomes for an inferior good.",
      extends: "income-inferior-equilibrium",
      mount: {
        showAllAxes: true,
        points: true,
        checkId: "income-inferior-decrease",
        saveName: "income-inferior-decrease.png"
      }
    },
    "income-inferior-increase": {
      id: "income-inferior-increase",
      title: "Fall in demand",
      topic: "Demand",
      question: "Draw a diagram showing the effect on demand of an increase in consumers incomes for an inferior good.",
      extends: "income-inferior-decrease",
      mount: {
        showAllAxes: true,
        points: true,
        checkId: "income-inferior-increase",
        saveName: "income-inferior-increase.png"
      }
    },
    "substitute-equilibrium": {
      id: "substitute-equilibrium",
      title: "Identify the equilibrium point",
      topic: "Demand",
      seriesTitle: "Changes in demand due to changes in the price of substitutes.",
      question: "Identify the equilibrium point on a demand and supply diagram.",
      answerImage: "equilibrium-point.png",
      mount: {
        showAllAxes: true,
        points: true,
        checkId: "substitute-equilibrium",
        saveName: "substitute-equilibrium.png"
      }
    },
    "substitute-increase": {
      id: "substitute-increase",
      title: "Increase in demand",
      topic: "Demand",
      question: "Draw a diagram showing the effect on demand of an increase in the price of substitutes.",
      extends: "substitute-equilibrium",
      mount: {
        showAllAxes: true,
        points: true,
        checkId: "substitute-increase",
        saveName: "substitute-increase.png"
      }
    },
    "substitute-decrease": {
      id: "substitute-decrease",
      title: "Fall in demand",
      topic: "Demand",
      question: "Draw a diagram showing the effect on demand of a decrease in the price of substitutes.",
      extends: "substitute-increase",
      mount: {
        showAllAxes: true,
        points: true,
        checkId: "substitute-decrease",
        saveName: "substitute-decrease.png"
      }
    },
    "complement-equilibrium": {
      id: "complement-equilibrium",
      title: "Identify the equilibrium point",
      topic: "Demand",
      seriesTitle: "Changes in demand due to changes in the price of complements.",
      question: "Identify the equilibrium point on a demand and supply diagram.",
      answerImage: "equilibrium-point.png",
      mount: {
        showAllAxes: true,
        points: true,
        checkId: "complement-equilibrium",
        saveName: "complement-equilibrium.png"
      }
    },
    "complement-decrease": {
      id: "complement-decrease",
      title: "Increase in demand",
      topic: "Demand",
      question: "Draw a diagram showing the effect on demand of a decrease in the price of complements.",
      extends: "complement-equilibrium",
      mount: {
        showAllAxes: true,
        points: true,
        checkId: "complement-decrease",
        saveName: "complement-decrease.png"
      }
    },
    "complement-increase": {
      id: "complement-increase",
      title: "Fall in demand",
      topic: "Demand",
      question: "Draw a diagram showing the effect on demand of an increase in the price of complements.",
      extends: "complement-decrease",
      mount: {
        showAllAxes: true,
        points: true,
        checkId: "complement-increase",
        saveName: "complement-increase.png"
      }
    },
    "inelastic-solar-equilibrium": {
      id: "inelastic-solar-equilibrium",
      title: "Identify the equilibrium point",
      topic: "Demand",
      seriesTitle: "Demand and supply for an inelastic product such as solar panels.",
      question: "Identify the equilibrium point on a demand and supply diagram for an inelastic product such as solar panels.",
      answerImage: "inelastic-solar-equilibrium.png",
      mount: {
        showAllAxes: true,
        points: true,
        checkId: "inelastic-solar-equilibrium",
        saveName: "inelastic-solar-equilibrium.png"
      }
    },
    "coffee-equilibrium": {
      id: "coffee-equilibrium",
      title: "Coffee market equilibrium",
      topic: "Demand",
      seriesTitle: "The coffee market.",
      question: "Draw a diagram showing the coffee market in equilibrium.",
      answerImage: "coffee-equilibrium.png",
      mount: {
        showAllAxes: true,
        points: true,
        checkId: "coffee-equilibrium",
        saveName: "coffee-equilibrium.png"
      }
    },
    "coffee-tax": {
      id: "coffee-tax",
      title: "Specific tax on coffee",
      topic: "Demand",
      question: "Draw a diagram to show the effect of the government introducing a specific (per unit) tax on coffee.",
      extends: "coffee-equilibrium",
      answerImage: "coffee-tax.png",
      mount: {
        showAllAxes: true,
        points: true,
        checkId: "coffee-tax",
        saveName: "coffee-tax.png"
      }
    },
    "coffee-tax-burden": {
      id: "coffee-tax-burden",
      title: "Consumer and producer burden",
      topic: "Demand",
      question: "Draw a diagram showing the consumer burden and the producer burden created by the specific tax.",
      extends: "coffee-tax",
      answerImage: "coffee-tax-burden.png",
      mount: {
        showAllAxes: true,
        points: true,
        checkId: "coffee-tax-burden",
        saveName: "coffee-tax-burden.png"
      }
    },
    "ppf-features": {
      id: "ppf-features",
      title: "Label the production possibility frontier",
      topic: "Production possibility frontier",
      question: "Drag each label onto the diagram.",
      labelPlace: {
        blank: "ppf-features-blank.png?v=20261004drag",
        answer: "ppf-features-answer.png?v=20261004labelled",
        pieces: [
          { id: "prod-eff", text: "Productive efficiency" },
          { id: "all-a", text: "All Good A no Good B" },
          { id: "all-b", text: "All Good B no Good A" },
          { id: "trade", text: "Trade off" },
          { id: "prod-ineff", text: "Productive inefficiency" },
          { id: "unobtainable", text: "Unobtainable" },
          { id: "alloc", text: "Allocative efficiency" }
        ]
      }
    }
  };

  function modelAnswerItems(spec) {
    return spec && spec.answerImage ? [spec.answerImage] : [];
  }

  function paintModelAnswer(canvas, spec) {
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var sources = answerSources(spec && spec.answerImage);
    if (!sources.length) return;
    var img = new Image();
    loadImageSources(img, sources, function () {
      var scale = Math.min(canvas.width / img.width, canvas.height / img.height);
      var w = img.width * scale;
      var h = img.height * scale;
      ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
    });
  }

  function injectCss() {
    if (document.getElementById("micro-diagram-builder-css")) return;
    var style = document.createElement("style");
    style.id = "micro-diagram-builder-css";
    style.textContent =
      ".micro-diagram-builder{margin-top:10px;padding:10px 12px 12px;border:1px solid #dfe6f3;border-radius:8px;background:#f7f7f7}" +
      ".micro-diagram-builder .row{display:flex;flex-direction:row;align-items:center;gap:10px;flex-wrap:wrap}" +
      ".micro-diagram-builder .db-shape-stack{display:inline-flex;flex-direction:column;align-items:flex-start;gap:6px}" +
      ".micro-diagram-builder .db-shape-head{display:inline-flex;align-items:center;gap:10px}" +
      ".micro-diagram-builder .group{margin-top:12px;padding-top:10px;border-top:1px solid #ddd}" +
      ".micro-diagram-builder .group:first-child{margin-top:0;padding-top:0;border-top:none}" +
      ".micro-diagram-builder .builder-name{font-size:15px;font-weight:800;color:#183a66;margin:0}" +
      ".micro-diagram-builder .db-head{display:flex;flex-direction:row;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin:0 0 8px}" +
      ".micro-diagram-builder .db-axes-bar{display:flex;flex-direction:row;align-items:center;gap:10px;margin:0 0 8px}" +
      ".micro-diagram-builder .db-axes-box[hidden],.micro-diagram-builder .db-movement-box[hidden]{display:none!important}" +
      ".micro-diagram-builder button{background-color:#178a45}" +
      ".micro-diagram-builder button:hover{background-color:#12753a}" +
      ".micro-diagram-builder button.db-live{background-color:#c5161d}" +
      ".micro-diagram-builder button.db-live:hover{background-color:#a51218}" +
      ".micro-diagram-builder .group-title{font-size:12px;font-weight:700;color:#333;margin:0 0 6px;white-space:nowrap}" +
      ".micro-diagram-builder .db-inline-title{margin:0}" +
      ".micro-diagram-builder label{white-space:nowrap}" +
      ".micro-diagram-builder .db-split-row{gap:6px;flex-wrap:nowrap}" +
      ".micro-diagram-builder .db-split-row .db-labelText{min-width:0;width:14em}" +
      ".micro-diagram-builder .db-split{align-self:stretch;width:1px;background:#888;margin:0 2px}" +
      ".micro-diagram-builder .db-pair{display:flex;flex-direction:row;align-items:stretch;gap:12px;margin-top:12px;padding-top:10px;border-top:1px solid #ddd}" +
      ".micro-diagram-builder .db-pair .group{margin-top:0;padding-top:0;border-top:none;min-width:0}" +
      ".micro-diagram-builder .db-pair-line{width:1px;background:#888;flex:0 0 1px}" +
      ".micro-diagram-builder .db-pair .db-command-list{max-width:100%}" +
      ".micro-diagram-builder .status{margin-top:12px;font-size:15px;font-weight:800;color:#111}" +
      ".micro-diagram-builder button{border:none;padding:8px 12px;border-radius:4px;cursor:pointer;font-weight:700;color:#fff;font-family:inherit;position:relative;white-space:nowrap;flex-shrink:0}" +
      ".micro-diagram-builder button.db-showAxes,.micro-diagram-builder button.db-showMovement{background-color:#f6c453;color:#3d2a00}" +
      ".micro-diagram-builder button.db-showAxes:hover,.micro-diagram-builder button.db-showMovement:hover{background-color:#e8b43a}" +
      ".micro-diagram-builder button.db-hideAxes,.micro-diagram-builder button.db-hideMovement{background-color:#b86a00;color:#fff}" +
      ".micro-diagram-builder button.db-hideAxes:hover,.micro-diagram-builder button.db-hideMovement:hover{background-color:#945500}" +
      ".micro-diagram-builder button[data-hint]:hover::after,.micro-diagram-builder button[data-hint]:focus-visible::after{" +
      "content:attr(data-hint);position:absolute;left:0;top:calc(100% + 6px);z-index:8;width:max-content;max-width:16em;" +
      "padding:6px 8px;border-radius:4px;background:#111;color:#fff;font-size:14px;font-weight:800;line-height:1.35;" +
      "white-space:normal;text-align:left;pointer-events:none}" +
      ".micro-diagram-builder button[hidden]{display:none!important}" +
      ".micro-diagram-builder select,.micro-diagram-builder .db-labelText,.micro-diagram-builder .db-axis-y,.micro-diagram-builder .db-axis-x{" +
      "background-color:#fffbe6;color:#111;padding:6px;border-radius:4px;border:1px solid #ccc;font-family:inherit}" +
      ".micro-diagram-builder .db-labelText{min-width:12em}" +
      ".micro-diagram-builder .db-axis-y,.micro-diagram-builder .db-axis-x{min-width:9em}" +
      ".micro-diagram-builder .db-own-axes{display:inline-flex;align-items:center;gap:6px}" +
      ".micro-diagram-builder .db-own-axes[hidden]{display:none!important}" +
      ".micro-diagram-builder canvas{display:block;width:100%;max-width:780px;height:auto;border:2px solid #000;cursor:crosshair;margin-top:10px;background:#fff}" +
      ".micro-diagram-builder .db-shades{display:inline-flex;align-items:center;gap:6px;flex-wrap:nowrap}" +
      ".micro-diagram-builder .db-shadeColour1,.micro-diagram-builder .db-shadeColour2{width:2.4em;height:2em;padding:0;border:1px solid #ccc;border-radius:4px;background:#fff;cursor:pointer}" +
      ".micro-diagram-builder .db-shade-on{box-shadow:0 0 0 3px #111}" +
      ".micro-diagram-builder .db-answer{margin-top:12px;padding:10px 12px;border:1px solid #dfe6f3;border-radius:8px;background:#fff}" +
      ".micro-diagram-builder .db-answer[hidden]{display:none!important}" +
      ".micro-diagram-builder .db-answer-title{font-weight:800;color:#183a66;margin:0 0 4px}" +
      ".micro-diagram-builder .db-answer-note{margin:0 0 8px;font-size:13px;color:#4b5d73}" +
      ".micro-diagram-builder .db-answer-board{cursor:default}" +
      ".micro-diagram-builder .db-shown-answer{margin-top:12px}" +
      ".micro-diagram-builder .db-shown-answer[hidden]{display:none!important}" +
      ".micro-diagram-builder .db-shown-answer img{display:block;width:100%;max-width:780px;height:auto;background:#fff;border:2px solid #000}" +
      ".micro-diagram-builder a.db-next-question{display:inline-block;background-color:#178a45;color:#fff;border-radius:4px;padding:8px 12px;font-weight:700;font-family:inherit;text-decoration:none;white-space:nowrap}" +
      ".micro-diagram-builder a.db-next-question:hover{background-color:#12753a}" +
      ".micro-diagram-builder a.db-return-questions{display:inline-block;background-color:#4b5d73;color:#fff;border-radius:4px;padding:8px 12px;font-weight:700;font-family:inherit;text-decoration:none;white-space:nowrap}" +
      ".micro-diagram-builder a.db-return-questions:hover{background-color:#3a4d63}" +
      ".micro-diagram-builder .db-self-check{margin:12px 0 0;padding:10px 12px;border:1px solid #dfe6f3;border-radius:8px;background:#f7f7f7}" +
      ".micro-diagram-builder .db-self-check-title{margin:0 0 6px;font-weight:800;color:#183a66}" +
      ".micro-diagram-builder .db-self-check ol{margin:0;padding-left:1.3em}" +
      ".micro-diagram-builder .db-self-check li{margin:4px 0}" +
      ".micro-diagram-builder .db-q-stem{margin:12px 0 10px;padding:10px 12px;background:#eef6ff;border:1px solid #dfe6f3;border-radius:8px;font-size:15px;font-weight:700;color:#183a66;line-height:1.4}" +
      ".micro-diagram-builder .db-q-num{display:block;margin:0 0 4px}" +
      ".micro-diagram-builder .db-q-num[hidden]{display:none!important}" +
      ".micro-diagram-builder .db-series{margin:0 0 10px;padding:10px 12px;background:#fff8e8;border:1px solid #e6d3a1;border-radius:8px}" +
      ".micro-diagram-builder .db-series[hidden]{display:none!important}" +
      ".micro-diagram-builder .db-series-title{margin:0 0 4px;font-size:15px;font-weight:800;color:#8a5a00;line-height:1.35}" +
      ".micro-diagram-builder .db-series-note{margin:0;font-size:14px;font-weight:600;color:#3d2a00;line-height:1.45}" +
      ".db-practice{margin-top:10px}" +
      ".db-practice-lead{margin:0 0 10px;font-size:14px;color:#4b5d73}" +
      ".db-q-list{display:flex;flex-direction:column;gap:10px}" +
      ".db-q-card{display:block;width:100%;text-align:left;background:#fff;border:1px solid #dfe6f3;border-radius:8px;padding:12px 14px;cursor:pointer;font-family:inherit;color:#0f2a4a}" +
      ".db-q-card:hover,.db-q-card:focus{background:#eef6ff;border-color:#c5d4ea}" +
      ".db-q-topic{display:block;font-size:11px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#4b5d73;margin:0 0 4px}" +
      ".db-q-series{display:block;font-size:12px;font-weight:800;color:#8a5a00;margin:0 0 4px;line-height:1.35}" +
      ".db-q-text{display:block;font-size:15px;font-weight:700;line-height:1.4;color:#183a66}" +
      ".db-q-go{display:block;margin-top:8px;font-size:13px;font-weight:800;color:#183a66}" +
      ".db-practice-head{margin:0 0 8px}" +
      ".db-practice .db-back{border:none;padding:8px 12px;border-radius:4px;cursor:pointer;font-weight:700;color:#fff;font-family:inherit;background-color:#4b5d73}" +
      ".db-practice .db-back:hover{background-color:#3a4d63}" +
      ".db-label-task .db-label-actions{display:flex;flex-wrap:wrap;gap:8px;align-items:center}" +
      ".db-label-task .db-see{border:none;padding:8px 12px;border-radius:4px;cursor:pointer;font-weight:700;color:#fff;font-family:inherit;background-color:#178a45}" +
      ".db-label-task .db-see:hover{background-color:#12753a}" +
      ".db-label-stage{position:relative;max-width:780px;margin-top:10px;background:#fff;border:2px solid #000;touch-action:none}" +
      ".db-label-base{display:block;width:100%;height:auto;pointer-events:none}" +
      ".db-label-layer{position:absolute;inset:0}" +
      ".db-label-tray{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:12px;padding:10px;border:1px dashed #b7c3d6;border-radius:8px;background:#fff;min-height:54px}" +
      ".db-label-chip{display:inline-flex;align-items:center;justify-content:center;padding:6px 10px;border:1px solid #111;border-radius:4px;background:#fff;color:#111;font-weight:800;font-size:14px;line-height:1.2;cursor:grab;user-select:none;touch-action:none;font-family:inherit}" +
      ".db-label-chip.placed{position:absolute;z-index:2;box-shadow:0 1px 3px rgba(0,0,0,.18)}" +
      ".db-label-chip.db-amber-dot{width:22px;height:22px;padding:0;border-radius:50%;border:2px solid #111;background:#f59e0b}" +
      ".db-label-task .db-q-stem{margin:12px 0 10px;padding:10px 12px;background:#eef6ff;border:1px solid #dfe6f3;border-radius:8px;font-size:15px;font-weight:700;color:#183a66;line-height:1.4}" +
      ".db-label-task .db-status{margin:8px 0;font-size:15px;font-weight:800;color:#111}" +
      ".db-label-task .db-answer{margin-top:12px;padding:10px 12px;border:1px solid #dfe6f3;border-radius:8px;background:#fff}" +
      ".db-label-task .db-answer[hidden]{display:none!important}" +
      ".db-label-task .db-answer-title{font-weight:800;color:#183a66;margin:0 0 4px}" +
      ".db-label-task .db-answer-note{margin:0 0 8px;font-size:13px;color:#4b5d73}" +
      ".db-label-task .db-answer img{display:block;width:100%;max-width:780px;height:auto;border:2px solid #000;background:#fff}" +
      ".db-label-task .db-self-check{margin:12px 0 0;padding:10px 12px;border:1px solid #dfe6f3;border-radius:8px;background:#f7f7f7}" +
      ".db-label-task .db-self-check-title{margin:0 0 6px;font-weight:800;color:#183a66}" +
      ".db-label-task .db-self-check ol{margin:0;padding-left:1.3em}" +
      ".db-label-task .db-self-check li{margin:4px 0}" +
      ".micro-diagram-builder .db-command-list{margin:8px 0 0;padding-left:1.4em;max-width:780px}" +
      ".micro-diagram-builder .db-command-list[hidden]{display:none!important}" +
      ".micro-diagram-builder .db-command-list li{margin:3px 0;padding:2px 6px;border-radius:4px;font-size:14px;font-weight:700;color:#333}" +
      ".micro-diagram-builder .db-command-list li.db-cmd-done{color:#178a45}" +
      ".micro-diagram-builder .db-command-list li.db-cmd-on{background:#eef6ff;color:#183a66}";
    document.head.appendChild(style);
  }

  function presetById(id) {
    if (id === "own-labels") return OWN_LABELS;
    if (id === "cost-revenue") id = "rev-cost";
    if (id === "price-quantity-pc") id = "price-quantity-industry-firm";
    if (id === "good-a-b" || id === "good-ab") id = "good-a-good-b";
    for (var i = 0; i < AXIS_PRESETS.length; i++) {
      if (AXIS_PRESETS[i].id === id) return AXIS_PRESETS[i];
    }
    return AXIS_PRESETS[0];
  }

  function escapeHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function answerFile(name) {
    name = name ? String(name).trim() : "";
    if (!/^[A-Za-z0-9._-]+\.(png|jpe?g|gif|webp)$/i.test(name)) return "";
    return name;
  }

  function answerSources(name) {
    var file = answerFile(name);
    if (!file) return [];
    return [file, "Diagrams/" + file];
  }

  function loadImageSources(img, sources, onload) {
    var index = 0;
    function tryNext() {
      if (index >= sources.length) {
        img.onerror = null;
        return;
      }
      img.onload = onload || null;
      img.onerror = function () {
        index += 1;
        tryNext();
      };
      img.src = sources[index];
    }
    tryNext();
  }

  function resolvePreset(opts) {
    opts = opts || {};
    if (opts.twoPanelPc) {
      return presetById("rev-cost");
    }
    if (opts.axes && typeof opts.axes === "object") {
      return {
        id: "custom",
        label: (opts.axes.yLabel || "Y") + "–" + (opts.axes.xLabel || "X"),
        yLabel: opts.axes.yLabel || "Y",
        xLabel: opts.axes.xLabel || "X",
        button: opts.axes.button || "Place axes"
      };
    }
    return presetById(opts.axes || opts.preset || "price-quantity");
  }

  function allowedPresets(opts) {
    var ids = opts.presetIds;
    if (!ids || !ids.length) return [resolvePreset(opts)];
    var list = [];
    for (var i = 0; i < ids.length; i++) list.push(presetById(ids[i]));
    return list;
  }

  function buildHtml(opts, preset, presets) {
    var showPicker = presets.length > 1;
    var showPoints = opts.points !== false && !!opts.points;
    var twin = !!(opts.twinPanel || opts.twoPanelPc || preset.twin);
    var spec = opts.checkId ? DIAGRAM_BANK[opts.checkId] : null;
    var answerList = answerSources(opts.answerImage);
    var answerImage = answerList[0] || "";
    var idle = opts.idleStatus || (twin
      ? "Idle: choose a mode. Start with " + preset.button + ", or Industry and firm axes."
      : ("Idle: start with " + preset.button + "."));
    var picker = "";
    if (showPicker) {
      picker = "<label>Axes:</label><select class=\"db-presetSelect\" title=\"Choose axis labels\">";
      for (var i = 0; i < presets.length; i++) {
        picker += "<option value=\"" + presets[i].id + "\"" + (presets[i].id === preset.id ? " selected" : "") + ">" +
          presets[i].label + "</option>";
      }
      picker += "</select>";
    }
    var twinBtn = twin
      ? "<button type=\"button\" class=\"db-draw db-btnTwin\" title=\"Two-panel " + preset.yLabel + " and " + preset.xLabel + " axes: Industry (left) and Firm (right)\">Industry and firm axes</button>"
      : "";
    var pointOptions = showPoints
      ? "<option value=\"point-blue\">Blue point</option><option value=\"point-amber\">Amber point</option><option value=\"point-red\">Red point</option>"
      : "";
    var labelListId = "db-label-choices-" + (++labelListSeq);
    var labelChoices = "";
    for (var li = 0; li < LABEL_SUGGESTIONS.length; li++) {
      labelChoices += "<option value=\"" + escapeHtml(LABEL_SUGGESTIONS[li]) + "\"></option>";
    }
    return (
      "<div class=\"micro-diagram-builder\">" +
        "<div class=\"db-head\">" +
          "<p class=\"builder-name\">Micro diagram builder</p>" +
        "</div>" +
        "<div class=\"db-body\">" +
        (spec && spec.question
          ? seriesBlock(spec)
          : "") +
        "<div class=\"db-axes-bar\">" +
          "<button type=\"button\" class=\"db-showAxes\">Axes</button>" +
          "<button type=\"button\" class=\"db-hideAxes\">Hide axes</button>" +
          (opts.hideMovementButtons ? "" :
          "<button type=\"button\" class=\"db-showMovement\">Movement tools</button>" +
          "<button type=\"button\" class=\"db-hideMovement\">Hide Movement tools</button>") +
        "</div>" +
        "<div class=\"group db-axes-box\" hidden><p class=\"group-title\">1. Axes</p><div class=\"row\">" +
          picker +
          "<button type=\"button\" class=\"db-draw db-btnAxes\" title=\"Place labelled " + preset.yLabel + " and " + preset.xLabel + " axes\">" + preset.button + "</button>" +
          twinBtn +
          "<span class=\"db-own-axes\" hidden>" +
            "<label>Y:</label><input type=\"text\" class=\"db-axis-y\" placeholder=\"Vertical axis\" title=\"Label for the vertical axis\">" +
            "<label>X:</label><input type=\"text\" class=\"db-axis-x\" placeholder=\"Horizontal axis\" title=\"Label for the horizontal axis\">" +
          "</span>" +
          "<label>Colour:</label><input type=\"color\" class=\"db-colourPicker\" value=\"#000000\" title=\"Line / label colour\">" +
        "</div></div>" +
        "<div class=\"group\"><p class=\"group-title\">2. Tools</p><div class=\"row\">" +
          "<button type=\"button\" class=\"db-draw db-btnLine\">Straight line</button>" +
          "<button type=\"button\" class=\"db-draw db-btnParallel\" title=\"Add a parallel copy of the line you just added — straight, curved, sharp, dotted, or arrow — the same distance away along its whole length\">Duplicate</button>" +
          "<button type=\"button\" class=\"db-draw db-btnCurve\">Curved line</button>" +
          "<button type=\"button\" class=\"db-draw db-btnSharp\" title=\"A curve with two orange handles, for a sharper bend\">Sharp curve</button>" +
          "<button type=\"button\" class=\"db-fix db-btnFix\" title=\"Press when a straight line, duplicate, curve or shape from this row is finished. Those parts then stay put.\">Fix</button>" +
          "<span class=\"db-shape-stack\">" +
            "<span class=\"db-shape-head\">" +
              "<button type=\"button\" class=\"db-draw db-btnShape\" title=\"Choose a shape below, then press this to draw it\">Specialist shape</button>" +
              "<span class=\"db-shades\"><label>Shade:</label><input type=\"color\" class=\"db-shadeColour1\" value=\"#3b82f6\" title=\"Shade 1 — first shaded-area colour\">" +
              "<input type=\"color\" class=\"db-shadeColour2\" value=\"#f59e0b\" title=\"Shade 2 — second shaded-area colour\"></span>" +
            "</span>" +
            "<select class=\"db-shapeSelect\" title=\"Choose shape type\">" +
              "<option value=\"arrow\">Arrow</option><option value=\"arrow-both\">Arrow both ways</option><option value=\"dotted\">Dotted line</option><option value=\"shade\">Shaded area</option><option value=\"keynesian-as\">Keynesian AS</option><option value=\"mc-curve\">Marginal cost curve</option>" + pointOptions +
            "</select>" +
          "</span>" +
        "</div></div>" +
        "<div class=\"group\"><div class=\"row db-split-row\">" +
          "<span class=\"group-title db-inline-title\">3. Corrections</span>" +
          "<button type=\"button\" class=\"db-undo db-btnUndo\" title=\"Click one part to remove it. Press Delete again for another\">Delete</button>" +
          "<button type=\"button\" class=\"db-clear db-btnClear\">Clear board</button>" +
          "<span class=\"db-split\" aria-hidden=\"true\"></span>" +
          "<span class=\"group-title db-inline-title\">Labelling</span>" +
          "<input type=\"text\" class=\"db-labelText\" list=\"" + labelListId + "\" placeholder=\"Type your own label\" aria-label=\"Type your own label\">" +
          "<datalist id=\"" + labelListId + "\">" + labelChoices + "</datalist>" +
          "<button type=\"button\" class=\"db-label db-btnLabel\">Place label</button>" +
          "<button type=\"button\" class=\"db-rotate db-btnRotate\" title=\"Turn the selected part in 15° steps. Hold Shift to turn the other way. Drag the orange handle to turn it freely.\">Rotate</button>" +
        "</div></div>" +
        (opts.hideSaveReplay
          ? "<div class=\"group\"><div class=\"row\"><button type=\"button\" class=\"db-edit db-btnEdit\">Amend</button>" +
            "<button type=\"button\" class=\"db-show-answer\">Show answer</button>" +
            (opts.returnUrl
              ? "<a class=\"db-return-questions\" href=\"" + escapeHtml(opts.returnUrl) + "\">Return to questions</a>"
              : (opts.question ? "<a class=\"db-next-question\" href=\"exam-practice.html\">Next question</a>" : "")) +
            "</div></div>"
          : "<div class=\"db-pair\">" +
        "<div class=\"group\"><p class=\"group-title\">4. Save diagram</p><div class=\"row\">" +
          "<button type=\"button\" class=\"db-paste db-btnPaste\" title=\"Paste a copied diagram onto the board. You can also click the board and press Ctrl+V, or drop an image onto it.\">Paste diagram</button>" +
          "<button type=\"button\" class=\"db-save db-btnSave\">Save diagram</button>" +
          "<button type=\"button\" class=\"db-edit db-btnEdit\">Amend</button>" +
          (spec
            ? "<button type=\"button\" class=\"db-answer-btn db-btnAnswer\" title=\"Show a finished diagram for this question\">See the answer</button>"
            : "") +
          "</div></div>" +
        "<span class=\"db-pair-line\" aria-hidden=\"true\"></span>" +
        "<div class=\"group\"><p class=\"group-title\">5. Replay</p><div class=\"row\">" +
          "<button type=\"button\" class=\"db-capture db-btnCapture\" title=\"Store this diagram as a list of drawing commands, in the order they were added\">Capture drawing</button>" +
          "<button type=\"button\" class=\"db-replay db-btnReplaySteps\" title=\"Show the list of replay steps\">Show steps</button>" +
          "<button type=\"button\" class=\"db-replay db-btnReplayNext\" hidden title=\"Draw the next captured command\">Next command</button>" +
          "<button type=\"button\" class=\"db-replay db-btnReplayPrev\" hidden title=\"Take off the last replayed command\">Previous</button>" +
          "<button type=\"button\" class=\"db-replay db-btnReplayStop\" hidden title=\"Leave replay and show your diagram again\">Stop replay</button>" +
          "<button type=\"button\" class=\"db-replay db-btnReplaySave\" title=\"Save an HTML file that steps through these drawing commands\">Save replay</button>" +
          "<button type=\"button\" class=\"db-replay db-btnCaptureReset\" title=\"Clear the captured steps and leave replay\">Reset capture</button>" +
        "</div><ol class=\"db-command-list\" hidden></ol></div>" +
        "</div>") +
        "<div class=\"group db-movement-box\" hidden><p class=\"group-title\">6. Movement</p><div class=\"row\">" +
          "<button type=\"button\" class=\"db-shift db-btnShiftStart\" title=\"Remember where the diagram is now. This is the start of the shift\">Mark start</button>" +
          "<button type=\"button\" class=\"db-shift db-btnShiftEnd\" title=\"Remember the diagram after you have moved the curve, price, or arrow\">Mark end</button>" +
          "<button type=\"button\" class=\"db-shift db-btnShiftContinue\" title=\"Continue with this diagram and add the next movement\">Continue</button>" +
          "<button type=\"button\" class=\"db-shift db-btnShiftPlay\" title=\"Play each part of the movement in turn, finishing on the complete diagram\">Play movement</button>" +
          "<button type=\"button\" class=\"db-shift db-btnShiftSave\" title=\"Save an HTML file that plays this movement again\">Save movement</button>" +
          "<button type=\"button\" class=\"db-shift db-btnShiftReset\" title=\"Clear the remembered start and end of the shift\">Reset movement</button>" +
        "</div></div>" +
        (spec && spec.question ? questionStemHtml(spec) : plainQuestionHtml(opts.question)) +
        "<div class=\"status db-status\">" + idle + "</div>" +
        "<canvas class=\"db-board\" width=\"780\" height=\"480\" tabindex=\"0\" aria-label=\"Diagram practice board\"></canvas>" +
        (answerImage
          ? "<div class=\"db-shown-answer\" hidden><img alt=\"Answer diagram\"></div>"
          : "") +
        (spec ? "<div class=\"db-answer\" hidden><p class=\"db-answer-title\">Answer</p><p class=\"db-answer-note\">One finished diagram for this question. Your own diagram is unchanged.</p><canvas class=\"db-answer-board\" width=\"780\" height=\"480\" aria-label=\"Answer diagram\"></canvas><div class=\"db-self-check\"><p class=\"db-self-check-title\">Self check</p><ol><li>Is the axes correct?</li><li>Is movement on the diagram clearly shown using arrows?</li><li>Are all curves labelled correctly?</li><li>Does the diagram have a title?</li><li>Are price and quantity equilibrium identified and labelled?</li></ol></div></div>" : "") +
        "</div>" +
      "</div>"
    );
  }

  function init(root, opts) {
    opts = opts || {};
    var box = root.querySelector(".micro-diagram-builder");
    if (!box) return;
    var hintButtons = box.querySelectorAll("button[title]");
    for (var hi = 0; hi < hintButtons.length; hi++) {
      hintButtons[hi].setAttribute("data-hint", hintButtons[hi].getAttribute("title"));
      hintButtons[hi].removeAttribute("title");
    }
    var canvas = box.querySelector(".db-board");
    var ctx = canvas.getContext("2d");
    var statusEl = box.querySelector(".db-status");
    var btnLine = box.querySelector(".db-btnLine");
    var btnParallel = box.querySelector(".db-btnParallel");
    var btnCurve = box.querySelector(".db-btnCurve");
    var btnSharp = box.querySelector(".db-btnSharp");
    var btnShape = box.querySelector(".db-btnShape");
    var btnAxes = box.querySelector(".db-btnAxes");
    var axesBox = box.querySelector(".db-axes-box");
    var btnShowAxes = box.querySelector(".db-showAxes");
    var btnHideAxes = box.querySelector(".db-hideAxes");
    var movementBox = box.querySelector(".db-movement-box");
    var btnShowMovement = box.querySelector(".db-showMovement");
    var btnHideMovement = box.querySelector(".db-hideMovement");
    var btnTwin = box.querySelector(".db-btnTwin");
    var shapeSelect = box.querySelector(".db-shapeSelect");
    var btnLabel = box.querySelector(".db-btnLabel");
    var btnEdit = box.querySelector(".db-btnEdit");
    var btnRotate = box.querySelector(".db-btnRotate");
    var btnFix = box.querySelector(".db-btnFix");
    var btnUndo = box.querySelector(".db-btnUndo");
    var btnClear = box.querySelector(".db-btnClear");
    var btnSave = box.querySelector(".db-btnSave");
    var btnPaste = box.querySelector(".db-btnPaste");
    var btnCapture = box.querySelector(".db-btnCapture");
    var btnReplaySteps = box.querySelector(".db-btnReplaySteps");
    var btnReplayNext = box.querySelector(".db-btnReplayNext");
    var btnReplayPrev = box.querySelector(".db-btnReplayPrev");
    var btnReplayStop = box.querySelector(".db-btnReplayStop");
    var btnReplaySave = box.querySelector(".db-btnReplaySave");
    var btnCaptureReset = box.querySelector(".db-btnCaptureReset");
    var btnShiftStart = box.querySelector(".db-btnShiftStart");
    var btnShiftEnd = box.querySelector(".db-btnShiftEnd");
    var btnShiftContinue = box.querySelector(".db-btnShiftContinue");
    var btnShiftPlay = box.querySelector(".db-btnShiftPlay");
    var btnShiftSave = box.querySelector(".db-btnShiftSave");
    var btnShiftReset = box.querySelector(".db-btnShiftReset");
    var commandList = box.querySelector(".db-command-list");
    var btnAnswer = box.querySelector(".db-btnAnswer");
    var answerEl = box.querySelector(".db-answer");
    var answerCanvas = box.querySelector(".db-answer-board");
    var checkSpec = opts.checkId ? DIAGRAM_BANK[opts.checkId] : null;
    var colourPicker = box.querySelector(".db-colourPicker");
    var shadeColour1 = box.querySelector(".db-shadeColour1");
    var shadeColour2 = box.querySelector(".db-shadeColour2");
    var activeShade = 1;
    var labelInput = box.querySelector(".db-labelText");
    var ownAxes = box.querySelector(".db-own-axes");
    var axisY = box.querySelector(".db-axis-y");
    var axisX = box.querySelector(".db-axis-x");
    var presetSelect = box.querySelector(".db-presetSelect");
    var showPoints = !!opts.points;
    var activePreset = resolvePreset(opts);
    var twinOn = !!(opts.twinPanel || opts.twoPanelPc || activePreset.twin);
    var leftTitle = "Industry";
    var rightTitle = "Firm";
    var twinYLabel = activePreset.twinYLabel || activePreset.yLabel || "Price";
    var twinXLabel = activePreset.twinXLabel || activePreset.xLabel || "Quantity";
    var saveName = opts.saveName || "diagram.png";

    var pointKinds = [
      { color: "#2563eb", value: "point-blue", name: "Blue point" },
      { color: "#f59e0b", value: "point-amber", name: "Amber point" },
      { color: "#dc2626", value: "point-red", name: "Red point" }
    ];

    var mode = "idle";
    var items = [];
    var starterImg = null;
    var captured = null;
    var replaying = false;
    var replayStep = 0;
    var stepsOpen = false;
    var shiftStages = [];
    var shiftAwaiting = false;
    var shiftStart = null;
    var shiftEnd = null;
    var motionFrame = null;
    var motionPlaying = false;
    var motionTimer = 0;
    var motionRest = false;
    var questionSaveTimer = null;
    function scheduleQuestionSave() {
      if (!checkSpec) return;
      clearTimeout(questionSaveTimer);
      questionSaveTimer = setTimeout(function () {
        rememberSeries(checkSpec, items);
        if (opts.keepQuestionDiagram) rememberQuestion(checkSpec.id, items);
      }, 300);
    }
    var firstPoint = null, secondPoint = null, controlPoint = null, previewPoint = null;
    var shadeDraft = [];
    var showHandles = false, selected = null, dragging = null, dragOffset = { x: 0, y: 0 };
    var pointColor = "#2563eb";
    var labelAngle = 0;
    var rotateArmed = false;
    var rotateSnap = null;

    function normLabelAngle(a) {
      a = Number(a) || 0;
      a = ((Math.round(a) % 360) + 360) % 360;
      return a;
    }
    function nextLabelAngle(a, step) {
      if (step == null) step = 15;
      return normLabelAngle(normLabelAngle(a) + step);
    }
    function angleName(a) {
      a = Math.round(normAngle(a));
      if (a === 360) a = 0;
      if (a === 0) return "0° (horizontal)";
      if (a === 90) return "90°";
      if (a === 180) return "180°";
      if (a === 270) return "270° (vertical)";
      return a + "°";
    }
    function normAngle(a) {
      a = Number(a) || 0;
      return ((a % 360) + 360) % 360;
    }
    function rotatePoint(px, py, cx, cy, deg) {
      var rad = deg * Math.PI / 180;
      var cos = Math.cos(rad);
      var sin = Math.sin(rad);
      var dx = px - cx;
      var dy = py - cy;
      return { x: cx + dx * cos - dy * sin, y: cy + dx * sin + dy * cos };
    }
    function keepsAngle(it) {
      return !!(it && (it.kind === "image" || (it.kind === "shape" && (it.type === "axes" || it.type === "twin-pc-axes"))));
    }
    function itemPivot(it) {
      var i, n, sx, sy;
      if (!it) return null;
      if (it.kind === "label") return { x: it.x, y: it.y };
      if (it.kind === "image") return { x: it.x + it.w / 2, y: it.y + it.h / 2 };
      if (it.kind === "shape" && it.type === "shade" && it.points && it.points.length) {
        sx = 0; sy = 0;
        for (i = 0; i < it.points.length; i++) { sx += it.points[i].x; sy += it.points[i].y; }
        return { x: sx / it.points.length, y: sy / it.points.length };
      }
      if (it.kind === "curve") {
        n = 2; sx = it.x1 + it.x2; sy = it.y1 + it.y2;
        if (it.cx != null) { sx += it.cx; sy += it.cy; n += 1; }
        if (it.c2x != null) { sx += it.c2x; sy += it.c2y; n += 1; }
        return { x: sx / n, y: sy / n };
      }
      if (it.x1 != null && it.x2 != null) return { x: (it.x1 + it.x2) / 2, y: (it.y1 + it.y2) / 2 };
      if (it.x != null) return { x: it.x, y: it.y };
      return null;
    }
    function spunPoint(it, x, y) {
      if (!keepsAngle(it) || !it.angle) return { x: x, y: y };
      var pivot = itemPivot(it);
      return rotatePoint(x, y, pivot.x, pivot.y, it.angle);
    }
    function plainPoint(it, x, y) {
      if (!keepsAngle(it) || !it.angle) return { x: x, y: y };
      var pivot = itemPivot(it);
      return rotatePoint(x, y, pivot.x, pivot.y, -it.angle);
    }
    function spinPair(obj, xk, yk, pivot, deg) {
      if (obj[xk] == null || obj[yk] == null) return;
      var p = rotatePoint(obj[xk], obj[yk], pivot.x, pivot.y, deg);
      obj[xk] = p.x;
      obj[yk] = p.y;
    }
    function turnItem(it, deg) {
      var pivot, i, p;
      if (!it || itemLocked(it)) return false;
      if (it.kind === "shape" && it.type === "point") return false;
      if (it.kind === "label" || keepsAngle(it)) {
        it.angle = normAngle((it.angle || 0) + deg);
        return true;
      }
      pivot = itemPivot(it);
      if (!pivot) return false;
      if (it.points) {
        for (i = 0; i < it.points.length; i++) {
          p = rotatePoint(it.points[i].x, it.points[i].y, pivot.x, pivot.y, deg);
          it.points[i].x = p.x;
          it.points[i].y = p.y;
        }
      }
      spinPair(it, "x1", "y1", pivot, deg);
      spinPair(it, "x2", "y2", pivot, deg);
      spinPair(it, "cx", "cy", pivot, deg);
      spinPair(it, "c2x", "c2y", pivot, deg);
      it.angle = normAngle((it.angle || 0) + deg);
      return true;
    }
    function copyRotatable(it) {
      var raw = {
        angle: it.angle || 0,
        x: it.x, y: it.y, x1: it.x1, y1: it.y1, x2: it.x2, y2: it.y2,
        cx: it.cx, cy: it.cy, c2x: it.c2x, c2y: it.c2y, w: it.w, h: it.h
      };
      if (it.points) raw.points = it.points.map(function (p) { return { x: p.x, y: p.y }; });
      return raw;
    }
    function restoreRotatable(it, raw) {
      ["angle", "x", "y", "x1", "y1", "x2", "y2", "cx", "cy", "c2x", "c2y", "w", "h"].forEach(function (k) {
        if (raw[k] != null) it[k] = raw[k];
      });
      if (raw.points) it.points = raw.points.map(function (p) { return { x: p.x, y: p.y }; });
    }
    function beginFreeRotate(it, x, y) {
      var pivot = it.kind === "label" ? { x: it.x, y: it.y } : itemPivot(it);
      rotateSnap = {
        pivot: pivot,
        pointer: Math.atan2(y - pivot.y, x - pivot.x) * 180 / Math.PI,
        applied: 0,
        item: copyRotatable(it)
      };
    }
    function rotateHandlePoint(it) {
      var pivot, ang;
      if (!it) return null;
      if (it.kind === "label") return labelOuter(it);
      pivot = itemPivot(it);
      if (!pivot) return null;
      ang = ((it.angle || 0) * Math.PI) / 180;
      return { x: pivot.x + Math.cos(ang) * 72, y: pivot.y + Math.sin(ang) * 72 };
    }
    function withItemSpin(it, fn) {
      var ang, pivot;
      if (!keepsAngle(it) || !it.angle) { fn(); return; }
      ang = (it.angle * Math.PI) / 180;
      pivot = itemPivot(it);
      ctx.save();
      ctx.translate(pivot.x, pivot.y);
      ctx.rotate(ang);
      ctx.translate(-pivot.x, -pivot.y);
      fn();
      ctx.restore();
    }

    function currentShadeColour() {
      var el = activeShade === 2 ? shadeColour2 : shadeColour1;
      return (el && el.value) || "#3b82f6";
    }
    function markShadePicker() {
      if (shadeColour1) shadeColour1.classList.toggle("db-shade-on", activeShade === 1);
      if (shadeColour2) shadeColour2.classList.toggle("db-shade-on", activeShade === 2);
    }
    function setActiveShade(n) {
      activeShade = n;
      markShadePicker();
    }
    if (shadeColour1) {
      shadeColour1.addEventListener("click", function () { setActiveShade(1); });
      shadeColour1.addEventListener("input", function () { setActiveShade(1); redraw(); });
    }
    if (shadeColour2) {
      shadeColour2.addEventListener("click", function () { setActiveShade(2); });
      shadeColour2.addEventListener("input", function () { setActiveShade(2); redraw(); });
    }
    markShadePicker();
    function currentY() {
      var picked = chosenPreset();
      if (picked && picked.ownLabels) return axisY ? axisY.value.trim() : "";
      return (picked && picked.yLabel) || "Y";
    }
    function currentX() {
      var picked = chosenPreset();
      if (picked && picked.ownLabels) return axisX ? axisX.value.trim() : "";
      return (picked && picked.xLabel) || "X";
    }

    function applyPreset(p) {
      if (!p) return;
      if (ownAxes) ownAxes.hidden = !p.ownLabels;
      if (btnAxes) {
        if (p.ownLabels) {
          btnAxes.textContent = p.button;
          btnAxes.setAttribute("data-hint", "Place axes using the labels you type");
          btnAxes.removeAttribute("title");
        } else {
          btnAxes.textContent = p.button;
          btnAxes.setAttribute("data-hint", p.twoPanel
            ? "Place two panels, each labelled " + p.yLabel + " and " + p.xLabel
            : "Place labelled " + p.yLabel + " and " + p.xLabel + " axes");
          btnAxes.removeAttribute("title");
        }
      }
    }

    function chosenPreset() {
      if (presetSelect && presetSelect.value) return presetById(presetSelect.value);
      return activePreset;
    }

    function isPointType(t) {
      return t === "point-blue" || t === "point-amber" || t === "point-red" || t === "point";
    }
    function startPointMode(color, value, name) {
      mode = "point";
      pointColor = color;
      if (shapeSelect) shapeSelect.value = value;
      firstPoint = secondPoint = controlPoint = previewPoint = null;
      showHandles = false; selected = null;
      statusEl.textContent = name + " mode: click once to place a point.";
      useButton(btnShape);
      redraw();
    }
    function idleTools() {
      firstPoint = secondPoint = controlPoint = previewPoint = null;
      shadeDraft = [];
      showHandles = false; selected = null;
      rotateArmed = false;
      rotateSnap = null;
    }
    function useButton(btn) {
      var all = box.querySelectorAll("button");
      var i;
      for (i = 0; i < all.length; i++) all[i].classList.remove("db-live");
      if (btn) btn.classList.add("db-live");
    }

    function syncTwinButtons() {
      if (!twinOn || !btnAxes) return;
      var hasSingle = items.some(function (it) { return it.kind === "shape" && it.type === "axes"; });
      var hasTwin = items.some(function (it) { return it.kind === "shape" && it.type === "twin-pc-axes"; });
      if (btnTwin) {
        btnTwin.hidden = hasSingle;
        btnTwin.style.display = hasSingle ? "none" : "";
      }
      btnAxes.hidden = hasTwin;
      btnAxes.style.display = hasTwin ? "none" : "";
    }

    function refreshOwnLabelStatus() {
      var picked = chosenPreset();
      if (!picked || !picked.ownLabels) return;
      if (!currentY() || !currentX()) {
        statusEl.textContent = "Type the vertical axis label and the horizontal axis label, then press the axes button.";
        return;
      }
      statusEl.textContent = "Press the axes button to place these labels.";
    }
    if (axisY) axisY.addEventListener("input", refreshOwnLabelStatus);
    if (axisX) axisX.addEventListener("input", refreshOwnLabelStatus);

    if (presetSelect) {
      presetSelect.onchange = function () {
        var picked = presetById(presetSelect.value);
        applyPreset(picked);
        if (picked.ownLabels) refreshOwnLabelStatus();
      };
    }

    btnLine.onclick = function () {
      mode = "line"; idleTools();
      useButton(btnLine);
      showHandles = true;
      statusEl.textContent = "Straight line: click the start, then the end. Drag the blue ends until you press Fix.";
      redraw();
    };
    function duplicableLine(it) {
      if (!it) return false;
      if (it.kind === "line" || it.kind === "curve") return true;
      return it.kind === "shape" && (it.type === "dotted" || it.type === "arrow" || it.type === "arrow-both");
    }
    function latestLine() {
      for (var i = items.length - 1; i >= 0; i--) {
        if (duplicableLine(items[i])) return items[i];
      }
      return null;
    }
    function duplicateName(it) {
      if (it.kind === "line") return "straight line";
      if (it.kind === "curve") return it.c2x != null ? "sharp curve" : "curved line";
      if (it.type === "dotted") return "dotted line";
      if (it.type === "arrow-both") return "arrow both ways";
      if (it.type === "arrow") return "arrow";
      return "line";
    }
    if (btnParallel) {
      btnParallel.onclick = function () {
        var src = latestLine();
        if (!src) {
          statusEl.textContent = "Draw a line first. Duplicate then places a parallel copy of the line you just added.";
          return;
        }
        var dx = src.x2 - src.x1;
        var dy = src.y2 - src.y1;
        var len = Math.hypot(dx, dy) || 1;
        var nx = -dy / len;
        var ny = dx / len;
        if (ny > 0 || (Math.abs(ny) < 0.2 && nx < 0)) { nx = -nx; ny = -ny; }
        var ox = nx * 48;
        var oy = ny * 48;
        var copy = {};
        var key;
        for (key in src) {
          if (!Object.prototype.hasOwnProperty.call(src, key)) continue;
        if (key === "fixed" || key === "group") continue;
          copy[key] = src[key];
        }
        ["x1", "x2", "cx", "c2x"].forEach(function (k) {
          if (typeof copy[k] === "number") copy[k] += ox;
        });
        ["y1", "y2", "cy", "c2y"].forEach(function (k) {
          if (typeof copy[k] === "number") copy[k] += oy;
        });
        copy.color = colourPicker.value;
        mode = "idle"; idleTools();
        items.push(copy);
        statusEl.textContent = "Parallel copy added beside the " + duplicateName(src) + " you just added. It stays the same distance away along its whole length.";
        useButton(btnParallel);
        redraw();
      };
    }
    btnCurve.onclick = function () {
      mode = "curve";
      idleTools();
      useButton(btnCurve);
      var open = openCurve(false);
      if (open) {
        selected = open;
        showHandles = true;
        statusEl.textContent = "Drag a blue end or the amber handle. They keep working until you press Fix.";
      } else {
        statusEl.textContent = "Curved line: click the start, click the end, then drag a blue end or the amber handle. Press Fix when it is finished.";
      }
      redraw();
    };
    if (btnSharp) {
      btnSharp.onclick = function () {
        mode = "sharp";
        idleTools();
        useButton(btnSharp);
        var open = openCurve(true);
        if (open) {
          selected = open;
          showHandles = true;
          statusEl.textContent = "Drag a blue end or either amber handle. They keep working until you press Fix.";
        } else {
          statusEl.textContent = "Sharp curve: click the start, click the end, then drag a blue end or either amber handle. Press Fix when it is finished.";
        }
        redraw();
      };
    }
    var keynesianSeq = 0;
    var mcSeq = 0;
    function placeKeynesianAs() {
      var color = colourPicker.value;
      var groupId = "keynesian-as-" + (++keynesianSeq);
      mode = "idle";
      idleTools();
      useButton(btnShape);
      items.push(
        { kind: "line", x1: 190, y1: 345, x2: 450, y2: 345, color: color, group: groupId },
        { kind: "curve", x1: 450, y1: 345, x2: 590, y2: 180, cx: 590, cy: 345, bt: 0.5, color: color, group: groupId },
        { kind: "line", x1: 590, y1: 180, x2: 590, y2: 58, color: color, group: groupId }
      );
      statusEl.textContent = "Keynesian AS added. Press Amend and drag it to move the whole curve.";
      redraw();
    }
    function placeMcCurve() {
      var color = colourPicker.value;
      var groupId = "mc-curve-" + (++mcSeq);
      mode = "idle";
      idleTools();
      useButton(btnShape);
      items.push(
        { kind: "curve", x1: 220, y1: 306, x2: 340, y2: 356, cx: 270, cy: 356, bt: 0.5, color: color, group: groupId },
        { kind: "curve", x1: 340, y1: 356, x2: 600, y2: 55, cx: 430, cy: 356, bt: 0.5, color: color, group: groupId }
      );
      statusEl.textContent = "Marginal cost curve added. Press Amend and drag it to move the whole curve.";
      redraw();
    }
    btnShape.onclick = function () {
      var t = shapeSelect.value;
      if (t === "keynesian-as") {
        placeKeynesianAs();
        return;
      }
      if (t === "mc-curve") {
        placeMcCurve();
        return;
      }
      if (isPointType(t)) {
        var match = pointKinds.filter(function (p) { return p.value === t; })[0];
        startPointMode(POINT_FILL[t], t, match ? match.name : "Point");
        return;
      }
      if (t === "shade") {
        mode = "shade"; idleTools();
        useButton(btnShape);
        statusEl.textContent = "Shaded area: click around the region (triangle or box). Click the first corner again to close, or double-click. Shade 1 or Shade 2 sets the fill (the ringed picker is active).";
        redraw();
        return;
      }
      mode = "shape"; idleTools();
      useButton(btnShape);
      if (t === "dotted") {
        statusEl.textContent = "Dotted line: click the two blue ends. Near-vertical snaps to 90°, near-horizontal to 0°. Other angles stay as drawn; Amend later if needed.";
      } else {
        statusEl.textContent = "Shape mode: Arrow, Arrow both ways, or Dotted line. Click start, then end.";
      }
      redraw();
    };
    if (shapeSelect) {
      shapeSelect.onchange = function () {
        // Always switch the live specialist tool to the new choice so modes like
        // shade do not keep drawing after Arrow / Dotted line is selected.
        btnShape.onclick();
      };
    }
    if (btnShowAxes && axesBox) {
      btnShowAxes.onclick = function () { axesBox.hidden = false; };
    }
    if (btnHideAxes && axesBox) {
      btnHideAxes.onclick = function () { axesBox.hidden = true; };
    }
    if (btnShowMovement && movementBox) {
      btnShowMovement.onclick = function () { movementBox.hidden = false; };
    }
    if (btnHideMovement && movementBox) {
      btnHideMovement.onclick = function () { movementBox.hidden = true; };
    }
    btnAxes.onclick = function () {
      mode = "idle"; idleTools();
      var pickedNow = chosenPreset();
      if (pickedNow && pickedNow.ownLabels && (!currentY() || !currentX())) {
        statusEl.textContent = "Type the vertical axis label and the horizontal axis label, then press the axes button.";
        redraw();
        return;
      }
      useButton(btnAxes);
      var picked = chosenPreset();
      if (picked && picked.twoPanel) {
        var twinY = picked.yLabel;
        var twinX = picked.xLabel;
        var titled = !!picked.panelTitles;
        items.push({
          kind: "shape",
          type: "twin-pc-axes",
          x1: 48, y1: canvas.height - 40, x2: canvas.width - 22, y2: 50,
          color: colourPicker.value,
          xLabel: twinX,
          yLabel: twinY,
          showTitles: titled,
          leftTitle: titled ? "Industry" : "",
          rightTitle: titled ? "Firm" : ""
        });
        statusEl.textContent = titled
          ? "Industry (left) and firm (right) added. Each axis pair is " + twinY + " and " + twinX + "."
          : "Two panels added. Each is labelled " + twinY + " and " + twinX + ". Amend to resize or move.";
        redraw();
        return;
      }
      var yLab = currentY();
      var xLab = currentX();
      var leftPad = Math.max(70, yAxisTitleGap(yLab) + 36);
      items.push({
        kind: "shape",
        type: "axes",
        x1: leftPad, y1: canvas.height - 50, x2: canvas.width - 40, y2: 36,
        color: colourPicker.value,
        xLabel: xLab,
        yLabel: yLab,
        ownLabels: !!(picked && picked.ownLabels)
      });
      statusEl.textContent = yLab + " and " + xLab + " axes added. Amend to resize or move.";
      redraw();
    };
    if (btnTwin) {
      btnTwin.onclick = function () {
        mode = "idle"; idleTools();
        useButton(btnTwin);
        items.push({
          kind: "shape",
          type: "twin-pc-axes",
          x1: 48, y1: canvas.height - 40, x2: canvas.width - 22, y2: 50,
          color: colourPicker.value,
          xLabel: twinXLabel,
          yLabel: twinYLabel,
          leftTitle: leftTitle,
          rightTitle: rightTitle
        });
        statusEl.textContent = "Industry (left) and firm (right) axes added. Amend to resize or move.";
        redraw();
      };
    }
    btnLabel.onclick = function () {
      mode = "label"; idleTools();
      useButton(btnLabel);
      showHandles = true;
      statusEl.textContent = "Label mode: type text and click to place. Drag a placed label to move it. Press Rotate to turn a label or any other part.";
      redraw();
    };
    if (btnEdit) btnEdit.onclick = function () {
      items.forEach(function (it) { it.fixed = false; });
      mode = "edit";
      useButton(btnEdit);
      showHandles = true; selected = null;
      statusEl.textContent = rigidAmendStatus();
      redraw();
    };
    var btnShowAnswer = box.querySelector(".db-show-answer");
    var shownAnswer = box.querySelector(".db-shown-answer");
    var shownAnswerImg = shownAnswer && shownAnswer.querySelector("img");
    var shownAnswerSources = answerSources(opts.answerImage);
    if (shownAnswerImg && shownAnswerSources.length) {
      loadImageSources(shownAnswerImg, shownAnswerSources, function () {
        if (!shownAnswer.hidden) {
          shownAnswer.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });
    }
    if (btnShowAnswer) {
      btnShowAnswer.onclick = function () {
        if (!shownAnswer) {
          statusEl.textContent = "There is no finished answer for this question yet.";
          return;
        }
        shownAnswer.hidden = false;
        if (shownAnswerImg && shownAnswerImg.naturalWidth) {
          shownAnswer.scrollIntoView({ behavior: "smooth", block: "center" });
          statusEl.textContent = "The answer diagram is shown under your board.";
        } else if (shownAnswerImg && !shownAnswerImg.getAttribute("src")) {
          statusEl.textContent = "There is no finished answer for this question yet.";
        } else {
          statusEl.textContent = "The answer diagram is shown under your board.";
          shownAnswer.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      };
    }
    if (btnRotate) {
      btnRotate.onclick = function (e) {
        var step = (e && e.shiftKey) ? -15 : 15;
        var target = selected && !itemLocked(selected) ? selected : null;
        var i;
        if (!target) {
          for (i = items.length - 1; i >= 0; i--) {
            if (!itemLocked(items[i]) && !rigidGroup(items[i])) { target = items[i]; break; }
          }
        }
        if (!target) {
          statusEl.textContent = "Draw something on the diagram first, then press Rotate.";
          return;
        }
        if (rigidGroup(target)) {
          statusEl.textContent = "The " + rigidLabel(rigidGroup(target)) + " can only be moved. Press Amend and drag it.";
          return;
        }
        if (target.kind === "shape" && target.type === "point") {
          selected = target;
          showHandles = true;
          statusEl.textContent = "A point has no direction to turn. Select a line, curve, label, arrow, shade, or the axes.";
          redraw();
          return;
        }
        if (!turnItem(target, step)) {
          statusEl.textContent = "That part cannot be turned.";
          return;
        }
        rotateArmed = true;
        rotateSnap = null;
        useButton(btnRotate);
        selected = target;
        showHandles = true;
        labelAngle = target.angle || 0;
        statusEl.textContent = "Rotate is on. " + commandName(target) + " is at " + angleName(target.angle || 0) + ". Press Rotate again, or hold Shift to turn the other way. Drag the orange handle to turn it freely.";
        redraw();
      };
    }
    if (btnFix) {
      btnFix.onclick = function () {
        if (mode === "shade" && shadeDraft.length >= 3) finishShade();
        items.forEach(function (it) { it.fixed = true; });
        mode = "idle";
        idleTools();
        useButton(btnFix);
        dragging = null;
        statusEl.textContent = "Fixed. Those parts stay put. Draw more if you need to. Amend and Delete only change new parts.";
        redraw();
      };
    }
    btnUndo.onclick = function () {
      mode = "delete";
      idleTools();
      useButton(btnUndo);
      showHandles = true;
      statusEl.textContent = "Delete: click each part you want to remove. It stays on until you press another button.";
      redraw();
    };
    btnClear.onclick = function () {
      var clearPrompt = starterImg
        ? "Clear what you have added? The given diagram stays."
        : "Clear the whole board?";
      if (!confirm(clearPrompt)) return;
      mode = "idle";
      items = [];
      box._diagramItems = items;
      replaying = false;
      replayStep = 0;
      forgetShift();
      syncReplayButtons();
      renderCommandList();
      if (opts.keepQuestionDiagram && checkSpec) rememberQuestion(checkSpec.id, items);
      rememberSeries(checkSpec, items);
      idleTools();
      useButton(btnClear);
      statusEl.textContent = captured && captured.length
        ? "Cleared. The captured commands are still available. Press Next command to replay them."
        : (starterImg ? "Cleared what you added. The given diagram is still on the board." : "Cleared. Idle.");
      resetCanvas();
      redraw();
    };
    if (btnSave) btnSave.onclick = function () {
      var wasEdit = showHandles;
      showHandles = false;
      redraw();
      rememberSeries(checkSpec, items);
      if (opts.keepQuestionDiagram && checkSpec) rememberQuestion(checkSpec.id, items);
      var link = document.createElement("a");
      link.download = saveName;
      link.href = canvas.toDataURL("image/png");
      link.click();
      showHandles = wasEdit;
      redraw();
      useButton(btnSave);
      statusEl.textContent = "Diagram kept on this page. It will still be here after a refresh. A copy was also downloaded.";
    };
    function commandName(it) {
      if (!it) return "Drawing";
      if (it.kind === "line") return "Straight line";
      if (it.kind === "curve") return it.c2x != null ? "Sharp curve" : "Curved line";
      if (it.kind === "label") return it.text ? "Label \"" + it.text + "\"" : "Label";
      if (it.kind === "image") return "Pasted diagram";
      if (it.kind === "shape") {
        if (it.type === "axes") return (it.yLabel || "Y") + " and " + (it.xLabel || "X") + " axes";
        if (it.type === "twin-pc-axes") {
          if (it.showTitles === false) return (it.yLabel || "Y") + " and " + (it.xLabel || "X") + " axes (two panels)";
          return "Industry and firm axes";
        }
        if (it.type === "arrow") return "Arrow";
        if (it.type === "arrow-both") return "Arrow both ways";
        if (it.type === "dotted") return "Dotted line";
        if (it.type === "shade") return "Shaded area";
        if (it.type === "point") {
          if (it.color === "#2563eb") return "Blue point";
          if (it.color === "#f59e0b") return "Amber point";
          if (it.color === "#ef4444" || it.color === "#dc2626") return "Red point";
          return "Point";
        }
      }
      return "Drawing";
    }
    function cloneCommands(list) {
      var out = [];
      var i, key, copy;
      for (i = 0; i < list.length; i++) {
        copy = {};
        for (key in list[i]) {
          if (!Object.prototype.hasOwnProperty.call(list[i], key)) continue;
          if (key === "img" || key === "_loading") continue;
          copy[key] = list[i][key];
        }
        out.push(JSON.parse(JSON.stringify(copy)));
      }
      return out;
    }
    function renderCommandList() {
      if (!commandList) return;
      if (!captured || !captured.length || !stepsOpen) {
        commandList.hidden = true;
        if (!captured || !captured.length) commandList.innerHTML = "";
        return;
      }
      var html = "";
      var i, cls;
      for (i = 0; i < captured.length; i++) {
        cls = "";
        if (replaying) {
          if (i < replayStep - 1) cls = " class=\"db-cmd-done\"";
          else if (i === replayStep - 1) cls = " class=\"db-cmd-on\"";
        }
        html += "<li" + cls + ">" + escapeHtml(commandName(captured[i])) + "</li>";
      }
      commandList.hidden = false;
      commandList.innerHTML = html;
    }
    function syncStepsButton() {
      if (!btnReplaySteps) return;
      btnReplaySteps.textContent = stepsOpen ? "Hide steps" : "Show steps";
      btnReplaySteps.setAttribute("data-hint", stepsOpen
        ? "Hide the list of replay steps"
        : "Show the list of replay steps");
    }
    function syncReplayButtons() {
      var has = !!(captured && captured.length);
      if (btnReplayNext) btnReplayNext.hidden = !has;
      if (btnReplayPrev) btnReplayPrev.hidden = !replaying;
      if (btnReplayStop) btnReplayStop.hidden = !replaying;
    }
    function replayStatus() {
      if (!captured || !captured.length) return;
      if (!replaying) {
        statusEl.textContent = "Captured " + captured.length + " drawing command" + (captured.length === 1 ? "" : "s") + ". Press Next command to replay them one at a time, or Show steps to see the list.";
        return;
      }
      if (replayStep <= 0) {
        statusEl.textContent = "Replay ready. The board is clear. Press Next command to draw the first command.";
        return;
      }
      var msg = "Replay " + replayStep + " of " + captured.length + ": " + commandName(captured[replayStep - 1]) + ".";
      if (replayStep >= captured.length) msg += " That is the last command.";
      else msg += " Press Next command for the next one.";
      statusEl.textContent = msg;
    }
    function showReplayStep(n) {
      replaying = true;
      replayStep = n;
      mode = "idle";
      idleTools();
      dragging = null;
      useButton(n > 0 ? btnReplayNext : null);
      syncReplayButtons();
      renderCommandList();
      redraw();
      replayStatus();
    }
    function stopReplay(message) {
      replaying = false;
      replayStep = 0;
      syncReplayButtons();
      renderCommandList();
      if (message) statusEl.textContent = message;
    }
    if (btnCapture) {
      btnCapture.onclick = function () {
        if (!items.length) {
          statusEl.textContent = "Draw the diagram first, then press Capture drawing.";
          return;
        }
        captured = cloneCommands(items);
        replaying = false;
        replayStep = 0;
        stepsOpen = false;
        useButton(btnCapture);
        syncReplayButtons();
        syncStepsButton();
        renderCommandList();
        redraw();
        replayStatus();
      };
    }
    if (btnReplaySteps) {
      btnReplaySteps.onclick = function () {
        if (!captured || !captured.length) {
          statusEl.textContent = "Capture the drawing first, then press Show steps.";
          return;
        }
        stepsOpen = !stepsOpen;
        syncStepsButton();
        renderCommandList();
        useButton(btnReplaySteps);
        statusEl.textContent = stepsOpen
          ? "Replay steps are shown. Press Hide steps to close the list."
          : "Replay steps are hidden.";
      };
    }
    if (btnCaptureReset) {
      btnCaptureReset.onclick = function () {
        captured = null;
        stepsOpen = false;
        replaying = false;
        replayStep = 0;
        syncReplayButtons();
        syncStepsButton();
        renderCommandList();
        useButton(btnCaptureReset);
        redraw();
        statusEl.textContent = "Capture reset. The replay steps have been cleared, and your diagram is on the board.";
      };
    }
    if (btnReplaySave) {
      btnReplaySave.onclick = function () {
        if (!captured || !captured.length) {
          statusEl.textContent = "Capture the drawing first, then press Save replay.";
          return;
        }
        var steps = [];
        var si;
        for (si = 0; si < captured.length; si++) {
          steps.push({ name: commandName(captured[si]), item: captured[si] });
        }
        var htmlName = String(saveName || "diagram.png").replace(/\.png$/i, "") + "-replay.html";
        var blob = new Blob([replayFileHtml(steps)], { type: "text/html" });
        var url = URL.createObjectURL(blob);
        var link = document.createElement("a");
        link.download = htmlName;
        link.href = url;
        link.click();
        setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
        useButton(btnReplaySave);
        statusEl.textContent = "Replay saved as an HTML file. Open that file to step through the drawing again.";
      };
    }
    if (btnReplayNext) {
      btnReplayNext.onclick = function () {
        if (!captured || !captured.length) return;
        if (!replaying) {
          showReplayStep(1);
          return;
        }
        if (replayStep >= captured.length) {
          replayStatus();
          return;
        }
        showReplayStep(replayStep + 1);
      };
    }
    if (btnReplayPrev) {
      btnReplayPrev.onclick = function () {
        if (!replaying) return;
        showReplayStep(Math.max(0, replayStep - 1));
      };
    }
    if (btnReplayStop) {
      btnReplayStop.onclick = function () {
        stopReplay("Replay stopped. Your diagram is back on the board.");
        useButton(null);
        redraw();
      };
    }
    function ensureShiftIds(list) {
      var i;
      for (i = 0; i < list.length; i++) {
        if (!list[i].shiftId) list[i].shiftId = "s" + Math.random().toString(36).slice(2, 10);
      }
    }
    function stopMotion() {
      if (motionTimer) cancelAnimationFrame(motionTimer);
      motionTimer = 0;
      motionPlaying = false;
      motionFrame = null;
    }
    function syncShiftPair() {
      if (shiftStages.length >= 2) {
        shiftStart = shiftStages[shiftStages.length - 2];
        shiftEnd = shiftStages[shiftStages.length - 1];
      } else if (shiftStages.length === 1) {
        shiftStart = shiftStages[0];
        shiftEnd = null;
      } else {
        shiftStart = null;
        shiftEnd = null;
      }
    }
    function forgetShift() {
      stopMotion();
      motionRest = false;
      shiftAwaiting = false;
      shiftStages = [];
      shiftStart = null;
      shiftEnd = null;
    }
    function shiftPartCount() {
      return Math.max(0, shiftStages.length - 1);
    }
    function shiftDistance(a, b) {
      var ax = a.x1 != null ? a.x1 : a.x;
      var ay = a.y1 != null ? a.y1 : a.y;
      var bx = b.x1 != null ? b.x1 : b.x;
      var by = b.y1 != null ? b.y1 : b.y;
      if (ax == null || bx == null) return 0;
      return Math.hypot(ax - bx, ay - by);
    }
    function shiftPartner(endItem) {
      if (endItem.kind !== "curve" && endItem.kind !== "line") return null;
      var best = null;
      var bestD = Infinity;
      var i, s, d;
      for (i = 0; i < shiftStart.length; i++) {
        s = shiftStart[i];
        if (s.kind !== endItem.kind) continue;
        if ((s.type || "") !== (endItem.type || "")) continue;
        if (s.kind === "curve" && (s.c2x == null) !== (endItem.c2x == null)) continue;
        d = shiftDistance(s, endItem);
        if (d < bestD) { bestD = d; best = s; }
      }
      return best;
    }
    function sameShiftShape(a, b) {
      if (!a || !b) return false;
      if (a.kind !== b.kind) return false;
      if ((a.type || "") !== (b.type || "")) return false;
      if ((a.c2x == null) !== (b.c2x == null)) return false;
      if (a.kind === "label" && a.text !== b.text) return false;
      return true;
    }
    function mixShiftItem(a, b, t) {
      var base = JSON.parse(JSON.stringify(b || a));
      var keys = ["x", "y", "x1", "y1", "x2", "y2", "cx", "cy", "c2x", "c2y", "w", "h", "angle"];
      var i, k, n, pa, pb;
      if (a && b) {
        for (i = 0; i < keys.length; i++) {
          k = keys[i];
          if (typeof a[k] === "number" && typeof b[k] === "number") base[k] = a[k] + (b[k] - a[k]) * t;
        }
        if (a.points && b.points) {
          n = Math.max(a.points.length, b.points.length);
          base.points = [];
          for (i = 0; i < n; i++) {
            pa = a.points[Math.min(i, a.points.length - 1)];
            pb = b.points[Math.min(i, b.points.length - 1)];
            base.points.push({ x: pa.x + (pb.x - pa.x) * t, y: pa.y + (pb.y - pa.y) * t });
          }
        }
        base._alpha = 1;
      } else if (a) {
        base._alpha = 1 - t;
      } else {
        base._alpha = t;
      }
      return base;
    }
    function shiftFrame(t) {
      var byId = {};
      var used = {};
      var frame = [];
      var ghosts = [];
      var i, id, from;
      for (i = 0; i < shiftStart.length; i++) byId[shiftStart[i].shiftId] = shiftStart[i];
      for (i = 0; i < shiftEnd.length; i++) {
        id = shiftEnd[i].shiftId;
        used[id] = true;
        from = byId[id] || null;
        if (!from) {
          var partner = shiftPartner(shiftEnd[i]);
          if (partner) frame.push(mixShiftItem(partner, shiftEnd[i], t));
          else frame.push(mixShiftItem(null, shiftEnd[i], t));
        } else if (!sameShiftShape(from, shiftEnd[i])) {
          frame.push(mixShiftItem(from, null, t));
          frame.push(mixShiftItem(null, shiftEnd[i], t));
        } else {
          frame.push(mixShiftItem(from, shiftEnd[i], t));
        }
      }
      for (i = 0; i < shiftStart.length; i++) {
        id = shiftStart[i].shiftId;
        if (!used[id]) ghosts.push(mixShiftItem(shiftStart[i], null, t));
      }
      return ghosts.concat(frame);
    }
    function applyShiftEnd() {
      var copy = cloneCommands(shiftEnd);
      items.splice(0, items.length);
      for (var i = 0; i < copy.length; i++) items.push(copy[i]);
      box._diagramItems = items;
    }
    function playMovement() {
      if (replaying) {
        statusEl.textContent = "Stop replay before playing the movement.";
        return;
      }
      if (shiftStages.length < 2) {
        statusEl.textContent = "Press Mark start, move the curve, price, or arrow, then press Mark end.";
        return;
      }
      if (shiftAwaiting) {
        statusEl.textContent = "Press Mark end to finish this part, then press Play movement.";
        return;
      }
      stopMotion();
      motionRest = false;
      motionPlaying = true;
      mode = "idle";
      idleTools();
      dragging = null;
      useButton(btnShiftPlay);
      var seg = 0;
      var lastSeg = shiftStages.length - 2;
      function playSeg() {
        shiftStart = shiftStages[seg];
        shiftEnd = shiftStages[seg + 1];
        motionFrame = shiftFrame(0);
        redraw();
        var t0 = performance.now();
        function frame(now) {
          var k = Math.min(1, (now - t0) / 1100);
          var eased = k * k * (3 - 2 * k);
          motionFrame = shiftFrame(eased);
          redraw();
          if (k < 1) {
            motionTimer = requestAnimationFrame(frame);
            return;
          }
          if (seg < lastSeg) {
            seg += 1;
            playSeg();
            return;
          }
          motionTimer = 0;
          motionPlaying = false;
          motionFrame = null;
          motionRest = false;
          syncShiftPair();
          applyShiftEnd();
          redraw();
          statusEl.textContent = shiftPartCount() > 1
            ? "The complete diagram is shown. Press Play movement to see every part again, or Continue to add another movement."
            : "The complete diagram is shown. Press Play movement to see the shift again, or Continue to add another movement.";
        }
        motionTimer = requestAnimationFrame(frame);
      }
      statusEl.textContent = shiftPartCount() > 1
        ? "Playing " + shiftPartCount() + " parts. It finishes on the complete diagram."
        : "Playing the shift. It finishes on the complete diagram.";
      playSeg();
    }
    if (btnShiftStart) {
      btnShiftStart.onclick = function () {
        if (replaying || motionPlaying) return;
        if (!items.length) {
          statusEl.textContent = "Draw the diagram first, then press Mark start.";
          return;
        }
        ensureShiftIds(items);
        shiftStages = [cloneCommands(items)];
        shiftAwaiting = true;
        motionRest = false;
        syncShiftPair();
        useButton(btnShiftStart);
        statusEl.textContent = "Start remembered. Add the second curve, or move the curve, price, or arrow, then press Mark end.";
      };
    }
    if (btnShiftEnd) {
      btnShiftEnd.onclick = function () {
        if (replaying || motionPlaying) return;
        if (!shiftStages.length) {
          statusEl.textContent = "Press Mark start before you move the diagram.";
          return;
        }
        if (motionRest && !shiftAwaiting) {
          statusEl.textContent = "Press Continue to add the next movement, or Play movement to show the parts already marked.";
          return;
        }
        ensureShiftIds(items);
        var snap = cloneCommands(items);
        if (shiftAwaiting || shiftStages.length < 2) shiftStages.push(snap);
        else shiftStages[shiftStages.length - 1] = snap;
        shiftAwaiting = false;
        syncShiftPair();
        mode = "idle";
        idleTools();
        dragging = null;
        motionRest = true;
        useButton(btnShiftEnd);
        redraw();
        statusEl.textContent = shiftPartCount() === 1
          ? "Part 1 is marked. The first curve is shown. Press Play movement, or Continue to add the next movement."
          : "Part " + shiftPartCount() + " is marked. Press Play movement to run every part. It finishes on the complete diagram.";
      };
    }
    if (btnShiftContinue) {
      btnShiftContinue.onclick = function () {
        if (replaying || motionPlaying) return;
        if (!shiftEnd) {
          statusEl.textContent = "Press Mark end before continuing with this diagram.";
          return;
        }
        if (shiftAwaiting) {
          statusEl.textContent = "Add the next movement on this diagram, then press Mark end.";
          return;
        }
        applyShiftEnd();
        motionRest = false;
        shiftAwaiting = true;
        mode = "idle";
        idleTools();
        dragging = null;
        useButton(btnShiftContinue);
        redraw();
        statusEl.textContent = "Continue with this diagram. Add the next movement, then press Mark end.";
      };
    }
    if (btnShiftPlay) btnShiftPlay.onclick = playMovement;
    if (btnShiftSave) {
      btnShiftSave.onclick = function () {
        if (shiftStages.length < 2 || shiftAwaiting) {
          statusEl.textContent = shiftAwaiting
            ? "Press Mark end to finish this part before saving the movement."
            : "Mark the start and the end of the shift before saving the movement.";
          return;
        }
        var htmlName = String(saveName || "diagram.png").replace(/\.png$/i, "") + "-movement.html";
        var blob = new Blob([movementFileHtml(shiftStages)], { type: "text/html" });
        var url = URL.createObjectURL(blob);
        var link = document.createElement("a");
        link.download = htmlName;
        link.href = url;
        link.click();
        setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
        useButton(btnShiftSave);
        statusEl.textContent = "Movement saved as an HTML file. Open that file to play the shift again.";
      };
    }
    if (btnShiftReset) {
      btnShiftReset.onclick = function () {
        forgetShift();
        useButton(btnShiftReset);
        redraw();
        statusEl.textContent = "Movement reset. The start and end of the shift have been cleared.";
      };
    }
    function imageBlobFromList(list) {
      if (!list) return null;
      var i;
      for (i = 0; i < list.length; i++) {
        var file = list[i];
        if (file && file.type && file.type.indexOf("image/") === 0) return file;
      }
      return null;
    }
    function imageBlobFromData(data) {
      if (!data) return null;
      var fromFiles = imageBlobFromList(data.files);
      if (fromFiles) return fromFiles;
      var list = data.items;
      if (!list) return null;
      var j;
      for (j = 0; j < list.length; j++) {
        if (list[j].kind === "file" && list[j].type.indexOf("image/") === 0) return list[j].getAsFile();
      }
      return null;
    }
    function ensureBoardImage(it) {
      if (!it || it.kind !== "image" || !it.src) return;
      if (it.img && it.img.naturalWidth) return;
      if (it._loading) return;
      it._loading = true;
      var pic = new Image();
      pic.onload = function () {
        it.img = pic;
        it._loading = false;
        if (!it.aspect && pic.height) it.aspect = pic.width / pic.height;
        redraw();
      };
      pic.onerror = function () { it._loading = false; };
      pic.src = it.src;
    }
    function placeImageBlob(blob) {
      if (!blob) {
        statusEl.textContent = "Copy a diagram first, then press Paste diagram.";
        return;
      }
      var reader = new FileReader();
      reader.onload = function () {
        var src = reader.result;
        var pic = new Image();
        pic.onload = function () {
          var margin = 16;
          var maxW = canvas.width - margin * 2;
          var maxH = canvas.height - margin * 2;
          var scale = Math.min(maxW / pic.width, maxH / pic.height);
          var w = pic.width * scale;
          var h = pic.height * scale;
          var placed = {
            kind: "image",
            src: src,
            x: (canvas.width - w) / 2,
            y: (canvas.height - h) / 2,
            w: w,
            h: h,
            aspect: pic.height ? pic.width / pic.height : 1
          };
          placed.img = pic;
          items.push(placed);
          mode = "edit";
          idleTools();
          selected = placed;
          showHandles = true;
          useButton(btnEdit);
          statusEl.textContent = "Diagram pasted. Drag it to move it. Drag the blue corner to resize it. Press Fix when it should stay put.";
          redraw();
        };
        pic.onerror = function () {
          statusEl.textContent = "That picture could not be placed on the board.";
        };
        pic.src = src;
      };
      reader.readAsDataURL(blob);
    }
    function pasteOntoBoard() {
      if (replaying || motionPlaying) {
        statusEl.textContent = motionPlaying
          ? "Movement is playing. It finishes at the end of the shift."
          : "Replay is on. Press Stop replay to draw again.";
        return;
      }
      if (navigator.clipboard && navigator.clipboard.read) {
        navigator.clipboard.read().then(function (clipItems) {
          var jobs = [];
          var i, t, types;
          for (i = 0; i < clipItems.length; i++) {
            types = clipItems[i].types || [];
            for (t = 0; t < types.length; t++) {
              if (types[t].indexOf("image/") === 0) jobs.push(clipItems[i].getType(types[t]));
            }
          }
          if (!jobs.length) {
            statusEl.textContent = "Copy a diagram first, then press Paste diagram.";
            return;
          }
          jobs[0].then(placeImageBlob);
        }).catch(function () {
          canvas.focus();
          statusEl.textContent = "Click the board, then press Ctrl+V to paste the diagram.";
        });
        return;
      }
      canvas.focus();
      statusEl.textContent = "Click the board, then press Ctrl+V to paste the diagram.";
    }
    if (btnPaste) btnPaste.onclick = pasteOntoBoard;
    document.addEventListener("paste", function (e) {
      var target = e.target;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return;
      if (!box.contains(target) && document.activeElement !== canvas && !box.contains(document.activeElement)) return;
      var blob = imageBlobFromData(e.clipboardData);
      if (!blob) return;
      e.preventDefault();
      placeImageBlob(blob);
    });
    canvas.addEventListener("dragover", function (e) {
      if (imageBlobFromList(e.dataTransfer && e.dataTransfer.files)) e.preventDefault();
    });
    canvas.addEventListener("drop", function (e) {
      if (replaying || motionPlaying) return;
      var blob = imageBlobFromList(e.dataTransfer && e.dataTransfer.files);
      if (!blob) return;
      e.preventDefault();
      placeImageBlob(blob);
    });
    if (btnAnswer && checkSpec && answerEl && answerCanvas) {
      var answerTitle = answerEl.querySelector(".db-answer-title");
      btnAnswer.onclick = function () {
        if (answerEl.hidden) {
          if (!modelAnswerItems(checkSpec).length) {
            statusEl.textContent = "There is no finished answer for this question yet.";
            return;
          }
          if (answerTitle) answerTitle.textContent = "Answer: " + (checkSpec.title || "this question");
          paintModelAnswer(answerCanvas, checkSpec);
          answerEl.hidden = false;
          btnAnswer.textContent = "Hide the answer";
          statusEl.textContent = "The answer for this question is shown under your diagram.";
          useButton(btnAnswer);
          answerEl.scrollIntoView({ block: "nearest" });
        } else {
          answerEl.hidden = true;
          btnAnswer.textContent = "See the answer";
          useButton(btnAnswer);
          statusEl.textContent = "Answer hidden. Your diagram is still on the board.";
        }
      };
    }
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    function endDrag() { dragging = null; rotateSnap = null; }
    canvas.addEventListener("mouseup", endDrag);
    window.addEventListener("mouseup", endDrag);
    window.addEventListener("mousemove", function (e) {
      if (!dragging || e.target === canvas) return;
      onMouseMove(e);
    });
    canvas.addEventListener("dblclick", function (e) {
      if (replaying || motionPlaying) return;
      if (mode === "shade") {
        e.preventDefault();
        finishShade();
      }
    });

    function mousePos(e) {
      var r = canvas.getBoundingClientRect();
      return {
        x: (e.clientX - r.left) * (canvas.width / r.width),
        y: (e.clientY - r.top) * (canvas.height / r.height)
      };
    }
    function dist(x1, y1, x2, y2) { return Math.hypot(x1 - x2, y1 - y2); }
    function lineDist(px, py, obj) {
      var A = px - obj.x1, B = py - obj.y1, C = obj.x2 - obj.x1, D = obj.y2 - obj.y1;
      var dot = A * C + B * D, lenSq = C * C + D * D;
      var t = lenSq ? dot / lenSq : -1, xx, yy;
      if (t < 0) { xx = obj.x1; yy = obj.y1; }
      else if (t > 1) { xx = obj.x2; yy = obj.y2; }
      else { xx = obj.x1 + t * C; yy = obj.y1 + t * D; }
      return dist(px, py, xx, yy);
    }
    function axesHit(px, py, it) {
      var ox = Math.min(it.x1, it.x2), oy = Math.max(it.y1, it.y2);
      var rx = Math.max(it.x1, it.x2), ty = Math.min(it.y1, it.y2);
      return lineDist(px, py, { x1: ox, y1: oy, x2: rx, y2: oy }) < HIT_THRESH
        || lineDist(px, py, { x1: ox, y1: oy, x2: ox, y2: ty }) < HIT_THRESH;
    }
    function twinPanels(it) {
      var left = Math.min(it.x1, it.x2), right = Math.max(it.x1, it.x2);
      var top = Math.min(it.y1, it.y2), bottom = Math.max(it.y1, it.y2);
      var gap = 34;
      var mid = (left + right) / 2;
      return {
        L: { ox: left, oy: bottom, rx: mid - gap / 2, ty: top },
        R: { ox: mid + gap / 2, oy: bottom, rx: right, ty: top }
      };
    }
    function twinAxesHit(px, py, it) {
      var p = twinPanels(it);
      return axesHit(px, py, { x1: p.L.ox, y1: p.L.oy, x2: p.L.rx, y2: p.L.ty })
        || axesHit(px, py, { x1: p.R.ox, y1: p.R.oy, x2: p.R.rx, y2: p.R.ty });
    }
    function curveEdge(p0, p2) {
      var len = Math.hypot(p2.x - p0.x, p2.y - p0.y);
      if (len < 1) return 0.5;
      return Math.min(0.01, 1 / len);
    }
    function bulgeParam(p0, p2, through) {
      var dx = p2.x - p0.x, dy = p2.y - p0.y;
      var lenSq = dx * dx + dy * dy;
      if (lenSq < 1) return 0.5;
      var s = ((through.x - p0.x) * dx + (through.y - p0.y) * dy) / lenSq;
      var edge = curveEdge(p0, p2);
      if (s < edge) return edge;
      if (s > 1 - edge) return 1 - edge;
      return s;
    }
    function clampHandleT(t, other, which, p0, p2) {
      var edge = curveEdge(p0, p2);
      var gap = 0.1;
      if (which === 1) {
        if (t < edge) t = edge;
        if (t > other - gap) t = other - gap;
      } else {
        if (t > 1 - edge) t = 1 - edge;
        if (t < other + gap) t = other + gap;
      }
      return t;
    }
    function controlFromThrough(p0, p2, through, t) {
      if (t == null) t = 0.5;
      var u = 1 - t;
      var denom = 2 * u * t;
      if (Math.abs(denom) < 1e-4) return { x: through.x, y: through.y };
      return {
        x: (through.x - u * u * p0.x - t * t * p2.x) / denom,
        y: (through.y - u * u * p0.y - t * t * p2.y) / denom
      };
    }
    function pointOnCurve(it, t) {
      var u = 1 - t;
      if (it.c2x == null) {
        return {
          x: u * u * it.x1 + 2 * u * t * it.cx + t * t * it.x2,
          y: u * u * it.y1 + 2 * u * t * it.cy + t * t * it.y2
        };
      }
      return {
        x: u * u * u * it.x1 + 3 * u * u * t * it.cx + 3 * u * t * t * it.c2x + t * t * t * it.x2,
        y: u * u * u * it.y1 + 3 * u * u * t * it.cy + 3 * u * t * t * it.c2y + t * t * t * it.y2
      };
    }
    function throughFromControl(it) {
      return pointOnCurve(it, it.bt == null ? 0.5 : it.bt);
    }
    function curveHandles(it) {
      if (it.c2x == null) return [throughFromControl(it)];
      return [
        pointOnCurve(it, it.bt == null ? 1 / 3 : it.bt),
        pointOnCurve(it, it.bt2 == null ? 2 / 3 : it.bt2)
      ];
    }
    function solveCubic(p0, p2, q1, t1, q2, t2) {
      function coeff(t) {
        var u = 1 - t;
        return { a: 3 * u * u * t, b: 3 * u * t * t, u3: u * u * u, t3: t * t * t };
      }
      var k1 = coeff(t1), k2 = coeff(t2);
      var r1x = q1.x - k1.u3 * p0.x - k1.t3 * p2.x;
      var r1y = q1.y - k1.u3 * p0.y - k1.t3 * p2.y;
      var r2x = q2.x - k2.u3 * p0.x - k2.t3 * p2.x;
      var r2y = q2.y - k2.u3 * p0.y - k2.t3 * p2.y;
      var det = k1.a * k2.b - k2.a * k1.b;
      if (Math.abs(det) < 1e-6) return { cx: q1.x, cy: q1.y, c2x: q2.x, c2y: q2.y };
      return {
        cx: (r1x * k2.b - r2x * k1.b) / det,
        cy: (r1y * k2.b - r2y * k1.b) / det,
        c2x: (k1.a * r2x - k2.a * r1x) / det,
        c2y: (k1.a * r2y - k2.a * r1y) / det
      };
    }
    function applyCurveHandle(it, which, through) {
      var p0 = { x: it.x1, y: it.y1 };
      var p2 = { x: it.x2, y: it.y2 };
      if (it.c2x == null) {
        var bt = bulgeParam(p0, p2, through);
        var c = controlFromThrough(p0, p2, through, bt);
        it.bt = bt;
        it.cx = c.x;
        it.cy = c.y;
        return;
      }
      var otherT = which === 1 ? (it.bt2 == null ? 2 / 3 : it.bt2) : (it.bt == null ? 1 / 3 : it.bt);
      var t = clampHandleT(bulgeParam(p0, p2, through), otherT, which, p0, p2);
      var otherQ = pointOnCurve(it, otherT);
      var ctrl = which === 1
        ? solveCubic(p0, p2, through, t, otherQ, otherT)
        : solveCubic(p0, p2, otherQ, otherT, through, t);
      if (which === 1) it.bt = t;
      else it.bt2 = t;
      it.cx = ctrl.cx;
      it.cy = ctrl.cy;
      it.c2x = ctrl.c2x;
      it.c2y = ctrl.c2y;
    }
    function grabCurveHandle(it, px, py, radius) {
      var hs = curveHandles(it);
      var names = ["control", "control2"];
      var best = null, bestD = radius;
      for (var h = 0; h < hs.length; h++) {
        var d = dist(px, py, hs[h].x, hs[h].y);
        if (d <= bestD) { bestD = d; best = names[h]; }
      }
      return best;
    }
    function drawCurveStroke(it, color, dashed) {
      ctx.beginPath();
      ctx.setLineDash(dashed ? [7, 5] : []);
      ctx.strokeStyle = color || "#000";
      ctx.lineWidth = 3;
      ctx.moveTo(it.x1, it.y1);
      if (it.c2x == null) ctx.quadraticCurveTo(it.cx, it.cy, it.x2, it.y2);
      else ctx.bezierCurveTo(it.cx, it.cy, it.c2x, it.c2y, it.x2, it.y2);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    function approxCurveHit(px, py, curve) {
      var steps = 24;
      for (var s = 0; s <= steps; s++) {
        var q = pointOnCurve(curve, s / steps);
        if (dist(px, py, q.x, q.y) < HIT_THRESH) return true;
      }
      return false;
    }
    function drawDot(x, y, color) {
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.arc(x, y, POINT_R, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#fff";
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x, y, POINT_R, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.stroke();
    }
    function arrowHead(x1, y1, x2, y2) {
      var dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
      var ux = dx / len, uy = dy / len, px = -uy, py = ux;
      var backX = x2 - ux * 12, backY = y2 - uy * 12;
      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(backX + px * 8, backY + py * 8);
      ctx.lineTo(backX - px * 8, backY - py * 8);
      ctx.closePath();
      ctx.fill();
    }
    function hexToRgba(hex, alpha) {
      var h = (hex || "#000000").replace("#", "");
      if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
      var n = parseInt(h, 16);
      if (isNaN(n)) return "rgba(0,0,0," + alpha + ")";
      return "rgba(" + ((n >> 16) & 255) + "," + ((n >> 8) & 255) + "," + (n & 255) + "," + alpha + ")";
    }
    function pointInPoly(px, py, pts) {
      var inside = false;
      for (var i = 0, j = pts.length - 1; i < pts.length; j = i++) {
        var xi = pts[i].x, yi = pts[i].y, xj = pts[j].x, yj = pts[j].y;
        if (((yi > py) !== (yj > py)) && (px < (xj - xi) * (py - yi) / ((yj - yi) || 1e-6) + xi)) inside = !inside;
      }
      return inside;
    }
    function shadePath(pts) {
      if (!pts || pts.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (var i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
    }
    function drawShade(pts, color, closed) {
      if (!pts || !pts.length) return;
      shadePath(pts);
      if (closed) ctx.closePath();
      ctx.fillStyle = hexToRgba(color, 0.28);
      if (closed && pts.length >= 3) ctx.fill();
      ctx.setLineDash([]);
      ctx.strokeStyle = color || "#000";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    function finishShade() {
      if (shadeDraft.length < 3) {
        statusEl.textContent = "Need at least 3 corners for a shaded area.";
        return;
      }
      items.push({
        kind: "shape",
        type: "shade",
        points: shadeDraft.map(function (p) { return { x: p.x, y: p.y }; }),
        color: currentShadeColour()
      });
      shadeDraft = [];
      previewPoint = null;
      statusEl.textContent = "Shaded area added. Click more corners for another, or choose Amend to move it.";
      redraw();
    }

    function yAxisTitleGap(yLab) {
      var words = String(yLab || "").trim().split(/\s+/).filter(Boolean).length;
      if (words >= 4) return 46;
      if (words >= 3) return 36;
      if (words >= 2) return 26;
      return 18;
    }

    function drawAxesPanel(ox, oy, rx, ty, xLab, yLab, title) {
      ctx.strokeStyle = ctx.fillStyle;
      ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(rx, oy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox, ty); ctx.stroke();
      arrowHead(ox, oy, rx, oy);
      arrowHead(ox, oy, ox, ty);
      ctx.font = title ? "bold 14px sans-serif" : "bold 16px sans-serif";
      ctx.fillText(xLab, rx - ctx.measureText(xLab).width - (title ? 4 : 8), oy + (title ? 20 : 22));
      ctx.save();
      ctx.translate(ox - yAxisTitleGap(yLab), ty + (title ? 18 : 20) + ctx.measureText(yLab).width);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(yLab, 0, 0);
      ctx.restore();
      if (title) {
        ctx.font = "bold 16px sans-serif";
        ctx.fillText(title, (ox + rx) / 2 - ctx.measureText(title).width / 2, ty - 8);
      }
    }

    function labelFont() { return "bold 18px sans-serif"; }
    function labelWidth(it) {
      ctx.font = labelFont();
      return ctx.measureText(it.text || "").width;
    }
    function labelOuter(it) {
      var w = labelWidth(it);
      var ang = ((it.angle || 0) * Math.PI) / 180;
      return { x: it.x + Math.cos(ang) * w, y: it.y + Math.sin(ang) * w };
    }
    function labelHit(px, py, it) {
      ctx.font = labelFont();
      var w = ctx.measureText(it.text || "").width;
      var h = 22;
      var pad = 8;
      var ang = ((it.angle || 0) * Math.PI) / 180;
      var dx = px - it.x;
      var dy = py - it.y;
      var lx = dx * Math.cos(ang) + dy * Math.sin(ang);
      var ly = -dx * Math.sin(ang) + dy * Math.cos(ang);
      return lx >= -pad && lx <= w + pad && ly >= -h / 2 - pad && ly <= h / 2 + pad;
    }
    function drawLabelText(it) {
      ctx.save();
      ctx.fillStyle = it.color || "#000";
      ctx.font = labelFont();
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.translate(it.x, it.y);
      ctx.rotate(((it.angle || 0) * Math.PI) / 180);
      ctx.fillText(it.text, 0, 0);
      ctx.restore();
    }
    function itemLocked(it) {
      return !!(it && it.fixed);
    }
    function rigidGroup(it) {
      if (!it || !it.group) return "";
      var name = String(it.group);
      if (name.indexOf("keynesian-as") === 0 || name.indexOf("mc-curve") === 0) return name;
      return "";
    }
    function rigidLabel(groupId) {
      return String(groupId).indexOf("mc-curve") === 0 ? "Marginal cost curve" : "Keynesian AS curve";
    }
    function rigidAmendStatus() {
      var keynes = false;
      var mc = false;
      items.forEach(function (it) {
        var groupId = rigidGroup(it);
        if (!groupId) return;
        if (groupId.indexOf("mc-curve") === 0) mc = true;
        else keynes = true;
      });
      if (keynes && mc) return "Amend: drag the Keynesian AS curve or the Marginal cost curve to move it. Its shape stays the same.";
      if (mc) return "Amend: drag the Marginal cost curve to move it. Its shape stays the same.";
      if (keynes) return "Amend: drag the Keynesian AS curve to move it. Its shape stays the same.";
      return "Amend: drag labels, blue endpoints, the orange handles on a curve, a point, or a shaded area. Select a part, then press Rotate to turn it.";
    }
    function moveKeynesianGroup(groupId, dx, dy) {
      var i, it;
      for (i = 0; i < items.length; i++) {
        it = items[i];
        if (it.group !== groupId || itemLocked(it)) continue;
        if (it.x != null && it.kind === "label") { it.x += dx; it.y += dy; }
        if (it.x1 != null) { it.x1 += dx; it.y1 += dy; }
        if (it.x2 != null) { it.x2 += dx; it.y2 += dy; }
        if (it.cx != null) { it.cx += dx; it.cy += dy; }
        if (it.c2x != null) { it.c2x += dx; it.c2y += dy; }
      }
    }
    function beginKeynesianMove(it, x, y) {
      selected = it;
      dragging = "move-group";
      dragOffset = { x: x, y: y };
      showHandles = true;
      rotateArmed = false;
      statusEl.textContent = "Drag to move the " + rigidLabel(it.group) + ". Its shape stays the same.";
    }
    function unfixedStrokeAt(px, py, kind) {
      var i, it, held;
      for (i = items.length - 1; i >= 0; i--) {
        it = items[i];
        if (itemLocked(it) || rigidGroup(it)) continue;
        if (kind === "line" && it.kind === "line") {
          if (dist(px, py, it.x1, it.y1) < HIT_THRESH * 3) return { it: it, dragging: "start" };
          if (dist(px, py, it.x2, it.y2) < HIT_THRESH * 3) return { it: it, dragging: "end" };
          if (lineDist(px, py, it) < HIT_THRESH) return { it: it, dragging: "move" };
        }
        if ((kind === "curve" || kind === "sharp") && it.kind === "curve") {
          if (kind === "sharp" ? it.c2x == null : it.c2x != null) continue;
          if (dist(px, py, it.x1, it.y1) < HIT_THRESH * 3) return { it: it, dragging: "start" };
          if (dist(px, py, it.x2, it.y2) < HIT_THRESH * 3) return { it: it, dragging: "end" };
          held = grabCurveHandle(it, px, py, HIT_THRESH * 3);
          if (held) return { it: it, dragging: held };
          if (approxCurveHit(px, py, it)) return { it: it, dragging: "move" };
        }
      }
      return null;
    }
    function handlesOn(it) {
      if (motionFrame || motionRest || replaying) return false;
      if (!it || itemLocked(it) || rigidGroup(it)) return false;
      if (mode === "line" && it.kind === "line") return true;
      if (mode === "curve" && it.kind === "curve" && it.c2x == null) return true;
      if (mode === "sharp" && it.kind === "curve" && it.c2x != null) return true;
      return !!(showHandles && selected === it);
    }
    function openCurve(sharp) {
      for (var i = items.length - 1; i >= 0; i--) {
        var it = items[i];
        if (it.kind !== "curve" || itemLocked(it) || rigidGroup(it)) continue;
        if (sharp ? it.c2x != null : it.c2x == null) return it;
      }
      return null;
    }
    function grabLabelAt(px, py) {
      for (var i = items.length - 1; i >= 0; i--) {
        if (itemLocked(items[i])) continue;
        if (items[i].kind === "label" && labelHit(px, py, items[i])) return items[i];
      }
      return null;
    }
    function grabLabelRotateAt(px, py) {
      if (!rotateArmed || !selected || itemLocked(selected) || rigidGroup(selected)) return null;
      if (selected.kind === "shape" && selected.type === "point") return null;
      var o = rotateHandlePoint(selected);
      if (o && dist(px, py, o.x, o.y) < HIT_THRESH * 2) return selected;
      return null;
    }
    function startRotateDrag(it, x, y) {
      selected = it;
      showHandles = true;
      if (it.kind === "label") {
        dragging = "label-rotate";
        statusEl.textContent = "Drag the outer end. The left of the word stays put.";
      } else {
        beginFreeRotate(it, x, y);
        dragging = "item-rotate";
        statusEl.textContent = "Drag the orange handle. The middle stays put.";
      }
    }
    function hitItemAt(px, py) {
      var i, it, v, bulge, onPath;
      for (i = items.length - 1; i >= 0; i--) {
        it = items[i];
        if (it.kind === "label" && labelHit(px, py, it)) return it;
        if (it.kind === "shape" && it.type === "shade" && it.points) {
          for (v = 0; v < it.points.length; v++) {
            if (dist(px, py, it.points[v].x, it.points[v].y) < HIT_THRESH) return it;
          }
          if (pointInPoly(px, py, it.points)) return it;
        }
        if (it.kind === "shape" && it.type === "point") {
          if (dist(px, py, it.x1, it.y1) < POINT_R + 4) return it;
        }
        if (it.kind === "line" || (it.kind === "shape" && (it.type === "arrow" || it.type === "arrow-both" || it.type === "dotted" || it.type === "axes" || it.type === "twin-pc-axes"))) {
          if (it.type === "axes" || it.type === "twin-pc-axes") {
            var axisA = spunPoint(it, it.x1, it.y1);
            var axisB = spunPoint(it, it.x2, it.y2);
            var axisLocal = plainPoint(it, px, py);
            if (dist(px, py, axisA.x, axisA.y) < HIT_THRESH || dist(px, py, axisB.x, axisB.y) < HIT_THRESH) return it;
            onPath = it.type === "axes" ? axesHit(axisLocal.x, axisLocal.y, it) : twinAxesHit(axisLocal.x, axisLocal.y, it);
            if (onPath) return it;
          } else {
            if (dist(px, py, it.x1, it.y1) < HIT_THRESH || dist(px, py, it.x2, it.y2) < HIT_THRESH) return it;
            if (lineDist(px, py, it) < HIT_THRESH) return it;
          }
        }
        if (it.kind === "curve") {
          if (dist(px, py, it.x1, it.y1) < HIT_THRESH || dist(px, py, it.x2, it.y2) < HIT_THRESH) return it;
          if (grabCurveHandle(it, px, py, HIT_THRESH * 2)) return it;
          if (approxCurveHit(px, py, it)) return it;
        }
      }
      for (i = items.length - 1; i >= 0; i--) {
        it = items[i];
        if (it.kind === "image") {
          var imageLocal = plainPoint(it, px, py);
          if (imageLocal.x >= it.x && imageLocal.x <= it.x + it.w && imageLocal.y >= it.y && imageLocal.y <= it.y + it.h) return it;
        }
      }
      return null;
    }

    function onMouseDown(e) {
      if (replaying) {
        statusEl.textContent = "Replay is on. Press Next command or Previous, or Stop replay to draw again.";
        return;
      }
      if (motionPlaying) {
        statusEl.textContent = "Movement is playing. It finishes on the complete diagram.";
        return;
      }
      if (motionRest) {
        statusEl.textContent = "This part is shown from its start. Press Play movement, Continue to add the next movement, or Reset movement.";
        return;
      }
      var pos = mousePos(e);
      var x = pos.x, y = pos.y;
      if (mode === "delete") {
        var doomed = hitItemAt(x, y);
        if (!doomed) {
          statusEl.textContent = "Delete: click the part you want to remove.";
          return;
        }
        if (itemLocked(doomed)) {
          statusEl.textContent = "That part is fixed. Draw more, or Clear board to start again.";
          return;
        }
        items.splice(items.indexOf(doomed), 1);
        if (selected === doomed) selected = null;
        statusEl.textContent = "Deleted. Click another part, or press a different button when you are finished.";
        redraw();
        return;
      }
      if (rotateArmed) {
        var rotAny = grabLabelRotateAt(x, y);
        if (rotAny) {
          startRotateDrag(rotAny, x, y);
          redraw();
          return;
        }
      }
      if (mode === "idle") {
        var idleRot = grabLabelRotateAt(x, y);
        if (idleRot) {
          selected = idleRot;
          dragging = "label-rotate";
          showHandles = true;
          statusEl.textContent = "Drag the outer end. The left of the word stays put.";
          redraw();
          return;
        }
        var idleLbl = grabLabelAt(x, y);
        if (idleLbl) {
          selected = idleLbl;
          dragging = "label";
          dragOffset = { x: x, y: y };
          showHandles = true;
          rotateArmed = false;
          statusEl.textContent = "Drag to move. Press Rotate to turn it.";
          redraw();
          return;
        }
      }
      if (mode === "point") {
        items.push({ kind: "shape", type: "point", x1: x, y1: y, x2: x, y2: y, color: pointColor });
        redraw();
        return;
      }
      if (mode === "line") {
        var lineHit = unfixedStrokeAt(x, y, "line");
        if (lineHit && !firstPoint) {
          selected = lineHit.it;
          dragging = lineHit.dragging;
          dragOffset = { x: x, y: y };
          showHandles = true;
          statusEl.textContent = "Drag a blue end, or drag the line. Press Fix when it is finished.";
          redraw();
          return;
        }
        if (!firstPoint) { firstPoint = { x: x, y: y }; redraw(); return; }
        items.push({ kind: "line", x1: firstPoint.x, y1: firstPoint.y, x2: x, y2: y, color: colourPicker.value });
        firstPoint = secondPoint = null;
        showHandles = true;
        statusEl.textContent = "Drag either blue end to move it. Press Fix when the straight line is finished.";
        redraw(); return;
      }
      if (mode === "shade") {
        if (e.detail > 1) return;
        if (shadeDraft.length >= 3 && dist(x, y, shadeDraft[0].x, shadeDraft[0].y) < HIT_THRESH * 2) {
          finishShade();
          return;
        }
        shadeDraft.push({ x: x, y: y });
        statusEl.textContent = shadeDraft.length < 3
          ? "Corner " + shadeDraft.length + " placed. Click at least " + (3 - shadeDraft.length) + " more, then close."
          : "Click the first (blue) corner to close, or double-click. More corners are fine.";
        redraw();
        return;
      }
      if (mode === "curve" || mode === "sharp") {
        var sharpMode = mode === "sharp";
        var curveHit = !firstPoint ? unfixedStrokeAt(x, y, sharpMode ? "sharp" : "curve") : null;
        if (curveHit) {
          selected = curveHit.it;
          dragging = curveHit.dragging;
          dragOffset = { x: x, y: y };
          showHandles = true;
          statusEl.textContent = sharpMode
            ? "Drag a blue end or either amber handle. They keep working until you press Fix."
            : "Drag a blue end or the amber handle. They keep working until you press Fix.";
          redraw();
          return;
        }
        if (!firstPoint) {
          firstPoint = { x: x, y: y };
          statusEl.textContent = "Click the end of the curve.";
          redraw(); return;
        }
        var endPt = { x: x, y: y };
        var curve;
        if (sharpMode) {
          var q1 = { x: firstPoint.x + (endPt.x - firstPoint.x) / 3, y: firstPoint.y + (endPt.y - firstPoint.y) / 3 };
          var q2 = { x: firstPoint.x + 2 * (endPt.x - firstPoint.x) / 3, y: firstPoint.y + 2 * (endPt.y - firstPoint.y) / 3 };
          var ctrl = solveCubic(firstPoint, endPt, q1, 1 / 3, q2, 2 / 3);
          curve = {
            kind: "curve", x1: firstPoint.x, y1: firstPoint.y, x2: endPt.x, y2: endPt.y,
            cx: ctrl.cx, cy: ctrl.cy, c2x: ctrl.c2x, c2y: ctrl.c2y, bt: 1 / 3, bt2: 2 / 3,
            color: colourPicker.value
          };
          statusEl.textContent = "Drag a blue end or either amber handle. Press Fix when the sharp curve is finished.";
        } else {
          var through = { x: (firstPoint.x + endPt.x) / 2, y: (firstPoint.y + endPt.y) / 2 };
          var c = controlFromThrough(firstPoint, endPt, through, 0.5);
          curve = {
            kind: "curve", x1: firstPoint.x, y1: firstPoint.y, x2: endPt.x, y2: endPt.y,
            cx: c.x, cy: c.y, bt: 0.5, color: colourPicker.value
          };
          statusEl.textContent = "Drag a blue end or the amber handle. Press Fix when the curved line is finished.";
        }
        items.push(curve);
        selected = curve; showHandles = true;
        firstPoint = secondPoint = controlPoint = previewPoint = null;
        redraw(); return;
      }
      if (mode === "shape") {
        if (showPoints && isPointType(shapeSelect.value)) {
          startPointMode(POINT_FILL[shapeSelect.value], shapeSelect.value, "Point", null);
          items.push({ kind: "shape", type: "point", x1: x, y1: y, x2: x, y2: y, color: POINT_FILL[shapeSelect.value] });
          redraw();
          return;
        }
        if (!firstPoint) {
          firstPoint = { x: x, y: y };
          if (shapeSelect.value === "dotted") {
            statusEl.textContent = "Click the other blue end. If it is practically vertical or horizontal it will snap straight.";
          }
          redraw(); return;
        }
        var endPt = shapeSelect.value === "dotted" ? snapOrthoPoint(firstPoint, { x: x, y: y }) : { x: x, y: y };
        items.push({ kind: "shape", type: shapeSelect.value, x1: firstPoint.x, y1: firstPoint.y, x2: endPt.x, y2: endPt.y, color: colourPicker.value });
        firstPoint = secondPoint = null;
        previewPoint = null;
        if (shapeSelect.value === "dotted") {
          statusEl.textContent = "Dotted line placed. Use Amend to change an angle that should not be square.";
        }
        redraw(); return;
      }
      if (mode === "label") {
        var rotLbl = grabLabelRotateAt(x, y);
        if (rotLbl) {
          selected = rotLbl;
          dragging = "label-rotate";
          showHandles = true;
          statusEl.textContent = "Drag the outer end. The left of the word stays put.";
          redraw();
          return;
        }
        var hitLbl = grabLabelAt(x, y);
        if (hitLbl) {
          selected = hitLbl;
          dragging = "label";
          dragOffset = { x: x, y: y };
          showHandles = true;
          rotateArmed = false;
          statusEl.textContent = "Drag to move. Press Rotate to turn it.";
          redraw();
          return;
        }
        var text = labelInput.value.trim();
        if (text) {
          var placed = { kind: "label", text: text, x: x, y: y, color: colourPicker.value, angle: 0 };
          items.push(placed);
          selected = placed;
          showHandles = true;
          rotateArmed = false;
          statusEl.textContent = "Label placed. Press Rotate to turn it, or to turn any other part.";
          redraw();
        } else {
          statusEl.textContent = "Enter label text first, or drag an existing label.";
        }
        return;
      }
      if (mode === "edit") {
        dragging = null;
        var i, it, bulge;
        var rotEdit = grabLabelRotateAt(x, y);
        if (rotEdit) {
          selected = rotEdit; dragging = "label-rotate"; showHandles = true;
          statusEl.textContent = "Drag the outer end. The left of the word stays put.";
          redraw(); return;
        }
        selected = null;
        rotateArmed = false;
        var editLbl = grabLabelAt(x, y);
        if (editLbl) {
          selected = editLbl; dragging = "label"; dragOffset = { x: x, y: y }; showHandles = true;
          rotateArmed = false;
          statusEl.textContent = "Drag to move. Press Rotate to turn it.";
          redraw(); return;
        }
        for (i = 0; i < items.length; i++) {
          it = items[i];
          if (itemLocked(it)) continue;
          if (it.kind === "shape" && it.type === "shade" && it.points) {
            var v;
            for (v = 0; v < it.points.length; v++) {
              if (dist(x, y, it.points[v].x, it.points[v].y) < HIT_THRESH) {
                selected = it; dragging = v; dragOffset = { x: x, y: y }; redraw(); return;
              }
            }
            if (pointInPoly(x, y, it.points)) {
              selected = it; dragging = "move"; dragOffset = { x: x, y: y }; redraw(); return;
            }
          }
        }
        for (i = 0; i < items.length; i++) {
          it = items[i];
          if (itemLocked(it)) continue;
          if (it.kind === "shape" && it.type === "point") {
            if (dist(x, y, it.x1, it.y1) < POINT_R + 4) {
              selected = it; dragging = "move"; dragOffset = { x: x, y: y }; redraw(); return;
            }
          }
        }
        for (i = 0; i < items.length; i++) {
          it = items[i];
          if (itemLocked(it)) continue;
          if (it.kind === "line" || (it.kind === "shape" && (it.type === "arrow" || it.type === "arrow-both" || it.type === "dotted" || it.type === "axes" || it.type === "twin-pc-axes"))) {
            if (rigidGroup(it)) {
              if (dist(x, y, it.x1, it.y1) < HIT_THRESH * 2 || dist(x, y, it.x2, it.y2) < HIT_THRESH * 2 || lineDist(x, y, it) < HIT_THRESH) {
                beginKeynesianMove(it, x, y); redraw(); return;
              }
            } else if (it.type === "axes" || it.type === "twin-pc-axes") {
              var axisA = spunPoint(it, it.x1, it.y1);
              var axisB = spunPoint(it, it.x2, it.y2);
              var axisLocal = plainPoint(it, x, y);
              if (dist(x, y, axisA.x, axisA.y) < HIT_THRESH) { selected = it; dragging = "start"; dragOffset = { x: x, y: y }; redraw(); return; }
              if (dist(x, y, axisB.x, axisB.y) < HIT_THRESH) { selected = it; dragging = "end"; dragOffset = { x: x, y: y }; redraw(); return; }
              var axisPath = it.type === "axes" ? axesHit(axisLocal.x, axisLocal.y, it) : twinAxesHit(axisLocal.x, axisLocal.y, it);
              if (axisPath) { selected = it; dragging = "move"; dragOffset = { x: x, y: y }; redraw(); return; }
            } else {
              if (dist(x, y, it.x1, it.y1) < HIT_THRESH) { selected = it; dragging = "start"; dragOffset = { x: x, y: y }; redraw(); return; }
              if (dist(x, y, it.x2, it.y2) < HIT_THRESH) { selected = it; dragging = "end"; dragOffset = { x: x, y: y }; redraw(); return; }
              if (lineDist(x, y, it) < HIT_THRESH) { selected = it; dragging = "move"; dragOffset = { x: x, y: y }; redraw(); return; }
            }
          }
        }
        for (i = 0; i < items.length; i++) {
          it = items[i];
          if (itemLocked(it)) continue;
          if (it.kind === "curve") {
            if (rigidGroup(it)) {
              if (dist(x, y, it.x1, it.y1) < HIT_THRESH * 2 || dist(x, y, it.x2, it.y2) < HIT_THRESH * 2 || grabCurveHandle(it, x, y, HIT_THRESH * 2) || approxCurveHit(x, y, it)) {
                beginKeynesianMove(it, x, y); redraw(); return;
              }
              continue;
            }
            if (dist(x, y, it.x1, it.y1) < HIT_THRESH) { selected = it; dragging = "start"; dragOffset = { x: x, y: y }; redraw(); return; }
            if (dist(x, y, it.x2, it.y2) < HIT_THRESH) { selected = it; dragging = "end"; dragOffset = { x: x, y: y }; redraw(); return; }
            var heldEdit = grabCurveHandle(it, x, y, HIT_THRESH * 2);
            if (heldEdit) { selected = it; dragging = heldEdit; dragOffset = { x: x, y: y }; redraw(); return; }
            if (approxCurveHit(x, y, it)) { selected = it; dragging = "move"; dragOffset = { x: x, y: y }; redraw(); return; }
          }
        }
        for (i = items.length - 1; i >= 0; i--) {
          it = items[i];
          if (it.kind !== "image" || itemLocked(it)) continue;
          if (dist(x, y, spunPoint(it, it.x + it.w, it.y + it.h).x, spunPoint(it, it.x + it.w, it.y + it.h).y) < HIT_THRESH * 2) {
            selected = it; dragging = "resize"; dragOffset = { x: x, y: y }; showHandles = true;
            statusEl.textContent = "Drag the corner to resize the diagram.";
            redraw(); return;
          }
        }
        for (i = items.length - 1; i >= 0; i--) {
          it = items[i];
          if (it.kind !== "image" || itemLocked(it)) continue;
          var imageLocal = plainPoint(it, x, y);
          if (imageLocal.x >= it.x && imageLocal.x <= it.x + it.w && imageLocal.y >= it.y && imageLocal.y <= it.y + it.h) {
            selected = it; dragging = "move"; dragOffset = { x: x, y: y }; showHandles = true;
            statusEl.textContent = "Drag the diagram to move it. Drag the blue corner to resize it.";
            redraw(); return;
          }
        }
        showHandles = false; mode = "idle"; statusEl.textContent = "Editing finished."; redraw();
      }
    }

    function onMouseMove(e) {
      if (replaying || motionPlaying || motionRest) return;
      var pos = mousePos(e);
      var x = pos.x, y = pos.y;
      if (dragging && selected) {
        if (itemLocked(selected)) { dragging = null; return; }
        if (dragging === "item-rotate" && rotateSnap) {
          var pointer = Math.atan2(y - rotateSnap.pivot.y, x - rotateSnap.pivot.x) * 180 / Math.PI;
          var step = pointer - rotateSnap.pointer;
          if (step > 180) step -= 360;
          if (step < -180) step += 360;
          rotateSnap.pointer = pointer;
          rotateSnap.applied += step;
          restoreRotatable(selected, rotateSnap.item);
          turnItem(selected, rotateSnap.applied);
          labelAngle = selected.angle || 0;
          statusEl.textContent = "Angle " + angleName(selected.angle || 0) + ". The middle stays put.";
          redraw();
          return;
        }
        if (dragging === "move-group" && rigidGroup(selected)) {
          moveKeynesianGroup(selected.group, x - dragOffset.x, y - dragOffset.y);
          dragOffset = { x: x, y: y };
          statusEl.textContent = "Drag to move the " + rigidLabel(selected.group) + ". Its shape stays the same.";
          redraw();
          return;
        }
        var dx = x - dragOffset.x, dy = y - dragOffset.y;
        if ((dragging === "start" || dragging === "end") && keepsAngle(selected) && selected.angle) {
          var prevLocal = plainPoint(selected, dragOffset.x, dragOffset.y);
          var nowLocal = plainPoint(selected, x, y);
          dx = nowLocal.x - prevLocal.x;
          dy = nowLocal.y - prevLocal.y;
        }
        if (selected.kind === "shape" && selected.type === "shade" && selected.points) {
          if (dragging === "move") {
            selected.points.forEach(function (pt) { pt.x += dx; pt.y += dy; });
          } else if (typeof dragging === "number" && selected.points[dragging]) {
            selected.points[dragging].x += dx;
            selected.points[dragging].y += dy;
          }
        } else if (selected.kind === "line" || selected.kind === "shape") {
          if (dragging === "move") { selected.x1 += dx; selected.y1 += dy; selected.x2 += dx; selected.y2 += dy; }
          else if (dragging === "start") { selected.x1 += dx; selected.y1 += dy; }
          else if (dragging === "end") { selected.x2 += dx; selected.y2 += dy; }
        } else if (selected.kind === "curve") {
          if (dragging === "move") {
            selected.x1 += dx; selected.y1 += dy; selected.x2 += dx; selected.y2 += dy;
            selected.cx += dx; selected.cy += dy;
            if (selected.c2x != null) { selected.c2x += dx; selected.c2y += dy; }
          }
          else if (dragging === "start") {
            selected.x1 += dx; selected.y1 += dy;
            selected.cx += dx; selected.cy += dy;
          }
          else if (dragging === "end") {
            selected.x2 += dx; selected.y2 += dy;
            if (selected.c2x != null) { selected.c2x += dx; selected.c2y += dy; }
            else { selected.cx += dx; selected.cy += dy; }
          }
          else if (dragging === "control" || dragging === "control2") {
            applyCurveHandle(selected, dragging === "control" ? 1 : 2, { x: x, y: y });
            statusEl.textContent = "Drag either orange handle. Slide them along the curve for a sharper bend.";
          }
        } else if (selected.kind === "image") {
          if (dragging === "resize") {
            var aspect = selected.aspect || (selected.h ? selected.w / selected.h : 1);
            var localCorner = plainPoint(selected, x, y);
            var nw = Math.max(48, localCorner.x - selected.x);
            selected.w = nw;
            selected.h = nw / aspect;
          } else {
            selected.x += dx;
            selected.y += dy;
          }
        } else if (selected.kind === "label") {
          if (dragging === "label-rotate") {
            selected.angle = normLabelAngle(Math.atan2(y - selected.y, x - selected.x) * 180 / Math.PI);
            labelAngle = selected.angle;
            statusEl.textContent = "Angle " + angleName(selected.angle) + ". Left end stays put.";
          } else {
            selected.x += dx; selected.y += dy;
          }
        }
        dragOffset = { x: x, y: y };
        redraw();
        return;
      }
      if ((mode === "label" || mode === "edit" || mode === "idle") && grabLabelAt(x, y)) {
        canvas.style.cursor = "grab";
      } else if (!dragging) {
        canvas.style.cursor = "crosshair";
      }
      if ((mode === "curve" || mode === "sharp") && firstPoint) {
        previewPoint = { x: x, y: y };
        redraw();
      }
      if (mode === "shape" && firstPoint) {
        previewPoint = { x: x, y: y };
        redraw();
      }
      if (mode === "shade" && shadeDraft.length) {
        previewPoint = { x: x, y: y };
        redraw();
      }
    }

    function resetCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    function drawHandle(hx, hy, color) {
      ctx.save();
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(hx, hy, HANDLE_RADIUS, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    function drawBoardImage(it) {
      ensureBoardImage(it);
      if (!it.img || !it.img.naturalWidth) return;
      withItemSpin(it, function () {
        ctx.drawImage(it.img, it.x, it.y, it.w, it.h);
        if (!handlesOn(it)) return;
        ctx.save();
        ctx.strokeStyle = "#00aaff";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 3]);
        ctx.strokeRect(it.x, it.y, it.w, it.h);
        ctx.setLineDash([]);
        ctx.restore();
        drawHandle(it.x + it.w, it.y + it.h, "#00aaff");
      });
    }
    function redraw() {
      syncTwinButtons();
      resetCanvas();
      if (starterImg && starterImg.naturalWidth) {
        ctx.drawImage(starterImg, 0, 0, canvas.width, canvas.height);
      }
      ctx.globalAlpha = 1;
      if (!replaying && !motionFrame) scheduleQuestionSave();
      var drawn = motionFrame ? motionFrame : ((motionRest && shiftStart && shiftEnd) ? shiftFrame(0) : (replaying ? captured.slice(0, replayStep) : items));
      var im;
      for (im = 0; im < drawn.length; im++) {
        if (drawn[im].kind === "image") {
          ctx.save();
          ctx.globalAlpha = drawn[im]._alpha == null ? 1 : drawn[im]._alpha;
          drawBoardImage(drawn[im]);
          ctx.restore();
        }
      }
      if (!replaying && !motionFrame && firstPoint) drawHandle(firstPoint.x, firstPoint.y, "#0066ff");
      if (!replaying && !motionFrame && secondPoint) drawHandle(secondPoint.x, secondPoint.y, "#0066ff");
      if (!replaying && !motionFrame && controlPoint) drawHandle(controlPoint.x, controlPoint.y, "#ff6600");
      for (var s = 0; s < drawn.length; s++) {
        if (drawn[s].kind === "shape" && drawn[s].type === "shade") {
          ctx.save();
          ctx.globalAlpha = drawn[s]._alpha == null ? 1 : drawn[s]._alpha;
          drawShade(drawn[s].points, drawn[s].color || "#000", true);
          if (!motionFrame && showHandles && selected === drawn[s] && drawn[s].points) {
            drawn[s].points.forEach(function (pt) { drawHandle(pt.x, pt.y, "#00aaff"); });
          }
          ctx.restore();
        }
      }
      for (var i = 0; i < drawn.length; i++) {
        var it = drawn[i];
        if (it.kind === "shape" && it.type === "shade") continue;
        ctx.save();
        ctx.globalAlpha = it._alpha == null ? 1 : it._alpha;
        if (it.kind === "line") {
          ctx.beginPath(); ctx.setLineDash([]); ctx.strokeStyle = it.color || "#000"; ctx.lineWidth = 3;
          ctx.moveTo(it.x1, it.y1); ctx.lineTo(it.x2, it.y2); ctx.stroke();
          if (handlesOn(it)) { drawHandle(it.x1, it.y1, "#00aaff"); drawHandle(it.x2, it.y2, "#00aaff"); }
        } else if (it.kind === "curve") {
          drawCurveStroke(it, it.color || "#000", false);
          if (handlesOn(it)) {
            var handles = curveHandles(it);
            drawHandle(it.x1, it.y1, "#00aaff");
            drawHandle(it.x2, it.y2, "#00aaff");
            handles.forEach(function (h) { drawHandle(h.x, h.y, "#ffaa00"); });
          }
        } else if (it.kind === "shape") {
          ctx.lineWidth = 3; ctx.strokeStyle = it.color || "#000"; ctx.fillStyle = it.color || "#000";
          if (it.type === "point") {
            drawDot(it.x1, it.y1, it.color || "#2563eb");
            if (showHandles && selected === it) drawHandle(it.x1, it.y1, "#00aaff");
          } else if (it.type === "dotted") {
            ctx.setLineDash([6, 6]);
            ctx.beginPath(); ctx.moveTo(it.x1, it.y1); ctx.lineTo(it.x2, it.y2); ctx.stroke();
            ctx.setLineDash([]);
          } else if (it.type === "axes" || it.type === "twin-pc-axes") {
            withItemSpin(it, function () {
              ctx.setLineDash([]);
              if (it.type === "axes") {
                drawAxesPanel(Math.min(it.x1, it.x2), Math.max(it.y1, it.y2), Math.max(it.x1, it.x2), Math.min(it.y1, it.y2), it.xLabel || currentX(), it.yLabel || currentY(), null);
              } else {
                var panels = twinPanels(it);
                var xLab = it.xLabel || twinXLabel;
                var yLab = it.yLabel || twinYLabel;
                var leftHead = it.showTitles === false ? null : (it.leftTitle || leftTitle);
                var rightHead = it.showTitles === false ? null : (it.rightTitle || rightTitle);
                drawAxesPanel(panels.L.ox, panels.L.oy, panels.L.rx, panels.L.ty, xLab, yLab, leftHead);
                drawAxesPanel(panels.R.ox, panels.R.oy, panels.R.rx, panels.R.ty, xLab, yLab, rightHead);
              }
              if (showHandles && selected === it) {
                drawHandle(it.x1, it.y1, "#00aaff");
                drawHandle(it.x2, it.y2, "#00aaff");
              }
            });
          } else if (it.type === "arrow" || it.type === "arrow-both") {
            ctx.setLineDash([]);
            ctx.beginPath(); ctx.moveTo(it.x1, it.y1); ctx.lineTo(it.x2, it.y2); ctx.stroke();
            arrowHead(it.x1, it.y1, it.x2, it.y2);
            if (it.type === "arrow-both") arrowHead(it.x2, it.y2, it.x1, it.y1);
          }
          if (showHandles && selected === it && it.type !== "point" && it.type !== "axes" && it.type !== "twin-pc-axes") {
            drawHandle(it.x1, it.y1, "#00aaff");
            drawHandle(it.x2, it.y2, "#00aaff");
          }
        } else if (it.kind === "label") {
          drawLabelText(it);
          if (selected === it && showHandles) drawHandle(it.x, it.y, "#ffdd00");
        }
        ctx.restore();
      }
      if (!replaying && !motionFrame && (mode === "curve" || mode === "sharp") && firstPoint && previewPoint) {
        ctx.beginPath(); ctx.setLineDash([7, 5]); ctx.strokeStyle = colourPicker.value; ctx.lineWidth = 3;
        ctx.moveTo(firstPoint.x, firstPoint.y); ctx.lineTo(previewPoint.x, previewPoint.y); ctx.stroke();
        ctx.setLineDash([]);
        drawHandle(previewPoint.x, previewPoint.y, "#0066ff");
      }
      if (!replaying && !motionFrame && mode === "shape" && firstPoint && previewPoint) {
        var prevEnd = shapeSelect.value === "dotted" ? snapOrthoPoint(firstPoint, previewPoint) : previewPoint;
        ctx.beginPath();
        ctx.setLineDash(shapeSelect.value === "dotted" ? [6, 6] : [7, 5]);
        ctx.strokeStyle = colourPicker.value; ctx.lineWidth = 3;
        ctx.moveTo(firstPoint.x, firstPoint.y); ctx.lineTo(prevEnd.x, prevEnd.y); ctx.stroke();
        ctx.setLineDash([]);
        drawHandle(prevEnd.x, prevEnd.y, "#0066ff");
      }
      if (!replaying && !motionFrame && mode === "shade" && shadeDraft.length) {
        var previewPts = shadeDraft.slice();
        if (previewPoint) previewPts.push(previewPoint);
        drawShade(previewPts, currentShadeColour(), previewPts.length >= 3);
        shadeDraft.forEach(function (pt, idx) {
          drawHandle(pt.x, pt.y, idx === 0 ? "#22c55e" : "#0066ff");
        });
        if (previewPoint) drawHandle(previewPoint.x, previewPoint.y, "#0066ff");
      }
      if (!replaying && !motionFrame && rotateArmed && selected && showHandles && !itemLocked(selected) && !rigidGroup(selected)) {
        var leverFrom = selected.kind === "label" ? { x: selected.x, y: selected.y } : itemPivot(selected);
        var leverTo = rotateHandlePoint(selected);
        if (leverFrom && leverTo) {
          ctx.save();
          ctx.strokeStyle = "#f59e0b";
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 3]);
          ctx.beginPath();
          ctx.moveTo(leverFrom.x, leverFrom.y);
          ctx.lineTo(leverTo.x, leverTo.y);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.restore();
          drawHandle(leverTo.x, leverTo.y, "#f59e0b");
        }
      }
    }
    box._diagramItems = items;
    box._questionId = checkSpec ? checkSpec.id : "";
    box._redraw = redraw;
    box._remember = function () { rememberSeries(checkSpec, items); };
    box._setQuestion = function (id) {
      stopReplay("");
      forgetShift();
      rememberSeries(checkSpec, items);
      var next = id ? DIAGRAM_BANK[id] : null;
      var sameSeries = !!(checkSpec && next && seriesKey(checkSpec) === seriesKey(next));
      if (!sameSeries) {
        var restored = recallSeries(next) || [];
        items.splice(0, items.length);
        for (var ri = 0; ri < restored.length; ri++) items.push(restored[ri]);
      }
      checkSpec = next;
      rememberOpenQuestion(next ? next.id : "");
      saveName = (next && next.mount && next.mount.saveName) || opts.saveName || "diagram.png";
      var stem = box.querySelector(".db-q-stem");
      if (stem) {
        var numEl = stem.querySelector(".db-q-num");
        var wordingEl = stem.querySelector(".db-q-wording");
        var qn = seriesQuestionNumber(next);
        if (numEl) {
          numEl.hidden = !qn;
          if (qn) numEl.textContent = "Question " + qn;
        }
        if (wordingEl) wordingEl.textContent = (next && next.question) || "";
        else stem.textContent = (next && next.question) || "";
      }
      var seriesWrap = box.querySelector(".db-series");
      var seriesNote = box.querySelector(".db-series-note");
      var seriesTitleEl = box.querySelector(".db-series-title");
      var seriesText = seriesNoteText(next);
      if (seriesTitleEl) seriesTitleEl.textContent = seriesTitleText(next) || "Development series";
      if (seriesWrap && seriesNote) {
        seriesNote.textContent = seriesText;
        seriesWrap.hidden = !seriesText;
      }
      if (answerEl) answerEl.hidden = true;
      if (btnAnswer) btnAnswer.textContent = "See the answer";
      if (statusEl) {
        if (sameSeries && next && next.extends) {
          statusEl.textContent = "Your diagram is still on the board. Add to it for this question.";
        } else if (sameSeries || items.length) {
          statusEl.textContent = "Your diagram is still on the board.";
        } else {
          statusEl.textContent = "";
        }
      }
      redraw();
      return true;
    };
    var starterList = answerSources(opts.starterImage);
    if (starterList.length) {
      starterImg = new Image();
      loadImageSources(starterImg, starterList, function () { redraw(); });
      if (statusEl) statusEl.textContent = "The given diagram is on the board. Complete it.";
    }
    redraw();
  }

  var seriesBoards = {};
  var chosenSeries = {};
  var SERIES_STORE = "micro-diagram-series-boards";
  var CHOSEN_SERIES = "micro-diagram-chosen-series";
  var PRACTICE_OPEN = "micro-diagram-practice-open";

  function seriesTitleText(spec) {
    var guard = 0;
    var current = spec;
    while (current && guard < 8) {
      if (current.seriesTitle) return current.seriesTitle;
      current = current.extends ? DIAGRAM_BANK[current.extends] : null;
      guard++;
    }
    return "";
  }

  function seriesNoteText(spec) {
    if (!spec) return "";
    var next = nextInSeries(spec);
    if (!next && !spec.extends && !spec.seriesTitle) return "";
    if (!spec.extends) {
      return "This is the first question in a series. Later questions build on this diagram, so it stays on the board. When you are ready, go back to the question list for the next one.";
    }
    if (next) {
      return "This question builds on the diagram from the previous question, which is still on the board. When you are ready, go back to the question list for the next one.";
    }
    return "This question builds on the diagram from the previous question, which is still on the board.";
  }

  function seriesQuestionNumber(spec) {
    if (!spec) return 0;
    if (!spec.extends && !nextInSeries(spec) && !spec.seriesTitle) return 0;
    var n = 1;
    var guard = 0;
    var current = spec;
    while (current && current.extends && DIAGRAM_BANK[current.extends] && guard < 8) {
      current = DIAGRAM_BANK[current.extends];
      n++;
      guard++;
    }
    return n;
  }

  function plainQuestionHtml(text) {
    text = text ? String(text).replace(/\s+/g, " ").trim() : "";
    if (!text) return "";
    return "<p class=\"db-q-stem\"><span class=\"db-q-wording\">" + escapeHtml(text) + "</span></p>";
  }

  function questionStemHtml(spec) {
    if (!spec || !spec.question) return "";
    var n = seriesQuestionNumber(spec);
    var label = n
      ? "<span class=\"db-q-num\">Question " + n + "</span>"
      : "<span class=\"db-q-num\" hidden>Question</span>";
    return "<p class=\"db-q-stem\">" + label + "<span class=\"db-q-wording\">" + escapeHtml(spec.question) + "</span></p>";
  }

  function seriesBlock(spec) {
    var text = seriesNoteText(spec);
    if (!text) return "";
    var title = seriesTitleText(spec) || "Development series";
    return "<div class=\"db-series\"><p class=\"db-series-title\">" + escapeHtml(title) + "</p><p class=\"db-series-note\">" + escapeHtml(text) + "</p></div>";
  }

  function seriesKey(spec) {
    var guard = 0;
    while (spec && spec.extends && DIAGRAM_BANK[spec.extends] && guard < 8) {
      spec = DIAGRAM_BANK[spec.extends];
      guard++;
    }
    return spec ? spec.id : "";
  }

  function nextInSeries(spec) {
    if (!spec) return null;
    var key;
    for (key in DIAGRAM_BANK) {
      if (!Object.prototype.hasOwnProperty.call(DIAGRAM_BANK, key)) continue;
      if (DIAGRAM_BANK[key].extends === spec.id) return DIAGRAM_BANK[key];
    }
    return null;
  }

  function seriesStore() {
    try {
      return JSON.parse(localStorage.getItem(SERIES_STORE)) || {};
    } catch (err) {
      return {};
    }
  }

  function rememberSeries(spec, list) {
    var key = seriesKey(spec);
    if (!key || !list) return;
    var copy = JSON.parse(JSON.stringify(list));
    seriesBoards[key] = copy;
    var all = seriesStore();
    all[key] = copy;
    try { localStorage.setItem(SERIES_STORE, JSON.stringify(all)); } catch (err) {}
  }

  function recallSeries(specOrId) {
    var spec = typeof specOrId === "string" ? DIAGRAM_BANK[specOrId] : specOrId;
    var key = seriesKey(spec);
    if (!key) return null;
    if (!seriesBoards[key]) {
      var all = seriesStore();
      if (all[key]) seriesBoards[key] = all[key];
    }
    if (!seriesBoards[key]) return null;
    return JSON.parse(JSON.stringify(seriesBoards[key]));
  }

  function rememberChosenSeries() {
    try { localStorage.setItem(CHOSEN_SERIES, JSON.stringify(chosenSeries)); } catch (err) {}
  }

  function loadChosenSeries() {
    try {
      var saved = JSON.parse(localStorage.getItem(CHOSEN_SERIES)) || {};
      var key;
      for (key in saved) if (saved[key]) chosenSeries[key] = true;
    } catch (err) {}
  }

  function rememberOpenQuestion(id) {
    try {
      if (id) localStorage.setItem(PRACTICE_OPEN, id);
      else localStorage.removeItem(PRACTICE_OPEN);
    } catch (err) {}
  }

  function applyItems(box, list) {
    if (!box || !box._diagramItems || !list) return false;
    var stored = box._diagramItems;
    stored.splice(0, stored.length);
    for (var i = 0; i < list.length; i++) stored.push(list[i]);
    if (box._redraw) box._redraw();
    return true;
  }

  function builderBox(target) {
    var el = typeof target === "string" ? document.querySelector(target) : target;
    if (!el) return null;
    return el.classList && el.classList.contains("micro-diagram-builder") ? el : el.querySelector(".micro-diagram-builder");
  }

  var QUESTION_BOARDS = "micro-diagram-built-questions";

  function questionBoardStore() {
    try {
      return JSON.parse(localStorage.getItem(QUESTION_BOARDS)) || {};
    } catch (err) {
      return {};
    }
  }

  function rememberQuestion(id, list) {
    if (!id) return;
    var all = questionBoardStore();
    all[id] = JSON.parse(JSON.stringify(list || []));
    try { localStorage.setItem(QUESTION_BOARDS, JSON.stringify(all)); } catch (err) {}
  }

  function recallQuestion(id) {
    if (!id) return null;
    var all = questionBoardStore();
    if (!Object.prototype.hasOwnProperty.call(all, id)) return null;
    return JSON.parse(JSON.stringify(all[id]));
  }

  function mount(target, opts) {
    injectCss();
    opts = opts || {};
    var el = typeof target === "string" ? document.querySelector(target) : target;
    if (!el) return null;
    if (el.querySelector(".micro-diagram-builder")) return el.querySelector(".micro-diagram-builder");
    var preset = resolvePreset(opts);
    var presets = opts.showAllAxes ? AXIS_PRESETS.slice() : allowedPresets(opts);
    presets.unshift(OWN_LABELS);
    el.innerHTML = buildHtml(opts, preset, presets);
    init(el, opts);
    return el.querySelector(".micro-diagram-builder");
  }

  function listPracticeQuestions(opts) {
    opts = opts || {};
    var ids = opts.ids;
    var topic = opts.topic;
    var list = [];
    var key;
    for (key in DIAGRAM_BANK) {
      if (!Object.prototype.hasOwnProperty.call(DIAGRAM_BANK, key)) continue;
      var q = DIAGRAM_BANK[key];
      if (ids && ids.indexOf(q.id) < 0) continue;
      if (topic && q.topic !== topic) continue;
      if (q.extends && !chosenSeries[seriesKey(q)]) continue;
      list.push(q);
    }
    return list;
  }

  function practiceOpts(opts, extra) {
    var next = {};
    var key;
    opts = opts || {};
    extra = extra || {};
    for (key in opts) {
      if (Object.prototype.hasOwnProperty.call(opts, key)) next[key] = opts[key];
    }
    for (key in extra) {
      if (Object.prototype.hasOwnProperty.call(extra, key)) next[key] = extra[key];
    }
    return next;
  }

  function practiceTopics() {
    var seen = {};
    var topics = [];
    var key;
    for (key in DIAGRAM_BANK) {
      if (!Object.prototype.hasOwnProperty.call(DIAGRAM_BANK, key)) continue;
      var topic = DIAGRAM_BANK[key].topic;
      if (!topic || seen[topic]) continue;
      seen[topic] = true;
      topics.push(topic);
    }
    return topics;
  }

  function showTopicList(el, opts) {
    var topics = practiceTopics();
    var html = "<div class=\"db-practice\">" +
      "<p class=\"db-practice-lead\">Choose a topic.</p>" +
      "<div class=\"db-q-list\">";
    var i;
    for (i = 0; i < topics.length; i++) {
      html += "<button type=\"button\" class=\"db-q-card\" data-topic=\"" + escapeHtml(topics[i]) + "\">" +
        "<span class=\"db-q-text\">" + escapeHtml(topics[i]) + "</span>" +
      "</button>";
    }
    html += "</div></div>";
    el.innerHTML = html;
    var cards = el.querySelectorAll(".db-q-card");
    for (i = 0; i < cards.length; i++) {
      cards[i].addEventListener("click", function () {
        showQuestionList(el, practiceOpts(opts, { topic: this.getAttribute("data-topic"), fromTopicList: true }));
      });
    }
  }

  function showQuestionList(el, opts) {
    opts = opts || {};
    var qs = listPracticeQuestions(opts);
    var html = "<div class=\"db-practice\">" +
      (opts.fromTopicList ? "<div class=\"db-practice-head\"><button type=\"button\" class=\"db-back db-btnTopics\">Back to topics</button></div>" : "") +
      "<p class=\"db-practice-lead\">Choose a question. The diagram builder opens after you pick one.</p>" +
      "<div class=\"db-q-list\">";
    if (!qs.length) {
      html += "<p class=\"db-practice-lead\">No practice questions are ready yet.</p>";
    }
    for (var i = 0; i < qs.length; i++) {
      var q = qs[i];
      html += "<button type=\"button\" class=\"db-q-card\" data-qid=\"" + escapeHtml(q.id) + "\">" +
        (q.topic ? "<span class=\"db-q-topic\">" + escapeHtml(q.topic) + "</span>" : "") +
        ((nextInSeries(q) || q.extends || q.seriesTitle) ? "<span class=\"db-q-series\">" + escapeHtml(seriesTitleText(q) || "Development series") + "</span>" : "") +
        "<span class=\"db-q-text\">" + escapeHtml(q.question || q.title) + "</span>" +
        "<span class=\"db-q-go\">Practise this diagram</span>" +
      "</button>";
    }
    html += "</div></div>";
    el.innerHTML = html;
    var topicsBtn = el.querySelector(".db-btnTopics");
    if (topicsBtn) {
      topicsBtn.addEventListener("click", function () {
        showTopicList(el, opts);
      });
    }
    var cards = el.querySelectorAll(".db-q-card");
    for (i = 0; i < cards.length; i++) {
      cards[i].addEventListener("click", function () {
        openPracticeQuestion(el, this.getAttribute("data-qid"), opts);
      });
    }
  }

  var LABEL_PLACE_STORE = "micro-diagram-label-places";

  function rememberLabelPlaces(id, map) {
    try {
      var all = JSON.parse(localStorage.getItem(LABEL_PLACE_STORE)) || {};
      all[id] = map;
      localStorage.setItem(LABEL_PLACE_STORE, JSON.stringify(all));
    } catch (err) {}
  }

  function openLabelPlace(el, spec, opts) {
    var place = spec.labelPlace || {};
    var pieces = place.pieces || [];
    rememberOpenQuestion(spec.id);
    var chips = "";
    for (var i = 0; i < pieces.length; i++) {
      var piece = pieces[i];
      if (piece.dot) {
        chips += "<div class=\"db-label-chip db-amber-dot\" data-piece=\"" + escapeHtml(piece.id) + "\" role=\"button\" aria-label=\"Amber dot\"></div>";
      } else {
        chips += "<div class=\"db-label-chip\" data-piece=\"" + escapeHtml(piece.id) + "\" role=\"button\">" + escapeHtml(piece.text) + "</div>";
      }
    }
    el.innerHTML =
      "<div class=\"db-practice db-practice-draw db-label-task\">" +
        "<div class=\"db-practice-head\"><div class=\"db-label-actions\">" +
          "<button type=\"button\" class=\"db-back db-btnBack\">Back to questions</button>" +
          "<button type=\"button\" class=\"db-see\">See the answer</button>" +
        "</div></div>" +
        questionStemHtml(spec) +
        "<p class=\"db-status\">Drag each label onto the diagram. Drag a label back to the list to take it off.</p>" +
        "<div class=\"db-label-stage\">" +
          "<img class=\"db-label-base\" src=\"" + escapeHtml(place.blank) + "\" alt=\"Production possibility frontier ready for labels. Good A is on the vertical axis, Good B is on the horizontal axis, and Q1 and Q2 mark a trade off on the curve.\">" +
          "<div class=\"db-label-layer\"></div>" +
        "</div>" +
        "<div class=\"db-label-tray\">" + chips + "</div>" +
        "<div class=\"db-answer\" hidden>" +
          "<p class=\"db-answer-title\">Answer: " + escapeHtml(spec.title || "this question") + "</p>" +
          "<p class=\"db-answer-note\">One finished diagram for this question. Your labels stay where you put them.</p>" +
          "<img src=\"" + escapeHtml(place.answer) + "\" alt=\"Finished production possibility frontier with each label in place.\">" +
          "<div class=\"db-self-check\"><p class=\"db-self-check-title\">Self check</p><ol>" +
            "<li>All Good A no Good B is at the point where only Good A is produced.</li>" +
            "<li>All Good B no Good A is at the point where only Good B is produced.</li>" +
            "<li>Productive efficiency is on the curve.</li>" +
            "<li>Productive inefficiency is inside the curve.</li>" +
            "<li>Unobtainable is outside the curve.</li>" +
            "<li>Allocative efficiency is on the curve.</li>" +
            "<li>Trade off sits between the two points joined by the arrows.</li>" +
          "</ol></div>" +
        "</div>" +
      "</div>";
    var stage = el.querySelector(".db-label-stage");
    var layer = el.querySelector(".db-label-layer");
    var tray = el.querySelector(".db-label-tray");
    var statusEl = el.querySelector(".db-status");
    var answerEl = el.querySelector(".db-answer");
    var seeBtn = el.querySelector(".db-see");

    function snapshot() {
      var map = {};
      var placed = layer.querySelectorAll(".db-label-chip");
      for (var n = 0; n < placed.length; n++) {
        map[placed[n].getAttribute("data-piece")] = {
          left: placed[n].style.left,
          top: placed[n].style.top
        };
      }
      rememberLabelPlaces(spec.id, map);
    }

    function park(chip, spot) {
      if (!spot) {
        chip.classList.remove("placed");
        chip.style.position = "";
        chip.style.left = "";
        chip.style.top = "";
        chip.style.zIndex = "";
        chip.style.width = "";
        tray.appendChild(chip);
        return;
      }
      layer.appendChild(chip);
      chip.classList.add("placed");
      chip.style.position = "absolute";
      chip.style.left = spot.left;
      chip.style.top = spot.top;
      chip.style.zIndex = "2";
      chip.style.width = "";
    }

    var chipEls = el.querySelectorAll(".db-label-chip");
    for (i = 0; i < chipEls.length; i++) {
      (function (chip) {
        chip.addEventListener("pointerdown", function (ev) {
          if (ev.button !== undefined && ev.button !== 0) return;
          ev.preventDefault();
          var rect = chip.getBoundingClientRect();
          var ox = ev.clientX - rect.left;
          var oy = ev.clientY - rect.top;
          chip.style.position = "fixed";
          chip.style.left = rect.left + "px";
          chip.style.top = rect.top + "px";
          chip.style.width = rect.width + "px";
          chip.style.zIndex = "30";
          document.body.appendChild(chip);
          try { chip.setPointerCapture(ev.pointerId); } catch (err) {}
          function move(e) {
            chip.style.left = (e.clientX - ox) + "px";
            chip.style.top = (e.clientY - oy) + "px";
          }
          function up(e) {
            chip.removeEventListener("pointermove", move);
            chip.removeEventListener("pointerup", up);
            var stageRect = stage.getBoundingClientRect();
            var onStage = e.clientX >= stageRect.left && e.clientX <= stageRect.right && e.clientY >= stageRect.top && e.clientY <= stageRect.bottom;
            if (onStage) {
              var width = chip.offsetWidth;
              var height = chip.offsetHeight;
              var left = e.clientX - stageRect.left - ox;
              var top = e.clientY - stageRect.top - oy;
              left = Math.max(0, Math.min(stageRect.width - width, left));
              top = Math.max(0, Math.min(stageRect.height - height, top));
              park(chip, {
                left: (left / stageRect.width * 100) + "%",
                top: (top / stageRect.height * 100) + "%"
              });
              statusEl.textContent = "Label placed. Drag it again to move it, or drag it back to the list.";
            } else {
              park(chip, null);
              statusEl.textContent = "Label returned to the list.";
            }
            snapshot();
          }
          chip.addEventListener("pointermove", move);
          chip.addEventListener("pointerup", up);
        });
      })(chipEls[i]);
    }

    seeBtn.onclick = function () {
      if (answerEl.hidden) {
        answerEl.hidden = false;
        seeBtn.textContent = "Hide the answer";
        statusEl.textContent = "The finished diagram is shown under your labels.";
        answerEl.scrollIntoView({ block: "nearest" });
      } else {
        answerEl.hidden = true;
        seeBtn.textContent = "See the answer";
        statusEl.textContent = "Answer hidden. Your labels are still on the diagram.";
      }
    };
    el.querySelector(".db-btnBack").onclick = function () {
      snapshot();
      rememberOpenQuestion("");
      showQuestionList(el, opts);
    };
  }

  function openPracticeQuestion(el, id, opts) {
    var spec = DIAGRAM_BANK[id];
    if (!spec) return;
    if (spec.labelPlace) {
      openLabelPlace(el, spec, opts);
      return;
    }
    chosenSeries[seriesKey(spec)] = true;
    rememberChosenSeries();
    rememberOpenQuestion(spec.id);
    el.innerHTML =
      "<div class=\"db-practice db-practice-draw\">" +
        "<div class=\"db-practice-head\">" +
          "<button type=\"button\" class=\"db-back db-btnBack\">Back to questions</button>" +
        "</div>" +
        "<div class=\"db-practice-board\"></div>" +
      "</div>";
    var boardEl = el.querySelector(".db-practice-board");
    el.querySelector(".db-btnBack").onclick = function () {
      var live = boardEl.querySelector(".micro-diagram-builder");
      if (live && live._remember) live._remember();
      rememberOpenQuestion("");
      showQuestionList(el, opts);
    };
    mount(boardEl, practiceOpts(spec.mount || { checkId: spec.id }, opts && opts.hideSaveReplay ? { hideSaveReplay: true } : {}));
    var saved = recallSeries(spec);
    var box = boardEl.querySelector(".micro-diagram-builder");
    if (saved && saved.length && applyItems(box, saved)) {
      var status = box.querySelector(".db-status");
      if (status) status.textContent = "Your diagram is back on the board.";
    }
  }

  function mountPractice(target, opts) {
    injectCss();
    opts = opts || {};
    var el = typeof target === "string" ? document.querySelector(target) : target;
    if (!el) return null;
    loadChosenSeries();
    var questionId = "";
    try {
      var questionMatch = /(?:\?|&)question=([^&]+)/.exec(window.location.search);
      questionId = questionMatch ? decodeURIComponent(questionMatch[1]) : "";
    } catch (err) {}
    if (questionId && DIAGRAM_BANK[questionId]) {
      openPracticeQuestion(el, questionId, opts);
      return el;
    }
    var chooseFresh = false;
    try { chooseFresh = /(?:\?|&)choose=1(?:&|$)/.test(window.location.search); } catch (err) {}
    if (chooseFresh) {
      if (opts.topic) showQuestionList(el, opts);
      else showTopicList(el, opts);
      return el;
    }
    var openId = "";
    try { openId = localStorage.getItem(PRACTICE_OPEN) || ""; } catch (err) {}
    var saved = openId && DIAGRAM_BANK[openId];
    if (saved && (!opts.topic || saved.topic === opts.topic)) openPracticeQuestion(el, openId, opts);
    else if (opts.topic) showQuestionList(el, opts);
    else showTopicList(el, opts);
    return el;
  }

  function movementFileHtml(stages) {
    var payload = JSON.stringify({ stages: stages })
      .replace(/</g, "\\u003c")
      .replace(/\u2028/g, "\\u2028")
      .replace(/\u2029/g, "\\u2029");
    var script = [
      "var MOTION = " + payload + ";",
      "var canvas = document.getElementById('board');",
      "var ctx = canvas.getContext('2d');",
      "var pics = {};",
      "var playing = 0;",
      "function lerp(a, b, t) { return a + (b - a) * t; }",
      "function clone(it) { return JSON.parse(JSON.stringify(it)); }",
      "function sameShape(a, b) {",
      "  if (!a || !b) return false;",
      "  if (a.kind !== b.kind) return false;",
      "  if ((a.type || '') !== (b.type || '')) return false;",
      "  if ((a.c2x == null) !== (b.c2x == null)) return false;",
      "  if (a.kind === 'label' && a.text !== b.text) return false;",
      "  return true;",
      "}",
      "function mixItem(a, b, t) {",
      "  var base = clone(b || a);",
      "  var keys = ['x','y','x1','y1','x2','y2','cx','cy','c2x','c2y','w','h','angle'];",
      "  var i, k, n, pa, pb;",
      "  if (a && b) {",
      "    for (i = 0; i < keys.length; i++) {",
      "      k = keys[i];",
      "      if (typeof a[k] === 'number' && typeof b[k] === 'number') base[k] = lerp(a[k], b[k], t);",
      "    }",
      "    if (a.points && b.points) {",
      "      n = Math.max(a.points.length, b.points.length);",
      "      base.points = [];",
      "      for (i = 0; i < n; i++) {",
      "        pa = a.points[Math.min(i, a.points.length - 1)];",
      "        pb = b.points[Math.min(i, b.points.length - 1)];",
      "        base.points.push({ x: lerp(pa.x, pb.x, t), y: lerp(pa.y, pb.y, t) });",
      "      }",
      "    }",
      "    base._alpha = 1;",
      "  } else if (a) base._alpha = 1 - t;",
      "  else base._alpha = t;",
      "  return base;",
      "}",
      "function partnerFor(start, endItem) {",
      "  if (endItem.kind !== 'curve' && endItem.kind !== 'line') return null;",
      "  var best = null, bestD = 1e12, i, s, ax, ay, bx, by, d;",
      "  for (i = 0; i < start.length; i++) {",
      "    s = start[i];",
      "    if (s.kind !== endItem.kind) continue;",
      "    if ((s.type || '') !== (endItem.type || '')) continue;",
      "    if (s.kind === 'curve' && (s.c2x == null) !== (endItem.c2x == null)) continue;",
      "    ax = s.x1 != null ? s.x1 : s.x; ay = s.y1 != null ? s.y1 : s.y;",
      "    bx = endItem.x1 != null ? endItem.x1 : endItem.x; by = endItem.y1 != null ? endItem.y1 : endItem.y;",
      "    d = (ax == null || bx == null) ? 0 : Math.hypot(ax - bx, ay - by);",
      "    if (d < bestD) { bestD = d; best = s; }",
      "  }",
      "  return best;",
      "}",
      "function frameAt(start, end, t) {",
      "  var byId = {}, used = {}, frame = [], ghosts = [], i, id, from;",
      "  for (i = 0; i < start.length; i++) byId[start[i].shiftId] = start[i];",
      "  for (i = 0; i < end.length; i++) {",
      "    id = end[i].shiftId;",
      "    used[id] = true;",
      "    from = byId[id] || null;",
      "    if (!from) {",
      "      var partner = partnerFor(start, end[i]);",
      "      if (partner) frame.push(mixItem(partner, end[i], t));",
      "      else frame.push(mixItem(null, end[i], t));",
      "    } else if (!sameShape(from, end[i])) {",
      "      frame.push(mixItem(from, null, t));",
      "      frame.push(mixItem(null, end[i], t));",
      "    } else frame.push(mixItem(from, end[i], t));",
      "  }",
      "  for (i = 0; i < start.length; i++) {",
      "    id = start[i].shiftId;",
      "    if (!used[id]) ghosts.push(mixItem(start[i], null, t));",
      "  }",
      "  return ghosts.concat(frame);",
      "}",
      "function arrowHead(x1, y1, x2, y2) {",
      "  var dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;",
      "  var ux = dx / len, uy = dy / len, px = -uy, py = ux;",
      "  var backX = x2 - ux * 12, backY = y2 - uy * 12;",
      "  ctx.beginPath();",
      "  ctx.moveTo(x2, y2);",
      "  ctx.lineTo(backX + px * 8, backY + py * 8);",
      "  ctx.lineTo(backX - px * 8, backY - py * 8);",
      "  ctx.closePath();",
      "  ctx.fill();",
      "}",
      "function hexToRgba(hex, alpha) {",
      "  var h = (hex || '#000000').replace('#', '');",
      "  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];",
      "  var n = parseInt(h, 16);",
      "  if (isNaN(n)) return 'rgba(0,0,0,' + alpha + ')';",
      "  return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + alpha + ')';",
      "}",
      "function yAxisTitleGap(yLab) {",
      "  var words = String(yLab || '').trim().split(/\\s+/).filter(Boolean).length;",
      "  if (words >= 4) return 46;",
      "  if (words >= 3) return 36;",
      "  if (words >= 2) return 26;",
      "  return 18;",
      "}",
      "function axesPanel(ox, oy, rx, ty, xLab, yLab, title) {",
      "  ctx.strokeStyle = ctx.fillStyle;",
      "  ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(rx, oy); ctx.stroke();",
      "  ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox, ty); ctx.stroke();",
      "  arrowHead(ox, oy, rx, oy);",
      "  arrowHead(ox, oy, ox, ty);",
      "  ctx.font = title ? 'bold 14px sans-serif' : 'bold 16px sans-serif';",
      "  ctx.fillText(xLab || '', rx - ctx.measureText(xLab || '').width - (title ? 4 : 8), oy + (title ? 20 : 22));",
      "  ctx.save();",
      "  ctx.translate(ox - yAxisTitleGap(yLab), ty + (title ? 18 : 20) + ctx.measureText(yLab || '').width);",
      "  ctx.rotate(-Math.PI / 2);",
      "  ctx.fillText(yLab || '', 0, 0);",
      "  ctx.restore();",
      "  if (title) {",
      "    ctx.font = 'bold 16px sans-serif';",
      "    ctx.fillText(title, (ox + rx) / 2 - ctx.measureText(title).width / 2, ty - 8);",
      "  }",
      "}",
      "function twinPanels(it) {",
      "  var left = Math.min(it.x1, it.x2), right = Math.max(it.x1, it.x2);",
      "  var top = Math.min(it.y1, it.y2), bottom = Math.max(it.y1, it.y2);",
      "  var gap = 34, mid = (left + right) / 2;",
      "  return { L: { ox: left, oy: bottom, rx: mid - gap / 2, ty: top }, R: { ox: mid + gap / 2, oy: bottom, rx: right, ty: top } };",
      "}",
      "function paint(list) {",
      "  ctx.clearRect(0, 0, canvas.width, canvas.height);",
      "  ctx.fillStyle = '#fff';",
      "  ctx.fillRect(0, 0, canvas.width, canvas.height);",
      "  ctx.globalAlpha = 1;",
      "  var i, it, p;",
      "  for (i = 0; i < list.length; i++) {",
      "    it = list[i];",
      "    if (it.kind !== 'image' || !it.src) continue;",
      "    if (!pics[it.shiftId] || !pics[it.shiftId].naturalWidth) {",
      "      if (!pics[it.shiftId]) {",
      "        pics[it.shiftId] = new Image();",
      "        pics[it.shiftId].onload = function () { if (!playing) paint(frameAt(MOTION.stages[MOTION.stages.length - 2], MOTION.stages[MOTION.stages.length - 1], 1)); };",
      "        pics[it.shiftId].src = it.src;",
      "      }",
      "      continue;",
      "    }",
      "    ctx.save();",
      "    ctx.globalAlpha = it._alpha == null ? 1 : it._alpha;",
      "    if (it.angle) { ctx.translate(it.x + it.w / 2, it.y + it.h / 2); ctx.rotate(it.angle * Math.PI / 180); ctx.translate(-(it.x + it.w / 2), -(it.y + it.h / 2)); }",
      "    ctx.drawImage(pics[it.shiftId], it.x, it.y, it.w, it.h);",
      "    ctx.restore();",
      "  }",
      "  for (i = 0; i < list.length; i++) {",
      "    it = list[i];",
      "    if (!(it.kind === 'shape' && it.type === 'shade')) continue;",
      "    ctx.save();",
      "    ctx.globalAlpha = it._alpha == null ? 1 : it._alpha;",
      "    if (it.points && it.points.length) {",
      "      ctx.beginPath();",
      "      ctx.moveTo(it.points[0].x, it.points[0].y);",
      "      for (p = 1; p < it.points.length; p++) ctx.lineTo(it.points[p].x, it.points[p].y);",
      "      ctx.closePath();",
      "      ctx.fillStyle = hexToRgba(it.color || '#000', 0.28);",
      "      if (it.points.length >= 3) ctx.fill();",
      "      ctx.strokeStyle = it.color || '#000';",
      "      ctx.lineWidth = 2;",
      "      ctx.stroke();",
      "    }",
      "    ctx.restore();",
      "  }",
      "  for (i = 0; i < list.length; i++) {",
      "    it = list[i];",
      "    if (it.kind === 'shape' && it.type === 'shade') continue;",
      "    if (it.kind === 'image') continue;",
      "    ctx.save();",
      "    ctx.globalAlpha = it._alpha == null ? 1 : it._alpha;",
      "    ctx.lineWidth = 3;",
      "    ctx.strokeStyle = it.color || '#000';",
      "    ctx.fillStyle = it.color || '#000';",
      "    ctx.setLineDash([]);",
      "    if (it.kind === 'line') {",
      "      ctx.beginPath(); ctx.moveTo(it.x1, it.y1); ctx.lineTo(it.x2, it.y2); ctx.stroke();",
      "    } else if (it.kind === 'curve') {",
      "      ctx.beginPath(); ctx.moveTo(it.x1, it.y1);",
      "      if (it.c2x == null) ctx.quadraticCurveTo(it.cx, it.cy, it.x2, it.y2);",
      "      else ctx.bezierCurveTo(it.cx, it.cy, it.c2x, it.c2y, it.x2, it.y2);",
      "      ctx.stroke();",
      "    } else if (it.kind === 'shape' && it.type === 'point') {",
      "      ctx.beginPath(); ctx.fillStyle = it.color || '#2563eb'; ctx.arc(it.x1, it.y1, 8, 0, Math.PI * 2); ctx.fill();",
      "      ctx.lineWidth = 2; ctx.strokeStyle = '#fff'; ctx.stroke();",
      "      ctx.beginPath(); ctx.arc(it.x1, it.y1, 8, 0, Math.PI * 2); ctx.strokeStyle = it.color || '#2563eb'; ctx.stroke();",
      "    } else if (it.kind === 'shape' && it.type === 'dotted') {",
      "      ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(it.x1, it.y1); ctx.lineTo(it.x2, it.y2); ctx.stroke(); ctx.setLineDash([]);",
      "    } else if (it.kind === 'shape' && it.type === 'axes') {",
      "      if (it.angle) { ctx.translate((it.x1 + it.x2) / 2, (it.y1 + it.y2) / 2); ctx.rotate(it.angle * Math.PI / 180); ctx.translate(-(it.x1 + it.x2) / 2, -(it.y1 + it.y2) / 2); }",
      "      axesPanel(Math.min(it.x1, it.x2), Math.max(it.y1, it.y2), Math.max(it.x1, it.x2), Math.min(it.y1, it.y2), it.xLabel, it.yLabel, null);",
      "    } else if (it.kind === 'shape' && it.type === 'twin-pc-axes') {",
      "      if (it.angle) { ctx.translate((it.x1 + it.x2) / 2, (it.y1 + it.y2) / 2); ctx.rotate(it.angle * Math.PI / 180); ctx.translate(-(it.x1 + it.x2) / 2, -(it.y1 + it.y2) / 2); }",
      "      p = twinPanels(it);",
      "      axesPanel(p.L.ox, p.L.oy, p.L.rx, p.L.ty, it.xLabel, it.yLabel, it.showTitles === false ? null : (it.leftTitle || 'Industry'));",
      "      axesPanel(p.R.ox, p.R.oy, p.R.rx, p.R.ty, it.xLabel, it.yLabel, it.showTitles === false ? null : (it.rightTitle || 'Firm'));",
      "    } else if (it.kind === 'shape' && (it.type === 'arrow' || it.type === 'arrow-both')) {",
      "      ctx.beginPath(); ctx.moveTo(it.x1, it.y1); ctx.lineTo(it.x2, it.y2); ctx.stroke();",
      "      arrowHead(it.x1, it.y1, it.x2, it.y2);",
      "      if (it.type === 'arrow-both') arrowHead(it.x2, it.y2, it.x1, it.y1);",
      "    } else if (it.kind === 'label') {",
      "      ctx.fillStyle = it.color || '#000';",
      "      ctx.font = 'bold 18px sans-serif';",
      "      ctx.textAlign = 'left';",
      "      ctx.textBaseline = 'middle';",
      "      ctx.translate(it.x, it.y);",
      "      ctx.rotate(((it.angle || 0) * Math.PI) / 180);",
      "      ctx.fillText(it.text || '', 0, 0);",
      "    }",
      "    ctx.restore();",
      "  }",
      "}",
      "function play() {",
      "  if (playing) cancelAnimationFrame(playing);",
      "  var seg = 0;",
      "  var lastSeg = MOTION.stages.length - 2;",
      "  function playSeg() {",
      "    paint(frameAt(MOTION.stages[seg], MOTION.stages[seg + 1], 0));",
      "    var t0 = performance.now();",
      "    function frame(now) {",
      "      var k = Math.min(1, (now - t0) / 1100);",
      "      var eased = k * k * (3 - 2 * k);",
      "      paint(frameAt(MOTION.stages[seg], MOTION.stages[seg + 1], eased));",
      "      if (k < 1) playing = requestAnimationFrame(frame);",
      "      else if (seg < lastSeg) { seg += 1; playSeg(); }",
      "      else { playing = 0; paint(frameAt(MOTION.stages[lastSeg], MOTION.stages[lastSeg + 1], 1)); }",
      "    }",
      "    playing = requestAnimationFrame(frame);",
      "  }",
      "  playSeg();",
      "}",
      "document.getElementById('play').onclick = play;",
      "paint(frameAt(MOTION.stages[0], MOTION.stages[1], 0));"
    ].join("\n");
    return "<!DOCTYPE html>\n<html lang=\"en\"><head><meta charset=\"utf-8\"><title>Diagram movement</title><style>" +
      "body{margin:0;font-family:system-ui,Segoe UI,Arial,sans-serif;background:#f6f8fb;color:#0f2a4a}" +
      ".wrap{max-width:820px;margin:0 auto;padding:20px 20px 48px}" +
      "button{background:#178a45;color:#fff;border:none;border-radius:4px;padding:8px 12px;font-weight:700;cursor:pointer;font-family:inherit}" +
      "canvas{display:block;width:100%;max-width:780px;height:auto;background:#fff;border:2px solid #000;margin-top:12px}" +
      "</style></head><body><div class=\"wrap\">" +
      "<button type=\"button\" id=\"play\">Play movement</button>" +
      "<canvas id=\"board\" width=\"780\" height=\"480\"></canvas></div><script>\n" +
      script + "\n</script></body></html>";
  }

  function replayFileHtml(steps) {
    var payload = JSON.stringify({ steps: steps })
      .replace(/</g, "\\u003c")
      .replace(/\u2028/g, "\\u2028")
      .replace(/\u2029/g, "\\u2029");
    var script = [
      "var REPLAY = " + payload + ";",
      "var playing = 0;",
      "var step = 0;",
      "function currentList() {",
      "  var list = [], i;",
      "  for (i = 0; i < step; i++) list.push(REPLAY.steps[i].item);",
      "  return list;",
      "}",
      "function show(n) {",
      "  step = n;",
      "  paint(currentList());",
      "}",
      "function repaint() { paint(currentList()); }"
    ].concat([
      "var canvas = document.getElementById('board');",
      "var ctx = canvas.getContext('2d');",
      "var pics = {};",
      "function lerp(a, b, t) { return a + (b - a) * t; }",
      "function clone(it) { return JSON.parse(JSON.stringify(it)); }",
      "function sameShape(a, b) {",
      "  if (!a || !b) return false;",
      "  if (a.kind !== b.kind) return false;",
      "  if ((a.type || '') !== (b.type || '')) return false;",
      "  if ((a.c2x == null) !== (b.c2x == null)) return false;",
      "  if (a.kind === 'label' && a.text !== b.text) return false;",
      "  return true;",
      "}",
      "function mixItem(a, b, t) {",
      "  var base = clone(b || a);",
      "  var keys = ['x','y','x1','y1','x2','y2','cx','cy','c2x','c2y','w','h','angle'];",
      "  var i, k, n, pa, pb;",
      "  if (a && b) {",
      "    for (i = 0; i < keys.length; i++) {",
      "      k = keys[i];",
      "      if (typeof a[k] === 'number' && typeof b[k] === 'number') base[k] = lerp(a[k], b[k], t);",
      "    }",
      "    if (a.points && b.points) {",
      "      n = Math.max(a.points.length, b.points.length);",
      "      base.points = [];",
      "      for (i = 0; i < n; i++) {",
      "        pa = a.points[Math.min(i, a.points.length - 1)];",
      "        pb = b.points[Math.min(i, b.points.length - 1)];",
      "        base.points.push({ x: lerp(pa.x, pb.x, t), y: lerp(pa.y, pb.y, t) });",
      "      }",
      "    }",
      "    base._alpha = 1;",
      "  } else if (a) base._alpha = 1 - t;",
      "  else base._alpha = t;",
      "  return base;",
      "}",
      "function partnerFor(start, endItem) {",
      "  if (endItem.kind !== 'curve' && endItem.kind !== 'line') return null;",
      "  var best = null, bestD = 1e12, i, s, ax, ay, bx, by, d;",
      "  for (i = 0; i < start.length; i++) {",
      "    s = start[i];",
      "    if (s.kind !== endItem.kind) continue;",
      "    if ((s.type || '') !== (endItem.type || '')) continue;",
      "    if (s.kind === 'curve' && (s.c2x == null) !== (endItem.c2x == null)) continue;",
      "    ax = s.x1 != null ? s.x1 : s.x; ay = s.y1 != null ? s.y1 : s.y;",
      "    bx = endItem.x1 != null ? endItem.x1 : endItem.x; by = endItem.y1 != null ? endItem.y1 : endItem.y;",
      "    d = (ax == null || bx == null) ? 0 : Math.hypot(ax - bx, ay - by);",
      "    if (d < bestD) { bestD = d; best = s; }",
      "  }",
      "  return best;",
      "}",
      "function frameAt(start, end, t) {",
      "  var byId = {}, used = {}, frame = [], ghosts = [], i, id, from;",
      "  for (i = 0; i < start.length; i++) byId[start[i].shiftId] = start[i];",
      "  for (i = 0; i < end.length; i++) {",
      "    id = end[i].shiftId;",
      "    used[id] = true;",
      "    from = byId[id] || null;",
      "    if (!from) {",
      "      var partner = partnerFor(start, end[i]);",
      "      if (partner) frame.push(mixItem(partner, end[i], t));",
      "      else frame.push(mixItem(null, end[i], t));",
      "    } else if (!sameShape(from, end[i])) {",
      "      frame.push(mixItem(from, null, t));",
      "      frame.push(mixItem(null, end[i], t));",
      "    } else frame.push(mixItem(from, end[i], t));",
      "  }",
      "  for (i = 0; i < start.length; i++) {",
      "    id = start[i].shiftId;",
      "    if (!used[id]) ghosts.push(mixItem(start[i], null, t));",
      "  }",
      "  return ghosts.concat(frame);",
      "}",
      "function arrowHead(x1, y1, x2, y2) {",
      "  var dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;",
      "  var ux = dx / len, uy = dy / len, px = -uy, py = ux;",
      "  var backX = x2 - ux * 12, backY = y2 - uy * 12;",
      "  ctx.beginPath();",
      "  ctx.moveTo(x2, y2);",
      "  ctx.lineTo(backX + px * 8, backY + py * 8);",
      "  ctx.lineTo(backX - px * 8, backY - py * 8);",
      "  ctx.closePath();",
      "  ctx.fill();",
      "}",
      "function hexToRgba(hex, alpha) {",
      "  var h = (hex || '#000000').replace('#', '');",
      "  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];",
      "  var n = parseInt(h, 16);",
      "  if (isNaN(n)) return 'rgba(0,0,0,' + alpha + ')';",
      "  return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + alpha + ')';",
      "}",
      "function yAxisTitleGap(yLab) {",
      "  var words = String(yLab || '').trim().split(/\\s+/).filter(Boolean).length;",
      "  if (words >= 4) return 46;",
      "  if (words >= 3) return 36;",
      "  if (words >= 2) return 26;",
      "  return 18;",
      "}",
      "function axesPanel(ox, oy, rx, ty, xLab, yLab, title) {",
      "  ctx.strokeStyle = ctx.fillStyle;",
      "  ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(rx, oy); ctx.stroke();",
      "  ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox, ty); ctx.stroke();",
      "  arrowHead(ox, oy, rx, oy);",
      "  arrowHead(ox, oy, ox, ty);",
      "  ctx.font = title ? 'bold 14px sans-serif' : 'bold 16px sans-serif';",
      "  ctx.fillText(xLab || '', rx - ctx.measureText(xLab || '').width - (title ? 4 : 8), oy + (title ? 20 : 22));",
      "  ctx.save();",
      "  ctx.translate(ox - yAxisTitleGap(yLab), ty + (title ? 18 : 20) + ctx.measureText(yLab || '').width);",
      "  ctx.rotate(-Math.PI / 2);",
      "  ctx.fillText(yLab || '', 0, 0);",
      "  ctx.restore();",
      "  if (title) {",
      "    ctx.font = 'bold 16px sans-serif';",
      "    ctx.fillText(title, (ox + rx) / 2 - ctx.measureText(title).width / 2, ty - 8);",
      "  }",
      "}",
      "function twinPanels(it) {",
      "  var left = Math.min(it.x1, it.x2), right = Math.max(it.x1, it.x2);",
      "  var top = Math.min(it.y1, it.y2), bottom = Math.max(it.y1, it.y2);",
      "  var gap = 34, mid = (left + right) / 2;",
      "  return { L: { ox: left, oy: bottom, rx: mid - gap / 2, ty: top }, R: { ox: mid + gap / 2, oy: bottom, rx: right, ty: top } };",
      "}",
      "function paint(list) {",
      "  ctx.clearRect(0, 0, canvas.width, canvas.height);",
      "  ctx.fillStyle = '#fff';",
      "  ctx.fillRect(0, 0, canvas.width, canvas.height);",
      "  ctx.globalAlpha = 1;",
      "  var i, it, p;",
      "  for (i = 0; i < list.length; i++) {",
      "    it = list[i];",
      "    if (it.kind !== 'image' || !it.src) continue;",
      "    var key = it.shiftId || it.src || '';",
      "    if (!pics[key] || !pics[key].naturalWidth) {",
      "      if (!pics[key]) {",
      "        pics[key] = new Image();",
      "        pics[key].onload = function () { if (!playing && typeof repaint === 'function') repaint(); };",
      "        pics[key].src = it.src;",
      "      }",
      "      continue;",
      "    }",
      "    ctx.save();",
      "    ctx.globalAlpha = it._alpha == null ? 1 : it._alpha;",
      "    if (it.angle) { ctx.translate(it.x + it.w / 2, it.y + it.h / 2); ctx.rotate(it.angle * Math.PI / 180); ctx.translate(-(it.x + it.w / 2), -(it.y + it.h / 2)); }",
      "    ctx.drawImage(pics[key], it.x, it.y, it.w, it.h);",
      "    ctx.restore();",
      "  }",
      "  for (i = 0; i < list.length; i++) {",
      "    it = list[i];",
      "    if (!(it.kind === 'shape' && it.type === 'shade')) continue;",
      "    ctx.save();",
      "    ctx.globalAlpha = it._alpha == null ? 1 : it._alpha;",
      "    if (it.points && it.points.length) {",
      "      ctx.beginPath();",
      "      ctx.moveTo(it.points[0].x, it.points[0].y);",
      "      for (p = 1; p < it.points.length; p++) ctx.lineTo(it.points[p].x, it.points[p].y);",
      "      ctx.closePath();",
      "      ctx.fillStyle = hexToRgba(it.color || '#000', 0.28);",
      "      if (it.points.length >= 3) ctx.fill();",
      "      ctx.strokeStyle = it.color || '#000';",
      "      ctx.lineWidth = 2;",
      "      ctx.stroke();",
      "    }",
      "    ctx.restore();",
      "  }",
      "  for (i = 0; i < list.length; i++) {",
      "    it = list[i];",
      "    if (it.kind === 'shape' && it.type === 'shade') continue;",
      "    if (it.kind === 'image') continue;",
      "    ctx.save();",
      "    ctx.globalAlpha = it._alpha == null ? 1 : it._alpha;",
      "    ctx.lineWidth = 3;",
      "    ctx.strokeStyle = it.color || '#000';",
      "    ctx.fillStyle = it.color || '#000';",
      "    ctx.setLineDash([]);",
      "    if (it.kind === 'line') {",
      "      ctx.beginPath(); ctx.moveTo(it.x1, it.y1); ctx.lineTo(it.x2, it.y2); ctx.stroke();",
      "    } else if (it.kind === 'curve') {",
      "      ctx.beginPath(); ctx.moveTo(it.x1, it.y1);",
      "      if (it.c2x == null) ctx.quadraticCurveTo(it.cx, it.cy, it.x2, it.y2);",
      "      else ctx.bezierCurveTo(it.cx, it.cy, it.c2x, it.c2y, it.x2, it.y2);",
      "      ctx.stroke();",
      "    } else if (it.kind === 'shape' && it.type === 'point') {",
      "      ctx.beginPath(); ctx.fillStyle = it.color || '#2563eb'; ctx.arc(it.x1, it.y1, 8, 0, Math.PI * 2); ctx.fill();",
      "      ctx.lineWidth = 2; ctx.strokeStyle = '#fff'; ctx.stroke();",
      "      ctx.beginPath(); ctx.arc(it.x1, it.y1, 8, 0, Math.PI * 2); ctx.strokeStyle = it.color || '#2563eb'; ctx.stroke();",
      "    } else if (it.kind === 'shape' && it.type === 'dotted') {",
      "      ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(it.x1, it.y1); ctx.lineTo(it.x2, it.y2); ctx.stroke(); ctx.setLineDash([]);",
      "    } else if (it.kind === 'shape' && it.type === 'axes') {",
      "      if (it.angle) { ctx.translate((it.x1 + it.x2) / 2, (it.y1 + it.y2) / 2); ctx.rotate(it.angle * Math.PI / 180); ctx.translate(-(it.x1 + it.x2) / 2, -(it.y1 + it.y2) / 2); }",
      "      axesPanel(Math.min(it.x1, it.x2), Math.max(it.y1, it.y2), Math.max(it.x1, it.x2), Math.min(it.y1, it.y2), it.xLabel, it.yLabel, null);",
      "    } else if (it.kind === 'shape' && it.type === 'twin-pc-axes') {",
      "      if (it.angle) { ctx.translate((it.x1 + it.x2) / 2, (it.y1 + it.y2) / 2); ctx.rotate(it.angle * Math.PI / 180); ctx.translate(-(it.x1 + it.x2) / 2, -(it.y1 + it.y2) / 2); }",
      "      p = twinPanels(it);",
      "      axesPanel(p.L.ox, p.L.oy, p.L.rx, p.L.ty, it.xLabel, it.yLabel, it.showTitles === false ? null : (it.leftTitle || 'Industry'));",
      "      axesPanel(p.R.ox, p.R.oy, p.R.rx, p.R.ty, it.xLabel, it.yLabel, it.showTitles === false ? null : (it.rightTitle || 'Firm'));",
      "    } else if (it.kind === 'shape' && (it.type === 'arrow' || it.type === 'arrow-both')) {",
      "      ctx.beginPath(); ctx.moveTo(it.x1, it.y1); ctx.lineTo(it.x2, it.y2); ctx.stroke();",
      "      arrowHead(it.x1, it.y1, it.x2, it.y2);",
      "      if (it.type === 'arrow-both') arrowHead(it.x2, it.y2, it.x1, it.y1);",
      "    } else if (it.kind === 'label') {",
      "      ctx.fillStyle = it.color || '#000';",
      "      ctx.font = 'bold 18px sans-serif';",
      "      ctx.textAlign = 'left';",
      "      ctx.textBaseline = 'middle';",
      "      ctx.translate(it.x, it.y);",
      "      ctx.rotate(((it.angle || 0) * Math.PI) / 180);",
      "      ctx.fillText(it.text || '', 0, 0);",
      "    }",
      "    ctx.restore();",
      "  }",
      "}",
    ]).concat([
      "document.getElementById('next').onclick = function () {",
      "  if (step < REPLAY.steps.length) show(step + 1);",
      "};",
      "document.getElementById('prev').onclick = function () {",
      "  if (step > 0) show(step - 1);",
      "};",
      "show(0);"
    ]).join("\n");
    return "<!DOCTYPE html>\n<html lang=\"en\"><head><meta charset=\"utf-8\"><title>Diagram replay</title><style>" +
      "body{margin:0;font-family:system-ui,Segoe UI,Arial,sans-serif;background:#f6f8fb;color:#0f2a4a}" +
      ".wrap{max-width:820px;margin:0 auto;padding:20px 20px 48px}" +
      "button{background:#178a45;color:#fff;border:none;border-radius:4px;padding:8px 12px;font-weight:700;cursor:pointer;font-family:inherit;margin:0 8px 0 0}" +
      "canvas{display:block;width:100%;max-width:780px;height:auto;background:#fff;border:2px solid #000;margin-top:12px}" +
      "</style></head><body><div class=\"wrap\">" +
      "<button type=\"button\" id=\"next\">Next command</button>" +
      "<button type=\"button\" id=\"prev\">Previous</button>" +
      "<canvas id=\"board\" width=\"780\" height=\"480\"></canvas></div><script>\n" +
      script + "\n</script></body></html>";
  }
  global.MicroDiagramBuilder = {
    name: "Micro diagram builder",
    mount: mount,
    mountPractice: mountPractice,
    AXIS_PRESETS: AXIS_PRESETS,
    DIAGRAM_BANK: DIAGRAM_BANK,
    modelAnswer: modelAnswerItems,
    setQuestion: function (target, checkId) {
      var box = builderBox(target);
      if (!box || typeof box._setQuestion !== "function") return false;
      if (!box.querySelector(".db-btnAnswer") && !box.querySelector(".db-q-stem")) return false;
      return box._setQuestion(checkId);
    },
    readItems: function (target) {
      var box = builderBox(target);
      if (!box || !box._diagramItems) return null;
      return JSON.parse(JSON.stringify(box._diagramItems));
    },
    writeItems: function (target, list) {
      return applyItems(builderBox(target), list);
    },
    rememberQuestion: rememberQuestion,
    recallQuestion: recallQuestion,
    recallSeries: recallSeries
  };
  global.DiagramBuilder = global.MicroDiagramBuilder;
  global.mountDiagramBuilder = mount;
})(window);
