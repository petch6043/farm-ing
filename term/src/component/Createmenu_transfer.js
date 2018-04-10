import React, { Component } from 'react';
import { Menu } from 'antd';
import { Row, Col } from 'antd';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import { Table, Icon, Divider} from 'antd';

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
   let {BarnList} = this.props;
     const data = BarnList;
  //     const columns = [{

  //       dataIndex: 'name',
  //     }];
     //const expandedRowRender = record => <label>{record.type}</label>;
 console.log(data) 
  return(
    
    <div align="center">
     
    <Menu
        onClick={this.handleClick}
        mode="inline"
        style={{ width: 300 }}>
        {  

          data.map((x) =>{
            return x.active == 1 ?
            <Menu.Item  key={x.barn_id} >
                   <Link to={{pathname : '/transfer' , Barn_no:x.name }}>Barn {x.name}</Link>
          </Menu.Item>
          : ""
          
         } 
        )}    
          </Menu>
        </div>

          
   )
 }
}
export default Createmenu_transfer;