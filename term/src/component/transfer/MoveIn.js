import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Button, Icon } from 'antd';
import { Form, Input, Checkbox, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class myForm extends Component {
	handleSubmit = (e) => {
		let {send} = this.props;
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				values.type="รับ"
				send(values);
				console.log(values)
				this.props.form.resetFields();
			}
		});
	}



	render() {
		const { getFieldDecorator } = this.props.form;
		var nursery = [1,2,3,4]
		var allBarn = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 14 },
		};
		return(
			<Form onSubmit={this.handleSubmit} className="login-form">
				<FormItem className="myFormItem">
					<div className="myInput">
					{
						getFieldDecorator('from_barn_name', {
            				rules: [{required: true, message: 'กรุณาเลือกเล้า' }]
          			})
						(
            				<Select placeholder="มาจาก" className="myBigFont">
            				{
            					nursery.map((x) =>
            						<Option value={x} key={x}><div className="myBigFont">อนุบาล {x}</div></Option>
            					)
            				}
            				{  
            					allBarn.map((x) =>
            						<Option value={x} key={x}><div className="myBigFont">เล้า {x}</div></Option>
            					)
            				}
            				</Select>
          				)
					}
					</div>
        		</FormItem>

				<FormItem className="myFormItem">
					{
						getFieldDecorator('value', {
							rules: [{ required: true, message: 'เลือกจำนวน' }]
						})
						(
							<div className="myInput">
								<Input placeholder="จำนวน" className="myBigFont"/>
							</div>
						)
					}
				</FormItem>
				
				<FormItem>
					<Button type="primary" ghost htmlType="submit" className="login-form-button mySubmitButton">ยืนยัน</Button>
				</FormItem>
			</Form>
		)
	}
}

const AddForm = Form.create()(myForm);

class MoveIn extends Component {
	constructor(props) {
		super(props);
		this.send = this.send.bind(this);
	}

	send(transfer) {
		let {onAdd} = this.props;
		onAdd(transfer);
	}


	render() {
		return(
			<div>
				<AddForm send={this.send}/>
        	</div>
		);
	}
}

export default MoveIn;