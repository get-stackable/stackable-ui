import React from 'react';
// import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { lowerCase } from 'lodash';

// import StackableApi from '../../utils/StackableApi';

const containersQuery = gql`
  query($appId: ID!) {
    allContainers(appId: $appId) {
      id
      name
    }
  }
`;

class ContainersList extends React.Component {
  //  PropTypes = {
  //       containers: PropTypes.array.isRequired,
  //       app: PropTypes.object.isRequired
  //   };
  // TODO:
  //   componentDidMount() {
  //       if (this.props.containers.length === 0) {
  //           FlowRouter.go('appView', {id: this.props.app._id});
  //       }
  //   }

  render() {
    const { id } = this.props;
    return (
      <Query query={containersQuery} variables={{ appId: id }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :</p>;

          return (
            <div className="ui cards">
              {data.allContainers.map(container => (
                // TODO:
                // let containerName = container.isSingleItem ? container.name : pluralize(container.name);

                <div className="card" key={container.id}>
                  <div className="content">
                    <div className="header">{container.name}</div>
                    <div className="meta">Container ID: {container.id}</div>
                  </div>
                  <div className="extra content">
                    <div className="ui two buttons">
                      <a
                        className="ui basic green button"
                        // href={StackableApi.getContainerItems(
                        //   this.props.app.publicKey,
                        //   container.id,
                        // )}
                        target="_blank"
                        title="Get container items API URL"
                        style={{ fontSize: '0.77rem', padding: '10px 5px' }}
                      >
                        <i className="share icon" />
                        API URL
                      </a>
                      <Link
                        to={{
                          pathname: `/stack/${id}/container/${
                            container.id
                          }/update`,
                        }}
                        className="ui basic red button"
                        style={{ fontSize: '0.77rem', padding: '10px 5px' }}
                      >
                        <i className="settings icon" />
                        manage container
                      </Link>
                    </div>
                  </div>
                  <Link
                    className="ui primary bottom attached button"
                    to={{
                      pathname: `/stack/${id}/container/${container.id}/items`,
                    }}
                  >
                    <i className="add icon" />
                    <span>
                      add manage {`${lowerCase(container.name)}`} items
                    </span>
                    {/* {container.isSingleItem ? (
                <span>
                  manage
                  {pluralize(containerName.toLowerCase(), 1)}
                  item
                </span>
              ) : (
                <span>
                  add & manage
                  {pluralize(containerName.toLowerCase(), 1)}
                  items
                </span>
              )} */}
                  </Link>
                </div>
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ContainersList;
