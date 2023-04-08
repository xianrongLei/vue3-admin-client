import gql from "graphql-tag";

export const signinGql = gql`
  mutation Signin($createAuthInput: CreateAuthInput!) {
    signin(createAuthInput: $createAuthInput) {
      user {
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
      access_token
      refresh_token
    }
  }
`;

export const captchaGql = gql`
  mutation Captcha($createCaptchaInput: CreateCaptchaInput!) {
    captcha(createCaptchaInput: $createCaptchaInput) {
      time
      uniCode
      svg
    }
  }
`;
