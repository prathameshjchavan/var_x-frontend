import { Grid } from "@mui/material"
import React from "react"
import ProductReview from "./ProductReview"

const ProductReviews = ({ product }) => {
  // sx prop
  const sx = {
    reviews: {
      padding: "0 3rem",
    },
  }
  return (
    <Grid item container direction="column" sx={sx.reviews}>
      <ProductReview product={product} />
    </Grid>
  )
}

export default ProductReviews
