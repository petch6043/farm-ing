import React, { Component } from 'react';

class ShowItem extends Component {
	render() {
		let {item} = this.props;
		return(
			<div>
				ID: {item.food_id}	Pen ID: {item.pen_id},	Amount: {item.amount},	Food Type: {item.food_type},	User: {item.user_id}
			</div>
		);
	}
}

export default ShowItem;