import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Layout from '../components/core/Layout';
import ItemUpdate from '../components/items/ItemUpdate';
import ContainerList from '../components/items/ContainerList';
import ItemList from '../components/items/ItemList';

const itemsQuery = gql`
  query($containerId: ID!, $appId: ID!) {
    allItems(containerId: $containerId, appId: $appId) {
      id
      data
      publishedAt
    }
  }
`;

class ItemCreate extends React.Component {
  render() {
    const { match, location, history } = this.props;
    return (
      <Layout url={location.pathname} appId={match.params.appId}>
        <div
          className="ui grid full-height item-edit"
          style={{ marginLeft: '0' }}
        >
          <div className="two wide column containers-list">
            <button
              className="fluid ui green button"
              style={{
                lineHeight: '26px',
                padding: '0.4em 0.2em',
                textAlign: 'left',
              }}
            >
              <img
                src="/images/stack-icon.png"
                alt="stack-icon"
                style={{ width: '25px', height: 'auto', float: 'left' }}
              />
              {/* {titleize(this.props.app.name)} */} Stack Name
            </button>
            <div className="ui link list" style={{ marginTop: '30px' }}>
              <ContainerList
                appId={match.params.appId}
                containerId={match.params.containerId}
              />
            </div>
          </div>
          <Query
            query={itemsQuery}
            variables={{
              containerId: match.params.containerId,
              appId: match.params.appId,
            }}
          >
            {({ loading, error, data }) => {
              if (loading) return 'loadin';
              if (error) return 'error';
              const items = data.allItems;
              return (
                <React.Fragment>
                  <ItemList
                    appId={match.params.appId}
                    containerId={match.params.containerId}
                    items={items}
                  />
                  <ItemUpdate
                    ids={match.params}
                    url={location.pathname}
                    history={history}
                    allItems={data.allItems}
                    itemsQuery={itemsQuery}
                  />
                </React.Fragment>
              );
            }}
          </Query>
        </div>
      </Layout>
    );
  }
}

export default ItemCreate;

// container={this.data.container}
// allItems={this.data.allItems}
// allContainers={this.data.allContainers}
// isContainerView={isUndefined(this.props.isView)}
// app={this.data.app}
// handleSubmit={this.handleSubmit}
