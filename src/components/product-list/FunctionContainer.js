import { Grid, IconButton, useTheme } from "@mui/material"
import React from "react"
import filter from "../../images/filter.svg"
import sort from "../../images/sort.svg"
import Filter from "./FIlter"
import Sort from "./Sort"

const FunctionContainer = ({
  filterOptions,
  setFilterOptions,
  option,
  setOption,
  sortOptions,
  setSortOptions,
}) => {
  const theme = useTheme()

  // sx prop
  const sx = {
    functionContainer: {
      backgroundColor: theme.palette.primary.main,
      minHeight: "6rem",
      height: "auto",
      borderRadius: option !== null ? "10px" : "10px 10px 0 0",
    },
  }

  // function
  const content = () => {
    switch (option) {
      case "sort":
        return (
          <Sort
            setOption={setOption}
            sortOptions={sortOptions}
            setSortOptions={setSortOptions}
          />
        )
      case "filter":
        return (
          <Filter
            setOption={setOption}
            setFilterOptions={setFilterOptions}
            filterOptions={filterOptions}
          />
        )
      default:
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
                <IconButton onClick={() => setOption(alt)}>
                  <img src={icon} alt={alt} />
                </IconButton>
              </Grid>
            ))}
          </Grid>
        )
    }
  }

  return (
    <Grid item container sx={sx.functionContainer}>
      {content()}
    </Grid>
  )
}

export default FunctionContainer
