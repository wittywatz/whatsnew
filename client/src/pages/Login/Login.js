import React, { Component } from 'react';

import { createStructuredSelector } from 'reselect';
import { errors } from '../../redux/selectors/errorSelector';
import { loginUser } from '../../redux/actions';
import { connect } from 'react-redux';
import FormInput from '../../components/FormInput/FormInput';

export class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {},
  };
  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    await this.props.loginUser(this.state);
  };
  render() {
    const errors = this.props.errors;
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="login">
            <div className="container mt-5">
              <div className="row">
                <div className="col-md-6 bg-dark m-auto">
                  <h1 className="display-4 text-center text-white">LOGIN</h1>
                  <p className="lead text-center">We've missed you</p>

                  <form onSubmit={this.onSubmit}>
                    <FormInput
                      type="email"
                      placeholder="Email Address"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      error={errors.email}
                    />
                    <FormInput
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      error={errors.password}
                    />
                    <input
                      type="submit"
                      className="btn btn-info btn-block mb-5 mt-4"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
