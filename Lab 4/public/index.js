document.getElementById("getAll").onclick = function () {
  getAll();
};
document.getElementById("getOne").onclick = function () {
  getOne();
};
document.getElementById("insertOne").onclick = function () {
  insertOne();
};
let getAllTable = document.getElementById("getAllTable");
let oneBox = document.getElementById("oneBox");
let insertBox = document.getElementById("insertBox");

oneBox.style.display = "none";
insertBox.style.display = "none";

function insertOne() {
  oneBox.style.display = "none";
  getAllTable.style.display = "none";
  insertBox.style.display = "";

  let hexValue = document.getElementById("insert-colour-hex").innerHTML;
  let rgbValue = document.getElementById("insert-colour-rgb").innerHTML;
  let hslValue = document.getElementById("insert-colour-hsl").innerHTML;
  let nameValue = document.getElementById("name-input").value;

  let json = {
    hex: hexValue,
    rgb: rgbValue,
    hsl: hslValue,
    name: nameValue,
  };

  let response = postData(json);
  console.log(response);
}

async function postData(data) {
  const response = await fetch("/colours", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}

function getOne() {
  getAllTable.style.display = "none";
  oneBox.style.display = "";
  insertBox.style.display = "none";
  var currentColour;
  let inputValue = document.getElementById("colourid").value;

  if (inputValue) {
    currentColour = inputValue;
  } else {
    currentColour = 0;
  }

  let request = new XMLHttpRequest();
  request.open("GET", `/colours/${currentColour}`);
  request.send();
  request.onload = () => {
    if (request.status === 200) {
      let data = JSON.parse(request.response);
      populateOne(data);
    } else {
      console.log("Error fetching all colours");
    }
  };
}

function populateOne(data) {
  let id = document.getElementById("colour-id");
  let hex = document.getElementById("colour-hex");
  let rgb = document.getElementById("colour-rgb");
  let hsl = document.getElementById("colour-hsl");
  let name = document.getElementById("colour-name");
  let box = document.getElementById("colour-display");

  box.style.backgroundColor = data.hexString;
  id.innerHTML = data.colorId;
  hex.innerHTML = data.hexString;
  rgb.innerHTML =
    "rgb(" + data.rgb.r + ", " + data.rgb.g + ", " + data.rgb.b + ")";
  hsl.innerHTML =
    "hsl(" +
    data.hsl.h.toFixed() +
    ", " +
    data.hsl.s +
    "%, " +
    data.hsl.l +
    "%)";
  name.innerHTML = data.name;
}

function getAll() {
  getAllTable.style.display = "";
  insertBox.style.display = "none";
  oneBox.style.display = "none";
  let request = new XMLHttpRequest();
  request.open("GET", "/colours");
  request.send();
  request.onload = () => {
    if (request.status === 200) {
      let data = JSON.parse(request.response);
      console.log(data);
      getAllTable.innerHTML = generateTable(data);
      setColours(data);
    } else {
      console.log("Error fetching all colours");
    }
  };
}

function getInputValues() {
  let currentColour = document.getElementById("colorInput").value;
  currentColour = currentColour.slice(1);
  let input = document.getElementById("name-input");
  input.value = "";
  let hexValue = document.getElementById("insert-colour-hex");
  let rgbValue = document.getElementById("insert-colour-rgb");
  let hslValue = document.getElementById("insert-colour-hsl");
  rgbArray = convertHexToRgb(currentColour);
  hslString = rgbToHSL(rgbArray[0], rgbArray[1], rgbArray[2]);
  rgbValue.innerHTML =
    "rgb(" + rgbArray[0] + ", " + rgbArray[1] + ", " + rgbArray[2] + ")";
  hexValue.innerHTML = "#" + currentColour;
  hslValue.innerHTML = hslString;
}

// taken from https://javascript.plainenglish.io/convert-hex-to-rgb-with-javascript-4984d16219c3
function convertHexToRgb(hexString) {
  var aRgbHex = hexString.match(/.{1,2}/g);
  return [
    parseInt(aRgbHex[0], 16),
    parseInt(aRgbHex[1], 16),
    parseInt(aRgbHex[2], 16),
  ];
}

// taken from https://css-tricks.com/converting-color-spaces-in-javascript/
function rgbToHSL(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;
  l = (cmax + cmin) / 2;

  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return "hsl(" + h + "," + s + "%," + l + "%)";
}

function generateTable(data) {
  let cols = Object.keys(data[0]);

  let headerRow = cols.map((col) => `<th>${col}</th>`).join("");
  headerRow += "<th>colour</th>";

  //remove nested objects
  data.forEach((element, index) => {
    data[index].rgb =
      "rgb(" +
      element.rgb.r +
      ", " +
      element.rgb.g +
      ", " +
      element.rgb.b +
      ")";

    data[index].hsl =
      "hsl(" +
      element.hsl.h.toFixed() +
      ", " +
      element.hsl.s +
      "%, " +
      element.hsl.l +
      "%)";
  });

  let rows = data
    .map((row) => {
      let tds = cols.map((col) => `<td>${row[col]}</td>`).join("");
      return `<tr>${tds}<td id="colour${row.colorId}"></td></tr>`;
    })
    .join("");

  return `
	<table class="table table-dark ">
		<thead>
			<tr>${headerRow}</tr>
		<thead>
		<tbody>
			${rows}
		<tbody>
	<table>`;
}

function setColours(data) {
  data.forEach((object) => {
    let current = document.getElementById("colour" + object.colorId);
    current.style.backgroundColor = object.hexString;
  });
}
