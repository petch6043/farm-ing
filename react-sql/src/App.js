import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    products: [],
    product: {
      name: 'Sample product',
      price: '100'
    }
  }

  componentDidMount(){
    this.getProducts();
  }

  getProducts = _ => {
    fetch("http://localhost:4000/products")
      .then(response => response.json())
      .then(response => this.setState({ products: response.data}))
      .catch(err => console.error(err))
  }

  addProduct = _ => {
    const { product } = this.state;
    console.log(product.price);
    fetch("http://localhost:4000/products/add?name='"+product.name+"'&price="+product.price)
      .then(this.getProducts)
      .catch(err => console.error(err))
  }

  addTransfer = _ => {
    const { product } = this.state;
    fetch('http://localhost:4000/transfer/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: product.name,
        pen_id: 1,
        user_id: 1,
        value: 1
      }),
    });
    console.log('addTransfer')
  }

  renderProduct = ({ product_id, name, price}) => <div key={product_id}>{name}, {price}</div>

  render() {
    const { products, product } = this.state;
    return (
      <div className="App">
        {products.map(this.renderProduct)}
        <div>
          <input
          value={product.name}
          onChange={e => this.setState({ product: { ...product, name: e.target.value }})}
          />
          <input
          value={product.price}
          onChange={e => this.setState({ product: { ...product, price: e.target.value }})}
          />
          <button onClick={this.addTransfer}>Add product</button>
        </div>
      </div>
    );
  }
}

export default App;
