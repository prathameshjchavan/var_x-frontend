import { Grid } from "@mui/material"
import React from "react"
import DynamicToolbar from "../components/product-list/DynamicToolbar"
import Layout from "../components/ui/layout"

const ProductList = ({ pageContext: { filterOptions, name, description } }) => {
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

export default ProductList
