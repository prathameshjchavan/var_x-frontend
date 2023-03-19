import React, { useRef, useState, useEffect, useCallback } from "react"
import { Chip, Grid, Grow, useTheme } from "@mui/material"
import dayjs from "dayjs"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"

const DatePicker = ({ id, value, setValue, open, setOpen }) => {
  const theme = useTheme()
  const datepickerRef = useRef(null)
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
      marginTop: "0.5rem",
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
      "& .MuiIconButton-root .MuiSvgIcon-root": {
        fill: "#747474 !important",
      },
      "& .MuiPickersYear-root": {
        color: "#000",
      },
      width: "100%",
      height: "100%",
    },
  }

  // functions
  const handleClickOutside = useCallback(
    event => {
      if (
        datepickerRef.current &&
        !datepickerRef.current.contains(event.target)
      ) {
        setOpen(null)
      }
    },
    [datepickerRef, setOpen]
  )

  const formatDate = useCallback(
    num => (num.length === 1 ? `0${num}` : num),
    []
  )

  const handleChange = newDate => {
    const date = `${newDate.year()}-${formatDate(
      (newDate.month() + 1).toString()
    )}-${formatDate(newDate.date().toString())}`
    setValue(date)
    setDate(dayjs(date))
    setOpen(null)
  }

  useEffect(() => {
    if (open !== id) return

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [datepickerRef, open, id, setOpen, handleClickOutside])

  return (
    <Grid container justifyContent="center">
      <Grid item>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Chip
            label={new Date(date).toLocaleDateString()}
            onClick={() => setOpen(id)}
            sx={sx.chip}
          />
          <Grow in={open === id}>
            <Grid container sx={sx.datepickerContainer}>
              <Grid item sx={sx.datepickerWrapper}>
                <DateCalendar
                  disablePast
                  disableHighlightToday
                  shouldDisableDate={date => {
                    const dateString = `${date.year()}-${formatDate(
                      (date.month() + 1).toString()
                    )}-${formatDate(date.date().toString())}`
                    const today = new Date().toISOString().split("T")[0]
                    return dateString === today
                  }}
                  ref={datepickerRef}
                  sx={sx.datepicker}
                  onChange={newDate => handleChange(newDate)}
                  value={date}
                />
              </Grid>
            </Grid>
          </Grow>
        </LocalizationProvider>
      </Grid>
    </Grid>
  )
}

export default DatePicker
