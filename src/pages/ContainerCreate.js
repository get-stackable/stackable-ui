import React from 'react';

import Layout from '../components/core/Layout';
import ContainerUpdate from '../components/container/ContainerUpdate';

class ContainerCreate extends React.Component {
  render() {
    const { location, match, history } = this.props;

    return (
      <Layout
        url={location.pathname}
        appId={match.params.appId}
        history={history}
      >
        <ContainerUpdate
          url={location.pathname}
          ids={match.params}
          history={history}
        />
      </Layout>
    );
  }
}

export default ContainerCreate;
