import { Grid, InputAdornment, TextField } from "@mui/material"
import React from "react"
import validate from "../ui/validate"
import { useTheme } from "@mui/material"

const Fields = ({ fields, errors, setErrors, values, setValues }) => {
  const theme = useTheme()

  // sx prop
  const sx = {
    textfield: {
      width: "20rem",
      "& .MuiInput-input": {
        color: theme.palette.secondary.main,
      },
      "& .MuiInput-underline": {
        "&:before, &:hover:not(.Mui-disabled):before": {
          borderBottom: `2px solid ${theme.palette.primary.main}`,
        },
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
          variant="standard"
          placeholder={fields[field].placeholder}
          type={fields[field].type}
          onChange={e => {
            const valid = validateHelper(e)
            if (errors[field] || valid[field] === true)
              setErrors({ ...errors, [field]: !valid[field] })
            setValues({ ...values, [field]: e.target.value })
          }}
          onBlur={e => {
            const valid = validateHelper(e)
            setErrors({ ...errors, [field]: !valid[field] })
          }}
          error={errors[field]}
          helperText={errors[field] && fields[field].helperText}
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
