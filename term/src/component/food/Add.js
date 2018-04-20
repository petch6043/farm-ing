import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Button, Icon } from 'antd';
import { Form, Input, Checkbox } from 'antd';
const FormItem = Form.Item;

class myForm extends Component {
	handleSubmit = (e) => {
		let {send} = this.props;
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				send(values);
				this.props.form.resetFields();
			}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return(
			<Form onSubmit={this.handleSubmit} className="login-form">
				<FormItem className="myFormItem">
					{getFieldDecorator('food_type', {
					rules: [{ required: true, message: 'กรุณาใส่ประเภทอาหาร!' }],
					})(<Input placeholder="ประเภท" />)}
				</FormItem>
				<FormItem className="myFormItem">
					{getFieldDecorator('amount', {
					rules: [{ required: true, message: 'กรุณาใส่ปริมาณอาหาร!' }],
					})(<Input placeholder="ปริมาณ" />)}
				</FormItem>
				<FormItem>
					<Button type="primary" ghost htmlType="ยืนยัน" className="login-form-button">ยืนยัน</Button>
				</FormItem>
			</Form>
		)
	}
}

const AddForm = Form.create()(myForm);

class Add extends Component {
	constructor(props) {
		super(props);
		this.send = this.send.bind(this);
	}

	send(food) {
		let {onAdd} = this.props;
		onAdd(food);
	}


	render() {
		return(
			<div>
				<AddForm send={this.send}/>
        	</div>
		);
	}
}

export default Add;