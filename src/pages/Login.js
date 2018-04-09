import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import LoginForm from '../components/LoginForm';
// import Helmet from 'react-helmet';

const loginMutation = gql`
 mutation($email: String!, $password: String! ){
  login(input:{ email:$email, password:$password }){
      JwtUser{
        jwt
      }
    }
  }
`;

const Login = ()=>(
  <Mutation mutation={loginMutation}>
    {(login, { data }) => (
      <LoginForm submit={e=>{
        e.preventDefault();
        login({ variables: { } });
        
      }}
      />
  )}
  </Mutation>
);
export default Login;