import { Grid } from "@mui/material"
import { graphql } from "gatsby"
import React, { useState } from "react"
import DynamicToolbar from "../components/product-list/DynamicToolbar"
import ListOfProducts from "../components/product-list/ListOfProducts"
import Layout from "../components/ui/layout"

const ProductList = ({
  pageContext: { filterOptions, name, description },
  data: {
    allStrapiProduct: { edges: products },
  },
}) => {
  const [layout, setLayout] = useState("grid")

  return (
    <Layout>
      <Grid container direction="column" alignItems="center">
        <DynamicToolbar
          filterOptions={filterOptions}
          name={name}
          description={description}
          layout={layout}
          setLayout={setLayout}
        />
        <ListOfProducts products={products} layout={layout} />
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
