import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const Transfer = () => (
  <div>
    <h2>Transfer</h2>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.path}/:topicId`} component={Topic}/>
    <Route exact path={match.path} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

class App extends Component {

  state = {
    transfers: [],
    transfer: {
      pen_id: 1,
      type: 'add',
      value: 5,
      user_id: 1
    },
    foodList: [],
    food: {
      pen_id: 1,
      amount: 5,
      food_type: 3,
      user_id:1
    }
  }

  componentDidMount(){
  //this.getProducts();
    this.getTransfers();
    this.getFoodList();
  }

  // getProducts = _ => {
  //   fetch("http://localhost:4000/products")
  //     .then(response => response.json())
  //     .then(response => this.setState({ products: response.data}))
  //     .catch(err => console.error(err))
  // }

  getTransfers = _ => {
    fetch("http://localhost:4000/transfer")
      .then(response => response.json())
      .then(response => this.setState({ transfers: response.data}))
      .catch(err => console.error(err))
  }

  getFoodList = _ => {
    fetch("http://localhost:4000/food")
      .then(response => response.json())
      .then(response => this.setState({ foodList: response.data}))
      .catch(err => console.error(err))
  }

  // addProduct = _ => {
  //   const { product } = this.state;
  //   console.log(product.price);
  //   fetch("http://localhost:4000/products/add?name='"+product.name+"'&price="+product.price)
  //     .then(this.getProducts)
  //     .catch(err => console.error(err))
  // }

  addTransfer = _ => {
    const { transfer } = this.state;
    fetch('http://localhost:4000/transfer/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: transfer.type,
        pen_id: transfer.pen_id,
        user_id: transfer.value,
        value: transfer.user_id
      }),
    })
    .then(this.getTransfers)
    .catch(err => console.error(err))
    console.log('added transfer')
  }

  addFood = _ => {
    const { food } = this.state;
    fetch('http://localhost:4000/food/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pen_id: food.pen_id,
        amount: food.amount,
        food_type: food.food_type,
        user_id: food.user_id
      }),
    })
    .then(this.getFoodList)
    .catch(err => console.error(err))
    console.log('added food')
  }

  //renderProduct = ({ product_id, name, price}) => <div key={product_id}>{name}, {price}</div>
  renderTransfer = ({ tran_id, pen_id, type, value, user_id}) => <div key={tran_id}>{pen_id}, {type}, {value}, {user_id}</div>
  renderFoodList = ({ food_id, pen_id, amount, food_type, user_id}) => <div key={food_id}>{pen_id}, {amount}, {food_type}, {user_id}</div>

  render() {
    const { transfers, transfer, foodList, food } = this.state;
    return (
      <div className="App">
        <h2>Transfer</h2>
        {transfers.map(this.renderTransfer)}
        <div>
          <input
          value={transfer.pen_id}
          onChange={e => this.setState({ transfer: { ...transfer, pen_id: e.target.value }})}
          />
          <input
          value={transfer.type}
          onChange={e => this.setState({ transfer: { ...transfer, type: e.target.value }})}
          />
          <input
          value={transfer.value}
          onChange={e => this.setState({ transfer: { ...transfer, value: e.target.value }})}
          />
          <input
          value={transfer.user_id}
          onChange={e => this.setState({ transfer: { ...transfer, user_id: e.target.value }})}
          />
          <button onClick={this.addTransfer}>Add transfer</button>
        </div>
        <hr/>

        <h2>Food</h2>
        {foodList.map(this.renderFoodList)}
        <div>
          <input
          value={food.pen_id}
          onChange={e => this.setState({ food: { ...food, pen_id: e.target.value }})}
          />
          <input
          value={food.food_type}
          onChange={e => this.setState({ food: { ...food, food_type: e.target.value }})}
          />
          <input
          value={food.amount}
          onChange={e => this.setState({ food: { ...food, amount: e.target.value }})}
          />
          <input
          value={food.user_id}
          onChange={e => this.setState({ food: { ...food, user_id: e.target.value }})}
          />
          <button onClick={this.addFood}>Add food</button>
        </div>
        <hr/>
        <Router>

        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/transfer">Transfer</Link></li>
            <li><Link to="/topics">Topics</Link></li>
          </ul>

          <hr/>

          <Route exact path="/" component={Home}/>
          <Route path="/transfer" component={Transfer}/>
          <Route path="/topics" component={Topics}/>
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
