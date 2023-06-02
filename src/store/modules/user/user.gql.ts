import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
/**
 * 登录
 * @param variables
 * @returns
 */
export const useUserInfoApi = (variables: Record<string, unknown>): ReturnType<typeof useMutation> =>
  useMutation(
    gql`
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
    `,
    () => ({
      variables
    })
  );
