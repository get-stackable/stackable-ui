import React from 'react';
import { ApolloConsumer } from 'react-apollo';
// import PropTypes from 'prop-types';

class AppCardEmpty extends React.Component {
  showCreateModal(client) {
    client.writeData({
      data: {
        stack: { __typename: 'Stack', modelVisible: true },
      },
    });
  }

  render() {
    return (
      <div className="card">
        <div className="content" style={{ textAlign: 'center' }}>
          <div className="header" style={{ margin: '10px 0' }}>
            <img src="/images/grey-stack.png" alt="grey-stack" />
            <br />
            empty :(
          </div>
          <ApolloConsumer>
            {client => (
              <a
                className="meta"
                style={{ textDecoration: 'underline' }}
                onClick={() => this.showCreateModal(client)}
              >
                + create new stack
              </a>
            )}
          </ApolloConsumer>
        </div>
      </div>
    );
  }
}

export default AppCardEmpty;
