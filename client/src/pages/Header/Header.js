import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from './logo.png';
import './Header.css';
import { createStructuredSelector } from 'reselect';
import { currentUser } from '../../redux/selectors/userSelector';
import { logoutUser } from '../../redux/actions';
import { clearCurrentProfile } from '../../redux/actions/profileActions';

const Header = ({ currentUser, logoutUser, clearCurrentProfile }) => {
  const renderContent = () => {
    const handleLogout = () => {
      clearCurrentProfile();
      logoutUser();
    };
    if (!currentUser) {
      return (
        <React.Fragment>
          <li className=" nav-item ml-3 ">
            <Link
              to="/register"
              style={{ color: '#42f55d', textDecoration: 'none' }}
            >
              Sign Up
            </Link>
          </li>
          <li className="nav-item ml-3">
            <Link
              to="/login"
              style={{ color: '#42f55d', textDecoration: 'none' }}
            >
              Login
            </Link>
          </li>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <li onClick={handleLogout} className="navContent ml-3 ">
          <Link to="/" style={{ color: '#42f55d', textDecoration: 'none' }}>
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              width="30"
              height="24"
              className="mr-2 rounded-circle"
            />
            Logout
          </Link>
        </li>
      </React.Fragment>
    );
  };
  // console.log(currentUser);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top mb-4">
      <div className="container-fluid">
        <Link to="/" style={{ color: '#42f55d', textDecoration: 'none' }}>
          <img src={logo} alt="Whats new" width="30" height="24" />
          <span
            className="grow ml-2 navContent"
            style={{ color: '#42f55d', textDecoration: 'none' }}
          >
            WhatsNew
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon "></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mb-lg-0">{renderContent()}</ul>
        </div>
      </div>
    </nav>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser,
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Header
);
