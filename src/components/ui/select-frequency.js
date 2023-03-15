import React, { useMemo, useState, useCallback } from "react"
import { Select, Chip, MenuItem, useMediaQuery, useTheme } from "@mui/material"

const SelectFrequency = ({ value, setValue, chip, subscription }) => {
  const theme = useTheme()
  const matches500 = useMediaQuery("(max-width: 500px)")
  const [frequency, setFrequency] = useState(
    subscription ? value.split("_").join(" ") : value
  )

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
        backgroundColor: subscription
          ? theme.palette.secondary.light
          : undefined,
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

  // functions
  const handleChange = useCallback(
    event => {
      setFrequency(event.target.value)
      setValue(
        subscription
          ? event.target.value.split(" ").join("_")
          : event.target.value
      )
    },
    [setValue, subscription]
  )

  // data
  const frequencies = useMemo(
    () =>
      subscription
        ? [
            "one week",
            "two weeks",
            "one month",
            "three months",
            "six months",
            "annually",
          ]
        : ["Week", "Two Weeks", "Month", "Three Months", "Six Months", "Year"],
    [subscription]
  )

  return (
    <Select
      sx={{ ...sx.select, ...sx.frequency }}
      IconComponent={() => null}
      MenuProps={{ sx: sx.menu }}
      value={frequency}
      onChange={handleChange}
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
