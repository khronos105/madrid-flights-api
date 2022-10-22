class Flight {
  constructor(flightApi, tRow) {
    this.time = flightApi.estimadedhour.slice(0, 5);
    this.destiny = flightApi.destiny.toUpperCase();
    this.flight = flightApi.flightNumber;
    this.gate = flightApi.firstDoor;
    this.state = flightApi.state.toUpperCase();
    this.tRow = tRow;
  }

  print() {
    for (const prop of Object.keys(this)) {
      if (prop != "tRow") {
        const tableCell = document.createElement("td");

        const word = Array.from(this[prop]);
        for (const [index, letter] of word.entries()) {
          const letterElement = document.createElement("div");
          setTimeout(() => {
            letterElement.classList.add("flip");
            letterElement.textContent = letter;
            tableCell.append(letterElement);
          }, 100 * index);
        }
        this.tRow.append(tableCell);
      }
    }
  }
}

const tableBody = document.getElementById("table-body");

const getFlight = () => {
  fetch("http://localhost:8000/flights")
    .then((response) => response.json())
    .then((flights) => populateTable(flights))
    .catch((err) => console.log(err));
};

getFlight();

const populateTable = (flights) => {
  for (const flightApi of flights) {
    const tRow = document.createElement("tr");
    const tIcon = document.createElement("td");
    tIcon.textContent = "✈︎";
    tRow.append(tIcon);

    const flight = new Flight(flightApi, tRow);
    flight.print();

    tableBody.append(tRow);
  }
};
