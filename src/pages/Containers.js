import React from 'react';
import { Link } from 'react-router-dom';

import Layout from '../components/core/Layout';
import SearchContainersForm from '../components/container/SearchContainersForm';
import ContainersList from '../components/container/ContainersList';

class Containers extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <Layout>
        <div className="ui grid full-height" style={{ marginLeft: '0' }}>
          <div className="two wide column side-sub-menu">
            <div className="ui left vertical menu">
              <h3 className="ui header item">
                {/* {this.data.app.name}'s */}
                Containers
              </h3>
              <Link
                to={{ pathname: `/container/create/${match.params.id}` }}
                className="ui orange button item"
              >
                + create container
              </Link>
              <div className="item" />
            </div>
          </div>
          <div className="fourteen wide column" style={{ paddingLeft: '0' }}>
            <div className="content-wrapper">
              <div className="ui grid">
                <div className="sixteen wide column">
                  <SearchContainersForm />
                </div>
                <div className="sixteen wide column padding35">
                  <ContainersList id={match.params.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
export default Containers;
