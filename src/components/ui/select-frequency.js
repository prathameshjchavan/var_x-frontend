import React, { useMemo } from "react"
import { Select, Chip, MenuItem, useMediaQuery, useTheme } from "@mui/material"

const SelectFrequency = ({ value, setValue, chip }) => {
  const theme = useTheme()
  const matches500 = useMediaQuery("(max-width: 500px)")

  // sx prop
  const sx = {
    chip: {
      backgroundColor: "#fff",
      height: "3rem",
      borderRadius: "50px",
      "& .MuiChip-label": {
        color: theme.palette.secondary.main,
      },
      "&:hover": {
        cursor: "pointer",
      },
    },
    select: {
      "& .MuiInputBase-input": {
        padding: 0,
      },
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
      "& .MuiSelect-select": {
        padding: "0 !important",
      },
    },
    menu: {
      "& .MuiPaper-root": {
        backgroundColor: theme.palette.primary.main,
      },
    },
    menuItem: {
      color: "#fff",
    },
    frequency: {
      marginBottom: matches500 ? "1rem" : undefined,
    },
  }

  // data
  const frequencies = useMemo(
    () => ["Week", "Two Weeks", "Month", "Three Months", "Six Months", "Year"],
    []
  )

  return (
    <Select
      sx={{ ...sx.select, ...sx.frequency }}
      IconComponent={() => null}
      MenuProps={{ sx: sx.menu }}
      value={value}
      onChange={event => setValue(event.target.value)}
      renderValue={selected => chip || <Chip label={selected} sx={sx.chip} />}
    >
      {frequencies.map(frequency => (
        <MenuItem key={frequency} sx={sx.menuItem} value={frequency}>
          {frequency}
        </MenuItem>
      ))}
    </Select>
  )
}

export default SelectFrequency
