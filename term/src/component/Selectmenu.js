import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Row, Col } from 'antd';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import Food from './Food';
const SubMenu = Menu.SubMenu;
class Selectmenu extends Component {
 constructor(props){
    super(props);
    this.state = 
    {current: 0}
  }
   
    handleClick = (e) => {
        console.log('clicking'+e.key+this.state.current, e)
        
        this.setState({
          current: e.key
        });
      };
    
 render(){

  return(
     
    <div align="center">
    
    <Menu
            onClick={this.handleClick}
          mode="inline"
          //openKeys={this.state.openKeys}
          style={{ width: 300 }}>
              
           
                
                <Menu.Item key="1">
                   Barn 1
                   </Menu.Item>

              <Menu.Item key="2">
                  Barn 2
                  </Menu.Item>

              <Menu.Item key="3">
                  Barn 3
                  </Menu.Item>

              <Menu.Item key="4">
                 Barn 4
                  </Menu.Item>
              <Menu.Item key="5">
                  Barn 5
                  </Menu.Item>
                 
              
          </Menu>
        </div>

          
   )
 }
}
export default Selectmenu;