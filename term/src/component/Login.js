import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import GoogleLogin from 'react-google-login';

class Login extends Component {
	responseGoogle = (response) => {
	  	console.log(response);
	}
	render() {
		return(
			<div>
				<Header thisPage="Login"/>
				<div className="myBody">
					<GoogleLogin
						clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
					    buttonText="Login"
					    onSuccess={this.responseGoogle}
					    onFailure={this.responseGoogle}
					/>
				</div>
				<Footer/>
			</div>
		);
  }
}

export default Login;