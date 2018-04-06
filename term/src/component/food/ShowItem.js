import React, { Component } from 'react';

class ShowItem extends Component {
	render() {
		let {item} = this.props;
		return(
			<div>
				Food Type: {item.food_type}, Amount: {item.amount},	User: {item.user_id}, Time: {item.timestamp}
			</div>
		);
	}
}

export default ShowItem;