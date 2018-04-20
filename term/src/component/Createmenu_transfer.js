import React, { Component } from 'react';
import { Menu } from 'antd';
import { Row, Col } from 'antd';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import { Table, Icon, Divider} from 'antd';
import { List } from 'antd';

const SubMenu = Menu.SubMenu;
class Createmenu_transfer extends Component {
 constructor(props){
    super(props);
    this.state = 
    {current: 0}
  }
    
 render(){
  let {BarnList} = this.props;
  const data = BarnList.filter(function(attr) {
    return attr.active == 1;
  });

  return(
    
    <div>

      <List
        header={"a"}
        footer={"a"}
        bordered
        dataSource={data}
        renderItem={
          item => (
            <Link to={{pathname : '/transfer' , Barn_no:item.name }}>
              <List.Item key={item.barn_id}>Barn {item.name}</List.Item>
            </Link>
          )
        } 
      />

    </div>

          
   )
 }
}
export default Createmenu_transfer;