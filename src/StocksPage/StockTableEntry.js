import React, { Component } from 'react';


export default class StockTableEntry extends Component {
    componentDidMount()
    {
        // insert prop into a table;
        this.getUserStocks();
    }

    getUserStocks = () => {
        const stockEntry = this.props.entry;
        var tbody = document.getElementById("StocksBody");
       
        var row = document.createElement("tr"); // create row object
        var cell = document.createElement("td"); // create cell object
        cell.appendChild(document.createTextNode(stockEntry)); // insert value into cell
        row.appendChild(cell); // append cell to row
        tbody.appendChild(row);
    }

    render() {
        return (
            <p>{this.props.entry}</p>
        );
    }
}
