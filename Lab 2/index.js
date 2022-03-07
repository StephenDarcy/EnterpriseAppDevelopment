$(document).ready(function () {
  var capitals, continents, costlines, currencies, domains, flags;

  $("#load-btn").click(function () {
    // AJAX to get data
    // Get capitals
    $.get(
      "country-objects/country-by-capital-city.json",
      function (data, status) {
        capitals = data;
      }
    );

    // Get continents
    $.get("country-objects/country-by-continent.json", function (data, status) {
      continents = data;
    });

    // Get costlines
    $.get("country-objects/country-by-costline.json", function (data, status) {
      costlines = data;
    });

    // Get currencies
    $.get(
      "country-objects/country-by-currency-name.json",
      function (data, status) {
        currencies = data;
      }
    );

    // Get Domain
    $.get(
      "country-objects/country-by-domain-tld.json",
      function (data, status) {
        domains = data;
      }
    );

    // Get flags
    $.get("country-objects/country-by-flag.json", function (data, status) {
      flags = data;
    });

    console.log(capitals);
    var tableArray = [];

    var rows = 7;
    var columns = capitals.length();

    console.log(rows, columns);
  });
});
