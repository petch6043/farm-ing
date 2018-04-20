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
		const data = vaccineprogramList;
			const columns = [{
				title: 'อายุ',
				dataIndex: 'age',
				key: 'age',
			}, {
				title: 'วัคซีน',
				dataIndex: 'vac_name',
				key: 'vac_name',
			} , {
				title: 'ลำดับวัคซีน',
				dataIndex: 'vac_id',
				key: 'vac_id',
			}
			];


		const expandedRowRender = record => <label>{record.type}</label>;
		const rowSelection = {	

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
				<Col span={24} align="center">
				<Table rowSelection={rowSelection} columns={columns} dataSource={data}/>
				</Col>

				<Col span={12} align="left" style={{padding:10}}>
				<Button type="primary" onClick={this.addClick}>ส่ง</Button>
				</Col>
				

			</div>
			
				
			
		);
	}
}

export default Show;