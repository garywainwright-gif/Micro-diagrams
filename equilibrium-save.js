(function () {
  function download(blob, name) {
    var link = document.createElement("a");
    var url = URL.createObjectURL(blob);
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function saveDiagram(name) {
    var svg = document.getElementById("chart");
    if (!svg) return;
    var clone = svg.cloneNode(true);
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    clone.setAttribute("width", "680");
    clone.setAttribute("height", "420");
    var xml = new XMLSerializer().serializeToString(clone);
    var svgBlob = new Blob([xml], { type: "image/svg+xml;charset=utf-8" });
    var url = URL.createObjectURL(svgBlob);
    var image = new Image();
    image.onload = function () {
      var scale = 2;
      var canvas = document.createElement("canvas");
      canvas.width = 680 * scale;
      canvas.height = 420 * scale;
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      canvas.toBlob(function (png) {
        if (png) download(png, name);
        else download(svgBlob, name.replace(/\.png$/, ".svg"));
      }, "image/png");
    };
    image.onerror = function () {
      URL.revokeObjectURL(url);
      download(svgBlob, name.replace(/\.png$/, ".svg"));
    };
    image.src = url;
  }

  var button = document.getElementById("save-diagram");
  if (!button) return;
  button.addEventListener("click", function () {
    saveDiagram(button.getAttribute("data-file") || "equilibrium-diagram.png");
  });
})();
