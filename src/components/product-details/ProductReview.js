import { Grid, Button, Typography, useTheme } from "@mui/material"
import React, { useContext, useState } from "react"
import Rating from "../home/Rating"
import { UserContext } from "../../contexts"

const ProductReview = () => {
  const theme = useTheme()
  const { user } = useContext(UserContext)

  // sx prop
  const sx = {
    light: {
      color: theme.palette.primary.main,
    },
    date: {
      marginTop: "-0.5rem",
    },
  }

  return (
    <Grid item container direction="column">
      <Grid item container justifyContent="space-between">
        <Grid item>
          <Typography variant="h4" sx={sx.light}>
            {user.name}
          </Typography>
        </Grid>
        <Grid item>
          <Rating number={0} size={2.5} />
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="h5" sx={{ ...sx.light, ...sx.date }}>
          {new Date().toLocaleDateString()}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default ProductReview
