import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Row, Col } from 'antd';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import Food from './Food';
import Header from './Header';
import Footer from './Footer';
import { Collapse } from 'antd';
import { List } from 'antd';
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
    const data = BarnList.filter(function(attr) {
      return attr.active == 1;
    });
  return(
    <div>
      <Header thisPage="Please select barn"/>

      <div className="myBody">
        <div><h2>Select Barn: </h2></div>
        <List
          bordered
          onClick={this.handleClick}
          dataSource={data}
          renderItem={
            item => (
              <Link to={{pathname : '/food' , barnNumber:item.name }}>
                <List.Item key={item.barn_id}>Barn {item.name}</List.Item>
              </Link>
            )
          } 
        />
      </div>

      <Footer/>
   </div>

          
   )
 }
}
export default Selectbarnfood;