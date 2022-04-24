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
