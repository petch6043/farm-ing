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
    img_id: '1WwZjVl00sYCy2EomeEgLUx8KYkYriimt',
    description: 'Chief Excecutive Officer'
  },
  {
    title: 'ศุภกิตติ์ เกษตรตระการ',
    img_id: '1ubmdrH0dJB73GmPtmFgvexZMItrcIsNX',
    description: 'Managing Director, Technology and Innovation'
  },
  {
    title: 'ธนาพล วงศ์วณิชย์โชติ',
    img_id: '1JJIdHhQ-aY6Nocwn9fi4NAMLb8we22Dy',
    description: 'Head of CEO'
  },
  {
    title: 'ณัฐพล พุทธสันติธรรม',
    img_id: '1AJBoYhpkjl2Y8wMV_GF7jt93HAofPyRH',
    description: 'Head of Operation'
  },
  {
    title: 'พาสิศร์ ฑีฆาอุตมากร',
    img_id: '1goVeDcePgrBhE3wWBaqSRrPALOC-IunQ',
    description: 'Public Relation'
  },
  {
    title: 'ชัญญา จิรกวินวาณิช',
    img_id: '1ShkYjrSo6N_IXu3sFq1qnqBUbCJ3whlz',
    description: 'Daughter'
  },
  {
    title: 'ฐิติภา ถิตยสถาน',
    img_id: '1902ZVDrDj6ipmHF2PAUd33vKppH5GSQQ',
    description: 'Secretary'
  },
  {
    title: 'แพรวา นิมิตกุล',
    img_id: '1qM--WZUV_7bjG0yNDkL_tpF_gLYWjCzh',
    description: 'Head of Design'
  },
  {
    title: 'ฐิตารีย์ ศาศวัตวิบูลย์',
    img_id: '1Gw6cyM04XHD7l7O4Ag3n4E-oe4lgovTv',
    description: 'Database Administrator'
  },
  {
    title: 'พิชญานิน ชรินพาณิชกุล',
    img_id: '1EqtXSnV4w3x3fZLnv8XUpI4eOX_1I8dA',
    description: 'Head of Human Resources'
  },
  {
    title: 'ปิยนัน ธนวิวัฒนกุล',
    img_id: '1eS4Im-AR-TEZxf9xg380MQaw772rw4o6',
    description: 'Head of Development'
  }];


function onPanelChange(value, mode) {
  console.log(value, mode);
}

class User extends Component {
  render() {
    return (
    	<div>
<<<<<<< HEAD
    		<Header thisPage="ผู้ใช้"/>
=======
    		<Header thisPage="สร้างโดย"/>
>>>>>>> 47e6652501b973c2268f0f694c442d65d3de0111
    			<div  className="myCalendar" style={{padding:10}}>
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
					          avatar={<Avatar size='large' src={"http://drive.google.com/uc?export=view&id="+item.img_id} />}
					          title={<a href="https://ant.design">{item.title}</a>}
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

