import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import isEmpty from '../../utils/validation/isEmpty';
import { currentProfile } from '../../redux/selectors/profileSelector';
import { currentUser } from '../../redux/selectors/userSelector';
import DashboardHeader from './DashboardHeader';

const DashboardDisplay = ({ currentUser, currentProfile }) => {
  const dashboardContent = () => {
    if (isEmpty(currentProfile)) {
      return (
        <div>
          <p className="lead text-muted">Welcome {currentUser.name}</p>
          <p>
            You have not yet setup a profile, please click on the button below
            to add some information to help us know you better and serve you
            best.
          </p>
          <Link to="/create_profile" className="btn btn-lg btn-info">
            Create Profile
          </Link>
        </div>
      );
    }
    return (
      <div>
        <DashboardHeader profile={currentProfile} currentUser={currentUser} />
      </div>
    );
  };

  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4">Dashboard</h1>
            {dashboardContent()}
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser,
  currentProfile,
});

export default connect(mapStateToProps)(DashboardDisplay);
