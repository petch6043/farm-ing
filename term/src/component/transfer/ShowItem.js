import React, { Component } from 'react';
import { Table, Icon, Divider } from 'antd';

class ShowItem extends Component {
	render() {
		let {item} = this.props;
		
		return(
			<div>
				ID: {item.tran_id} Pen ID: {item.pen_id}, Type: {item.type}, Value: {item.value}, By: {item.user_id}
			</div>
		);
	}
}

export default ShowItem;