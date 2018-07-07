import React from 'react';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import Helmet from 'react-helmet';

import Layout from '../components/core/Layout';
import LoginForm from '../components/LoginForm';

const currentUserQuery = gql`
  {
    user @client {
      email
      firstName
      lastName
    }
  }
`;

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      jwt
      user {
        id
        email
        profile {
          firstName
          lastName
        }
      }
    }
  }
`;

class Login extends React.Component {
  handleOnCompleted = () => {
    // TODO: show success alert
    // TODO: redirect to dashboard
  };

  handleUpdate = (cache, { data: { login } }) => {
    console.log('login result', login);
    // set token to local storage
    localStorage.setItem('token', login.jwt);

    // TODO: add current user to local state
    cache.writeData({
      data: {
        user: {
          __typename: 'User',
          id: login.user.id,
          email: login.user.email,
          firstName: login.user.profile.firstName,
          lastName: login.user.profile.lastName,
        },
      },
    });
  };

  render() {
    return (
      <Layout type="slim">
        <Helmet title="Login" />
        <Mutation
          mutation={loginMutation}
          // variables={{ email: 'admin@admin.com', password: 'admin12' }}
          update={this.handleUpdate}
          onCompleted={this.handleOnCompleted}
        >
          {(login, { data, loading, error }) => (
            <div>
              <LoginForm submit={input => login({ variables: input })} />
              {data && <p>Login successfully!{console.log(data)}</p>}
              {loading && <p>Loading...</p>}
              {error && <p>Error :( Please try again</p>}
            </div>
          )}
        </Mutation>
        <Query query={currentUserQuery}>
          {({ data }) => {
            console.log('user q', data);
            if (!data) {
              return null;
            }
            return <div>user {data.user && data.user.firstName}</div>;
          }}
        </Query>
      </Layout>
    );
  }
}

export default Login;
