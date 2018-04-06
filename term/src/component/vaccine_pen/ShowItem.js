import React, { Component } from 'react';

class ShowItem extends Component {
	render() {
		let {item} = this.props;
		return(
			<div>
				 VAC ID: {item.vac_id}, PEN ID: {item.pen_id}
			</div>
		);
	}
}

export default ShowItem;