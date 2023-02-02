import { Grid, Pagination, useTheme } from "@mui/material"
import React, { useState, useEffect, useContext, useMemo } from "react"
import ProductReview from "./ProductReview"
import { useQuery } from "@apollo/client"
import { GET_REVIEWS } from "../../apollo/queries"
import { UserContext } from "../../contexts"

const ProductReviews = ({ product, edit, setEdit }) => {
  const theme = useTheme()
  const [reviews, setReviews] = useState([])
  const [page, setPage] = useState(1)
  const { user } = useContext(UserContext)
  const { data } = useQuery(GET_REVIEWS, { variables: { id: product } })
  const reviewsperPage = 15
  const numPages = useMemo(
    () => Math.ceil(reviews.length / reviewsperPage),
    [reviews, reviewsperPage]
  )

  // sx prop
  const sx = {
    reviews: {
      padding: "0 3rem",
    },
    pagination: {
      marginBottom: "3rem",
      "& .MuiPaginationItem-text": {
        "&:not(.Mui-disabled)": {
          fontFamily: "Montserrat",
          fontSize: "2rem",
        },
        "&:not(.Mui-selected)": {
          color: theme.palette.primary.main,
        },
      },
      "& .Mui-selected": {
        color: "#fff !important",
      },
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
        .slice((page - 1) * reviewsperPage, page * reviewsperPage)
        .map(review => (
          <ProductReview
            key={review.id}
            reviews={reviews}
            product={product}
            review={review}
          />
        ))}
      <Grid item container justifyContent="flex-end">
        <Grid item>
          <Pagination
            sx={sx.pagination}
            count={numPages}
            page={page}
            onChange={(e, newPage) => setPage(newPage)}
            color="primary"
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProductReviews
