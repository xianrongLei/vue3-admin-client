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
      query Menus($queryMenuInput: QueryMenuInput) {
        menus(queryMenuInput: $queryMenuInput) {
          edges {
            cursor
            node {
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
              component
              outside
              isHidden
              isCache
              parentId
            }
          }
          pageInfo {
            startCursor
            hasNextPage
            endCursor
            hasPreviousPage
          }
          totalCount
        }
      }
    `,
    () => ({
      variables
    })
  );
