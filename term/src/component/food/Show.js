import React, { Component } from 'react';
import ShowItem from './ShowItem';
import { Table, Icon, Divider } from 'antd';
class Show extends Component {
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
   const expandedRowRender = record => <label>ใส่เมื่อ: {record.time}</label>;
  return(
   <div>

    <div><h2>รายการให้อาหาร</h2></div>

   {dateIsSelected ? (
        <Table expandedRowRender={expandedRowRender} columns={columns2} dataSource={data}/>
    ) : (
        <Table columns={columns1} dataSource={data}/>
    )}
   </div>
  );
 }
}

export default Show;