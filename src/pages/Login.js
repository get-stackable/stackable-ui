import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import LoginForm from '../components/LoginForm';
// import Helmet from 'react-helmet';

const loginMutation = gql`
 mutation($email: String!, $password: String! ){
  login(input:{ email:$email, password:$password }){
        jwt
    }
  }
`;

class Login extends React.Component {
  
  render(){
    console.log(this.props);
    return(
      <Mutation mutation={loginMutation}>
        {(login, {data, loading, error}) => (
          <div>
            <LoginForm submit={(input)=>{
         login({ variables: input });
        }}
            />
            {data && <p>Car created successfully!{console.log(data)}</p>}
            {loading && <p>Loading...</p>}
            {error && <p>Error :( Please try again</p>}
            {localStorage.setItem('token', login.jwt)}
          </div>
    )}
      </Mutation>
    );
  }
}

export default Login;