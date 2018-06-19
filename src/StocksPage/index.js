import React, { Component } from 'react';
import firebase from 'firebase';
import StockEntry from './StockEntry';

const auth = firebase.auth();
// initiate firebase database
const database = firebase.database();

class StocksPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stockEntries: {},
            entryInput: ''
        }
    }
    
    // to check to see if there is a loged in user,
    // we should add componentDidMount
    componentDidMount() {
        if (!auth.currentUser) {
            alert('You must be logged in');
            return this.props.history.push('/'); // to redirect to home page
                                    // basically forcing the browser to go to homepage
        }

        // showing records is actuall pretty similar.
        // It uses the exact syntax as adding record. 
        // Only difference is you have to use different function instead of push.
        // It has to be set in componentDidMount
        // Here, I'll add a function call that is going to 
        // populate our state with database journal entries.
        // Note: eventhough the data in the database looks like an array,
        // it is treated as object.
        database.ref(`/users/${auth.currentUser.uid}`) // this is pretty much an event listener
                .on('value', (snapshot) => { // firebase broadcasts when database values change 
                    //  console.log(snapshot);   
                    this.setState(() => {
                        return {
                            stockEntries: snapshot.val() || {}
                        };
                    });
                });
    }

    onInputChange = (e) => {
        e.preventDefault();
        const newValue = e.target.value;
        this.setState(() => {
            return {
                entryInput: newValue
            };
        })
    }

    addStock = (e) => {
        e.preventDefault();
        // alert('Implement addEntry');

        // I create a ref to pretty much anything. 
        //Think of it like a namespace or a collection
        // I can create a ref (reference) and push things to that ref,
        // and it would be a collection of items.
        // Here, I'm going to add code to get input from the state,
        // and store in my database.
        // a reference is just a string. A string that refers to a collection
        // Once I have a reference, I can do different things like push
        // objects to that reference.
        // I can also make my references dynamic.
        // I can do it dynamic as follows.
        database.ref(`/users/${auth.currentUser.uid}`) // this is making a reference
            .push(this.state.entryInput);             // to the current user.

        this.setState(() => {
            return {
                entryInput: ''
            };
        })
    }


    removeStock = (e) => {
        e.preventDefault();
        // alert('Implement addEntry');

        // I create a ref to pretty much anything. 
        //Think of it like a namespace or a collection
        // I can create a ref (reference) and push things to that ref,
        // and it would be a collection of items.
        // Here, I'm going to add code to get input from the state,
        // and store in my database.
        // a reference is just a string. A string that refers to a collection
        // Once I have a reference, I can do different things like push
        // objects to that reference.
        // I can also make my references dynamic.
        // I can do it dynamic as follows.
        database.ref(`/users/${auth.currentUser.uid}`) // this is making a reference
            .remove(this.state.entryInput);             // to the current user.

        this.setState(() => {
            return {
                entryInput: ''
            };
        })
    }

    // insertTable = () => {
    //     let dataTable = [['abc', 'def'], ['aaa', 'bbb'], ['ccc','ddd'], ['eee', 'fff']];
    //     // declare variable to hold the main-container object
    //     let mn = document.getElementById("display-stocks");
    //     let table = document.createElement("table"); // table oject
    //     // add id to the dataTable
    //     table.setAttribute("id", "tblMinefield01");

    //     let tBody = document.createElement("tbody"); // DOM body


    //     dataTable.forEach(function(dataRow) { // for each row
    //       var row = document.createElement("tr"); // create row object

    //       dataRow.forEach( function(cellVal) { // for each row
    //         var cell = document.createElement("td"); // create cell object

    //         cell.appendChild(document.createTextNode(cellVal)); // insert value into cell
    //         row.appendChild(cell); // append cell to row
    //       });

    //       tBody.appendChild(row);

    //     });

    //     table.appendChild(tBody);
    //     mn.appendChild(table);
    //   }

    render() {
        return (
            <div>
                <h1>My Stocks</h1>
                {Object.keys(this.state.stockEntries).map((key) => {
                    return <StockEntry key={key} entry={this.state.stockEntries[key]} />;
                })}

                <div className="search-stock-ticker">
                    <div className="input-controls">
                        <input className="stock-ticker-input"
                        type="textarea" name="stock-symbol" id="stock-ticker" 
                        placeholder="Enter Stock Ticker" 
                        onChange={this.onInputChange} value={this.state.entryInput} />
                        <input type="submit" value="Add Stock Ticker" id="addStockTicker" 
                        title="Click to add stock ticker to your collection"
                        onClick={this.addStock.bind(this)} />
                        <input type="submit" value="Remove Stock Ticker" id="removeStockTicker" 
                        title="Click to remove stock ticker from your collection"
                        onClick={this.removeStock.bind(this)} />
                    </div>
                </div>
            </div>
        );
    }
}

export default StocksPage;