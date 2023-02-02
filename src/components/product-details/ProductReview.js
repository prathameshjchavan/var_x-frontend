import {
  Button,
  CircularProgress,
  Grid,
  Typography,
  useTheme,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import React, { useContext, useState, useRef } from "react"
import Rating from "../home/Rating"
import { FeedbackContext } from "../../contexts"
import { setSnackbar } from "../../contexts/actions"
import Fields from "../auth/Fields"
import axios from "axios"

const ProductReview = ({
  product,
  review,
  reviews,
  setReviews,
  setEdit,
  user,
}) => {
  const theme = useTheme()
  const { dispatchFeedback } = useContext(FeedbackContext)
  const found = !review
    ? reviews.data.find(
        review => parseInt(review.attributes.user.data.id) === user.id
      )
    : null
  const ratingRef = useRef(null)
  const [values, setValues] = useState({
    message: found ? found.attributes.text : "",
  })
  const [tempRating, setTempRating] = useState(0)
  const [rating, setRating] = useState(
    review ? review.attributes.rating : found ? found.attributes.rating : null
  )
  const [loading, setLoading] = useState(null)
  const buttonDisabled = found
    ? found.attributes.text === values.message &&
      found.attributes.rating === rating
    : !rating

  // sx prop
  const sx = {
    review: {
      marginBottom: "3rem",
    },
    light: {
      color: theme.palette.primary.main,
    },
    date: {
      marginTop: "-0.5rem",
    },
    cancelButton: {
      backgroundColor: "#fff",
    },
    buttonContainer: {
      marginTop: "1rem",
    },
    rating: {
      cursor: !review ? "pointer" : undefined,
    },
    delete: {
      backgroundColor: theme.palette.error.main,
      margin: "0 0.5rem",
      color: "#fff",
      "&:hover": {
        backgroundColor: theme.palette.error.dark,
      },
    },
  }

  const fields = {
    message: {
      helperText: "",
      placeholder: "Write you review",
    },
  }

  // functions
  const handleReview = option => {
    setLoading(option === "delete" ? "delete-review" : "leave-review")

    const axiosFunction =
      option === "delete" ? axios.delete : found ? axios.put : axios.post
    const route = found ? `/api/reviews/${found.id}` : `/api/reviews`
    const body = option === "delete" ? {} : { text: values.message, rating }
    if (!found) {
      body.product = product
    }

    axiosFunction(`${process.env.STRAPI_API_URL}${route}`, body, {
      headers: { Authorization: `Bearer ${user.jwt}` },
    })
      .then(response => {
        setValues({ message: "" })
        setRating(null)

        if (found) {
          const { text, rating, updatedAt } = response.data
          let newReviews = structuredClone(reviews)
          const reviewIndex = newReviews.data.findIndex(
            review => review.id === found.id
          )
          if (option === "delete") {
            newReviews.data.splice(reviewIndex, 1)
          } else {
            const newReview = {
              ...found,
              attributes: { ...found.attributes, text, rating, updatedAt },
            }

            newReviews.data[reviewIndex] = newReview
          }

          setReviews(newReviews)
        }

        dispatchFeedback(
          setSnackbar({
            status: "success",
            message: `${
              option === "delete" ? "Review Deleted" : "Product Reviewed"
            } Successfully`,
          })
        )
      })
      .catch(error => {
        console.error(error)
        dispatchFeedback(
          setSnackbar({
            status: "error",
            message: `There was a problem ${
              option === "delete" ? "removing" : found ? "updating" : "leaving"
            } your review. Please try again.`,
          })
        )
      })
      .finally(() => {
        setLoading(false)
        setEdit(false)
      })
  }

  // styled components
  const ButtonText = styled("span")(({ type }) => ({
    color:
      type === "review" || type === "delete"
        ? "#fff"
        : theme.palette.primary.main,
    fontFamily: "Montserrat",
    fontWeight: 600,
  }))

  return (
    <Grid item container direction="column" sx={sx.review}>
      <Grid item container justifyContent="space-between">
        <Grid item>
          <Typography variant="h4" sx={sx.light}>
            {review ? review.attributes.user.data.attributes.name : user.name}
          </Typography>
        </Grid>
        <Grid
          item
          sx={sx.rating}
          ref={ratingRef}
          onMouseMove={e => {
            if (review) return
            const hoverRating =
              ((e.clientX - ratingRef.current.getBoundingClientRect().left) /
                ratingRef.current.getBoundingClientRect().width) *
              5
            setTempRating(Math.round(hoverRating * 2) / 2)
          }}
          onMouseLeave={() => {
            if (review) return
            if (tempRating > rating) {
              setTempRating(rating)
            }
          }}
          onClick={() => (review ? null : setRating(tempRating))}
        >
          <Rating
            number={rating > tempRating ? rating : tempRating}
            size={2.5}
          />
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="h5" sx={{ ...sx.light, ...sx.date }}>
          {review
            ? new Date(review.attributes.updatedAt).toLocaleDateString()
            : new Date().toLocaleDateString()}
        </Typography>
      </Grid>
      <Grid item>
        {review ? (
          <Typography variant="body1">{review.attributes.text}</Typography>
        ) : (
          <Fields
            fields={fields}
            values={values}
            setValues={setValues}
            fullWidth
            noError
          />
        )}
      </Grid>
      {!review && (
        <Grid item container sx={sx.buttonContainer}>
          <Grid item>
            {loading === "leave-review" ? (
              <CircularProgress />
            ) : (
              <Button
                onClick={handleReview}
                disabled={buttonDisabled}
                variant="contained"
                color="primary"
              >
                <ButtonText type="review">
                  {found ? "Edit" : "Leave"} Review
                </ButtonText>
              </Button>
            )}
          </Grid>
          {found && (
            <Grid item>
              {loading === "delete-review" ? (
                <CircularProgress />
              ) : (
                <Button
                  onClick={() => handleReview("delete")}
                  variant="contained"
                  sx={sx.delete}
                >
                  <ButtonText type="delete">Delete</ButtonText>
                </Button>
              )}
            </Grid>
          )}
          <Grid item>
            <Button
              onClick={() => setEdit(false)}
              variant="contained"
              sx={sx.cancelButton}
            >
              <ButtonText type="cancel">Cancel</ButtonText>
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}

export default ProductReview
