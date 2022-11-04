import { Button, ButtonGroup, Grid, Typography, useTheme } from "@mui/material"
import React, { useState } from "react"
import background from "../../images/toolbar-background.svg"
import ListIcon from "../../images/List"
import GridIcon from "../../images/Grid"

const DescriptionContainer = ({ name, description }) => {
  const [layout, setLayout] = useState("grid")
  const theme = useTheme()

  const sx = {
    mainContainer: {
      padding: "3rem",
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      position: "relative",
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
    buttonContainer: {
      position: "absolute",
      right: "3rem",
      bottom: "3rem",
    },
    button: {
      border: `2px solid ${theme.palette.primary.main} !important`,
      borderRightColor: `${theme.palette.primary.main} !important`,
      borderRadius: "25px",
      backgroundColor: "#fff !important",
      padding: "0.5rem 1.5rem",
    },
    selected: {
      backgroundColor: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
      },
    },
  }

  function getButtonSx(layoutProp) {
    const buttonSx = sx.button

    return layoutProp === layout ? { ...buttonSx, ...sx.selected } : buttonSx
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
      <Grid item sx={sx.buttonContainer}>
        <ButtonGroup>
          <Button onClick={() => setLayout("list")} sx={getButtonSx("list")}>
            <ListIcon color={layout === "list" ? "#fff" : undefined} />
          </Button>
          <Button onClick={() => setLayout("grid")} sx={getButtonSx("grid")}>
            <GridIcon color={layout === "grid" ? "#fff" : undefined} />
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  )
}

export default DescriptionContainer
