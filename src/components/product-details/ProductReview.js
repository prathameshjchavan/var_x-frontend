import { Button, Grid, Typography, useTheme } from "@mui/material"
import { styled } from "@mui/material/styles"
import React, { useContext, useState, useRef } from "react"
import Rating from "../home/Rating"
import { UserContext } from "../../contexts"
import Fields from "../auth/Fields"

const ProductReview = () => {
  const theme = useTheme()
  const { user } = useContext(UserContext)
  const ratingRef = useRef(null)
  const [values, setValues] = useState({ message: "" })

  // sx prop
  const sx = {
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
      marginTop: "2rem",
    },
  }

  const fields = {
    message: {
      helperText: "",
      placeholder: "Write you review",
    },
  }

  // styled components
  const ButtonText = styled("span")(({ type }) => ({
    color: type === "review" ? "#fff" : theme.palette.primary.main,
    fontFamily: "Montserrat",
    fontWeight: 600,
  }))

  return (
    <Grid item container direction="column">
      <Grid item container justifyContent="space-between">
        <Grid item>
          <Typography variant="h4" sx={sx.light}>
            {user.name}
          </Typography>
        </Grid>
        <Grid
          item
          ref={ratingRef}
          onMouseMove={e => {
            const hoverRating =
              ratingRef.current.getBoundingClientRect().left - e.clientX
          }}
        >
          <Rating number={0} size={2.5} />
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="h5" sx={{ ...sx.light, ...sx.date }}>
          {new Date().toLocaleDateString()}
        </Typography>
      </Grid>
      <Grid item>
        <Fields
          fields={fields}
          values={values}
          setValues={setValues}
          fullWidth
          noError
        />
      </Grid>
      <Grid item container sx={sx.buttonContainer}>
        <Grid item>
          <Button variant="contained" color="primary">
            <ButtonText type="review">Leave Review</ButtonText>
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" sx={sx.cancelButton}>
            <ButtonText type="cancel">Cancel</ButtonText>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProductReview
