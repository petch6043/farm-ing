import React, { Component } from 'react';
import { Menu } from 'antd';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import { Table, Icon, Divider} from 'antd';
import { List } from 'antd';

const SubMenu = Menu.SubMenu;
class CreateMenu extends Component {
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
              <List.Item key={item.barn_id}><div className="myBigFont">เล้า {item.name}</div></List.Item>
            </Link>
          )
        } 
      />

    </div>

          
   )
 }
}
export default CreateMenu;