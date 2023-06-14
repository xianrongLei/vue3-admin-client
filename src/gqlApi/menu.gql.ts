import { UseQueryReturn, useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { MenuConnection, QueryMenuInput } from "@/types/gql.types";
import { MenuFields } from "./index.gql";
/**
 * 分页查询菜单列表
 * @param variables
 * @returns
 */
export const useMenusApi = (variables: {
  queryMenuInput: QueryMenuInput;
}): UseQueryReturn<
  { menus: MenuConnection },
  {
    queryMenuInput: QueryMenuInput;
  }
> =>
  useQuery(
    gql`
      ${MenuFields}
      query Menus($queryMenuInput: QueryMenuInput) {
        menus(queryMenuInput: $queryMenuInput) {
          edges {
            cursor
            node {
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
    () => variables
  );
