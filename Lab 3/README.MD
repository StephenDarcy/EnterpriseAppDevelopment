# Enterprise Application Development – AJAX and JSON

## Stephen Darcy - C18490924

### _Description_

---

> This website implements AJAX to access JSON Objects. AJAX is a set of web development techniques that uses various web technologies on the client-side to create asynchronous web applications. With Ajax, web applications can send and retrieve data from a server asynchronously. JSON is an open standard file format and data interchange format that uses human-readable text to store and transmit data objects consisting of attribute–value pairs and arrays (or other serializable values).

### _How To Run_

---

_No node modules required_

1.  Download files or clone repository.
2.  Have NodeJS installed and open a terminal in the projects root folder `Lab 3`
3.  Run: `node server.js `
4.  View `index.html` [here](http://localhost:8080/index.html)

### _Completed Work_

---

Part 1.

- Completed

Part 2.

- Completed
- NodeJS server is created in the file server.js. The NodeJS server is listening for queries from the client using the http module. It responds with the data after accessing it with NodeJS' fs module.
- The client makes AJAX calls to the server through the index.js file. The AJAX calls are made use JQuery.

Part 3.

- Completed
- Index.html has a button that when clicked waits 5 seconds and displays a table. The code for accessing this JSON data is JQuery AJAX calls in index.js.
- Included in index.html there is headers and paragraph created using bootstrap 5. When the table is created it has a column for all the country datasets.
- On button click the program waits 5 seconds. It then modifies a paragraph where the button was displaying "The folder has been read". Once the table has been created this changes to "The table has been created".
- To show only the first 20 rows I made use of bootstraps `data-bs-toggle` and collapse api. Rows created after 20 are assigned the collapse class and are collapsed when a button is clicked.
- For the final section of part 3: _"The table can be stored in a two-dimensional array and combined to form the previous table"_. From my understanding of this I thought you wanted us to only use 2D arrays to create the table and not use objects. I seen in class you showed sample code for how to implement this and you used objects instead, but I already had this completed using only arrays by then. To implement this I first created a 2D array and added the country-by-capital-city.json to the array. Once I had this I used the country column in the array as a key to add the other datasets with JavaScripts .find() method.
  `currentObj = currentDataset.find((obj) => obj.country == country);`

Part 4.

- Completed
- Added a Bootstrap 5 ButtonGroup implementing the required functionalities such as fading, hiding objects and so on
- If the button is clicked again, the text of the button changes and goes back to the original view.

Part 5.

- Completed
- Table cells change colour once the user selects them.

### _Required Files_

---

- country-objects _(folder containing JSON data)_
  -- country-by-capital-city.json
  -- country-by-continent.json
  -- country-by-costline.json
  -- country-by-currency-name.json
  -- country-by-domain-tld.json
  -- country-by-flag.json

- index.css _(Styling for index.html)_
- index.html _(Main webpage)_
- index.js _(AJAX, JQUERY and JavaScript)_
- package.json
- server.js _(NodeJS server)_
