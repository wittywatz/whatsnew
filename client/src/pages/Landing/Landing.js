import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Typical from 'react-typical';

export class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container mt-5">
            <div className="row mt-5">
              <div className="col-md-12 mt-5 text-center">
                <h1 className="display-4 mt-5 mb-4">
                  <span style={{ color: '#42f55d' }}>Hey!</span> what's new in
                  the community 💻
                </h1>
                <h3 className="lead mt-4">
                  Here's an opportunity to interact with like minds and share
                  your thoughts on programming challenges.
                </h3>
                <h3 style={{ color: '#42f55d' }} className="lead mt-4">
                  <Typical
                    loop={Infinity}
                    wrapper="b"
                    steps={[
                      "You'd learn to code.",
                      1000,
                      "You'd meet interesting and like minded individuals.",
                      1000,
                      'Sign Up today',
                      1000,
                      "Let's code and have some fun 😉",
                      1000,
                    ]}
                  />
                </h3>
                <hr />
                <Link to="/register" className="btn btn-lg btn-primary mr-3">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
