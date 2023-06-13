import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
/**
 * 登录
 * @param variables
 * @returns
 */
export const useSignInApi = (variables: Record<string, unknown>): ReturnType<typeof useMutation> =>
  useMutation(
    gql`
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
    `,
    () => ({
      variables
    })
  );

/**
 * 验证码
 * @param variables
 * @returns
 */
export const useCaptchaApi = (variables: Record<string, unknown>): ReturnType<typeof useMutation> =>
  useMutation(
    gql`
      mutation Captcha($createCaptchaInput: CreateCaptchaInput!) {
        captcha(createCaptchaInput: $createCaptchaInput) {
          time
          uniCode
          svg
        }
      }
    `,
    () => ({
      variables
    })
  );
