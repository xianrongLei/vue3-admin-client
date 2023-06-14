import { UseMutationReturn, useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { Menu, QueryMenusByUserIdInput, User } from "../types/gql.types";
import { MenuFields } from "./index.gql";
/**
 * 登录
 * @param variables
 * @returns
 */
export const useUserInfoApi = (variables: { userId: string }): UseMutationReturn<{ user: User }, { userId: string }> =>
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
export const useUserMenuApi = (variables: {
  queryMenusByUserIdInput: QueryMenusByUserIdInput;
}): UseMutationReturn<
  { menusByUserId: Menu[] },
  {
    queryMenusByUserIdInput: QueryMenusByUserIdInput;
  }
> =>
  useMutation(
    gql`
      ${MenuFields}
      query MenusByUserId($queryMenusByUserIdInput: QueryMenusByUserIdInput) {
        menusByUserId(queryMenusByUserIdInput: $queryMenusByUserIdInput) {
          ...MenuFields
          children {
            ...MenuFields
            children {
              ...MenuFields
              children {
                ...MenuFields
                children {
                  ...MenuFields
                  children {
                    ...MenuFields
                    children {
                      ...MenuFields
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    () => ({
      variables
    })
  );
