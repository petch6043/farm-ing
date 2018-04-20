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
				title: 'Date',
				dataIndex: 'pen_id',
				key: 'pen_id',
			}, {
				title: 'Age',
				dataIndex: 'type',
				key: 'type',
			}, {
				title: 'Current Pig',
				dataIndex: 'pig_current',
				key: 'pig_current',
			}, {
				title: 'Food Amount',
				dataIndex: 'food_amount',
				key: 'food_amount',
			},	{
				title: 'FoodPerPig',
				dataIndex: 'fpp',
				key: 'fpp',
			},	{
				title: 'Target',
				dataIndex: 'value',
				key: 'value',
			}, {


			}];
		const expandedRowRender = record => <label>{record.type}</label>;
		return(
			<div>
				<div>Report:</div>
			<Table expandedRowRender={expandedRowRender} columns={columns} dataSource={data}/>
			</div>
		);
	}
}

export default Show;