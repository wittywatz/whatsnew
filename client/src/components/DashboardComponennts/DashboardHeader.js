import React from 'react';
import { Link } from 'react-router-dom';

const DashboardHeader = ({ profile, currentUser }) => {
  return (
    <div>
      <p className="lead text-muted">
        Welcome{' '}
        <Link to={`/profile/${profile.handle}`}>{currentUser.name}</Link>
      </p>
      <div className="d-flex justify-content-end">
        <div className="btn-group mb-4" role="group">
          <Link to="/create_profile" className="btn btn-light">
            <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
          </Link>
          <Link to="/add_experience" className="btn btn-light">
            <i className="fab fa-black-tie text-info mr-1" />
            Add Experience
          </Link>
          <Link to="/add_education" className="btn btn-light">
            <i className="fas fa-graduation-cap text-info mr-1" />
            Add Education
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
