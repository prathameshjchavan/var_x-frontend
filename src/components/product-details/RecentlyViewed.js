import { Grid } from "@mui/material"
import ProductFrameGrid from "../product-list/ProductFrameGrid"
import React from "react"

const RecentlyViewed = ({ products }) => {
  const sx = {
    recentContainer: {
      margin: "10rem 0",
    },
  }

  return (
    <Grid
      item
      container
      justifyContent="center"
      spacing="5rem"
      sx={sx.recentContainer}
    >
      {products?.map(product => {
        const hasStyles = product.node.variants.some(
          variant => variant.style !== null
        )

        return (
          <ProductFrameGrid
            key={product.node.variants[product.selectedVariant].id}
            product={product}
            variant={product.node.variants[product.selectedVariant]}
            disableQuickView
            hasStyles={hasStyles}
          ></ProductFrameGrid>
        )
      })}
    </Grid>
  )
}

export default RecentlyViewed
