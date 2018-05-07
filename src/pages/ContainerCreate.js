import React from 'react';

import Layout from '../components/core/Layout';
import ContainerUpdateForm from '../components/container/ContainerUpdateForm';

class ContainerCreate extends React.Component {
  render() {
    return (
      <Layout>
        <ContainerUpdateForm />
      </Layout>
    );
  }
}

export default ContainerCreate;
