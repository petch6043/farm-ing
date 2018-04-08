import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Row, Col } from 'antd';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
const SubMenu = Menu.SubMenu;
class Createmenu_transfer extends Component {
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
                   <Link to={{pathname : '/Create_Barn' , Barn_no:'6' }}>Barn 6</Link>
                   </Menu.Item>

              <Menu.Item key="2">
                  <Link to={{pathname : '/Create_Barn' , Barn_no:'7' }}>Barn 7</Link>
                   </Menu.Item>

              <Menu.Item key="3">
                  <Link to={{pathname : '/Create_Barn' , Barn_no:'8' }}>Barn 8</Link>
                   </Menu.Item>

              <Menu.Item key="4">
                  <Link to={{pathname : '/Create_Barn' , Barn_no:'9' }}>Barn 9</Link>
                   </Menu.Item>
                  
              <Menu.Item key="5">
                  <Link to={{pathname : '/Create_Barn' , Barn_no:'10' }}>Barn 10</Link>
                   </Menu.Item>
                  
              
          </Menu>
        </div>

          
   )
 }
}
export default Createmenu_transfer;