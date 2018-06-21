import React, { Component } from 'react';

export default class StockEntry extends Component {
    render() {
        // var tbody = document.getElementById("StocksBody");
        // var row = document.createElement("tr"); // create row object
        // var cell = document.createElement("td"); // create cell object
        // cell.appendChild(document.createTextNode(this.props.entry)); // insert value into cell
        // row.appendChild(cell); // append cell to row
        // var input = document.createElement("td"); // create another cell object
        // var button = document.createElement("INPUT"); // create a submit button
        // button.setAttribute("type", "submit");

        // button.title = "Click to remove stock ticker from your collection";
        // button.value = "Remove Stock";
        // // button.onclick = this.removeStock.bind(this);
        // input.appendChild(button); // insert value into cell
        // row.appendChild(input); // append cell to row
        // tbody.appendChild(row);

        return (
            <p>{this.props.entry}</p>
        );
    }
}