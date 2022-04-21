document.getElementById("getAll").onclick = function () {
  getAll();
};
let getAllTable = document.getElementById("getAllTable");

function getAll() {
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
	<table class="table table-dark">
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
