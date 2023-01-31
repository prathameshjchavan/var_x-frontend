import { Grid } from "@mui/material"
import React, { useState, useEffect } from "react"
import ProductReview from "./ProductReview"
import { useQuery } from "@apollo/client"
import { GET_REVIEWS } from "../../apollo/queries"

const ProductReviews = ({ product }) => {
  const [reviews, setReviews] = useState([])
  const { data } = useQuery(GET_REVIEWS, { variables: { id: product } })

  // sx prop
  const sx = {
    reviews: {
      padding: "0 3rem",
    },
  }

  useEffect(() => {
    if (data) {
      setReviews(data.product.data.attributes.reviews)
    }
  }, [data])

  console.log(reviews)

  return (
    <Grid item container direction="column" sx={sx.reviews}>
      {reviews?.data?.map(review => (
        <ProductReview key={review.id} product={product} review={review} />
      ))}
    </Grid>
  )
}

export default ProductReviews
