import React, { Component } from 'react';
import ShowItem from './ShowItem';
import { Table, Icon, Divider } from 'antd';

class Show extends Component {
	render() {
		let {transferList} = this.props;
		const data = transferList;
			const columns = [{
				title: 'ประเภท',
				dataIndex: 'type',
				key: 'type',
			}, {
				title: 'จำนวณ',
				dataIndex: 'value',
				key: 'value',
			}, {
				title: 'วัน - เวลา',
			    dataIndex: 'time',
			    key: 'time'
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