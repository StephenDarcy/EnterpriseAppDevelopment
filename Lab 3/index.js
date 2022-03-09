/**
 * Author: Stephen Darcy - C18490924
 * Description: Javascript file for index.html
 * Uses JQuery and AJAX to retrieve the data. This is done in the function getData().
 * The 2D array which holds all this JSON data is created in the function createArray().
 * The datasets are combined in the function populateArray() using .find() with country as a key.
 * The table is created with the function populateTable().
 * Various effects such as hide() and show() are also used throughout this code.
 *
 */

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

// runs on load
$(document).ready(function () {
  // hide elements
  $(".data-table").hide();
  $("#paragraph").hide();
  $("#collapse-btn").hide();

  // On click for show more than 20 rows button
  $("#collapse-btn").click(function () {
    // changes text based on whether full table is shown
    if (!showLess) {
      $("#collapse-btn").html("View 20 rows");
    } else {
      $("#collapse-btn").html("View full table");
    }
    showLess = !showLess;
  });

  // on click for dark mode button
  $("#dark-mode-btn").click(function () {
    toggleTheme();
  });

  // on click for hide paragraph button
  $("#hide-paragraph-btn").click(function () {
    // changes text based on whether paragraph is shown
    if (!paragraphShown) {
      $("#info-box").hide();
      $("#hide-paragraph-btn").html("Show Paragraph");
    } else {
      $("#info-box").show();
      $("#hide-paragraph-btn").html("Hide Paragraph");
    }
    paragraphShown = !paragraphShown;
  });

  // on click for hide table button
  $("#hide-table-btn").click(function () {
    // changes text based on whether table is shown
    if (tableShown) {
      $("#table").hide();
      $("#hide-table-btn").html("Show Table");
    } else {
      $("#table").show();
      $("#hide-table-btn").html("Hide Table");
    }
    tableShown = !tableShown;
  });

  // on click for fade navbar button
  $("#fade-nav-btn").click(function () {
    $("#navbar").fadeToggle();
  });

  // on click for fade table button
  $("#fade-table-btn").click(function () {
    $("#table").fadeToggle();
  });

  // on click for load files button
  $("#load-btn").click(function () {
    // hide the button
    $("#load-btn").hide();

    // show the status paragraph and change text
    $("#paragraph").show();
    $("#paragraph").append("The folder 'country-objects' has been read");

    // start AJAX Requests
    getData();

    // 5 second timer
    setTimeout(function () {
      // create the array
      createArray();

      // populate the array
      populateTable();

      // show table, collapse button, and change the paragraph text
      $(".data-table").show();
      $("#paragraph").html("");
      $("#paragraph").append("The table has been created");
      $("#collapse-btn").show();
    }, 5000);
  });

  // on click for td elements in the table
  $("body").on("click", "#country-table tr td", function () {
    // set the current cell
    currentCell = $(this);

    // if a previous cell exists, then change its background colour back to
    // the original and set this cell to red
    if (previousCell) {
      previousCell.css("background-color", "#212529");
      currentCell.css("background-color", "red");
    }
    // else set the td to red
    else {
      currentCell.css("background-color", "red");
    }
    previousCell = currentCell;
    console.log(currentCell);
  });
});

/**
 * Function that changes the colour of the body of the page on click.
 * The text also updates to reflect the current state of the button.
 */
let toggleTheme = () => {
  // toggle class from previous
  $("#body").toggleClass("dark-mode");

  // change current theme
  darkMode = !darkMode;

  // change button text
  if (darkMode) {
    $("#dark-mode-btn").html("Light Mode");
  } else {
    $("#dark-mode-btn").html("Dark Mode");
  }
};

/**
 * Function that creates the table from the 2D array of combined datasets
 */
let populateTable = () => {
  // get the table body
  var tableBody = document.getElementById("table-body");

  // for each country
  for (let i = 0; i < tableArray.length; i++) {
    // create a row
    var tableRow = document.createElement("tr");

    // if the index is greater than 19 add two classes for hiding them
    if (i >= 19) {
      tableRow.classList.add("collapse", "row-collapse");
    }

    // for each column in the row
    for (let j = 0; j < tableArray[i].length; j++) {
      // create a td element
      var td = document.createElement("td");

      // if index is an image
      if (j == 6) {
        // add an img element to the td element
        td.innerHTML = "<img src='" + tableArray[i][j] + "'>";
      }
      // else just add the text to the column
      else {
        td.appendChild(document.createTextNode(tableArray[i][j]));
      }
      // append the td
      tableRow.appendChild(td);
    }
    // append the row
    tableBody.appendChild(tableRow);
  }
};

/**
 * Function used to populate the initial 2D array with all the countries.
 * @param {integer} row row in 2D array to be populated
 * @returns the country matching the row
 */
let populateKey = (row) => {
  return capitals[row].country;
};

/**
 * Function that gets the requested data when it is sent a country (key) and
 * a column (the dataset to use)
 * @param {string} country the key
 * @param {integer} column 2D array column which determines the JSON object to use
 * @returns requested data for a country
 */
let populateArray = (country, column) => {
  var currentObj;
  var currentDataset;
  var currentElement;

  // switch statement that assigns the element and JSON dataset to use based on the column index in 2D array
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

/**
 * Function that initializes the 2D array, and the calls two functions:
 * 1. populateKey() - this adds all the countries to the first column so they
 * can be used as a key.
 * 2. populateArray() - this adds the rest of the dataset to the array, by sending the country
 * and current column index
 */
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

/**
 * Function that uses AJAX and Jquery to access the JSON objects
 * hosted on the server
 */
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
