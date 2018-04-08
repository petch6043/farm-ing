import React, { Component } from 'react';
import ShowItem from './ShowItem';
import { Table, Icon, Divider } from 'antd';

class Show extends Component {
	render() {
		let {vaccineurgentList} = this.props;

		const data = vaccineurgentList;
			
			const columns = [{
				title: 'age',
				dataIndex: 'age',
				key: 'age',
			}, {
				title: 'Vaccine name',
				dataIndex: 'vac_name',
				key: 'vac_name',
			},  {
				title: 'time',
				dataIndex: 'timestamp',
				key: 'timestamp',
			}
			];
		const expandedRowRender = record => <label>{record.type}</label>;
		return(
			<div>
				<div>Vaccineurgent list:</div>
				<Table expandedRowRender={expandedRowRender} columns={columns} dataSource={data}/>
				
			</div>
		);
	}
}

export default Show;