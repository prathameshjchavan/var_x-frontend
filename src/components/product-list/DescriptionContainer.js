import { Grid, Typography, useTheme } from "@mui/material"
import React from "react"
import background from "../../images/toolbar-background.svg"

const DescriptionContainer = ({ name, description }) => {
  const theme = useTheme()

  const sx = {
    mainContainer: {
      padding: "3rem",
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
    description: {
      color: "#fff",
    },
    descriptionContainer: {
      backgroundColor: theme.palette.primary.main,
      height: "15rem",
      width: "60rem",
      borderRadius: "25px",
      padding: "1rem",
    },
  }

  return (
    <Grid item container sx={sx.mainContainer} justifyContent="center">
      <Grid item align="center" sx={sx.descriptionContainer}>
        <Typography variant="h4" paragraph gutterBottom>
          {name}
        </Typography>
        <Typography variant="body1" sx={sx.description}>
          {description}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default DescriptionContainer
