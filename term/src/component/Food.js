import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Add from './food/Add';
import Show from './food/Show';

class Food extends Component {
	constructor(props) {
		super(props);
		this.state = {
			foodList: []
		}
		this.onAdd = this.onAdd.bind(this);
	}

	componentDidMount(){
		this.getFood();
	}

	getFood = _ => {
	    fetch("http://localhost:4000/food")
	      .then(response => response.json())
	      .then(response => this.setState({ foodList: response.data}))
	      .catch(err => console.error(err))
	}

	onAdd(food) {
		console.log("A" + food);
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


	render() {
		let {foodList} = this.state;
		return(
			<div className="myBody">
				<Header thisPage="Food"/>
				<div>Transfer</div>
				<Add onAdd={this.onAdd}/>
				<Show foodList={foodList}/>
				<Footer/>
			</div>
		);
	}
}

export default Food;