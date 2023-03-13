import React, { useState } from "react"
import { Chip, Grid, useTheme } from "@mui/material"
import dayjs from "dayjs"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"

const DatePicker = ({ id, value, open, setOpen }) => {
  const theme = useTheme()
  const [date, setDate] = useState(dayjs(value))

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
    datepickerContainer: {
      position: "absolute",
      backgroundColor: "#fff",
      borderRadius: 5,
      width: "auto",
      zIndex: 999,
    },
    datepickerWrapper: {
      width: "22rem",
      height: "22rem",
    },
    datepicker: {
      "& .MuiIconButton-root": {
        "&.MuiSvgIcon-root": {
          fill: "#747474",
        },
      },
      width: "100%",
      height: "100%",
    },
  }

  return (
    <Grid container justifyContent="center">
      <Grid item>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Chip
            label={new Date(value).toLocaleDateString()}
            onClick={() => setOpen(id)}
            sx={sx.chip}
          />
          {open === id && (
            <Grid container sx={sx.datepickerContainer}>
              <Grid item sx={sx.datepickerWrapper}>
                <DateCalendar sx={sx.datepicker} value={date} />
              </Grid>
            </Grid>
          )}
        </LocalizationProvider>
      </Grid>
    </Grid>
  )
}

export default DatePicker
