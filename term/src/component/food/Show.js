import React, { Component } from 'react';
import ShowItem from './ShowItem';

class Show extends Component {
	render() {
		let {foodList} = this.props;
		return(
			<div>
				<div>Food list:</div>
				{foodList.map(item => <div id={"item" + item.food_id}><ShowItem item={item}/></div>)}
			</div>
		);
	}
}

export default Show;