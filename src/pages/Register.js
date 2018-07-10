import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import alertfy from 'alertify.js';

import Layout from '../components/core/Layout';
import RegisterForm from '../components/core/RegisterForm';

// const currentUserQuery = gql`
//   {
//     user @client {
//       email
//       firstName
//       lastName
//     }
//   }
// `;

const registerMutation = gql`
  mutation(
    $firstName: String
    $lastName: String
    $email: String!
    $password: String!
  ) {
    register(
      input: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
      }
    ) {
      jwt
      user {
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
    setTimeout(() => this.props.history.push('/login'), 500);
  };

  // handleUpdate = (cache, { data: { register } }) => {
  //   localStorage.setItem('token', register.jwt);

  //   cache.writeData({
  //     data: {
  //       user: {
  //         __typename: 'User',
  //         id: register.user.id,
  //         email: register.user.email,
  //         firstName: register.user.profile.firstName,
  //         lastName: register.user.profile.lastName,
  //       },
  //     },
  //   });
  // };

  render() {
    const { location } = this.props;
    return (
      <Layout type="slim" url={location.pathname}>
        <Helmet title="Login" />
        <div className="ui middle aligned center aligned grid blank-layout">
          <div className="column">
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
              mutation={registerMutation}
              // update={this.handleUpdate}
              // onCompleted={this.handleOnCompleted}
              onError={error => alertfy.error(error.message)}
            >
              {(register, { loading, error }) => (
                <div>
                  <RegisterForm
                    submit={input => register({ variables: input })}
                  />
                  {loading && <p>Loading...</p>}
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
                <i className="google plus icon" /> Register with Google
              </button>
            </div>
            <div className="at-signup-link at-wrap">
              <br />
              <p>
                <Link className="at-link at-signup" to={{ pathname: '/' }}>
                  By clicking Register, you agree to our Privacy Policy and
                  Terms of Use
                </Link>
              </p>
              <p>
                If you already have an account?
                <Link className="at-link at-signup" to={{ pathname: '/login' }}>
                  &nbsp; sign in
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* <Query query={currentUserQuery}>
          {({ data }) => {
            console.log('user q', data);
            if (!data) {
              return null;
            }
            return <div>user {data.user && data.user.firstName}</div>;
          }}
        </Query> */}
      </Layout>
    );
  }
}

export default Login;
