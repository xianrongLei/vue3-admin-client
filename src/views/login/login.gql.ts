import gql from "graphql-tag";

export const signInGql = gql`
  mutation SignIn($signInInput: SignInInput!) {
    signIn(signInInput: $signInInput) {
      user {
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
