import React from 'react';

import Layout from '../components/core/Layout';
import ContainerUpdate from '../components/container/ContainerUpdate';

class ContainerCreate extends React.Component {
  render() {
    const { location, match } = this.props;

    return (
      <Layout>
        <ContainerUpdate url={location.pathname} id={match.params.id} />
      </Layout>
    );
  }
}

export default ContainerCreate;
