import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_FAVORITES = gql`
  query getAssets {
    assets {
      _id
      name
      permalink
      image_url
      assetUser
      createdAt
      openSeaId
    }
  }
`;
