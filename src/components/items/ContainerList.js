import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

const containersQuery = gql`
  query($appId: ID!) {
    allContainers(appId: $appId) {
      id
      name
      isSingleItem
    }
  }
`;

class ContainerList extends React.Component {
  render() {
    const { containerId, appId } = this.props;
    return (
      <Query query={containersQuery} variables={{ appId }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :</p>;
          return (
            <React.Fragment>
              {data.allContainers.map(container => (
                <Link
                  className={`item ${containerId === container.id && 'active'}`}
                  // onClick={() => this.setState({ containerId: container.id })}
                  to={{
                    pathname: `/stack/${appId}/container/${
                      container.id
                    }/item/create`,
                  }}
                  key={container.id}
                >
                  <i className="circle icon" />
                  <div className="content">{container.name}</div>
                </Link>
              ))}
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default ContainerList;
