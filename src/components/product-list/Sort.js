import { Chip, Grid, IconButton, useMediaQuery, useTheme } from "@mui/material"
import React from "react"
import sort from "../../images/sort.svg"
import close from "../../images/close-outline.svg"

const Sort = ({ setOption, sortOptions, setSortOptions }) => {
  const matchesVertical = useMediaQuery("(max-width: 1100px)")
  const matchesSM = useMediaQuery(theme => theme.breakpoints.down("sm"))
  const theme = useTheme()

  // sx prop
  const sx = {
    chipContainer: {
      margin: matchesVertical && "0.5rem",
    },
    active: {
      backgroundColor: theme.palette.secondary.main,
    },
    inactive: {
      backgroundColor: "transparent",
    },
  }

  const handleSort = index => {
    const newOptions = [...sortOptions]

    newOptions.map(option => (option.active = false))
    newOptions[index].active = true

    setSortOptions(newOptions)
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
          {sortOptions.map(({ label, active }, index) => (
            <Grid key={label} sx={sx.chipContainer} item>
              <Chip
                label={label}
                sx={active ? sx.active : sx.inactive}
                onClick={() => handleSort(index)}
                clickable
              />
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
