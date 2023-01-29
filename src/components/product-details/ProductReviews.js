import { Grid } from "@mui/material"
import React from "react"
import ProductReview from "./ProductReview"

const ProductReviews = () => {
  // sx prop
  const sx = {
    reviews: {
      padding: "0 3rem",
    },
  }
  return (
    <Grid item container direction="column" sx={sx.reviews}>
      <ProductReview />
    </Grid>
  )
}

export default ProductReviews
