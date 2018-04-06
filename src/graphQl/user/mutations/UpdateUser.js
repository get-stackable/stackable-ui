import gql from 'graphql-tag';

export default gql(`
mutation(
  $id:ID!
  $email: String,
  $password: String,
  $firstName: String,
  $lastName: String 
){
  updateMe(
    id:$id
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