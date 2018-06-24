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
            myStocks: [],
            entryInput: '',
            isAuthenticating: true,
            isAuthenticated: false
        }
    }
    
    componentWillMount() {
        // const stocks = this.state.stockEntries;
        // const userStocks =  Object.keys(stocks).map((key, index) => stocks[key]);
        // console.log("All the stocks in the list are: ", userStocks);
        // console.log("Will Mount the length of stocks is : ", userStocks.length);

        // const stocks = this.state.stockEntries;
        console.log("Will mount");
        // console.log("All my stock objects: ", stocks);
        // const myStocks = Object.keys(stocks).map((key, index) => stocks[key]);

        // this.setState(() => {
        //     return {
        //         myStocks: myStocks
        //     };
        // });
        // console.log("All my stocks: ", myStocks);
    }
    // to check to see if there is a loged in user,
    // we should add componentDidMount
    componentDidMount() {
        // if (!auth.currentUser) {
        //     alert('You must be logged in');
        //     return this.props.history.push('/'); // to redirect to home page
        //                             // basically forcing the browser to go to homepage
        //     this.setState({ isAuthenticating: false });
        // }

        this.authUser().then((user) => {
            this.userHasAuthenticated(true);
            this.setState({ isAuthenticating: false });
        }, (error) => {
            this.setState({ isAuthenticating: false });
            alert('You must be logged in');
        });


         if (!auth.currentUser) {
            alert('You must be logged in');
            return this.props.history.push('/'); // to redirect to home page
                                    // basically forcing the browser to go to homepage
            // this.setState({ isAuthenticating: false });
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
        
        // const stocks = this.state.stockEntries;
        console.log("Did mount");
        // console.log("All my stock objects: ", stocks);
        // const myStocks = Object.keys(stocks).map((key, index) => stocks[key]);

        // this.setState(() => {
        //     return {
        //         myStocks: myStocks
        //     };
        // });
        // console.log("All my stocks: ", myStocks);
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
        const lookup = this.state.entryInput;
        // console.log("The Stock to remove is:", lookup);

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
        let uid = auth.currentUser.uid;
        // console.log("User ID: ", uid);
        const ref = database.ref(`/users/${uid}`); // this is making a reference
        // var ref = database.ref(`/users/${auth.currentUser.uid}`);
        // console.log("The reference is: ", ref);
        const stocks = this.state.stockEntries;
        let result = [];

        for(var key in stocks) {
            var value = stocks[key];
            result.push({key, value});
        }

        let entry = result.find(item => item.value === lookup);
        // console.log("Result is: ", result);
        // console.log("The key of the lookup item is: ", entry);
        // const itemKey = entryKey.key.substring(1, entry.length);
        // console.log("The new item id is: ", itemKey);
        ref.child(entry.key).remove();     // remove item
            
        this.setState(() => {
            return {
                entryInput: ''
            };
        })
    }

    getUserStocks = () => {
        const stocks = this.state.stockEntries;
        // console.log("In get user stocks");
        // console.log("All my stock objects: ", stocks);
        const myStocks = Object.keys(stocks).map((key, index) => stocks[key]);

        // this.setState(() => {
        //     return {
        //         myStocks: myStocks
        //     };
        // });
        // console.log("All my stocks: ", myStocks);
        return myStocks;
    }

    authUser = () => {
        return new Promise((resolve, reject) => {
            auth.onAuthStateChanged((user) => {
                if (user) {
                    resolve(user);
                } else {
                    reject('User not logged in yet');
                }
            });
        });
    }

    userHasAuthenticated = (verified) => {
        this.setState({ isAuthenticated: verified });
    }

    render() {
        if (this.state.isAuthenticating) return null;

        console.log("These stocks are in database: ", this.state.myStocks);
        const stocks = this.state.stockEntries;
        const userStocks =  Object.keys(stocks).map((key, index) => stocks[key]);
       if (userStocks.length === 0) return null;

        // const mystocks = this.getUserStocks();
        // const userStocks = this.state.myStocks;
        console.log("All the stocks in the list are: ", userStocks);
        console.log("THe length of stocks is : ", userStocks.length);

        const stocksChart = ( (userStocks.length > 0) ? 
                        <StockMarket userStocks= {userStocks} /> :
                        <StockMarket userStocks= {['GOOG', 'FB']} /> );
        return (
            <div className="main-stocks-chart-page">
                {/* <h1 id="primary-content">My Stocks</h1> */}
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
                    
                    {/* <StockMarket userStocks={this.state.myStocks}/> */}
                    {/* <StockMarket userStocks={(userStocks.length > 0) ? userStocks : ['GOOG']}/> */}
                    {stocksChart}
                    {/* {<StockMarket userStocks= {Object.keys(this.state.stockEntries).map((key, index) => this.state.stockEntries[key])} />} */}
                </div>
            </div>
        );
    }
}

export default StocksPage;