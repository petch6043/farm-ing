import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Row, Col } from 'antd';
import { Button, Icon } from 'antd';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';

class Home extends Component {
	render() {
		return(
			<div>
				<div className="myHome">
				<Row>
					<Col span={24} align="center" className="" style={{marginBottom:0}}>
						<div><img src={process.env.PUBLIC_URL + "favicon.png"} style={{width:100}}/></div>
					</Col>
					<Col span={12} align="right">
						<Link to="/transfer_barn_select">
							<Button className="myButton">

								<Icon type="swap" style={{fontSize: 70}}/>
								<div className="myBigFont">เคลื่อนย้าย</div>

							</Button>
						</Link>
					</Col>
					<Col span={12} align="left">
						<Link to="/selectbarnfood">
							<Button className="myButton">

								<Icon type="inbox" style={{fontSize: 70}}/>
								<div className="myBigFont">อาหาร</div>

							</Button>
						</Link>
					</Col>
					<Col span={12} align="right">
						<Link to="/vaccine_menu">
							<Button className="myButton">

								<Icon type="medicine-box" style={{fontSize: 70}}/>
								<div className="myBigFont">สุขภาพ</div>

							</Button>
						</Link>
					</Col>
					<Col span={12} align="left">
						<Link to="/report">
							<Button className="myButton">

								<Icon type="file-text" style={{fontSize: 70}}/>
								<div className="myBigFont">รายงาน</div>

							</Button>
						</Link>
					</Col>
				</Row>
				</div>
				<Footer/>
			</div>
		);
	}
}

export default Home;