import React from 'react';
import logo200Image from 'assets/img/logo/charge_zonelogo1.png';
import { Button, ButtonGroup, FormGroup, Input, Label,Row,Col } from 'reactstrap';
// import axios from 'axios'
// import $ from "jquery";
// import { server_config } from './server_const';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
		class_list: [],
		cSelected: [],
		is_old_student : 0,
		fname : "",
		lname : "",
		mobile : "",
		remark : "",
		class_id : 0,
		errors: {},
		is_submit_click: 0,
    };
	this.onChangeFname = this.onChangeFname.bind(this);
	this.onChangeLname = this.onChangeLname.bind(this);
	this.onChangeMobile = this.onChangeMobile.bind(this);
	this.onChangeRemark = this.onChangeRemark.bind(this);
	this.onChangeClass = this.onChangeClass.bind(this);
	this.handleSignUp = this.handleSignUp.bind(this);
  }
  componentDidMount() {
  }
  
  componentWillUnmount() {
    this._isMounted = false;
  }
  validatePhoneNumber = () =>{
	var regexp = /^[0-9]+$/;
	return regexp.test(this.state.mobile);
  }
  handleValidation(e) {
	let errors = {};
	let formIsValid = true;

	//Name
	if (!this.state.fname) {
		formIsValid = false;
		errors["fname"] = "Please Enter First Name.";
	}
	if (!this.state.lname) {
		formIsValid = false;
		errors["lname"] = "Please Enter Last Name.";
	}
	if (!this.state.mobile) {
		formIsValid = false;
		errors["mobile"] = "Please Enter Valid Mobile Number.";
	}
	if (this.state.mobile !== "undefined") {
        if (!this.state.mobile.match(/^[0-9]{10}$/)) {
          formIsValid = false;
          errors["mobile"] = "Please Enter Valid Mobile Number.";
        }
      }
	this.setState({ errors: errors });
	if (e == 1) {
		return formIsValid;
	}
}
inputValidation(e) {
	if (e === 1) {
		this.setState({
			fname: this.state.fname,
		}, () => { this.handleValidation(0) });
	}
}
  
  onChangeFname(e) {
	this.setState({
		fname: e.target.value,
	}, this.inputValidation(this.state.is_submit_click));
  }
  onChangeLname(e) {
	this.setState({
		lname: e.target.value,
	}, this.inputValidation(this.state.is_submit_click));
  }
  onChangeMobile(e) {
	this.setState({
		mobile: e.target.value,
	}, this.inputValidation(this.state.is_submit_click));
  }
  onChangeRemark(e) {
	this.setState({
		remark: e.target.value,
	});
  }
  onChangeClass(e) {
	this.setState({
		class_id: e.target.value,
	});
  }
  handleSignUp(e) {
	e.preventDefault();
	this.setState({
		is_submit_click: 1
	});
	window.location = "/home";
  }
  render() {
	const { class_list } = this.state;  
    return (
      <div>
          <div className="text-center pb-4">
            <img
              src={logo200Image}
              className="rounded"
              style={{ width: 200, height: 100, cursor: 'pointer' }}
              alt="logo"
            />
          </div>
		  	<div id="alert_msg">
			</div>
		  <Row>
			  <Col sm={12} md={6} lg={6}>
				<FormGroup>
					<Label>First Name</Label>
					<Input
					type="text"
					name="fname"
					ref="fname"
					placeholder="First Name"
					value={this.state.fname}
					onChange={this.onChangeFname}
					/>
					<span className="error_cls">{this.state.errors["fname"]}</span>
				</FormGroup>
			  </Col>
			  <Col sm={12} md={6} lg={6}>
				<FormGroup>
					<Label>Last Name</Label>
					<Input
					type="text"
					name="lname"
					ref="lname"
					placeholder="Last Name"
					value={this.state.lname}
					onChange={this.onChangeLname}
					/>
					<span className="error_cls">{this.state.errors["lname"]}</span>
				</FormGroup>
			  </Col>
		  </Row>
          <Row>
          <Col sm={12} md={6} lg={6}>
				<FormGroup>
					<Label for="exampleSelect">Email Id</Label>
					<Input type="text" placeholder="Email" />
				</FormGroup>
			</Col>
			<Col sm={12} md={6} lg={6}>
				<FormGroup>
					<Label>Password</Label>
					<Input
					type="password"
					name="pwd"
					ref="pwd"
					placeholder="Password"
					// value={this.state.mobile}
					// onChange={this.onChangeMobile}
					/>
					{/* <span className="error_cls">{this.state.errors["mobile"]}</span> */}
				</FormGroup>
			</Col>
		  </Row>
		  <Row>
			<Col sm={12} md={6} lg={6}>
				<FormGroup>
					<Label>User Role</Label>
					<Input
					type="text"
					name="role"
					ref="role"
					placeholder="User Role"
					// value={this.state.mobile}
					// onChange={this.onChangeMobile}
					/>
					{/* <span className="error_cls">{this.state.errors["mobile"]}</span> */}
				</FormGroup>
			</Col>
			<Col sm={12} md={6} lg={6}>
				<FormGroup>
					<Label>Phone</Label>
					<Input type="text" placeholder="Phone" />
				</FormGroup>
			</Col>
		  </Row>
		  <FormGroup>
            <Label>Address</Label>
            <Input
              type="textarea"
              name="remark"
              placeholder="Enter Address..."
			  value={this.state.remark}
			  onChange={this.onChangeRemark}
            />
          </FormGroup>
          <div className="text-center pt-2">
            <Button			
			  type="button"
			  id="signup_btn"
              size="md"
              className="border-0 send_otp_btn text-white"
			  onClick={this.handleSignUp}>
			  APPLY
            </Button>
          </div>
		  <div className="text-center pt-3">
            <h6 className="mb-0 mt-4"><a href="/" className="text-secondary">Back To Login</a>
            </h6>
        </div>
      </div>
    );
  }
}


export default Signup;
