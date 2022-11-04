import {
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  useTheme,
} from "@mui/material"
import React from "react"
import filter from "../../images/filter.svg"
import close from "../../images/close-outline.svg"

const Filter = ({ setOption, filterOptions }) => {
  const theme = useTheme()

  // sx prop
  const sx = {
    mainContainer: {
      padding: "1rem 0",
    },
    chip: {
      backgroundColor: theme.palette.secondary.main,
      "& .MuiChip-label": {
        ...theme.typography.body1,
        color: "#fff",
        fontWeight: 500,
      },
    },
    checkbox: {
      "& .MuiTypography-root": {
        color: "#fff",
      },
      "& .MuiCheckbox-root": {
        color: "#fff",
      },
    },
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
        <Grid container justifyContent="space-around">
          {Object.keys(filterOptions)
            .filter(option => filterOptions[option] !== null)
            .map(option => (
              <Grid key={option} item>
                <Grid container direction="column">
                  <Grid item>
                    <Chip label={option} sx={sx.chip} />
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <FormGroup>
                        {filterOptions[option].map(({ label, checked }) => (
                          <FormControlLabel
                            key={label}
                            sx={sx.checkbox}
                            label={label}
                            control={
                              <Checkbox checked={checked} name={label} />
                            }
                          />
                        ))}
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
