// arrays to hold json data
var capitals, continents, costlines, currencies, domains, flags;
// create 1d array width of table
var tableArray = new Array(7);

$(document).ready(function () {
  $(".data-table").hide();

  $("#load-btn").click(function () {
    $("#load-btn").hide();
    $("#paragraph").append("The folder 'country-objects' has been read");
    getData();
    setTimeout(function () {
      createArray();
      populateTable();
      $(".data-table").show();
      $("#paragraph").html("");
      $("#paragraph").append("The table has been created");
    }, 5000);
  });
});

let populateTable = () => {
  var tableBody = document.getElementById("table-body");
  for (let i = 0; i < tableArray.length; i++) {
    var tableRow = document.createElement("tr");
    for (let j = 0; j < tableArray[i].length; j++) {
      var td = document.createElement("td");
      // for images
      if (j == 6) {
        td.innerHTML = "<img src='" + tableArray[i][j] + "'>";
      } else {
        td.appendChild(document.createTextNode(tableArray[i][j]));
      }
      tableRow.appendChild(td);
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
