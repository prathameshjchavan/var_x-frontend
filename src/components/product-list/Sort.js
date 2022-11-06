import { Chip, Grid, IconButton } from "@mui/material"
import React from "react"
import sort from "../../images/sort.svg"
import close from "../../images/close-outline.svg"

const Sort = ({ setOption }) => {
  const sortOptions = [
    { label: "A-Z" },
    { label: "Z-A" },
    { label: "NEWEST" },
    { label: "OLDEST" },
    { label: "PRICE ↑" },
    { label: "PRICE ↓" },
    { label: "REVIEWS" },
  ]

  return (
    <Grid item container justifyContent="space-between" alignItems="center">
      <Grid item>
        <IconButton>
          <img src={sort} alt="sort" />
        </IconButton>
      </Grid>
      <Grid item xs>
        <Grid container justifyContent="space-around">
          {sortOptions.map(({ label }) => (
            <Grid key={label} item>
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
