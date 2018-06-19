import React, { Component } from 'react';

export default class StockEntry extends Component {
    render() {
        return (
            <p>{this.props.entry}</p>
        );
    }
}