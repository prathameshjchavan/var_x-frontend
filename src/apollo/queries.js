import { gql } from "@apollo/client"

export const GET_DETAILS = gql`
  query getDetails($id: ID!) {
    product(id: $id) {
      data {
        attributes {
          variants {
            data {
              id
              attributes {
                quantity
              }
            }
          }
          rating
        }
      }
    }
  }
`

export const GET_REVIEWS = gql`
  query getReviews($id: ID!) {
    product(id: $id) {
      data {
        attributes {
          reviews {
            data {
              id
              attributes {
                text
                rating
                updatedAt
                user {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
