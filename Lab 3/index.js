// arrays to hold json data
var capitals, continents, costlines, currencies, domains, flags;
// create 1d array width of table
var tableArray = new Array(7);
// default value of css theme
let darkMode = true;
// default values of hidden elements
let buttonShown,
  showLess,
  paragraphShown,
  tableShown = true;
// cells that user clicks to change colour
var currentCell;
var previousCell;

$(document).ready(function () {
  $(".data-table").hide();
  $("#paragraph").hide();
  $("#collapse-btn").hide();

  $("#collapse-btn").click(function () {
    if (!showLess) {
      $("#collapse-btn").html("View 20 rows");
    } else {
      $("#collapse-btn").html("View full table");
    }
    showLess = !showLess;
  });

  $("#dark-mode-btn").click(function () {
    toggleTheme();
  });

  $("#hide-paragraph-btn").click(function () {
    if (!paragraphShown) {
      $("#info-box").hide();
      $("#hide-paragraph-btn").html("Show Paragraph");
    } else {
      $("#info-box").show();
      $("#hide-paragraph-btn").html("Hide Paragraph");
    }
    paragraphShown = !paragraphShown;
  });

  $("#hide-table-btn").click(function () {
    if (!tableShown) {
      $("#table").hide();
      $("#hide-table-btn").html("Show Table");
    } else {
      $("#table").show();
      $("#hide-table-btn").html("Hide Table");
    }
    tableShown = !tableShown;
  });

  $("#fade-nav-btn").click(function () {
    $("#navbar").fadeToggle();
    $("#hide-table-btn").html("Hide Table");
  });

  $("#fade-table-btn").click(function () {
    $("#table").fadeToggle();
  });

  $("#load-btn").click(function () {
    $("#load-btn").hide();
    $("#paragraph").show();
    $("#paragraph").append("The folder 'country-objects' has been read");
    getData();
    setTimeout(function () {
      createArray();
      populateTable();
      $(".data-table").show();
      $("#paragraph").html("");
      $("#paragraph").append("The table has been created");
      $("#collapse-btn").show();
    }, 5000);
  });

  $("body").on("click", "#country-table tr td", function () {
    currentCell = $(this);

    if (previousCell) {
      previousCell.css("background-color", "#212529");
      currentCell.css("background-color", "red");
    } else {
      currentCell.css("background-color", "red");
    }
    previousCell = currentCell;
    console.log(currentCell);
  });
});

let toggleTheme = () => {
  console.log("test");
  $("#body").toggleClass("dark-mode");
  darkMode = !darkMode;
  if (darkMode) {
    $("#dark-mode-btn").html("Light Mode");
  } else {
    $("#dark-mode-btn").html("Dark Mode");
  }
};

let populateTable = () => {
  var tableBody = document.getElementById("table-body");
  for (let i = 0; i < tableArray.length; i++) {
    var tableRow = document.createElement("tr");
    if (i >= 19) {
      tableRow.classList.add("collapse", "row-collapse");
    }
    tableRow.setAttribute("row", i + 1);
    for (let j = 0; j < tableArray[i].length; j++) {
      var td = document.createElement("td");

      // for images
      if (j == 6) {
        td.innerHTML = "<img src='" + tableArray[i][j] + "'>";
      } else {
        td.appendChild(document.createTextNode(tableArray[i][j]));
      }
      tableRow.appendChild(td);
      td.setAttribute("cell", j + 1);
    }
    tableBody.appendChild(tableRow);
  }
};

let populateKey = (row) => {
  return capitals[row].country;
};

let populateArray = (country, column) => {
  var currentObj;
  var currentDataset;
  var currentElement;

  switch (column) {
    case 1:
      currentDataset = capitals;
      currentElement = "city";
      break;

    case 2:
      currentDataset = continents;
      currentElement = "continent";
      break;

    case 3:
      currentDataset = costlines;
      currentElement = "costline";
      break;

    case 4:
      currentDataset = currencies;
      currentElement = "currency_name";
      break;

    case 5:
      currentDataset = domains;
      currentElement = "tld";
      break;

    case 6:
      currentDataset = flags;
      currentElement = "flag_base64";
      break;
  }

  // using a try catch incase of undefined/null values
  try {
    // finding the correct entry using the key - country
    currentObj = currentDataset.find((obj) => obj.country == country);
    return currentObj[currentElement];
  } catch {
    // if no data return empty string
    console.log("No " + currentElement + " data for: " + country);
    return "";
  }
};

let createArray = () => {
  // use 1d array to create the 2d array
  for (let i = 0; i < capitals.length; i++) {
    tableArray[i] = new Array(7);
  }

  // Loop to initialize country (the key) elements first
  for (let i = 0; i < capitals.length; i++) {
    tableArray[i][0] = populateKey(i);
  }

  // Loop to initialize other elements using country
  for (let i = 0; i < capitals.length; i++) {
    for (let j = 1; j < 7; j++) {
      tableArray[i][j] = populateArray(tableArray[i][0], j);
    }
  }
};

let getData = () => {
  // AJAX to get data
  // Get capitals
  $.get(
    "country-objects/country-by-capital-city.json",
    function (data, status) {
      capitals = $.parseJSON(data);
    }
  );

  // Get continents
  $.get("country-objects/country-by-continent.json", function (data, status) {
    continents = $.parseJSON(data);
  });

  // Get costlines
  $.get("country-objects/country-by-costline.json", function (data, status) {
    costlines = $.parseJSON(data);
  });

  // Get currencies
  $.get(
    "country-objects/country-by-currency-name.json",
    function (data, status) {
      currencies = $.parseJSON(data);
    }
  );

  // Get Domain
  $.get("country-objects/country-by-domain-tld.json", function (data, status) {
    domains = $.parseJSON(data);
  });

  // Get flags
  $.get("country-objects/country-by-flag.json", function (data, status) {
    flags = $.parseJSON(data);
  });
};
