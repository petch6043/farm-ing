import React, { Component } from 'react';

class ShowItem extends Component {
	render() {
		let {item} = this.props;
		return(
			<div>
				 อายุ: {item.age}, วัคซีน: {item.vac_name}, เวลา: {item.timestamp}
			</div>
		);
	}
}

export default ShowItem;