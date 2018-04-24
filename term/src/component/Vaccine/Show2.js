import React, { Component } from 'react';
import ShowItem from './ShowItem';
import { Table, Icon, Divider } from 'antd';
import { Row, Col, Button } from 'antd';
import 'antd/dist/antd.css';
import { Checkbox } from 'antd';

class Show2 extends Component {

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
		let {vaccineprogramList2} = this.props;
		let {x} = this.props;
		let {vaccined} = this.props;

		const data = vaccineprogramList2;
		
			const columns = [{
				title: 'อายุแรกเข้า',
				dataIndex: 'open_age',
				key: 'open_age',
			}, {
				title: 'วันเปิดเล้า',
				dataIndex: 'open_date_formatted',
				key: 'open_date_formatted',
			},
			{
				title: 'กำหนดฉีด',
				dataIndex: 'program_date_formatted',
				key: 'program_date_formatted',
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
				<Table  columns={columns} dataSource={data}/>
				</div>
				
				
				
		);
	}
}

export default Show2;