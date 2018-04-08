import React, { Component } from 'react';
import ShowItem from './ShowItem';
import { Table, Icon, Divider } from 'antd';

class Show extends Component {
	render() {
		let {vaccineprogramList} = this.props;
		const data = vaccineprogramList;
			const columns = [{
				title: 'age',
				dataIndex: 'age',
				key: 'age',
			}, {
				title: 'Vaccine name',
				dataIndex: 'vac_name',
				key: 'vac_name',

			} , {
				title: 'Vaccine id',
				dataIndex: 'vac_id',
				key: 'vac_id',

			}
			];
		const expandedRowRender = record => <label>{record.type}</label>;

		const rowSelection = {	
 		 		onChange: (selectedRowKeys, selectedRows) => {
 		 			
 		 			
 		 			if (typeof selectedRows[0].vac_id !=='undefined' && selectedRows[0].vac_id){
 		 			this.setState({vac_id:selectedRows[0].vac_id})

 		 			console.log(this.state)
 		 		}
 		 			

   		 			console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows[0].vac_id);
   		 			
  			},
  				getCheckboxProps: record => ({
    				disabled: record.type === 'Disabled User', // Column configuration not to be checked
    				name: record.type,
  				}),
			};


		return(
			<div>
				<div> Vaccine Program:</div>
				<Table expandedRowRender={expandedRowRender} columns={columns} dataSource={data}/>
			</div>
		);
	}
}

export default Show;