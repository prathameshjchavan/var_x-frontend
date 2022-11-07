import { Grid } from "@mui/material"
import React from "react"
import ProductFrameGrid from "./ProductFrameGrid"

const ListOfProducts = ({ products }) => {
  // sx prop
  const sx = {
    productsContainer: {
      width: "95%",
      "& > *": {
        marginRight: "calc((100% - (25rem * 4)) / 3)",
        marginBottom: "5rem",
      },
      "& > :nth-of-type(4n)": {
        marginRight: 0,
      },
    },
  }

  return (
    <Grid item container sx={sx.productsContainer}>
      {products.map(product =>
        product.node.variants.map(variant => (
          <ProductFrameGrid
            key={variant.id}
            variant={variant}
            product={product}
          />
        ))
      )}
    </Grid>
  )
}

export default ListOfProducts
