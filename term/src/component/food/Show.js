import React, { Component } from 'react';
import ShowItem from './ShowItem';
import { Table, Icon, Divider } from 'antd';
class Show extends Component {
 render() {
  let {foodList} = this.props;
  const data = foodList;
  const columns = [{
    
    title: 'ประเภท',
    dataIndex: 'food_type',
    key: 'food_type',
   }, {
    title: 'ปริมาณ',
    dataIndex: 'amount',
    key: 'amount',
   }, {
    title: 'วัน - เวลา',
    dataIndex: 'time',
    key: 'time'
   }];
   const expandedRowRender = record => <label>{record.type}</label>;
  return(
   <div>
    <div><h3>รายการให้อาหาร</h3></div>
    <Table expandedRowRender={expandedRowRender} columns={columns} dataSource={data}/>
   </div>
  );
 }
}

export default Show;