import { Grid } from "@mui/material"
import React, { useState, useEffect, useContext } from "react"
import ProductReview from "./ProductReview"
import { useQuery } from "@apollo/client"
import { GET_REVIEWS } from "../../apollo/queries"
import { UserContext } from "../../contexts"

const ProductReviews = ({ product, edit, setEdit }) => {
  const [reviews, setReviews] = useState({})
  const { user } = useContext(UserContext)
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

  return (
    <Grid id="reviews" item container direction="column" sx={sx.reviews}>
      {edit && (
        <ProductReview
          reviews={reviews}
          setReviews={setReviews}
          product={product}
          setEdit={setEdit}
          user={user}
        />
      )}
      {reviews?.data
        ?.filter(review =>
          edit
            ? review.attributes.user.data.attributes.name !== user.name
            : true
        )
        .map(review => (
          <ProductReview
            key={review.id}
            reviews={reviews}
            product={product}
            review={review}
          />
        ))}
    </Grid>
  )
}

export default ProductReviews
