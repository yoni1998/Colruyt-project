import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    hello: String
    getPerson(id: String!): Person
    getAllPersons: [Persons]
  }

  type Mutation {
    removeUser(id: ID!): Persons
    createUser(input: PersonsInput): Person
    updateUser(id: ID!, input: PersonsInput): Person
  }

  type Person {
    DATA: User
  }

  input PersonsInput {
    email: String
  }

  input NameInput {
    first_name: String
    middle_name: String
    last_name: String
  }

  type Persons {
    _id: ID
    email: String
    gender: String
    phone_number: String
    name: Name
  }

  type Name {
    first_name: String
    middle_name: String
    last_name: String
  }

  type User {
    email: String
  }
`;
