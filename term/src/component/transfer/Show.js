import React, { Component } from 'react';
import ShowItem from './ShowItem';
import { Table, Icon, Divider } from 'antd';

class Show extends Component {
	render() {
		let {transferList} = this.props;
		const data = transferList;
			const columns = [{
  title: 'Transfer ID',
  dataIndex: 'tran_id',
  key: 'tran_id',
}, {
  title: 'Pen ID',
  dataIndex: 'pen_id',
  key: 'pen_id',
}, {
  title: 'Type',
  dataIndex: 'type',
  key: 'type',
}, {
	title: 'Value',
  dataIndex: 'value',
  key: 'value',
}, {
	title: 'User ID',
  dataIndex: 'user_id',
  key: 'user_id',
}];
		
		return(
			
			<div>
				<h2>Transfer list </h2>
				<Table columns={columns} dataSource={data}/>
			</div>
		);
	}
}

export default Show;