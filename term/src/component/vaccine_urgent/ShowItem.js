import React, { Component } from 'react';

class ShowItem extends Component {
	render() {
		let {item} = this.props;
		return(
			<div>
				 AGE: {item.age}, VAC NAME: {item.vac_name}, TIME: {item.timestamp}
			</div>
		);
	}
}

export default ShowItem;