import React, { Component } from 'react';
import ShowItem from './ShowItem';
import { Table, Icon, Divider } from 'antd';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import { Checkbox } from 'antd';

class Show extends Component {

	constructor (props){
		super(props)
		this.state = {
			done:false
		}
		this.toggle = this.toggle.bind(this)
	}

	toggle(){
		this.setState({
			done: !this.state.done
		})
	}

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
			}, {
				title: 'Require',
				dataIndex: 'isRequired',
				key: 'isRequired',
			}, {
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
				<div> Vaccine Program:</div>
				<Col span={24} align="center">
				<Table rowSelection={rowSelection} columns={columns} dataSource={data}/>
				</Col>


				

			</div>
			
				
			
		);
	}
}

export default Show;