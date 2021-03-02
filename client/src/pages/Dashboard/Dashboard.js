import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import DashboardDisplay from '../../components/DashboardComponennts/DashboardDisplay';
import Spinner from '../../components/Spinner/Spinner';
import { getCurrentProfile } from '../../redux/actions/profileActions';
import { currentProfile } from '../../redux/selectors/profileSelector';

class Dashboard extends Component {
  async componentDidMount() {
    await this.props.getCurrentProfile();
  }
  render() {
    return (
      <div className="dashboard">
        <Route
          exact
          path="/dashboard"
          component={this.props.profile ? DashboardDisplay : Spinner}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  profile: currentProfile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
