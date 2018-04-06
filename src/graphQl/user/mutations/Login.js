import gql from 'graphql-tag';

export default gql(`
mutation(
  $email: String!,
  $password: String!
){
  login(
    input:{
      email:$email,
      password:$password
    }
){
  JwtUser{
    jwt
  }
  }
}
`);
