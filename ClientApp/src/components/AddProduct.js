﻿import React, { Component } from 'react';
// Don't forget to "npm install axios" and import it on any pages from which you are making HTTP requests.
import axios from 'axios';

// The name of the class is used in routing in App.js. The name of the file is not important in that sense.
export class AddProduct extends Component {
    static displayName = AddProduct.name;

    constructor(props) {
        // 1) When we build the component, we assign the state to be loading, and register an empty list in which to store our forecasts.
        super(props);
        this.state = { statusCode: 0, response: [], name: "", quantity: "", isDiscontinued: "", waiting: false };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        switch (event.target.id) {
            case "name":
                this.setState({ name: event.target.value });
                break;
            case "quantity":
                this.setState({ quantity: event.target.value });
                break;
            case "isDiscontinued":
                this.setState({ isDiscontinued: event.target.value });
                break;
        }

    }


    // Either way we render the title, and a description.
    render() {
        return (
            <div>
                <p>{this.state.waiting ? "Request sent, awaiting response." : "Response received, status: " + this.state.statusCode}</p>
                <p>Response Data: {JSON.stringify(this.state.response)}</p>
                <form onSubmit={this.handleSubmit}>
                    <label htmlfor="name">Product Name:</label>
                    <input id="name" type="text" value={this.state.name} onChange={this.handleChange} />
                    <br />
                    <label htmlfor="quantity">Quantity:</label>
                    <input id="quantity" type="text" value={this.state.quantity} onChange={this.handleChange} />
                    <br />
                    <label htmlfor="isDiscontinued">IsDiscontinued:</label>
                    <input id="isDiscontinued" type="text" value={this.state.isDiscontinued} onChange={this.handleChange} />
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }


    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ waiting: true });
        // Axios replaces fetch(), same concept. Send the response and "then" when it comes back, put it in the state.

        /*
        axios.post(`person/api/create?firstName=${this.state.firstName}&lastname=${this.state.lastName}&phone=${this.state.phone}`).then(res => {
            this.setState({ statusCode: res.status, response: res.data, loading: false });
        });
        */
        axios({
            method: 'post',
            url: 'API/Admin/AddProduct',
            params: {
                name: this.state.name,
                quantity: this.state.quantity,
                isDiscontinued: this.state.isDiscontinued
            }
        })
            .then((res) => {
                this.setState({ statusCode: res.status, response: res.data, waiting: false });
            })
            .catch((err) => {
                this.setState({ statusCode: err.response.status, response: err.response.data, waiting: false });
            });
    }
}