import React from 'react';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import Helmet from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import alertfy from 'alertify.js';

import Layout from '../components/core/Layout';
import LoginForm from '../components/core/LoginForm';

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
    alertfy.success('Login Successfully');
    setTimeout(() => this.props.history.push('/'), 500);
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
    const { location, history } = this.props;
    return (
      <Layout type="slim" url={location.pathname}>
        <Helmet title="Login" />
        <div className="ui middle aligned center aligned grid blank-layout">
          <div className="column">
            <h2 className="ui header" style={{ fontWeight: '400' }}>
              Any Content <strong>Anywhere</strong>
            </h2>
            <h2 className="ui sub header" style={{ fontWeight: '400' }}>
              CMS WITH NO HEADACHES
            </h2>
            <div className="ui divider" />
            <div className="at-pwd-form">
              <div className="ui large header">
                <img className="logo" src="/images/logo.png" alt="logo" />
                &nbsp; stackable
                <div className="sub header">API DRIVEN CONTENT</div>
              </div>
            </div>
            <Mutation
              mutation={loginMutation}
              // variables={{ email: 'admin@admin.com', password: 'admin12' }}
              update={this.handleUpdate}
              onCompleted={this.handleOnCompleted}
            >
              {(login, { loading, error }) => (
                <div>
                  <LoginForm
                    submit={input => login({ variables: input })}
                    loading={loading}
                  />
                  {error && <p>Error :( Please try again</p>}
                </div>
              )}
            </Mutation>
            <div className="at-sep ui horizontal divider">OR</div>
            <div className="at-oauth">
              <button
                className="at-social-btn ui fluid labeled icon google plus large button"
                id="at-google"
                name="google"
              >
                <i className="google plus icon" /> Sign In with Google
              </button>
            </div>
            <div className="at-signup-link at-wrap">
              <br />
              <p>
                Don't have an account?
                <Link
                  className="at-link at-signup"
                  to={{ pathname: '/register' }}
                >
                  &nbsp; Register
                </Link>
              </p>
            </div>
          </div>
        </div>

        <Query query={currentUserQuery}>
          {({ data }) => {
            console.log('user q', data);
            if (!data) {
              return null;
            }
            return <div> {data.user && data.user.firstName}</div>;
          }}
        </Query>
      </Layout>
    );
  }
}

export default Login;
