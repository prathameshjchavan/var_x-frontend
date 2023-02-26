import { CircularProgress, IconButton, Grid, useTheme } from "@mui/material"
import React from "react"
import { styled } from "@mui/material/styles"
import saveIcon from "../../images/save.svg"
import DeleteIcon from "../../images/Delete"

const Actions = ({ loading, handleAction, type, spinnerColor }) => {
  const theme = useTheme()

  // sx prop
  const sx = {
    actions: {
      position: "absolute",
      right: type ? "1rem" : 0,
      zIndex: 999,
    },
    iconButton: {
      [theme.breakpoints.down("sm")]: {
        padding: "6px",
      },
    },
  }

  // styled components
  const Icon = styled("img")(() => ({
    height: "2.25rem",
    width: "2.25rem",
    [theme.breakpoints.down("sm")]: {
      height: "1.75rem",
      width: "1.75rem",
    },
  }))

  const DeleteIconWrapper = styled("span")(() => ({
    height: "2rem",
    width: "2rem",
    [theme.breakpoints.down("sm")]: {
      height: "1.5rem",
      width: "1.5rem",
    },
  }))

  return (
    <Grid item sx={sx.actions}>
      <Grid container>
        <Grid item>
          {loading === "save" || loading === `${type}-save` ? (
            <CircularProgress color={spinnerColor} />
          ) : (
            <IconButton
              sx={sx.iconButton}
              onClick={() => handleAction("save", type)}
            >
              <Icon src={saveIcon} alt="save" />
            </IconButton>
          )}
        </Grid>
        <Grid item>
          {loading === "delete" || loading === `${type}-delete` ? (
            <CircularProgress color={spinnerColor} />
          ) : (
            <IconButton
              sx={sx.iconButton}
              onClick={() => handleAction("delete", type)}
            >
              <DeleteIconWrapper>
                <DeleteIcon color="#fff" />
              </DeleteIconWrapper>
            </IconButton>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Actions
