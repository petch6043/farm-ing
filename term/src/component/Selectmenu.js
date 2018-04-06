import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Row, Col } from 'antd';
const SubMenu = Menu.SubMenu;
class Selectmenu extends Component {
	state = {
    openKeys: ['sub1'],
  };
	render(){
		return(
			
			 <div align="center">
				<Menu
        		mode="inline"
        		openKeys={this.state.openKeys}
        		style={{ width: 200 }}>
              
        			<SubMenu key="sub1" title={<span><Icon type="bars" /><span>Select Barn</span></span>}>
                  
          				<Menu.Item key="1">Barn 1</Menu.Item>
          				<Menu.Item key="2">Barn 2</Menu.Item>
          				<Menu.Item key="3">Barn 3</Menu.Item>
          				<Menu.Item key="4">Barn 4</Menu.Item>
          				<Menu.Item key="5">Barn 5</Menu.Item>
                  
       			 	</SubMenu>
              
        		</Menu>
        </div>

        		
			)
	}
}
export default Selectmenu;