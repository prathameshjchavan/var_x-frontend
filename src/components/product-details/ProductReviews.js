import { Grid } from "@mui/material"
import React, { useState, useEffect, useContext } from "react"
import ProductReview from "./ProductReview"
import { useQuery } from "@apollo/client"
import { GET_REVIEWS } from "../../apollo/queries"
import { UserContext } from "../../contexts"

const ProductReviews = ({ product, edit, setEdit }) => {
  const [reviews, setReviews] = useState([])
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
      const productReviews = data.product.data.attributes.reviews.data.map(
        ({ id, attributes: { text, rating, updatedAt, user } }) => ({
          id: parseInt(id),
          text,
          rating,
          updatedAt,
          user: {
            id: parseInt(user.data.id),
            name: user.data.attributes.name,
          },
        })
      )
      setReviews(productReviews)
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
      {reviews
        .filter(review => (edit ? review.user.name !== user.name : true))
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
