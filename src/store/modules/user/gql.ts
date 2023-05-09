import gql from "graphql-tag";

export const getUserInfoGql = gql`
  query Query($userId: ID!) {
    user(id: $userId) {
      id
      createdAt
      updatedAt
      creator
      updater
      username
      password
      nickname
      email
      phone
      sex
      age
      admin
      avatar
      organId
      posts
      roles
      state
    }
  }
`;
