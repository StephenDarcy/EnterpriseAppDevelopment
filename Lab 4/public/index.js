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
    } else {
      console.log("Error fetching all colours");
    }
  };
}

function generateTable(data) {
  let cols = Object.keys(data[0]);

  let headerRow = cols.map((col) => `<th>${col}</th>`).join("");

  let rows = data
    .map((row) => {
      let tds = cols.map((col) => `<td>${row[col]}</td>`).join("");
      return `<tr>${tds}</tr>`;
    })
    .join("");

  return `
	<table>
		<thead>
			<tr>${headerRow}</tr>
		<thead>
		<tbody>
			${rows}
		<tbody>
	<table>`;
}
