import gql from "graphql-tag";

export const getUserInfoGql = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      id
      createdAt
      updatedAt
      creator
      updater
      username
      password
      email
      nickname
      phone
      age
      sex
      admin
      avatar
      sort
      state
      roleId
      creatorName
      updaterName
    }
  }
`;
