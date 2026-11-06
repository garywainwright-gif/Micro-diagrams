window.KeynesianAdGame = {
  mount: function (root) {
    if (root) this.bind(root);
  },
  bind: function (root) {
    function byId(id) { return root.querySelector("#" + id); }

    var GEO = {
      OX: 92,
      OY: 338,
      FLAT_Y: 250,
      FLAT_X0: 150,
      BEND_X: 370,
      YFE_X: 540,
      JOIN_Y: 148,
      TOP_Y: 52,
      P1X: 450,
      P1Y: 250,
      P2X: 540,
      P2Y: 175,
      SLOPE: 0.88,
      XMIN: 112,
      XMAX: 628,
      YMIN: 66,
      YMAX: 324
    };
    var SHIFT_BY = { spare: 64, rising: 52, full: 36 };
    var SECTIONS = {
      spare: {
        label: "Spare capacity",
        note: "AD meets the horizontal section of the Keynesian AS curve. There is spare capacity, so real output is below Yfe. Decide whether AD shifts left or right."
      },
      rising: {
        label: "Bottlenecks",
        note: "AD meets the upward-sloping section of the Keynesian AS curve. Bottlenecks are appearing as output rises toward Yfe. Decide whether AD shifts left or right."
      },
      full: {
        label: "Full capacity",
        note: "AD meets the vertical section of the Keynesian AS curve at full-employment output Yfe. Decide whether AD shifts left or right."
      }
    };

    var CATEGORIES = [
      {
        id: "consumption",
        label: "Consumption",
        scenarios: [
          { id: "c1", topic: "Disposable income", shift: "right", text: "Household disposable incomes rise.", why: "Consumption is a component of aggregate demand. Higher disposable income means households spend more at each price level, so the AD curve shifts right." },
          { id: "c2", topic: "Income tax rise", shift: "left", text: "The government raises income tax.", why: "A higher income tax cuts disposable income. Households spend less at each price level, so consumption falls and the AD curve shifts left." },
          { id: "c3", topic: "Income tax cut", shift: "right", section: "rising", startT: 0.2, text: "The government cuts income tax.", why: "A lower income tax raises disposable income. Households spend more at each price level, so consumption rises and the AD curve shifts right." },
          { id: "c4", topic: "Expected income", shift: "left", text: "Households expect lower incomes next year and cut spending now.", why: "Lower expected income reduces consumption today. Spending falls at each price level, so the AD curve shifts left." },
          { id: "c5", topic: "Consumer confidence", shift: "right", text: "Households become more optimistic about the economy.", why: "Higher consumer confidence encourages households to spend more. Consumption rises at each price level, so the AD curve shifts right." },
          { id: "c6", topic: "Interest rates", shift: "right", section: "rising", startT: 0.2, text: "Interest rates fall, so borrowing becomes cheaper.", why: "Cheaper borrowing and a lower reward for saving encourage households to spend more. Consumption rises at each price level, so the AD curve shifts right." },
          { id: "c7", topic: "Wealth", shift: "right", text: "House prices and share prices rise, so household wealth increases.", why: "Households feel richer when house prices and the stock market rise. They spend more at each price level, so consumption rises and the AD curve shifts right." },
          { id: "c8", topic: "Expected prices", shift: "right", text: "Households expect prices to rise and bring purchases forward.", why: "If households expect inflation, they buy now rather than later. Consumption rises at each price level, so the AD curve shifts right." }
        ]
      },
      {
        id: "investment",
        label: "Investment",
        scenarios: [
          { id: "i1", topic: "Expected sales", shift: "right", text: "Firms expect sales to rise over the next year.", why: "Higher expected sales make new capital more worthwhile. Investment rises at each price level, so the AD curve shifts right." },
          { id: "i2", topic: "Corporation tax", shift: "left", text: "The government raises corporation tax.", why: "A higher corporation tax reduces post-tax profits. Firms invest less at each price level, so the AD curve shifts left." },
          { id: "i3", topic: "Corporation tax", shift: "right", text: "The government cuts corporation tax.", why: "A lower corporation tax raises the return on new capital. Firms invest more, so the AD curve shifts right." },
          { id: "i4", topic: "Spare capacity", shift: "left", text: "Firms already have spare capacity and see no need to expand.", why: "Spare capacity reduces the need for new capital. Investment falls at each price level, so the AD curve shifts left." },
          { id: "i5", topic: "Interest rates", shift: "right", text: "Interest rates fall, so borrowing for new capital becomes cheaper.", why: "A lower interest rate makes investment projects cheaper to finance. Firms invest more at each price level, so the AD curve shifts right." },
          { id: "i6", topic: "Business confidence", shift: "right", section: "rising", guide: "section", text: "Business confidence increases.", why: "Higher business confidence encourages firms to invest. Investment rises at each price level, so the AD curve shifts right." },
          { id: "i7", topic: "Expected profits", shift: "right", text: "Firms expect higher profits in the future.", why: "Higher expected profits make new capital more worthwhile. Investment rises at each price level, so the AD curve shifts right." },
          { id: "i8", topic: "Technology", shift: "right", text: "New technology leads firms to invest in better capital equipment.", why: "Spending on new capital equipment is investment. Investment rises at each price level, so the AD curve shifts right." },
          { id: "i9", topic: "Bank lending", shift: "right", text: "Banks become more willing to lend to firms.", why: "Easier access to credit lets firms finance more investment projects. Investment rises at each price level, so the AD curve shifts right." },
          { id: "i10", topic: "Investment incentives", shift: "right", text: "The government offers subsidies and grants for new investment.", why: "Subsidies and grants make investment projects cheaper for firms. Investment rises at each price level, so the AD curve shifts right." }
        ]
      },
      {
        id: "government",
        label: "Government spending",
        scenarios: [
          { id: "g1", topic: "Infrastructure", shift: "right", text: "The government increases spending on roads and railways.", why: "Government spending is a component of aggregate demand. Higher spending means more is bought at each price level, so the AD curve shifts right." },
          { id: "g2", topic: "Public services", shift: "left", text: "The government cuts spending on public services.", why: "Lower government spending reduces total spending in the economy. The AD curve shifts left." },
          { id: "g3", topic: "Schools and hospitals", shift: "right", text: "The government raises spending on schools and hospitals.", why: "Extra government spending increases aggregate demand. The AD curve shifts right." },
          { id: "g4", topic: "Budget cut", shift: "left", text: "A new budget reduces government spending.", why: "A fall in government spending reduces aggregate demand. The AD curve shifts left." }
        ]
      },
      {
        id: "exports",
        label: "Net exports",
        scenarios: [
          { id: "x1", topic: "Foreign incomes", shift: "right", text: "Incomes rise in the main export markets.", why: "Foreign buyers purchase more of this country's exports. Net exports rise at each price level, so the AD curve shifts right." },
          { id: "x2", topic: "Foreign recession", shift: "left", text: "A recession hits the main trading partners.", why: "Foreign demand for exports falls. Net exports fall at each price level, so the AD curve shifts left." },
          { id: "x3", topic: "Foreign tariffs", shift: "right", text: "Trading partners remove tariffs on this country's exports.", why: "Exports become easier to sell abroad. Net exports rise, so the AD curve shifts right." },
          { id: "x4", topic: "Foreign tariffs", shift: "left", text: "Trading partners place tariffs on this country's exports.", why: "Exports fall. Net exports fall at each price level, so the AD curve shifts left." },
          { id: "x5", topic: "Global boom", shift: "right", section: "rising", startT: 0.78, guide: "bottleneck", text: "A global boom raises incomes abroad, so foreign buyers purchase more UK exports.", why: "Higher foreign incomes increase demand for UK exports. Net exports rise at each price level, so the AD curve shifts right." },
          { id: "x6", topic: "Competitiveness", shift: "right", text: "UK goods become more competitive as quality, branding and productivity improve.", why: "More competitive goods sell better abroad and replace some imports. Net exports rise at each price level, so the AD curve shifts right." }
        ]
      },
      {
        id: "exchange",
        label: "Exchange rate",
        scenarios: [
          { id: "e1", topic: "Depreciation", shift: "right", text: "The exchange rate depreciates, so exports become cheaper abroad.", why: "A lower exchange rate makes exports cheaper abroad and imports dearer at home. Net exports rise, so the AD curve shifts right." },
          { id: "e2", topic: "Appreciation", shift: "left", text: "The exchange rate appreciates.", why: "A higher exchange rate makes exports dearer abroad and imports cheaper at home. Net exports fall, so the AD curve shifts left." },
          { id: "e3", topic: "The pound", shift: "right", text: "The pound falls against the currencies of trading partners.", why: "A fall in the pound is a depreciation. Exports rise and imports fall, so net exports rise and the AD curve shifts right." },
          { id: "e4", topic: "The pound", shift: "left", text: "The pound rises against the currencies of trading partners.", why: "A rise in the pound is an appreciation. Exports fall and imports rise, so net exports fall and the AD curve shifts left." }
        ]
      }
    ];

    var QUIZ_LENGTH = 10;
    var state = {
      round: [],
      index: 0,
      scenario: null,
      start: null,
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
    var shiftFrame = 0;

    var scenarioEl = byId("scenario");
    var titleEl = byId("chart-title");
    var noteEl = byId("chart-note");
    var feedbackEl = byId("feedback");
    var logEl = byId("log");
    var btnLeft = byId("btn-left");
    var btnRight = byId("btn-right");
    var btnNext = byId("btn-next");
    var btnSave = byId("btn-save");
    var adLine = byId("ad-line");
    var adLabel = byId("ad-label");
    var ad1Line = byId("ad1-line");
    var ad1Label = byId("ad1-label");
    var arrowLine = byId("arrow-line");
    var arrowHead = byId("arrow-head");
    var eqDot = byId("eq-dot");
    var eq1Dot = byId("eq1-dot");
    var eqLine = byId("eq-line");
    var eq1Line = byId("eq1-line");
    var yLabel = byId("y-label");
    var y1Label = byId("y1-label");
    var yfeLabel = byId("yfe-label");
    var pLine = byId("p-line");
    var p1Line = byId("p1-line");
    var pLabel = byId("p-label");
    var p1Label = byId("p1-label");

    function r(n) { return String(Math.round(n * 10) / 10); }

    function bez(t) {
      var u = 1 - t;
      var uu = u * u;
      var tt = t * t;
      return {
        x: uu * u * GEO.BEND_X + 3 * uu * t * GEO.P1X + 3 * u * tt * GEO.P2X + tt * t * GEO.YFE_X,
        y: uu * u * GEO.FLAT_Y + 3 * uu * t * GEO.P1Y + 3 * u * tt * GEO.P2Y + tt * t * GEO.JOIN_Y
      };
    }

    function yOn(line, x) { return line.y0 + line.m * (x - line.x0); }
    function xOn(line, y) { return line.x0 + (y - line.y0) / line.m; }

    function side(line, t) {
      var p = bez(t);
      return p.y - yOn(line, p.x);
    }

    function intersect(line) {
      var yV = yOn(line, GEO.YFE_X);
      if (yV >= GEO.TOP_Y - 0.01 && yV <= GEO.JOIN_Y + 0.8) {
        return { x: GEO.YFE_X, y: yV, section: "full" };
      }
      var xF = xOn(line, GEO.FLAT_Y);
      if (xF >= GEO.FLAT_X0 - 8 && xF <= GEO.BEND_X + 0.8) {
        return { x: xF, y: GEO.FLAT_Y, section: "spare" };
      }
      var lo = 0;
      var hi = 1;
      var flo = side(line, 0);
      var fhi = side(line, 1);
      if (flo * fhi > 0) {
        var best = 0;
        var bd = Math.abs(flo);
        for (var i = 1; i <= 80; i++) {
          var tt = i / 80;
          var d = Math.abs(side(line, tt));
          if (d < bd) { bd = d; best = tt; }
        }
        return bez(best);
      }
      for (var k = 0; k < 50; k++) {
        var mid = (lo + hi) / 2;
        if (side(line, lo) * side(line, mid) <= 0) hi = mid;
        else lo = mid;
      }
      return bez((lo + hi) / 2);
    }

    function startFor(section, startT) {
      if (section === "spare") return { x: 236, y: GEO.FLAT_Y, section: "spare" };
      if (section === "full") return { x: GEO.YFE_X, y: 100, section: "full" };
      var p = bez(startT == null ? 0.45 : startT);
      p.section = "rising";
      return p;
    }

    function clipSegment(line, around) {
      var xMin = GEO.XMIN;
      var xMax = GEO.XMAX;
      var yMin = GEO.YMIN;
      var yMax = GEO.YMAX;
      if (around && around.clip) {
        xMin = around.clip.xMin;
        xMax = around.clip.xMax;
        yMin = around.clip.yMin;
        yMax = around.clip.yMax;
      } else if (around && around.x >= GEO.YFE_X - 4) {
        xMin = Math.max(GEO.XMIN, around.x - 70);
        xMax = Math.min(GEO.XMAX, around.x + 56);
        yMin = Math.max(GEO.YMIN, around.y - 48);
        yMax = Math.min(GEO.YMAX, around.y + 62);
      }
      var pts = [];
      function add(x, y) {
        if (x >= xMin - 0.5 && x <= xMax + 0.5 && y >= yMin - 0.5 && y <= yMax + 0.5) {
          pts.push({ x: x, y: y });
        }
      }
      add(xOn(line, yMin), yMin);
      add(xOn(line, yMax), yMax);
      add(xMin, yOn(line, xMin));
      add(xMax, yOn(line, xMax));
      if (pts.length < 2) {
        return { x1: line.x0 - 30, y1: line.y0 - 30 * line.m, x2: line.x0 + 30, y2: line.y0 + 30 * line.m };
      }
      pts.sort(function (a, b) { return a.x - b.x; });
      return { x1: pts[0].x, y1: pts[0].y, x2: pts[pts.length - 1].x, y2: pts[pts.length - 1].y };
    }

    function putAdLabel(el, seg, colour, opacity, labelSide) {
      var lower = seg.y1 >= seg.y2 ? { x: seg.x1, y: seg.y1 } : { x: seg.x2, y: seg.y2 };
      var upper = seg.y1 < seg.y2 ? { x: seg.x1, y: seg.y1 } : { x: seg.x2, y: seg.y2 };
      var dx = lower.x - upper.x;
      var dy = lower.y - upper.y;
      var len = Math.sqrt(dx * dx + dy * dy) || 1;
      var uy = dy / len;
      var px = -uy;
      if (px < 0) px = -px;
      var anchor = "start";
      var x;
      var y;
      if (labelSide === "high") {
        x = Math.min(upper.x + 34, 608);
        y = upper.y + 22;
      } else if (labelSide === "along") {
        x = upper.x + (lower.x - upper.x) * 0.42 - 28;
        y = upper.y + (lower.y - upper.y) * 0.42 - 22;
      } else if (labelSide === "upper-left") {
        x = upper.x - 12;
        y = Math.max(60, upper.y + 4);
        anchor = "end";
      } else {
        var end = lower.x > 600 ? upper : lower;
        x = end.x + px * 16 + (end === lower ? 6 : -8);
        y = end.y + (end === lower ? -4 : 18);
      }
      if (y < 58) y = 62;
      if (y > 328) y = 322;
      if (x > 646) x = 640;
      if (x < 96) x = 100;
      el.setAttribute("text-anchor", anchor);
      el.setAttribute("x", r(x));
      el.setAttribute("y", r(y));
      el.setAttribute("fill", colour);
      el.setAttribute("opacity", String(opacity));
    }

    function drawAd(lineEl, labelEl, line, colour, opacity, around, labelSide) {
      var seg = clipSegment(line, around);
      lineEl.setAttribute("x1", r(seg.x1));
      lineEl.setAttribute("y1", r(seg.y1));
      lineEl.setAttribute("x2", r(seg.x2));
      lineEl.setAttribute("y2", r(seg.y2));
      lineEl.setAttribute("stroke", colour);
      lineEl.setAttribute("opacity", String(opacity));
      putAdLabel(labelEl, seg, colour, opacity, labelSide);
    }

    function setLine(el, x1, y1, x2, y2, opacity, colour) {
      if (!el) return;
      el.setAttribute("x1", r(x1));
      el.setAttribute("y1", r(y1));
      el.setAttribute("x2", r(x2));
      el.setAttribute("y2", r(y2));
      el.setAttribute("opacity", String(opacity));
      if (colour) el.setAttribute("stroke", colour);
    }

    function setText(el, x, y, opacity, colour, anchor) {
      if (!el) return;
      el.setAttribute("x", r(x));
      el.setAttribute("y", r(y));
      el.setAttribute("opacity", String(opacity));
      if (colour) el.setAttribute("fill", colour);
      if (anchor) el.setAttribute("text-anchor", anchor);
    }

    function showDot(el, x, y, opacity, colour) {
      el.setAttribute("cx", r(x));
      el.setAttribute("cy", r(y));
      el.setAttribute("opacity", String(opacity));
      if (colour) el.setAttribute("fill", colour);
    }

    function placeOutputLabels(yX, y1X, showY, showY1, y1Colour) {
      var yfeX = GEO.YFE_X;
      var yRow = 358;
      var y1Row = 358;
      if (showY && Math.abs(yX - yfeX) < 48) yRow = 378;
      if (showY1 && Math.abs(y1X - yfeX) < 56) y1Row = 378;
      if (showY && showY1 && Math.abs(yX - y1X) < 42 && yRow === y1Row) y1Row = yRow === 358 ? 378 : 398;
      setText(yLabel, yX, yRow, showY ? 1 : 0, "#5c5348", "middle");
      setText(y1Label, y1X, y1Row, showY1 ? 1 : 0, y1Colour || "#166534", "middle");
      setText(yfeLabel, yfeX, 358, 1, "#1c1915", "middle");
    }

    function placeArrow(dx, opacity, colour, before, after) {
      var top = Math.min(before.y, after.y);
      var y = top - 28;
      if (y < GEO.YMIN + 8) y = Math.max(before.y, after.y) + 28;
      if (y > GEO.YMAX - 10) y = top - 16;
      var xStart = before.x + (y - before.y) / GEO.SLOPE;
      var xEnd = xStart + dx;
      arrowLine.setAttribute("x1", r(xStart));
      arrowLine.setAttribute("y1", r(y));
      arrowLine.setAttribute("x2", r(xEnd));
      arrowLine.setAttribute("y2", r(y));
      arrowLine.setAttribute("stroke", colour);
      arrowLine.setAttribute("opacity", String(opacity));
      var head = dx < 0
        ? (xEnd + "," + y + " " + (xEnd + 12) + "," + (y - 6) + " " + (xEnd + 12) + "," + (y + 6))
        : (xEnd + "," + y + " " + (xEnd - 12) + "," + (y - 6) + " " + (xEnd - 12) + "," + (y + 6));
      arrowHead.setAttribute("points", head);
      arrowHead.setAttribute("fill", colour);
      arrowHead.setAttribute("opacity", String(opacity));
    }

    function hideShift() {
      shiftFrame += 1;
      [ad1Line, ad1Label, arrowLine, arrowHead, eq1Dot, eq1Line, y1Label, p1Line, p1Label].forEach(function (el) {
        if (el) el.setAttribute("opacity", "0");
      });
    }

    function restoreGuides() {
      setLine(byId("yfe-line"), GEO.YFE_X, GEO.TOP_Y, GEO.YFE_X, GEO.OY, 1, "#1c1915");
      setText(yfeLabel, GEO.YFE_X, 358, 1, "#1c1915", "middle");
    }

    function layoutStart(start) {
      var line = { x0: start.x, y0: start.y, m: GEO.SLOPE };
      var guide = state.scenario && state.scenario.guide;
      var bottleneck = guide === "bottleneck";
      var sectionGuide = guide === "section";
      var around = bottleneck
        ? { x: start.x, y: start.y, clip: { xMin: 430, xMax: 600, yMin: 78, yMax: 310 } }
        : start;
      drawAd(adLine, adLabel, line, "#9a3412", 1, around, bottleneck ? "along" : "");
      if (sectionGuide) adLabel.setAttribute("opacity", "0");
      showDot(eqDot, start.x, start.y, 1, "#9a3412");
      setLine(pLine, GEO.OX, start.y, start.x, start.y, 1, "#5c5348");
      setText(pLabel, GEO.OX - 8, start.y + 5, 1, "#5c5348", "end");
      var showY = start.section !== "full" && !bottleneck && !sectionGuide;
      setLine(eqLine, start.x, start.y, start.x, GEO.OY, start.section === "full" ? 0 : 1, "#5c5348");
      placeOutputLabels(start.x, start.x, showY, false, "#166534");
      if (bottleneck) {
        setLine(byId("yfe-line"), GEO.YFE_X, GEO.TOP_Y, GEO.YFE_X, GEO.OY, 0, "#1c1915");
        setText(yfeLabel, GEO.YFE_X, 358, 0, "#1c1915", "middle");
      } else if (sectionGuide) {
        setLine(byId("yfe-line"), GEO.YFE_X - 10, GEO.JOIN_Y, GEO.YFE_X - 10, GEO.OY, 1, "#5c5348");
        setText(yfeLabel, GEO.YFE_X, 358, 0, "#1c1915", "middle");
      } else {
        restoreGuides();
      }
    }

    function placeShift(dx, opacity) {
      restoreGuides();
      if (adLabel) adLabel.setAttribute("opacity", "1");
      var before = state.start;
      var colour = dx < 0 ? "#9f1239" : "#166534";
      var moved = { x0: before.x + dx, y0: before.y, m: GEO.SLOPE };
      var after = intersect(moved);
      var anchor = before.section === "full"
        ? { x: GEO.YFE_X, y: (before.y + after.y) / 2 }
        : { x: before.x + dx, y: before.y };
      drawAd(ad1Line, ad1Label, moved, colour, opacity, anchor, before.section === "full" ? (dx > 0 ? "high" : "upper-left") : "");
      showDot(eq1Dot, after.x, after.y, opacity, colour);
      var priceChanged = Math.abs(after.y - before.y) > 3;
      var outputChanged = Math.abs(after.x - before.x) > 3;
      var farX = Math.max(before.x, after.x);
      setLine(pLine, GEO.OX, before.y, priceChanged ? before.x : farX, before.y, 1, "#5c5348");
      setLine(p1Line, GEO.OX, after.y, after.x, after.y, priceChanged ? opacity : 0, colour);
      setText(p1Label, GEO.OX - 8, after.y + 5, priceChanged ? opacity : 0, colour, "end");
      setLine(eq1Line, after.x, after.y, after.x, GEO.OY, outputChanged ? opacity : 0, colour);
      placeOutputLabels(before.x, after.x, before.section !== "full", outputChanged, colour);
      placeArrow(dx, opacity, colour, before, after);
    }

    function drawFrame() {
      var curve = byId("as-curve");
      if (!curve) return;
      curve.setAttribute("d",
        "M " + GEO.FLAT_X0 + " " + GEO.FLAT_Y +
        " H " + GEO.BEND_X +
        " C " + GEO.P1X + " " + GEO.P1Y + ", " + GEO.P2X + " " + GEO.P2Y + ", " + GEO.YFE_X + " " + GEO.JOIN_Y +
        " V " + GEO.TOP_Y
      );
      setLine(byId("yfe-line"), GEO.YFE_X, GEO.TOP_Y, GEO.YFE_X, GEO.OY, 1, "#1c1915");
      var asLabel = byId("as-label");
      asLabel.setAttribute("x", String(GEO.YFE_X));
      asLabel.setAttribute("y", String(GEO.TOP_Y - 8));
    }

    function shiftWord(shift) { return shift === "left" ? "left" : "right"; }
    function demandWord(shift) {
      return shift === "left" ? "a decrease in aggregate demand" : "an increase in aggregate demand";
    }

    function changed(a, b) { return Math.abs(a - b) > 3; }

    function keynesLine(before, after) {
      var priceUp = before.y - after.y > 3;
      var priceDown = after.y - before.y > 3;
      var outputUp = after.x - before.x > 3;
      var outputDown = before.x - after.x > 3;
      if (!priceUp && !priceDown && (outputUp || outputDown)) {
        return outputUp
          ? "On the horizontal section there is spare capacity. Real output rises from Y to Y1 and the price level stays at P. Demand-deficient unemployment falls. The economy is still short of Yfe."
          : "On the horizontal section there is spare capacity. Real output falls from Y to Y1 and the price level stays at P. Demand-deficient unemployment rises. The economy moves further below Yfe.";
      }
      if ((priceUp || priceDown) && (outputUp || outputDown)) {
        return outputUp
          ? "On the upward-sloping section, bottlenecks mean the price level rises from P to P1 as real output rises from Y to Y1. The economy is still below Yfe."
          : "On the upward-sloping section, the price level falls from P to P1 and real output falls from Y to Y1. The economy moves further from Yfe.";
      }
      if (priceUp || priceDown) {
        return priceUp
          ? "On the vertical section the economy is already at full-employment output Yfe, so real output cannot rise. Only the price level rises, from P to P1."
          : "On the vertical section real output stays at full-employment output Yfe. The price level falls from P to P1.";
      }
      return "AD1 meets the Keynesian aggregate supply curve at the new equilibrium.";
    }

    function outcomeNote(before, after) {
      var price = changed(before.y, after.y);
      var output = changed(before.x, after.x);
      if (output && !price) return "AD1 is aggregate demand after the change. Real output moves from Y to Y1. The price level stays at P because the economy is on the horizontal section.";
      if (output && price) return "AD1 is aggregate demand after the change. Real output moves from Y to Y1 and the price level moves from P to P1.";
      if (price) return "AD1 is aggregate demand after the change. Real output stays at Yfe. The price level moves from P to P1.";
      return "AD1 is aggregate demand after the change.";
    }

    function forecast(shift) {
      var amount = SHIFT_BY[state.start.section] || 48;
      var dx = shift === "left" ? -amount : amount;
      return intersect({ x0: state.start.x + dx, y0: state.start.y, m: GEO.SLOPE });
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
      try { return Number(localStorage.getItem("keynesian-ad-best-left")) || 0; } catch (err) { return 0; }
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
        try { localStorage.setItem("keynesian-ad-best-left", String(clockLeft)); } catch (err) {}
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
        var t = copy[i];
        copy[i] = copy[j];
        copy[j] = t;
      }
      return copy;
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
      var groups = [["consumption"], ["investment"], ["government"], ["exports", "exchange"]];
      var counts = [3, 3, 2, 2];
      var round = [];
      shuffle(groups).forEach(function (ids, i) {
        takeBalanced(itemsFor(ids), counts[i]).forEach(function (item) {
          round.push(item);
        });
      });
      return shuffle(round);
    }

    function assignSections(round) {
      var bag = [];
      var cycle = ["spare", "rising", "full"];
      while (bag.length < round.length) bag = bag.concat(shuffle(cycle));
      round.forEach(function (item, i) {
        item.section = item.scenario.section || bag[i];
      });
    }

    function showScenario() {
      var item = state.round[state.index];
      var s = item.scenario;
      var section = SECTIONS[item.section];
      state.scenario = s;
      state.start = startFor(item.section, item.scenario.startT);
      state.answered = false;
      hideShift();
      layoutStart(state.start);
      var chartWrap = byId("play-chart");
      var shiftRow = byId("shift-row");
      if (chartWrap) chartWrap.hidden = false;
      if (shiftRow) shiftRow.hidden = false;
      scenarioEl.innerHTML =
        '<p class="q-count">Question ' + (state.index + 1) + " of " + QUIZ_LENGTH + "</p>" +
        '<p class="cat-title">Keynesian AS · ' + section.label + " · " + item.label + "</p>" +
        "<p>" + s.text + "</p>" +
        '<p class="ask">What happens to the aggregate demand curve?</p>';
      titleEl.textContent = "Keynesian AS — " + section.label;
      noteEl.textContent = section.note;
      feedbackEl.className = "feedback";
      feedbackEl.innerHTML = "";
      btnLeft.disabled = false;
      btnRight.disabled = false;
      btnLeft.className = "";
      btnRight.className = "";
      btnNext.disabled = true;
      btnNext.textContent = "Next question";
      if (btnSave) btnSave.disabled = false;
      byId("chart").setAttribute("aria-label", section.label + ". Keynesian aggregate supply, flat then rising then vertical at Yfe. Aggregate demand before the change. " + item.label + ".");
    }

    function startRound() {
      ensureClock();
      state.round = buildComponentRound();
      assignSections(state.round);
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
      var name = "keynesian-aggregate-demand-" + (item && item.section ? item.section : "diagram") + "-q" + (state.index + 1);
      if (state.answered && state.scenario && state.scenario.shift) name += "-shift-" + state.scenario.shift;
      return name + ".png";
    }

    function saveDiagram() {
      var chart = byId("chart");
      if (!chart || !state.start) return;
      var vb = (chart.getAttribute("viewBox") || "0 0 680 450").split(/[\s,]+/).map(Number);
      var w = vb[2] || 680;
      var h = vb[3] || 450;
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

    function animateShift(dir) {
      var amount = SHIFT_BY[state.start.section] || 48;
      var target = dir === "left" ? -amount : amount;
      var frameId = ++shiftFrame;
      var startTime = performance.now();
      function frame(now) {
        if (frameId !== shiftFrame) return;
        var t = Math.min(1, (now - startTime) / 520);
        var eased = 1 - Math.pow(1 - t, 3);
        placeShift(target * eased, 0.25 + 0.75 * eased);
        if (t < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
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
      var after = forecast(s.shift);
      var lead = hit
        ? "Correct. The aggregate demand curve shifts " + shiftWord(s.shift) + ". That is " + demandWord(s.shift) + "."
        : "Not this time. You chose a shift " + shiftWord(choice) + ". The aggregate demand curve shifts " + shiftWord(s.shift) + ", which is " + demandWord(s.shift) + ".";
      feedbackEl.className = "feedback " + (hit ? "ok" : "bad");
      feedbackEl.innerHTML = "<p><strong>" + lead + "</strong></p><p>" + s.why + "</p><p>" + keynesLine(state.start, after) + "</p>";
      if (finished) {
        stopClock();
        feedbackEl.innerHTML += "<p>Set complete. " + state.correct + " correct out of " + state.attempts + " attempts. " + beatLine() + "</p>";
        renderClock();
      }
      noteEl.textContent = outcomeNote(state.start, after);
      byId("chart").setAttribute(
        "aria-label",
        "Keynesian aggregate supply. Aggregate demand shifts " + shiftWord(s.shift) + ". " + outcomeNote(state.start, after)
      );
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

    drawFrame();
    startRound();
  }
};
