import React, { Component } from 'react';
import { Button, Icon, Calendar, Collapse, List, Avatar } from 'antd';
import { Row, Col } from 'antd';
import Header from './Header';
import Footer from './Footer';

import {
	BrowserRouter as Router,
	Link,
	Route,
	Switch,
} from 'react-router-dom';

const Panel = Collapse.Panel;

const data = [
  {
    title: 'กวิน เสริมศักดิ์สกุล',
    img_id: 'good.jpg',
    description: 'Chief Excecutive Officer'
  },
  {
    title: 'ศุภกิตติ์ เกษตรตระการ',
    img_id: 'neno.jpg',
    description: 'Chief Technology Officer'
  },
  {
    title: 'ธนาพล วงศ์วณิชย์โชติ',
    img_id: 'gap.jpg',
    description: 'Chief Operating Officer'
  },
  {
    title: 'ณัฐพล พุทธสันติธรรม',
    img_id: 'petch.jpg',
    description: 'Head of Operation'
  },
  {
    title: 'พาสิศร์ ฑีฆาอุตมากร',
    img_id: 'tommy.jpg',
    description: 'Head of Security'
  },
  {
    title: 'ปิยนัน ธนวิวัฒนกุล',
    img_id: 'team.jpg',
    description: 'Head of Development'
  },
  {
    title: 'ชัญญา จิรกวินวาณิช',
    img_id: 'chanya.jpg',
    description: "Mote & Jeedz's daughter"
  },
  {
    title: 'ฐิติภา ถิตยสถาน',
    img_id: 'title.jpg',
    description: 'Head of General Bae'
  },
  {
    title: 'แพรวา นิมิตกุล',
    img_id: 'pairy.jpg',
    description: 'Head of Design'
  },
  {
    title: 'ฐิตารีย์ ศาศวัตวิบูลย์',
    img_id: 'ongfong.jpg',
    description: 'Head of Pig'
  },
  {
    title: 'พิชญานิน ชรินพาณิชกุล',
    img_id: 'proud.jpg',
    description: 'Head of Human Resources'
  }];


function onPanelChange(value, mode) {
  console.log(value, mode);
}

class User extends Component {
  render() {
    return (
    	<div>
    		<Header thisPage="สร้างโดย"/>
    			<div  className="myBody" style={{padding:10, paddingBottom:50}}>
    				<Row>
    					{/*<Col span={24} align="center" >
    						<img  style={{width: 80, height: 80,borderRadius:100}} src='https://st.depositphotos.com/2075685/3076/v/950/depositphotos_30768193-stock-illustration-business-pig.jpg'/>
    						<div style={{fontSize: 20}}><b>ชัญญา จิรกวินวาณิช</b></div>
    						<div>CTO ชัยภูมิฟาร์ม</div>
    						<Button type="danger" style={{bottom:-300}}>ออกจากระบบ</Button>
    					</Col>
    					*/}
    					<Col span={24} >
    					<List
    					    itemLayout="horizontal"
    					    dataSource={data}
    					    renderItem={item => (
    					      <List.Item>
    					        <List.Item.Meta
    					          avatar={<Avatar size='large' src={process.env.PUBLIC_URL + "/team/" + item.img_id} />}
    					          title={<a href="#">{item.title}</a>}
    					          description={item.description}
    					        />
    					      </List.Item>
    					       )}
      						/>
      					</Col>
    				</Row>
				  </div>
			   <Footer/>
		  </div>	
    );
  }
}

export default User;

