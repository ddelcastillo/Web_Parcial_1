// REQUIREMENTS

// CONSTANTS

/** URL where the product information is stored. */
const url_data =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

const starterTitle = "Burgers";

// VARIABLES

/** Represents the body's main element where the information will be displayed. */
let main = document.getElementById("main");

/** Represents the array where the product's data is stored. */
let main_data = [];

/** Represents the shopping car (hash map) where products are stored. */
let car = new Map();

// MAIN METHODS

/** Async function that returns the JSON object. */
const fetchJSON = async (url) => {
  let res = await fetch(url);
  if (res.ok) return res.json();
  else console.log(res.status);
};

/** Async function that runs the rendering of the product information. */
const run = async () => {
  main_data = await fetchJSON(url_data);
  renderTable(starterTitle, main_data[0].products);
};

// LISTENERS

// Adds an event listener to the shopping cart.
document.getElementById("car").addEventListener("click", () => {
  renderCar();
});

// Adds an event listener to the cancel order button for the modal.
document.getElementById("cancel").addEventListener("click", () => {
  car = new Map();
  document.getElementById("counter").innerHTML = "Items: 0";
  renderTable(starterTitle, main_data[0].products);
});

// Adds an event listener to the burger tab.
document.getElementById("burgers").addEventListener("click", () => {
  renderTable("Burgers", main_data[0].products);
});

// Adds an event listener to the tacos tab.
document.getElementById("tacos").addEventListener("click", () => {
  renderTable("Tacos", main_data[1].products);
});

// Adds an event listener to the salads tab.
document.getElementById("salads").addEventListener("click", () => {
  renderTable("Salads", main_data[2].products);
});

// Adds an event listener to the salads tab.
document.getElementById("desserts").addEventListener("click", () => {
  renderTable("Desserts", main_data[3].products);
});

// Adds an event listener to the salads tab.
document.getElementById("drinksSides").addEventListener("click", () => {
  renderTable("Drinks & Sides", main_data[4].products);
});

// METHODS

/** Renders the table row with multiple columns containing menu info. */
const renderTable = (title, products) => {
  let tableTitle = getTableTitle(title);
  main.innerHTML = "";
  main.appendChild(tableTitle);
  let x = document.createElement("hr");
  main.appendChild(x);
  main.appendChild(renderTableProducts(products));
};

const renderTableProducts = (products) => {
  // Main row
  let row = document.createElement("div");
  row.classList.add("row");
  row.classList.add("justify-conent-center");
  row.classList.add("card-row");
  products.forEach((element) => {
    // Column such that there are 4 elements per row.
    let col = document.createElement("div");
    col.classList.add("col-3");
    col.classList.add("table-card-col");
    // Card creation based on Boostrap template:
    let card = document.createElement("div");
    card.classList.add("table-card");
    card.classList.add("card");
    card.classList.add("h-100");

    // Card image:
    let img = document.createElement("img");
    img.classList.add("card-img-top");
    img.classList.add("table-card-image");
    img.src = element.image;
    card.append(img);

    // Card body:
    let body = document.createElement("div");
    body.classList.add("card-body");
    body.classList.add("d-flex");
    body.classList.add("flex-column");
    let bodyTitle = document.createElement("h5");
    bodyTitle.classList.add("card-title");
    bodyTitle.classList.add("table-card-title");
    bodyTitle.innerHTML = element.name;
    let bodyText = document.createElement("p");
    bodyText.classList.add("card-text");
    bodyText.classList.add("table-card-text");
    bodyText.innerHTML = element.description;
    // Div for price and button.
    let bottomCard = document.createElement("div");
    bottomCard.classList.add("mt-auto");
    let bodyPrice = document.createElement("p");
    bodyPrice.classList.add("table-card-price");
    bodyPrice.innerHTML = "$" + element.price;
    let bodyButton = document.createElement("a");
    bodyButton.classList.add("btn");
    bodyButton.classList.add("btn-primary");
    bodyButton.classList.add("table-card-button");
    bodyButton.href = "#";
    bodyButton.innerHTML = "Add to car";
    // Event listener that adds the product to the car.
    bodyButton.addEventListener("click", () => {
      addToCar(element);
    });
    body.appendChild(bodyTitle);
    body.appendChild(bodyText);
    bottomCard.appendChild(bodyPrice);
    bottomCard.appendChild(bodyButton);
    body.appendChild(bottomCard);
    // Final appends:
    card.appendChild(body);
    col.appendChild(card);
    row.appendChild(col);
  });
  return row;
};

const addToCar = (product) => {
  let name = product.name;
  // If the product is in the car, the number of products is increased.
  // If the product isn't in the car, it's initialized with a count of 1.
  if (car.has(name)) {
    product = car.get(name);
    product.count = product.count + 1;
  } else product.count = 1;
  car.set(name, product);
  // Updates the item counter.
  document.getElementById("counter").innerHTML = "Items: " + car.size;
};

const renderCar = () => {
  let tableTitle = getTableTitle("Order detail");
  main.innerHTML = "";
  main.appendChild(tableTitle);
  main.appendChild(renderCarProducts());
  // Row with total and cancel and confirm order buttons:
  let row = document.createElement("div");
  row.classList.add("row");
  // Total:
  let total = document.createElement("p");
  total.classList.add("table-card-price");
  total.innerHTML = "$" + getTotal();
  let col1 = document.createElement("div");
  col1.classList.add("col-1");
  col1.appendChild(total);
  // Middle column:
  let col2 = document.createElement("div");
  col2.classList.add("col-8");
  // Cancel button:
  let col3 = document.createElement("div");
  col3.classList.add("col-1");
  col3.innerHTML = `<button type="button" class="btn second-button" data-toggle="modal" data-target="#modal">Cancel</button>`;
  // Confirm order:
  let col4 = document.createElement("div");
  col4.classList.add("col-2");
  let confirmButton = document.createElement("button");
  confirmButton.classList.add("btn");
  confirmButton.classList.add("first-button");
  confirmButton.innerHTML = "Confirm order";
  confirmButton.addEventListener("click", () => {
    console.log(Array.from(car.values()));
  });
  col4.appendChild(confirmButton);
  // Final appends:
  row.appendChild(col1);
  row.appendChild(col2);
  row.appendChild(col3);
  row.appendChild(col4);
  main.appendChild(row);
};

const renderCarProducts = () => {
  // Boostrap stripped table:
  let table = document.createElement("table");
  table.classList.add("table");
  table.classList.add("table-striped");
  // Thead:
  let thead = document.createElement("thead");
  let theadRow = document.createElement("tr");
  theadRow.insertCell(0).innerHTML = "Item";
  theadRow.insertCell(1).innerHTML = "Qty.";
  theadRow.insertCell(2).innerHTML = "Description";
  theadRow.insertCell(3).innerHTML = "Unit Price";
  theadRow.insertCell(4).innerHTML = "Amount";
  thead.appendChild(theadRow);
  // Tbody:
  let tbody = document.createElement("tbody");
  car.forEach((element, index) => {
    // Tr:
    let tr = document.createElement("tr");
    tr.insertCell(0).innerHTML = index + 1;
    tr.insertCell(1).innerHTML = element.count;
    tr.insertCell(2).innerHTML = element.name;
    tr.insertCell(3).innerHTML = element.price;
    let amount = element.price * element.count;
    tr.insertCell(4).innerHTML = amount.toFixed(2);
    tbody.appendChild(tr);
  });
  // Final appends:
  table.append(thead);
  table.append(tbody);
  return table;
};

const getTotal = () => {
  let amount = 0;
  car.forEach((element) => {
    amount = amount + element.price * element.count;
  });
  return amount.toFixed(2);
};

const getTableTitle = (name) => {
  let tableTitle = document.createElement("h1");
  tableTitle.innerHTML = name;
  tableTitle.classList.add("display-5");
  tableTitle.classList.add("text-center");
  tableTitle.classList.add("table-title");
  return tableTitle;
};

run();
