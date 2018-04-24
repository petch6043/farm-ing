import React, { Component } from 'react';
import ShowItem from './ShowItem';
import { Table, Icon, Divider } from 'antd';
import { Row, Col, Button,notification } from 'antd';
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

	addClick(a,barnNo) {
		let {onAdd} = this.props;
		onAdd(a,barnNo);
		
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
		let {barnNo} = this.props;
		console.log("ssss"+barnNo)
		const data = vaccineprogramList;
		
			const columns = [{
				title: 'คอกที่',
				dataIndex: 'pen_id',
				key: 'pen_id',
			},  {
				title: 'สถานะ',
				dataIndex: 'done',
				key: 'pen_id',
				render: (text, row, index) => {
					console.log("xxxxxxx",row)
    			if (row.done==1) {
      				return <a href="javascript:;">ฉีดแล้ว</a>;
    			}
    				return <a href="javascript:;">ยังไม่ฉีด</a>;
  				},




  				
				//render: () => <a href="javascript:;">ฉีดแล้ว</a> ,

			},
			
			{
				title: 'ปุ่ม',
				dataIndex: 'done',
				key: 'pen_id',
				render: (text, row, index) => {
    				return (<Button onClick={() => this.addClick(row.pen_id,barnNo)}>ฉีด</Button>);
  				},
			
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
				<Col span={24} align="center">
				<Table  columns={columns} dataSource={data}/>
				
				{/*rowSelection={rowSelection}*/}
				</Col>
				{/*<Button type="primary" onClick={this.addClick} className="mySubmitButton">ฉีดวัคซีน</Button>*/}
			</div>
		);
	}
}

export default Show;