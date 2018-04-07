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
		const rowSelection = {
 		 		onChange: (selectedRowKeys, selectedRows) => {
   		 			console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  			},
  				getCheckboxProps: record => ({
    				disabled: record.type === 'Disabled User', // Column configuration not to be checked
    				name: record.type,
  				}),
			};
		return(
			<div>
				<div>Vaccineurgent list:</div>
				<Table rowSelection={rowSelection} columns={columns} dataSource={data}/>
				
			</div>
		);
	}
}

export default Show;