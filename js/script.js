var index = 0;

randomColor = function () {
  ++index;
  if (index >= colors.length) index = 0;
  return colors[index];
};

var pages = ["P1", "P2"];
var colors = [
  {
    stroke: "rgba(0, 255, 0, 1)",
    fill: "rgba(0, 255, 0, 0.2)",
  },
  {
    stroke: "rgba(255, 0, 0, 1)",
    fill: "rgba(255, , 0, 0.2)",
  },
];
var courbe = [];
var smoothieChart = new SmoothieChart({ tooltip: true });
smoothieChart.streamTo(document.getElementById("chart"), 500);
pages.forEach(function (v) {
  courbe[v] = new TimeSeries();
  col = randomColor();
  smoothieChart.addTimeSeries(courbe[v], {
    strokeStyle: col.stroke,
    fillStyle: col.fill,
  });
});

var stockEventSource = new EventSource("http://127.0.0.1:8080/analytics");
stockEventSource.addEventListener("message", function (event) {
  pages.forEach(function (v) {
    val = JSON.parse(event.data)[v];
    courbe[v].append(new Date().getTime(), val);
  });
});
