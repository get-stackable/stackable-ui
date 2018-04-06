import gql from 'graphql-tag';

export default gql(`
mutation(
  $email: String!,
  $password: String!
  $firstName: String,
  $lastName: String 
){
  register(
    input:{
      email:$email,
      password:$password,
      firstName:$firstName,
      lastName:$lastName,
    }
){
  JwtUser{
    jwt
  }
  }
}
`);