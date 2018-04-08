import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Row, Col } from 'antd';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import Food from './Food';
import Header from './Header';
import Footer from './Footer';
import { Collapse } from 'antd';
const SubMenu = Menu.SubMenu;
const Panel = Collapse.Panel;
const customPanelStyle = {
 background: '#f7f7f7',
 borderRadius: 4,
 marginBottom: 5,
 border: 0,
 overflow: 'hidden',
};
class Selectbarnfood extends Component {
    
    
 render(){

  return(
    <div>
    <Header thisPage="Barn"/>
    <div className="myBody">
    <Collapse bordered={false} style={{marginBottom:20}}>
    <Panel header="Select barn" style={customPanelStyle}> 
    <div align="center">
    
    <Menu  
          mode="inline"
          //openKeys={this.state.openKeys}
          style={{ width: 300 }}>
          
         <Menu.Item key="1">
                  <Link to={{pathname : '/food' , barnNumber: '1' }}>
                   Barn 1
                  </Link>
          </Menu.Item>
         
          <Menu.Item key="2">
                  <Link to={{pathname : '/food' , barnNumber: '2' }}>
                  Barn 2
                  </Link>
          </Menu.Item>

          <Menu.Item key="3">
                  <Link to={{pathname : '/food' , barnNumber: '3' }}>
                  Barn 3
                  </Link>
          </Menu.Item>

          <Menu.Item key="4">
                  <Link to={{pathname : '/food' , barnNumber: '4' }}>
                  Barn 4
                  </Link>
          </Menu.Item>

          <Menu.Item key="5">
                  <Link to={{pathname : '/food' , barnNumber: '5' }}>
                  Barn 5
                  </Link>
           </Menu.Item>
                 
              
          </Menu>

        </div>
        </Panel>
        </Collapse>
        </div>
    <Footer/>
   </div>

          
   )
 }
}
export default Selectbarnfood;