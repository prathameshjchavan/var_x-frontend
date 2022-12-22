import {
  Button,
  ButtonGroup,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import React from "react"
import background from "../../images/repeating-smallest.svg"
import ListIcon from "../../images/List"
import GridIcon from "../../images/Grid"

const DescriptionContainer = ({ name, description, layout, setLayout }) => {
  const theme = useTheme()
  const matchesVertical = useMediaQuery("(max-width: 1100px)")

  const sx = {
    mainContainer: {
      padding: "3rem",
      backgroundImage: `url(${background})`,
      backgroundPosition: "center",
      backgroundRepeat: "repeat",
      position: "relative",
      [theme.breakpoints.down("sm")]: {
        padding: "3rem 0",
      },
    },
    description: {
      color: "#fff",
    },
    descriptionContainer: {
      backgroundColor: theme.palette.primary.main,
      height: "15rem",
      width: matchesVertical ? "100%" : "60%",
      borderRadius: "25px",
      padding: "1rem",
      [theme.breakpoints.down("sm")]: {
        borderRadius: 0,
      },
    },
    buttonContainer: {
      position: matchesVertical ? "relative" : "absolute",
      right: matchesVertical ? undefined : "3rem",
      bottom: matchesVertical ? undefined : "3rem",
      alignSelf: matchesVertical ? "flex-end" : undefined,
      marginTop: matchesVertical ? "3rem" : 0,
      [theme.breakpoints.down("sm")]: {
        marginRight: "1.5rem",
      },
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

  // functions
  function getButtonSx(layoutProp) {
    const buttonSx = sx.button

    return layoutProp === layout ? { ...buttonSx, ...sx.selected } : buttonSx
  }

  const changeLayout = option => {
    setLayout(option)
  }

  return (
    <Grid
      item
      container
      sx={sx.mainContainer}
      direction={matchesVertical ? "column" : "row"}
      alignItems={matchesVertical ? "center" : undefined}
      justifyContent="center"
    >
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
          <Button onClick={() => changeLayout("list")} sx={getButtonSx("list")}>
            <ListIcon color={layout === "list" ? "#fff" : undefined} />
          </Button>
          <Button onClick={() => changeLayout("grid")} sx={getButtonSx("grid")}>
            <GridIcon color={layout === "grid" ? "#fff" : undefined} />
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  )
}

export default DescriptionContainer
