import React, { Component } from 'react';
import ShowItem from './ShowItem';
import { Table, Icon, Divider, Button, Popconfirm } from 'antd';

class Show extends Component {
	constructor (props){
		super(props)
		this.state = {
		}
		this.deleteClick = this.deleteClick.bind(this);
	}

	deleteClick(tran_id) {
		let {onDelete} = this.props;
		onDelete(tran_id);
	}

	render() {
		let {transferList, dateIsSelected, currentPig} = this.props;
		console.log(currentPig[0].current_pig)
		const current = currentPig[0].current_pig;
		const data = transferList;
		const columns1 = [{
			title: 'ประเภท',
			dataIndex: 'type',
			key: 'type',
		}, {
			title: 'จำนวน',
			dataIndex: 'value',
			key: 'value',
		}, {
			title: 'วัน',
		    dataIndex: 'time',
		    key: 'time'
		}];
		const columns2 = [{
			title: 'ประเภท',
			dataIndex: 'type',
			key: 'type',
		}, {
			title: 'จำนวน',
			dataIndex: 'value',
			key: 'value',

		}];
		const expandedRowRender = (record,row,index) => <label>ใส่เมื่อ: {record.timestamp_formatted} (เล้า:{record.from_barn_id})
		<Popconfirm placement="bottomLeft" title="คุณแน่ใจหรือไม่ว่าจะลบรายการนี้" onConfirm={() => this.deleteClick(record.tran_id)} okText="ยืนยัน" cancelText="ยกเลิก">
			<Button style={{marginLeft: 10}} type='danger'>ลบ</Button>
		</Popconfirm>
		</label>;

		return(
			
			<div>
				<h2>รายการเคลื่อนย้าย</h2>
				<h4>จำนวนปัจจุบัน {current}</h4>
				{dateIsSelected ? (
			    	<Table expandedRowRender={expandedRowRender} columns={columns2} dataSource={data}/>
			    ) : (
			        <Table expandedRowRender={expandedRowRender} columns={columns1} dataSource={data}/>
			    )}
			</div>
		);
	}
}

export default Show;