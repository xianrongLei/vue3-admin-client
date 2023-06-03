import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
/**
 * 登录
 * @param variables
 * @returns
 */
export const useUserInfoApi = (variables: Record<string, unknown>) =>
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
/**
 * 根据用户id获取菜单
 * @param variables
 * @returns
 */
export const useUserMenuApi = (variables: Record<string, unknown>) =>
  useMutation(
    gql`
      query MenusByUserId($userId: ID!) {
        menusByUserId(userId: $userId) {
          id
          createdAt
          updatedAt
          creator
          updater
          sort
          state
          name
          description
          route
          icon
          title
          type
          componentUrl
          outside
          parentId
        }
      }
    `,
    () => ({
      variables
    })
  );
