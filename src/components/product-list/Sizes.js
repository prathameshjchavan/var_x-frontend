import { Button, Grid, Typography } from "@mui/material"
import React from "react"

const Sizes = ({ sizes }) => {
  // sx prop
  const sx = {
    button: {
      border: "3px solid #fff",
      borderRadius: 50,
      height: "3rem",
      width: "3rem",
      minWidth: 0,
    },
    size: {
      color: "#fff",
    },
  }

  return (
    <Grid item container justifyContent="space-between">
      {sizes.map((size, i) => (
        <Grid key={i} item>
          <Button sx={sx.button}>
            <Typography variant="h3" sx={sx.size}>
              {size}
            </Typography>
          </Button>
        </Grid>
      ))}
    </Grid>
  )
}

export default Sizes
