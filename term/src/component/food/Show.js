import React, { Component } from 'react';
import ShowItem from './ShowItem';
import { Table, Icon, Divider } from 'antd';
class Show extends Component {
 render() {
  let {foodList} = this.props;
  const data = foodList;
  const columns = [{
    
    title: 'Type',
    dataIndex: 'food_type',
    key: 'food_type',
   }, {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
   }, {
    title: 'Date - Time',
    dataIndex: 'time',
    key: 'time'
    title: 'User',
    dataIndex: 'user_id',
    key: 'user_id',
   }, {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
   }];
   const expandedRowRender = record => <label>{record.type}</label>;
  return(
   <div>
    <div>Food list:</div>
    {console.log(foodList)}
    <Table expandedRowRender={expandedRowRender} columns={columns} dataSource={data}/>
   </div>
  );
 }
}

export default Show;