import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Button, Icon } from 'antd';
import { Form, Input, Checkbox,Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

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
		const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
		return(
			<Form onSubmit={this.handleSubmit} className="login-form">
				<FormItem className="myFormItem">
					<div className="myInput">
          			{
          				getFieldDecorator('food_type', {
          					rules: [{required: true, message: 'กรุณาใส่ประเภท!' }]
          				})
          				(
		          			<div className="myInput">
			            		<Select placeholder="เลือกประเภท" className="myBigFont">
				   					<Option value='310'><div className="myBigFont">310</div></Option>
				   					<Option value='310(1)'><div className="myBigFont">310(1)</div></Option>
				   					<Option value='320'><div className="myBigFont">320</div></Option>
				   					<Option value='430'><div className="myBigFont">430</div></Option>
				   					<Option value='440(1)'><div className="myBigFont">440(1)</div></Option>
			            		</Select>
		            		</div>
		            		<Select placeholder="เลือกประเภท" className="myBigFont">
			   					<Option value='310'><div className="myBigFont">310</div></Option>
			   					<Option value='320'><div className="myBigFont">320</div></Option>
			   					<Option value='430'><div className="myBigFont">430</div></Option>
		            		</Select>
          				)
          			}
          			</div>
        		</FormItem>

				<FormItem className="myFormItem">
					{
						getFieldDecorator('amount', {
							rules: [{ required: true, message: 'กรุณาใส่ปริมาณอาหาร!' }],
						})
						(
							<div className="myInput">
							<Input placeholder="ปริมาณ" className="myBigFont"/>
							</div>
						)
					}
				</FormItem>

				<FormItem>
					<Button type="primary" ghost htmlType="ยืนยัน" className="login-form-button" className="mySubmitButton">ยืนยัน</Button>
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