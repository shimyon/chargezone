import logo200Image from 'assets/img/logo/charge_zonelogo1.png';
import PropTypes from 'prop-types';
import React from 'react';

import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

class Forgotpwd extends React.Component {

  handleSubmit = event => {
    event.preventDefault();
    window.location = '/home';
  };


  render() {

    return (
      <Form onSubmit={this.handleSubmit}>
          <div className="text-center pb-4">
            <img
              src={logo200Image}
              className="rounded"
              style={{ width: 200, height: 100, cursor: 'pointer' }}
              alt="logo"
            />
            <h4 className="mt-2">Forgot Password</h4>
          </div>
        <FormGroup>
            <Label>Email</Label>
            <Input
                type="text"
                name="email"
                ref="email"
                placeholder="Enter Email"
                />
        </FormGroup>
        <hr />
          <Button
            size="lg"
            className="bg-gradient-theme-bottom border-0"
            block
            onClick={this.handleSubmit}>
            Send
          </Button>

        <div className="text-center pt-3">
          <h6>
            <a href="/" className="loginsignup_a">
                Back To Login
              </a>
          </h6>
        </div>

      </Form>
    );
  }
}

export default Forgotpwd;
