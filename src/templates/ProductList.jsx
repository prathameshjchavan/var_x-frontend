import { Grid } from "@mui/material"
import React from "react"
import DynamicToolbar from "../components/product-list/DynamicToolbar"
import Layout from "../components/ui/layout"

const ProductList = ({ pageContext }) => {
  return (
    <Layout>
      <Grid container direction="column" alignItems="center">
        <DynamicToolbar filterOptions={pageContext.filterOptions} />
      </Grid>
    </Layout>
  )
}

export default ProductList
