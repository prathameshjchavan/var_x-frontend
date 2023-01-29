import { Grid, InputAdornment, TextField } from "@mui/material"
import React from "react"
import validate from "../ui/validate"
import { useTheme } from "@mui/material"

const Fields = ({
  fields,
  errors,
  setErrors,
  values,
  setValues,
  isWhite,
  disabled,
  fullWidth,
  settings,
  sm,
  noError,
}) => {
  const theme = useTheme()

  // sx prop
  const sx = {
    textfield: {
      width: sm
        ? "10rem !important"
        : fullWidth
        ? undefined
        : settings
        ? "15rem"
        : "20rem",
      "& .MuiInput-input": {
        color: !isWhite ? theme.palette.secondary.main : undefined,
        fontSize: sm ? "1.25rem" : undefined,
      },
      "& .MuiInput-underline": !isWhite
        ? {
            "&:before, &:hover:not(.Mui-disabled):before": {
              borderBottom: `2px solid ${theme.palette.primary.main}`,
            },
          }
        : undefined,
      [theme.breakpoints.down("sm")]: {
        width: fullWidth ? undefined : "15rem",
      },
    },
  }

  return Object.keys(fields).map((field, index) => {
    const validateHelper = event => {
      return validate({ [field]: event.target.value })
    }

    return !fields[field].hidden ? (
      <Grid item key={index}>
        <TextField
          value={values[field]}
          fullWidth={fullWidth}
          variant="standard"
          placeholder={fields[field].placeholder}
          type={fields[field].type}
          disabled={disabled}
          onChange={e => {
            setValues({ ...values, [field]: e.target.value })
            if (noError) return
            const valid = validateHelper(e)
            if (errors[field] || valid[field] === true)
              setErrors({ ...errors, [field]: !valid[field] })
          }}
          onBlur={e => {
            if (noError) return
            const valid = validateHelper(e)
            setErrors({ ...errors, [field]: !valid[field] })
          }}
          error={noError ? false : errors[field]}
          helperText={noError ? "" : errors[field] && fields[field].helperText}
          sx={sx.textfield}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {fields[field].startAdornment}
              </InputAdornment>
            ),
            endAdornment: fields[field].endAdornment ? (
              <InputAdornment position="end">
                {fields[field].endAdornment}
              </InputAdornment>
            ) : undefined,
          }}
        />
      </Grid>
    ) : null
  })
}

export default Fields
