import React, { Component } from 'react';

class ShowItem extends Component {
	render() {
		let {item} = this.props;
		return(
			<div>
				ID: {item.report_id}, Barn ID: {item.barn_id}, Pen ID: {item.pen_id},	Pig sick: {item.pig_sick},
				Pig die: {item.pig_die}, Current Pig: {item.pig_current},	food amount: {item.food_amount}, food per pig: {item.fpp}
			</div>
		);
	}
}

export default ShowItem;