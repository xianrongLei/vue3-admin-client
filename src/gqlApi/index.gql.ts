import gql from "graphql-tag";

export const MenuFields = gql`
  fragment MenuFields on Menu {
    id
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
    parentId
    isCache
    isHidden
  }
`;
