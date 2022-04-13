import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_FAVORITE = gql`
  mutation addFavorite(
    $name: String!,
    $permalink: String!,
    $image_url: String!,
    $assetUser: String!,
    $openSeaId: String!) {
    addFavorite(
      name: $name,
      permalink: $permalink,
      image_url: $image_url,
      assetUser: $assetUser
      openSeaId: $openSeaId) {
        _id
        name
        permalink
        createdAt
        image_url
        assetUser
        openSeaId
    }
  }
`;

export const REMOVE_FAVORITE = gql`
  mutation removeFavorite($assetUser: String!, $openSeaId: String!) {
    removeFavorite(assetUser: $assetUser, openSeaId: $openSeaId) {
        _id
        assetUser
        openSeaId
    }
  }
`;
