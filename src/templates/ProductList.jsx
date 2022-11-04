import { Grid } from "@mui/material"
import { graphql } from "gatsby"
import React from "react"
import DynamicToolbar from "../components/product-list/DynamicToolbar"
import Layout from "../components/ui/layout"

const ProductList = ({
  pageContext: { filterOptions, name, description },
  data,
}) => {
  return (
    <Layout>
      <Grid container direction="column" alignItems="center">
        <DynamicToolbar
          filterOptions={filterOptions}
          name={name}
          description={description}
        />
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query GetCategoryProducts($id: Int!) {
    allStrapiProduct(filter: { category: { strapi_id: { eq: $id } } }) {
      edges {
        node {
          strapi_id
          name
          variants {
            color
            id
            size
            price
            style
            images {
              url
            }
          }
        }
      }
    }
  }
`

export default ProductList
