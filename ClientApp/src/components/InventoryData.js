import React, { Component } from 'react';
import axios from 'axios';
export class InventoryData extends Component {
    static displayName = InventoryData.name;
    constructor(props) {
        // 1) When we build the component, we assign the state to be loading, and register an empty list in which to store our forecasts.
        super(props);
        this.state = { products: [], loading: true };
    }
    componentDidMount() {
        // 2) When the component mounts, we make the async call to the server to retrieve the API results.
        this.populateInventoryData();
    }
    async populateInventoryData() {
        // 3) Make the async call to the API.
        // When an async call is made, it "awaits" a response. This means that rather than the server hanging and keeping the "thread" (process) open, it shelves the thread to be picked up when the response comes back.
        // This frees up server resources to do other things in the event the request takes a few seconds (or more, if your internet is straight out of 1995).
        /* // We are awaiting the fetch of weatherforecast. When it returns, assign it to response.
         const response = await fetch('weatherforecast');
         // Then we await the conversion to json and create a promised value for the method
         const data = await response.json();
         // Then we can set the state to the data and stop the loading phase, which will trigger a re-render. 
         this.setState({ forecasts: data, loading: false });
         */
        // Axios replaces fetch(), same concept. Send the response and "then" when it comes back, put it in the state.
        axios.get('API/Admin/ShowInventory').then(res => {
            this.setState({ products: res.data, loading: false });
        });
    }
    render() {
        // 4) When we render, this ternary statement will with print loading, or render the forecasts table depending if the async call has come back yet.
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : InventoryData.renderProductsTable(this.state.products);
        // Either way we render the title, and a description.
        return (
            <div>
                <h1 id="tabelLabel" >Product Data</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }
    static renderProductsTable(products) {
        // 5) When the async call comes back, render will call this method rather than rendering "Loading...", which will create our table.
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>IsDiscontinued</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product =>
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.quantity}</td>
                            <td>{product.isdiscontinued}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}