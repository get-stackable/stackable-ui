import React from 'react';
import classNames from 'classnames';
// import Helmet from 'react-helmet';

// import Loading from '../components/Loading';
import Layout from '../components/core/Layout';
import PageHeading from '../components/core/PageHeading';
import AppCardEmpty from '../components/app/AppCardEmpty';
import CreateAppModal from '../components/app/CreateAppModal';
import AppCard from '../components/app/AppCard';

class Dashboard extends React.Component {
  render() {
    return (
      <Layout>
        <PageHeading>Dashboard</PageHeading>
        {/* <UserStats user={this.data.user} /> */}
        <div className="ui grid padding35">
          <div className="sixteen wide column">
            <h3>My Stacks</h3>
            <div
              className={classNames('ui cards', {
                'centered aligned': 'this.data.apps.length === 0',
              })}
            >
              {/* {this.data.apps.map((app) => (
                  <AppCard key={app._id} app={app} />
                              ))}
                <AppCardEmpty /> */}
              <AppCard />
              <AppCardEmpty />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Dashboard;
