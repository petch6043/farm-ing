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

  deleteClick(food_id) {
    let {onDelete} = this.props;
    onDelete(food_id);
  }
 render() {
  let {foodList, dateIsSelected} = this.props;
  const data = foodList;
  const columns1 = [{
    title: 'ประเภท',
    dataIndex: 'food_type',
    key: 'food_type',
   }, {
    title: 'ปริมาณ',
    dataIndex: 'amount',
    key: 'amount',
   }, {
    title: 'วัน ',
    dataIndex: 'time',
    key: 'time'
   }];
   const columns2 = [{
    title: 'ประเภท',
    dataIndex: 'food_type',
    key: 'food_type',
   }, {
    title: 'ปริมาณ',
    dataIndex: 'amount',
    key: 'amount',
   }];
   const expandedRowRender = (record,row,index) => <label>ใส่เมื่อ: {record.timestamp_formatted} 
    <Popconfirm placement="bottomLeft" title="คุณแน่ใจหรือไม่ว่าจะลบรายการนี้" onConfirm={() => this.deleteClick(record.food_id)} okText="ยืนยัน" cancelText="ยกเลิก">
      <Button style={{marginLeft: 10}} type='danger'>ลบ</Button>
    </Popconfirm>
    </label>;

  return(
   <div>

    <div><h2>รายการให้อาหาร</h2></div>

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