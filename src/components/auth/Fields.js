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
      const valid = validate({ [field]: event.target.value })
      setErrors({ ...errors, [field]: !valid[field] })
    }

    return !fields[field].hidden ? (
      <Grid item key={index}>
        <TextField
          value={values[field]}
          variant="standard"
          placeholder={fields[field].placeholder}
          type={fields[field].type}
          onChange={e => {
            setValues({ ...values, [field]: e.target.value })
            if (
              errors[field] ||
              (values[field] !== "" && errors[field] !== null)
            )
              validateHelper(e)
          }}
          onBlur={e => validateHelper(e)}
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
