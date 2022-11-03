import { Grid, IconButton, useTheme } from "@mui/material"
import React, { useState } from "react"
import filter from "../../images/filter.svg"
import sort from "../../images/sort.svg"

const FunctionContainer = () => {
  const [option, setOption] = useState(null)
  const theme = useTheme()

  // sx prop
  const sx = {
    functionContainer: {
      backgroundColor: theme.palette.primary.main,
      height: "6rem",
      borderRadius: "10px 10px 0 0",
    },
  }

  // function
  const content = () => {
    switch (option) {
      case null:
        const items = [
          { icon: filter, alt: "filter" },
          { icon: sort, alt: "sort" },
        ]
        return (
          <Grid
            item
            container
            justifyContent="space-around"
            alignItems="center"
          >
            {items.map(({ icon, alt }, i) => (
              <Grid item key={i}>
                <IconButton>
                  <img src={icon} alt={alt} />
                </IconButton>
              </Grid>
            ))}
          </Grid>
        )
      default:
        return null
    }
  }

  return (
    <Grid item container sx={sx.functionContainer}>
      {content()}
    </Grid>
  )
}

export default FunctionContainer
