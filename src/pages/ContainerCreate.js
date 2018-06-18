import React from 'react';

import Layout from '../components/core/Layout';
import ContainerUpdate from '../components/container/ContainerUpdate';

class ContainerCreate extends React.Component {
  render() {
    return (
      <Layout>
        <ContainerUpdate location={this.props.location} />
      </Layout>
    );
  }
}

export default ContainerCreate;
