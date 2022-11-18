import {
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import React from "react"
import filter from "../../images/filter.svg"
import close from "../../images/close-outline.svg"

const Filter = ({ setOption, filterOptions, setFilterOptions }) => {
  const theme = useTheme()
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))

  // sx prop
  const sx = {
    mainContainer: {
      padding: "1rem 0",
    },
    checkbox: {
      [theme.breakpoints.down("sm")]: {
        margin: 0,
      },
      "& .MuiTypography-root": {
        color: "#fff",
      },
      "& .MuiCheckbox-root": {
        color: "#fff",
      },
      "& .Mui-checked": {
        color: `${theme.palette.secondary.main} !important`,
      },
    },
  }

  const handleFilter = (option, i) => {
    const newFilters = { ...filterOptions }

    newFilters[option][i].checked = !newFilters[option][i].checked

    setFilterOptions(newFilters)
  }

  return (
    <Grid
      item
      container
      sx={sx.mainContainer}
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item>
        <IconButton>
          <img src={filter} alt="filter" />
        </IconButton>
      </Grid>
      <Grid item xs>
        <Grid
          container
          justifyContent="space-around"
          direction={matchesSM ? "column" : "row"}
          spacing={matchesSM ? "2rem" : undefined}
        >
          {Object.keys(filterOptions)
            .filter(option => filterOptions[option] !== null)
            .map(option => (
              <Grid key={option} item>
                <Grid
                  container
                  direction="column"
                  alignItems={matchesSM ? "center" : undefined}
                >
                  <Grid item>
                    <Chip label={option} />
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <FormGroup>
                        {filterOptions[option].map(
                          ({ label, checked }, index) => (
                            <FormControlLabel
                              key={label}
                              sx={sx.checkbox}
                              label={label}
                              control={
                                <Checkbox
                                  checked={checked}
                                  onChange={() => handleFilter(option, index)}
                                  name={label}
                                />
                              }
                            />
                          )
                        )}
                      </FormGroup>
                    </FormControl>
                  </Grid>
                </Grid>
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

export default Filter
