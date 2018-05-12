import React from 'react';
import PropTypes from 'prop-types';
import superplaceholder from 'superplaceholder';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const createContainerMutation = gql`
  mutation createContainer($appId: ID!, $name: String!) {
    createContainer(appId: $appId, input: { name: $name }) {
      id
      name
    }
  }
`;

class BigTitleInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  componentDidMount() {
    superplaceholder({
      el: document.getElementById('name'),
      sentences: ['type container name here', 'eg: Blog, Cars, Projects'],
      options: {
        startOnFocus: false,
      },
    });
  }

  handleSubmit(createApplication) {}

  render() {
    return (
      <div className="inline fields">
        <div className="sixteen wide field">
          <input
            {...this.props}
            type="text"
            id="name"
            placeholder="type container name here"
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
            // onBlur={this.handleSubmit(createContainer)}
            // onBlur={() => {
            //   createContainer({
            //     variables: {
            //       appId: '5ae456acde474d490108aab8',
            //       input: { name: this.state.name },
            //     },
            //   });
            // }}
            style={{
              width: '70%',
              fontSize: '2.5em',
              padding: '0em',
              border: '0',
            }}
          />
        </div>
      </div>
    );
  }
}

export default BigTitleInput;
