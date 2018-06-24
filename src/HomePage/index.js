import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomePage extends Component {
    render() {
        return (
            <div>
                <h1 id="third-content">User Stocks Management App</h1>
                <p>Welcome to the user stocks management app</p>
                {/* <Link to="/journal">My journal</Link>
                <br/> */}
                <Link to="/stocks">My Stocks</Link>
            </div>
        );
    }
}

export default HomePage;