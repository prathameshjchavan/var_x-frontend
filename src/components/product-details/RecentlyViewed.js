import { Grid } from "@mui/material"
import ProductFrameGrid from "../product-list/ProductFrameGrid"
import React from "react"

const RecentlyViewed = ({ products }) => {
  return (
    <Grid item container>
      {products?.map(product => {
        const hasStyles = product.node.variants.some(
          variant => variant.style !== null
        )

        return (
          <ProductFrameGrid
            key={product.node.strapiId}
            product={product}
            variant={product.node.variants[0]}
            disableQuickView
            hasStyles={hasStyles}
          ></ProductFrameGrid>
        )
      })}
    </Grid>
  )
}

export default RecentlyViewed
