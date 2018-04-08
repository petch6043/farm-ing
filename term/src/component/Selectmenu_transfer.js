import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Row, Col } from 'antd';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
const SubMenu = Menu.SubMenu;
class Selectmenu_transfer extends Component {
 constructor(props){
    super(props);
    this.state = 
    {current: 0}
  }

   
    handleClick = (e) => {
        console.log('clicking'+e.key, e)
        
        this.setState({
          current: e.key
        });
        console.log('current:'+this.state.current)
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
                   <Link to={{pathname:'/Create_Barn', barnNumber:'1'}}>Barn 1</Link>
                   </Menu.Item>

              <Menu.Item key="2">
                  <Link to={{pathname:'/Create_Barn', barnNumber:'2'}}>Barn 2</Link>
                  </Menu.Item>

              <Menu.Item key="3">
                  <Link to="/Create_Barn">Barn 3</Link>
                  </Menu.Item>

              <Menu.Item key="4">
                  <Link to="/Create_Barn">Barn 4</Link>
                  </Menu.Item>
                  
              <Menu.Item key="5">
                  <Link to="/Create_Barn">Barn 5</Link>
                  </Menu.Item>
                  
              
          </Menu>
        </div>

          
   )
 }
}
export default Selectmenu_transfer;