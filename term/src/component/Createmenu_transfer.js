import React, { Component } from 'react';
import { Menu } from 'antd';
import { Row, Col } from 'antd';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import { Table, Icon, Divider } from 'antd';

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
  // let {BarnList} = this.props;
  //   const data = BarnList;
  //     const columns = [{

  //       dataIndex: 'name',
  //     }];
     //const expandedRowRender = record => <label>{record.type}</label>;
  return(
    
    <div align="center">
    <Menu
            onClick={this.handleClick}
          mode="inline"
          style={{ width: 300 }}>
              
           
                  
               <Menu.Item>
                   <Link to={{pathname : '/transfer' , Barn_no:'1' }}>Barn 1</Link>
                   </Menu.Item>

              <Menu.Item >
                  <Link to={{pathname : '/transfer' , Barn_no:'2' }}>Barn 2</Link>
                   </Menu.Item>

              <Menu.Item>
                  <Link to={{pathname : '/transfer' , Barn_no:'3' }}>Barn 3</Link>
                   </Menu.Item>

              <Menu.Item >
                  <Link to={{pathname : '/transfer' , Barn_no:'4' }}>Barn 4</Link>
                   </Menu.Item>
                  
              <Menu.Item>
                  <Link to={{pathname : '/transfer' , Barn_no:'5' }}>Barn 5</Link>
                   </Menu.Item>
                  
              
          </Menu>
          {/*<Table expandedRowRender={expandedRowRender} columns={columns} dataSource={data}/>*/}
        </div>

          
   )
 }
}
export default Createmenu_transfer;