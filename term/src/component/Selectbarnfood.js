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
    constructor(props){
    super(props);
    this.state = 
    {current: 0,
      BarnList: []}
  }

    componentDidMount(){
    this.getBarn();
  }
  getBarn() {
      fetch("http://206.189.35.130:4000/barn")
      .then(response => response.json())
      .then(response => this.setState({ BarnList: response.data}))
      .catch(err => console.error(err))
  }

    handleClick = (e) => {
        console.log('clicking'+e.key, e)
        
        this.setState({
          current: e.key
        });
        console.log('current:'+this.state.current)
      };
 render(){
    let {BarnList} = this.state;
    const data = BarnList;
    console.log(data)
  return(
    <div>
    <Header thisPage="Please select barn"/>
    <div className="myBody">
    <Collapse bordered={false} style={{marginBottom:20}} >
    <Panel header="Select barn" style={customPanelStyle} className="myBigFont" > 
    <div align="center">
      <Menu
        onClick={this.handleClick}
        mode="inline"
        style={{ width: 300}}

        >

        {  

          data.map((x) =>{
            return x.active == 1 ?
            <Menu.Item  key={x.barn_id} >
                   <Link to={{pathname : '/food' , barnNumber:x.name }}>Barn {x.name}</Link>
          </Menu.Item>
          : ""
          
         } 
        )}    
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