import { Grid } from "@mui/material"
import React from "react"
import ProductFrameGrid from "./ProductFrameGrid"
import ProductFrameList from "./ProductFrameList"

const ListOfProducts = ({ products, layout }) => {
  const FrameHelper = ({ Frame, product, variant }) => {
    return <Frame variant={variant} product={product} />
  }

  // sx prop
  const sx = {
    productsContainer: {
      width: "95%",
      "& > *": {
        marginRight: layout === "grid" ? "calc((100% - (25rem * 4)) / 3)" : 0,
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
          <FrameHelper
            key={variant.id}
            Frame={layout === "grid" ? ProductFrameGrid : ProductFrameList}
            variant={variant}
            product={product}
          />
        ))
      )}
    </Grid>
  )
}

export default ListOfProducts
