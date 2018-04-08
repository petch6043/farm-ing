import React, { Component } from 'react';

class Add extends Component {
	constructor(props) {
		super(props);
		this.state = {
			foodList: [],
		    food: {
		    pen_id: 0,
		    amount: 0,
		    food_type: 0,
		    user_id:0
			}
		}
		this.addClick = this.addClick.bind(this);
	}

	addClick() {
		let {onAdd} = this.props;
		console.log(this.state.food);
		onAdd(this.state.food);
		this.setState({
			foodList: [],
		    food: {
		    pen_id: 0,
		    amount: 0,
		    food_type: 0,
		    user_id:0
			}
		});
	}

	render() {
		let {food} = this.state;
		return(
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
	          <button onClick={this.addClick}>Add food</button>
        	</div>
		);
	}
}

export default Add;