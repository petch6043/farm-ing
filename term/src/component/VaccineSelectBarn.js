import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Menu, Icon, Row, Col, Collapse, List, Noti } from 'antd';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';

const SubMenu = Menu.SubMenu;
const Panel = Collapse.Panel;
const customPanelStyle = {
 background: '#f7f7f7',
 borderRadius: 4,
 marginBottom: 5,
 border: 0,
 overflow: 'hidden',
};
class SelectBarnVaccine extends Component {
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
      <Header thisPage="วัคซีน"/>

      <div className="myBody">
        <div><h2>เลือกเล้า: </h2></div>
        <List
          header={"a"}
          footer={"a"}
          bordered
          onClick={this.handleClick}
          dataSource={data}
          renderItem={
            item => (
              <Link to={{pathname : '/vaccine' , barnNo:item.name }}>
                <List.Item key={item.barn_id}><div className="myBigFont">เล้า {item.name}</div></List.Item>
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
export default SelectBarnVaccine;