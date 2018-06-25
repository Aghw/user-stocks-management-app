import React, { Component } from 'react';
import firebase from 'firebase';
import StockEntry from './StockEntry';
import StockMarket from './StocksMarketPage';

const auth = firebase.auth();
// initiate firebase database
const database = firebase.database();

class StocksPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stockEntries: {},
            // myStocks: [],
            entryInput: '',
            loading: true
            // isAuthenticating: true,
            // isAuthenticated: false
        }
    }
    
    // to get firebase data
    getFirebaseData = () => {
        database.ref(`/users/${auth.currentUser.uid}`) // this is pretty much an event listener
        .on('value', (snapshot) => { // firebase broadcasts when database values change 
            //  console.log(snapshot);   
            this.setState(() => {
                return {
                    stockEntries: snapshot.val() || {},
                    loading: false
                };
            });
        });
    }

    // to check to see if there is a loged in user,
    // we should add componentDidMount
    componentDidMount() {
         if (!auth.currentUser) {
            alert('You must first log in to be authenticated.');
            return this.props.history.push('/'); // to redirect to home page
                                    // basically forcing the browser to go to homepage
        }

        // get data from firebase into state variable
        this.getFirebaseData();
    }

    onInputChange = (e) => {
        e.preventDefault();
        const newValue = e.target.value.toUpperCase().trim();
        this.setState(() => {
            return {
                entryInput: newValue
            };
        })
    }

    addStock = (e) => {
        e.preventDefault();

        database.ref(`/users/${auth.currentUser.uid}`) // this is making a reference
            .push(this.state.entryInput);             // to the current user.
        
        this.setState(() => {
            return {
                entryInput: ''
            };
        })

        this.getFirebaseData();
    }


    removeStock = (e) => {
        e.preventDefault();
        const lookup = this.state.entryInput;

        // local variable to hold user id.
        const ref = database.ref(`/users/${auth.currentUser.uid}`); // this is making a reference
        const stocks = this.state.stockEntries;
        let result = []; // array to hold all the entries in firebase database

        for(var key in stocks) {
            var value = stocks[key];
            result.push({key, value});
        }

        let entry = result.find(item => item.value === lookup);
        ref.child(entry.key).remove();     // remove item

        this.setState(() => {
            return {
                entryInput: ''
            };
        })
    }

    getUserStocks = () => {
        const stocks = this.state.stockEntries;
        const myStocks = Object.keys(stocks).map((key, index) => stocks[key]);

        var tbody = document.getElementById("StocksBody");
       
        myStocks.forEach(function(cellVal) {
            var row = document.createElement("tr"); // create row object
            var cell = document.createElement("td"); // create cell object
            cell.appendChild(document.createTextNode("abc")); // insert value into cell
            row.appendChild(cell); // append cell to row
            tbody.appendChild(row);
        });


        // myStocks.forEach(dataRow => {
        //     var row = document.createElement("tr"); // create row object

        //     dataRow.forEach(cellVal => {
        //         var cell = document.createElement("td"); // create cell object
        //         cell.appendChild(document.createTextNode(cellVal)); // insert value into cell
        //         row.appendChild(cell); // append cell to row
        //     });
        //     tbody.appendChild(row);
        // });
        return myStocks;
    }

    // authUser = () => {
    //     return new Promise((resolve, reject) => {
    //         auth.onAuthStateChanged((user) => {
    //             if (user) {
    //                 resolve(user);
    //             } else {
    //                 reject('User not logged in yet');
    //             }
    //         });
    //     });
    // }

    // userHasAuthenticated = (verified) => {
    //     this.setState({ isAuthenticated: verified });
    // }

    render() {
        const stocks = this.state.stockEntries;
        const userStocks =  Object.keys(stocks).map((key, index) => stocks[key]);

       if (userStocks.length === 0 ) return null;

        return (
            <div className="main-stocks-chart-page">
                {this.state.loading ? <p>Loading ...</p> : null}
                {this.state.error ? <p>{this.state.error}</p> : null}
                <h1 id="secondary-content">My Stocks</h1>

                {Object.keys(this.state.stockEntries).map((key) => {
                    return <StockEntry key={key} entry={this.state.stockEntries[key]} />;
                })}

                {/* <br />
                <div className="main">
                    <table id="StockList">
                        <tbody id="StocksBody" />
                    </table>
                </div>
                <br /> */}
                {/* {this.getUserStocks()} */}
                <div className="main">
                    <div className="search-stock-ticker">
                        <div className="input-controls">
                            <input className="stock-ticker-input"
                            type="textarea" name="stock-symbol" id="stock-ticker" 
                            placeholder="Enter Stock Ticker" 
                            onChange={this.onInputChange} value={this.state.entryInput} />
                            <input type="submit" value="Add Stock" id="addStockTicker" 
                            title="Click to add stock ticker to your collection"
                            onClick={this.addStock.bind(this)} />
                            <input type="submit" value="Remove Stock" id="removeStockTicker" 
                            title="Click to remove stock ticker from your collection"
                            onClick={this.removeStock.bind(this)} />
                        </div>
                    </div>
                    
                    {Object.keys(stocks).map((key) => {
                        return <StockMarket key={key} userStocks={stocks[key]} />;
                    })}
                </div>
            </div>
        );
    }
}

export default StocksPage;