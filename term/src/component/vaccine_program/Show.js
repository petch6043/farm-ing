import React, { Component } from 'react';
import ShowItem from './ShowItem';
import { Table, Icon, Divider } from 'antd';
import { Row, Col, Button } from 'antd';
import 'antd/dist/antd.css';
import { Checkbox } from 'antd';

class Show extends Component {

	constructor (props){
		super(props)
		this.state = {
			done:false,
			vac_id:0,
			x:0,
			selected: []
		}
		this.toggle = this.toggle.bind(this)
		this.addClick = this.addClick.bind(this);
	}
	// checkVaccine(vaccined) {
	// 	if(vaccined > 0) {
	// 		console.log("a");
	// 		return [0]
	// 	} else {
	// 		console.log("b");
	// 		return []
	// 	}
	// }

	addClick() {
		let {onAdd} = this.props;
		onAdd(this.state.selected);
		this.setState({
			selected: [],
			vaccineprogram: {
				vac_id: "",
				pen_id: 0,
			}
		});
	}

	toggle(){
		this.setState({
			done: !this.state.done
		})
	}

	render() {
		let {vaccineprogramList} = this.props;
		let {x} = this.props;
		let {vaccined} = this.props;
		const data = vaccineprogramList;
			const columns = [{
				title: 'อายุแรกเข้า',
				dataIndex: 'open_age',
				key: 'open_age',
			}, {
				title: 'กำหนดฉีด',
				dataIndex: 'program_date_formatted',
				key: 'program_date_formatted',
			} , {
				title: 'สถานะ',
				dataIndex: 'done',
				key: 'done',
			}];

		const expandedRowRender = record => <label>{record.type}</label>;
		let selectedRowKeys = vaccined;
		const rowSelection = {	
			selectedRowKeys,

 		 		onChange: (selectedRowKeys, selectedRows) => {
 		 			this.setState({selected: selectedRows});
 		 			/*
 		 		if(x%2==0){
 		 			this.setState({vac_id:selectedRows[0].vac_id})
 		 			console.log(this.state)
 		 			console.log(selectedRows)
   		 			console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows[0].vac_id);
   		 			this.setState({x:1})
   		 		}else{
   		 			this.setState({x:2})
   		 		
   		 		}
   		 		*/
	   		 			
  			},
  				getCheckboxProps: record => ({
    				disabled: record.type === 'Disabled User', // Column configuration not to be checked
    				name: record.type,
  				}),
			};

		return(
			<div>
				<div><h2>วัคซีนโปรแกรม:</h2></div>
				<div>สถานะ: 1 = ฉีดแล้ว, 0 = ยังไม่ฉีด</div>
				<Col span={24} align="center">
				<Table  columns={columns} dataSource={data}/>
				{/*rowSelection={rowSelection}*/}
				</Col>
				<Button type="primary" onClick={this.addClick} className="mySubmitButton">ฉีดวัคซีน</Button>
			</div>
		);
	}
}

export default Show;