import { Chip, Grid, IconButton, useTheme } from "@mui/material"
import React from "react"
import sort from "../../images/sort.svg"
import close from "../../images/close-outline.svg"

const Sort = ({ setOption }) => {
  const theme = useTheme()
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
    chip: {
      backgroundColor: theme.palette.secondary.main,
      "& .MuiChip-label": {
        ...theme.typography.body1,
        color: "#fff",
        fontWeight: 500,
      },
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
        <Grid container justifyContent="space-around">
          {sortOptions.map(({ label }) => (
            <Grid key={label} item>
              <Chip label={label} sx={sx.chip} />
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
