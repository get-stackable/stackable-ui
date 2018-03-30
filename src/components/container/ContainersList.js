import React from 'react';
import PropTypes from 'prop-types'
import {pluralize, humanize} from 'underscore.string';
import { Link } from 'react-router-dom';

import StackableApi from '../../utils/StackableApi';

class ContainersList extends React.Component {

 PropTypes = {
      containers: PropTypes.array.isRequired,
      app: PropTypes.object.isRequired
  };
// TODO:
//   componentDidMount() {
//       if (this.props.containers.length === 0) {
//           FlowRouter.go('appView', {id: this.props.app._id});
//       }
//   }

  render() {
      return (
        <div className="ui cards">
          {this.props.containers.map((container) => {
                  const containerName = container.isSingleItem ? container.name : pluralize(container.name);

                  return (
                    <div className="card" key={container.id}>
                      <div className="content">
                        <div className="header">
                          {humanize(containerName)}
                        </div>
                        <div className="meta">
                                  Container ID: {container.id}
                        </div>
                      </div>
                      <div className="extra content">
                        <div className="ui two buttons">
                          <a
                            className="ui basic green button"
                            href={StackableApi.getContainerItems(this.props.app.publicKey, container.id)}
                            target="_blank"
                            title="Get container items API URL"
                            style={{'fontSize': '0.77rem', 'padding': '10px 5px'}}
                          >
                            <i className="share icon" />
                                      API URL
                          </a>
                          <Link
                            to={{
                                pathname: 'containerUpdate',
                                state: { id: container.id} 
                                }}
                            className="ui basic red button"
                            style={{'fontSize': '0.77rem', 'padding': '10px 5px'}}
                          >
                            <i className="settings icon" />
                                      manage container
                          </Link>
                        </div>
                      </div>
                      <Link
                        className="ui primary bottom attached button"
                        to={{
                            pathname: 'itemContainerView',
                            state: { containerId: container.id }
                            }}
                      >
                        <i className="add icon" />
                        {container.isSingleItem ? <span>manage {pluralize(containerName.toLowerCase(), 1)} item</span> : <span>add & manage {pluralize(containerName.toLowerCase(), 1)} items</span>}
                      </Link>
                    </div>
                  )
              })}
        </div>
      )
  }
};

export default ContainersList;