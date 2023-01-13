import { Grid, Button, useTheme, Typography, IconButton } from "@mui/material"
import { styled } from "@mui/material/styles"
import saveIcon from "../../images/save.svg"
import DeleteIcon from "../../images/Delete"
import React from "react"

const CheckoutNavigation = ({ steps, selectedStep, setSelectedStep }) => {
  const theme = useTheme()

  // sx prop
  const sx = {
    navbar: {
      backgroundColor: theme.palette.secondary.main,
      width: "40rem",
      height: "5rem",
      position: "relative",
    },
    back: {
      visibility:
        selectedStep === 0 || selectedStep === steps.length - 1
          ? "hidden"
          : "visible",
    },
    forward: {
      visibility: selectedStep >= steps.length - 2 ? "hidden" : "visible",
    },
    forwardButton: {
      "&:disabled": {
        opacity: 0.5,
      },
    },
    actions: {
      position: "absolute",
      right: 0,
    },
  }

  // styled components
  const Icon = styled("img")(() => ({
    height: "2.25rem",
    width: "2.25rem",
  }))

  const DeleteIconWrapper = styled("span")(() => ({
    height: "2rem",
    width: "2rem",
  }))

  return (
    <Grid
      item
      container
      justifyContent="center"
      alignItems="center"
      sx={sx.navbar}
    >
      <Grid item sx={sx.back}>
        <Button onClick={() => setSelectedStep(selectedStep - 1)}>
          <Typography variant="h5">&lt;</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Typography variant="h5">
          {steps[selectedStep].title.toUpperCase()}
        </Typography>
      </Grid>
      <Grid item sx={sx.forward}>
        <Button
          disabled={steps[selectedStep].error}
          sx={sx.forwardButton}
          onClick={() => setSelectedStep(selectedStep + 1)}
        >
          <Typography variant="h5">&gt;</Typography>
        </Button>
      </Grid>
      {steps[selectedStep].hasActions && (
        <Grid item sx={sx.actions}>
          <Grid container>
            <Grid item>
              <IconButton>
                <Icon src={saveIcon} alt="save" />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <DeleteIconWrapper>
                  <DeleteIcon color="#fff" />
                </DeleteIconWrapper>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}

export default CheckoutNavigation
