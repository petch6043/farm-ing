import React, { Component } from 'react';

class ShowItem extends Component {
	render() {
		let {item} = this.props;
		return(
			<div>
				 TYPE NAME: {item.type_name}, AGE: {item.age}, IS REQUIRED:{item.isRequired}
			</div>
		);
	}
}

export default ShowItem;