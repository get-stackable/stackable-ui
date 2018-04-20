import React from 'react';
import classNames from 'classnames';
// import Helmet from 'react-helmet';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

// import Loading from '../components/Loading';
import Layout from '../components/core/Layout';
import PageHeading from '../components/core/PageHeading';

const homePageQuery = gql`
  {
    allApplications{
    id
    name
  }
  }
`;

class HomePage extends React.Component {
  // getMeteorData() {
  //     return {
  //         apps: Application.find({}, {sort: {createdAt: -1}}).fetch(),
  //         user: Meteor.user()
  //     };
  // }

  // componentDidMount() {
  //     Session.set('active.app', {});
  // }

  render() {
    return (
      <Layout>
        <Query query={homePageQuery}>
          {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :({error}</p>;

          return (
            <div>
              <PageHeading>
                  Dashboard
              </PageHeading>
              {/* <UserStats user={this.data.user} /> */}
              <div className="ui grid padding35">
                <div className="sixteen wide column">
                  <h3>My Stacks</h3>
                  <div className={classNames('ui cards', { 'centered aligned': 'this.data.apps.length === 0' })}>
                    {/* {this.data.apps.map((app) => (
                  <AppCard key={app._id} app={app} />
                              ))}
                <AppCardEmpty /> */}
                  </div>
                </div>
              </div>
            </div>
          );
        }}
        </Query>
      </Layout>
    );
  }
}

export default HomePage;
