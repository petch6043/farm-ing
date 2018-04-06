import React, { Component } from 'react';
import ShowItem from './ShowItem';
import { Table, Icon, Divider } from 'antd';

class Show extends Component {
	render() {
		let {transferList} = this.props;
		const data = transferList;
			const columns = [{
				title: 'ID',
				dataIndex: 'tran_id',
				key: 'tran_id',
			}, {
				title: 'Pen',
				dataIndex: 'barn_id',
				key: 'barn_id',
			}, {
				title: 'Type',
				dataIndex: 'type',
				key: 'type',
			}, {
				title: 'Value',
				dataIndex: 'value',
				key: 'value',
			}, {
				title: 'User',
				dataIndex: 'user_id',
				key: 'user_id',
			}];
		const expandedRowRender = record => <label>{record.type}</label>;

		return(
			
			<div>
				<h2>Transfer list </h2>
				<Table expandedRowRender={expandedRowRender} columns={columns} dataSource={data}/>
			</div>
		);
	}
}

export default Show;