import { Grid, useTheme } from "@mui/material"
import React, { useState } from "react"
import DescriptionContainer from "./DescriptionContainer"
import FunctionContainer from "./FunctionContainer"

const DynamicToolbar = ({ filterOptions, name, description }) => {
  const [option, setOption] = useState(null)
  const theme = useTheme()

  // sx prop
  const sx = {
    toolbar: {
      border: `5px solid ${theme.palette.primary.main}`,
      borderRadius: "25px",
      width: "95%",
      height: "auto",
      marginBottom: "5rem",
    },
  }

  return (
    <Grid item container sx={sx.toolbar} direction="column">
      <FunctionContainer
        filterOptions={filterOptions}
        option={option}
        setOption={setOption}
      />
      {option === null && (
        <DescriptionContainer name={name} description={description} />
      )}
    </Grid>
  )
}

export default DynamicToolbar
