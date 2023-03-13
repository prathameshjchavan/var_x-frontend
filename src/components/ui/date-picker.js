import React, { useState } from "react"
import { Chip, Grid, useTheme } from "@mui/material"
import dayjs from "dayjs"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"

const DatePicker = ({ value }) => {
  const theme = useTheme()
  const [date, setDate] = useState(dayjs(value))
  const [open, setOpen] = useState(false)

  // sx prop
  const sx = {
    container: {},
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
    datePickerContainer: {
      position: "absolute",
      backgroundColor: "#fff",
      width: "auto",
      zIndex: 999,
    },
  }

  return (
    <Grid container justifyContent="center" sx={sx.container}>
      <Grid item>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Chip
            label={new Date(value).toLocaleDateString()}
            onClick={() => setOpen(!open)}
            sx={sx.chip}
          />
          {open && (
            <Grid container sx={sx.datePickerContainer}>
              <Grid item>
                <DateCalendar value={date} />
              </Grid>
            </Grid>
          )}
        </LocalizationProvider>
      </Grid>
    </Grid>
  )
}

export default DatePicker
