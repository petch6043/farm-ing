import React, { Component } from 'react';

class ShowItem extends Component {
	render() {
		let {item} = this.props;
		return(
			<div>
				 VAC NAME: {item.vac_name}, VAC Type: {item.type_id}
			</div>
		);
	}
}

export default ShowItem;