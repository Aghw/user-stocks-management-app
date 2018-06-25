import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

// the following functions are helper functions that can be initiated before
// mounting the objects
const auth = firebase.auth(); // inistantiating an objec with firebase.auth()
                              // this will enable us to sign-in and sing-out with
                              // google account or any other account
const provider = new firebase.auth.GoogleAuthProvider(); // inistanting provider

class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        }
    }

    // when a person logs in, it doesn't give any information.
    // we can add a listener that will fire a function whenever we login.
    // in order to do that we will ad the componentDidMount
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            this.setState(() => {
                return { 
                    // isLoggedIn: user ? true : false 
                    isLoggedIn: !!user 
                };
            });
        });
    }

    signIn = () => {
        // It create authentication with the provider that we give to the function,
        // in this case it will be Google provider. The popup will return a promise
        auth.signInWithPopup(provider);
    }

    signOut = () => {
        auth.signOut();
    }

    render() {
        return (
            <ul className="stocks-navigation-bar">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/stocks">Stocks</Link></li>
                {!this.state.isLoggedIn && <li><a href="#signin" 
                    onClick={this.signIn}>Sign In</a></li>}
                {this.state.isLoggedIn && <li><a href="#signout" 
                    onClick={this.signOut}>Sign Out</a></li>}
            </ul>
        );
    }
}

export default NavigationBar;