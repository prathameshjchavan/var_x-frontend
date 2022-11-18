import { Chip, Grid, IconButton, useMediaQuery } from "@mui/material"
import React from "react"
import sort from "../../images/sort.svg"
import close from "../../images/close-outline.svg"

const Sort = ({ setOption }) => {
  const matchesVertical = useMediaQuery("(max-width: 1100px)")
  const matchesSM = useMediaQuery(theme => theme.breakpoints.down("sm"))
  const sortOptions = [
    { label: "A-Z" },
    { label: "Z-A" },
    { label: "NEWEST" },
    { label: "OLDEST" },
    { label: "PRICE ↑" },
    { label: "PRICE ↓" },
    { label: "REVIEWS" },
  ]

  // sx prop
  const sx = {
    chipContainer: {
      margin: matchesVertical && "0.5rem",
    },
  }

  return (
    <Grid item container justifyContent="space-between" alignItems="center">
      <Grid item>
        <IconButton>
          <img src={sort} alt="sort" />
        </IconButton>
      </Grid>
      <Grid item xs>
        <Grid
          container
          direction={matchesSM ? "column" : "row"}
          alignItems={matchesSM ? "center" : undefined}
          justifyContent="space-around"
        >
          {sortOptions.map(({ label }) => (
            <Grid key={label} sx={sx.chipContainer} item>
              <Chip label={label} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item>
        <IconButton onClick={() => setOption(null)}>
          <img src={close} alt="close" />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default Sort
