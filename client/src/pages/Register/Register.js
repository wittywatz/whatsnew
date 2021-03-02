import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions';
import { createStructuredSelector } from 'reselect';
import { errors } from '../../redux/selectors/errorSelector';
import FormInput from '../../components/FormInput/FormInput';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    await this.props.registerUser(this.state);
    // this.setState({ name: '', email: '', password: '', password2: '' });
  };

  render() {
    const errors = this.props.errors;
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="register">
            <div className="container">
              <div className="row">
                <div className="col-md-6 bg-dark m-auto">
                  <h1 className="display-4 text-center">SIGN UP</h1>
                  <h1 style={{ color: '#42f55d' }} className="lead text-center">
                    We're glad you decided to join us
                  </h1>
                  <p className="lead text-center">Create your account below</p>
                  <form noValidate onSubmit={this.onSubmit}>
                    <FormInput
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                      error={errors.name}
                    />
                    <FormInput
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      error={errors.email}
                      info="Gravatar feature is enabled as profile image, use a
                        Gravatar email"
                    />
                    <FormInput
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      error={errors.password}
                    />
                    <FormInput
                      type="password"
                      placeholder="Confirm Password"
                      name="password2"
                      value={this.state.password2}
                      onChange={this.onChange}
                      error={errors.password2}
                    />
                    <input
                      type="submit"
                      className="btn btn-info btn-block mt-4 mb-5"
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

export default connect(mapStateToProps, { registerUser })(Register);
