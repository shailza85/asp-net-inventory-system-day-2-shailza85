import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { AddProduct } from './components/AddProduct';
import { DiscontinueProduct } from './components/DiscontinueProduct';
import { AddProductQuantity } from './components/AddProductQuantity';
import { SubtractProductQuantity } from './components/SubtractProductQuantity';
import { InventoryData } from './components/InventoryData';


import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />   
            
            <Route path='/add-product' component={AddProduct} />
            <Route path='/discontinue-product' component={DiscontinueProduct} />
            <Route path='/add-product-quantity' component={AddProductQuantity} />
            <Route path='/subtract-product-quantity' component={SubtractProductQuantity} />
            <Route path='/inventory-data' component={InventoryData} />
      </Layout>
    );
  }
}
