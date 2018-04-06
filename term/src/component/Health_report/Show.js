import React, { Component } from 'react';
import ShowItem from './ShowItem';
import { Table, Icon, Divider } from 'antd';
class Show extends Component {
	render() {
		let {reportList} = this.props;
		const data = reportList;
		const columns = [{
				title: 'Barn',
				dataIndex: 'barn_id',
				key: 'barn_id',
			}, {
				title: 'Pen',
				dataIndex: 'pen_id',
				key: 'pen_id',
			}, {
				title: 'Date(barn)',
				dataIndex: 'type',
				key: 'type',
			}, {
				title: 'Pig Age',
				dataIndex: 'pig_current',
				key: 'pig_current',
			}, {
				title: 'Vaccine Name',
				dataIndex: '',
				key: '',
			},	{
				title: 'Status',
				dataIndex: 'fpp',
				key: 'fpp',
			},	{
				title: 'Date(vaccine)',
				dataIndex: 'value',
				key: 'value',
			}, {


			}];
		const expandedRowRender = record => <label>{record.type}</label>;
		return(
			<div>
				<div> Report:</div>
			<Table expandedRowRender={expandedRowRender} columns={columns} dataSource={data}/>
			</div>
		);
	}
}

export default Show;