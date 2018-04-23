import React, { Component } from 'react';
import ShowItem from './ShowItem';
import { Table, Icon, Divider } from 'antd';

class Show extends Component {
	// dateIsSelected(){
	// 	if()
	// }

	render() {
		let {transferList, dateIsSelected} = this.props;
		console.log(transferList, dateIsSelected)
		const data = transferList;
		const columns1 = [{
			title: 'ประเภท',
			dataIndex: 'type',
			key: 'type',
		}, {
			title: 'จำนวน',
			dataIndex: 'value',
			key: 'value',
		}, {
			title: 'วัน - เวลา',
		    dataIndex: 'time',
		    key: 'time'
		}];
		const columns2 = [{
			title: 'ประเภท',
			dataIndex: 'type',
			key: 'type',
		}, {
			title: 'จำนวน',
			dataIndex: 'value',
			key: 'value',
		}];
		const expandedRowRender = record => <label>ใส่เมื่อ: {record.time}</label>;

		return(
			
			<div>
				<h2>Transfer list </h2>
				{dateIsSelected ? (
			    	<Table expandedRowRender={expandedRowRender} columns={columns2} dataSource={data}/>
			    ) : (
			        <Table columns={columns1} dataSource={data}/>
			    )}
			</div>
		);
	}
}

export default Show;