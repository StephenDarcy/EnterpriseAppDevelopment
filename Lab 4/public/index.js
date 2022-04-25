let getAllTable = document.getElementById("getAllTable");
let oneBox = document.getElementById("oneBox");
let insertBox = document.getElementById("insertBox");
let confirmButton = document.getElementById("confirm-btn");
let cancelButton = document.getElementById("cancel-btn");
let modalBody = document.getElementById("modal-body");
let modalTitle = document.getElementById("modal-title");

cancelButton.style.display = "none";
confirmButton.style.display = "none";
oneBox.style.display = "none";
insertBox.style.display = "none";

let cookieColour = getCookie("colour");
document.body.style.background = "#" + cookieColour;

// store original values when user presses edit
let hexOriginal, rgbOriginal, hslOriginal, nameOriginal;

async function deleteOne() {
  let id = document.getElementById("colour-id").innerHTML;
  const response = await fetch(`/colours/${id}`, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
}

function insertOne() {
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

// taken from https://www.tabnine.com/academy/javascript/how-to-get-cookies/
function getCookie(cName) {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(document.cookie); //to be careful
  const cArr = cDecoded.split("; ");
  let res;
  cArr.forEach((val) => {
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  });
  return res;
}

async function postData(data) {
  await fetch("/colours", {
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
  }).then((res) => {
    res.json().then((data) => {
      $("#modal").modal("show");
      modalTitle.innerHTML = "Creation Complete";
      modalBody.href = data.message;
      console.log(data);
    });
  });
}

function insert() {
  oneBox.style.display = "none";
  getAllTable.style.display = "none";
  insertBox.style.display = "";
}

function getOne() {
  getAllTable.style.display = "none";
  oneBox.style.display = "";
  insertBox.style.display = "none";
  var currentColour;
  let inputValue = document.getElementById("colourid").value;

  let cookie = getCookie("current");

  if (inputValue) {
    currentColour = inputValue;
  } else if (cookie) {
    currentColour = cookie;
  } else {
    currentColour = 1;
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

function setBackground() {
  let hex = document.getElementById("colour-hex");
  hex.disabled = false;
  let backgroundColor = hex.value;
  updateBackground(backgroundColor);
}

async function updateBackground(hex) {
  hex = hex.slice(1);
  await fetch(`/background/${hex}`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  let cookie = getCookie("colour");
  document.body.style.background = "#" + cookie;
}

function confirmUpdate() {
  newHex = document.getElementById("colour-hex").value;
  newRgb = document.getElementById("colour-rgb").value;
  newHsl = document.getElementById("colour-hsl").value;
  newName = document.getElementById("colour-name").value;
  id = document.getElementById("colour-id").innerHTML;

  let json = {
    hex: newHex,
    rgb: newRgb,
    hsl: newHsl,
    name: newName,
  };

  updateData(json, id);
}

async function updateData(data, id) {
  await fetch(`/colours/${id}`, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  }).then((res) => {
    res.json().then((data) => {
      $("#modal").modal("show");
      modalTitle.innerHTML = "Update Complete";
      modalBody.href = data.message;
      console.log(data);
    });
  });
}

function cancelUpdate() {
  let editButton = document.getElementById("edit-btn");
  let confirmButton = document.getElementById("confirm-btn");
  let cancelButton = document.getElementById("cancel-btn");
  let deleteButton = document.getElementById("delete-btn");
  let hex = document.getElementById("colour-hex");
  let rgb = document.getElementById("colour-rgb");
  let hsl = document.getElementById("colour-hsl");
  let name = document.getElementById("colour-name");

  deleteButton.style.display = "";
  editButton.style.display = "";
  cancelButton.style.display = "none";
  confirmButton.style.display = "none";

  hex.disabled = true;
  rgb.disabled = true;
  hsl.disabled = true;
  name.disabled = true;

  hex.value = hexOriginal;
  rgb.value = rgbOriginal;
  hsl.value = hslOriginal;
  name.value = nameOriginal;
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
  hex.value = data.hexString;
  rgb.value = "rgb(" + data.rgb.r + ", " + data.rgb.g + ", " + data.rgb.b + ")";
  hsl.value =
    "hsl(" +
    data.hsl.h.toFixed() +
    ", " +
    data.hsl.s +
    "%, " +
    data.hsl.l +
    "%)";
  name.value = data.name;
}

function editOne() {
  let hex = document.getElementById("colour-hex");
  let rgb = document.getElementById("colour-rgb");
  let hsl = document.getElementById("colour-hsl");
  let name = document.getElementById("colour-name");
  let editButton = document.getElementById("edit-btn");
  let confirmButton = document.getElementById("confirm-btn");
  let cancelButton = document.getElementById("cancel-btn");
  let deleteButton = document.getElementById("delete-btn");
  // store original values when user presses edit
  hexOriginal = document.getElementById("colour-hex").value;
  rgbOriginal = document.getElementById("colour-rgb").value;
  hslOriginal = document.getElementById("colour-hsl").value;
  nameOriginal = document.getElementById("colour-name").value;

  deleteButton.style.display = "none";
  editButton.style.display = "none";
  cancelButton.style.display = "";
  confirmButton.style.display = "";

  hex.disabled = false;
  rgb.disabled = false;
  hsl.disabled = false;
  name.disabled = false;
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
