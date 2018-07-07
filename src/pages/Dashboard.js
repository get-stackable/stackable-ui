import React from 'react';
import classNames from 'classnames';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

// import Loading from '../components/Loading';
import Layout from '../components/core/Layout';
import PageHeading from '../components/core/PageHeading';
import AppCardEmpty from '../components/app/AppCardEmpty';
import CreateAppModal from '../components/app/CreateAppModal';
import AppCardList from '../components/app/AppCardList';

const stackQuery = gql`
  {
    stack @client {
      modelVisible
    }
  }
`;

class Dashboard extends React.Component {
  render() {
    const { history } = this.props;

    return (
      <Layout>
        <Query query={stackQuery}>
          {({ data, client }) => (
            <React.Fragment>
              <PageHeading>Dashboard</PageHeading>
              {/* <UserStats user={this.data.user} /> */}
              <div className="ui grid padding35">
                <div className="sixteen wide column">
                  <h3>My Stacks</h3>
                  <div
                    className={classNames('ui cards', {
                      '': 'this.data.apps.length === 0',
                    })}
                  >
                    <AppCardList />
                    <AppCardEmpty />
                  </div>
                </div>
              </div>
              <CreateAppModal data={data} history={history} />
            </React.Fragment>
          )}
        </Query>
      </Layout>
    );
  }
}

export default Dashboard;
