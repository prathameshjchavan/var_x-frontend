import React from "react"
import axios from "axios"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  useTheme,
} from "@mui/material"

const Confirmation = ({ dialogOpen, setDialogOpen }) => {
  const theme = useTheme()

  // sx prop
  const sx = {
    title: {
      color: theme.palette.error.main,
    },
    button: {
      fontFamily: "Montserrat",
    },
  }
  return (
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
      <DialogTitle>
        <Typography variant="h3" sx={sx.title}>
          Change Password
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          You are changing your account password. Please confirm old password
          and new password.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button sx={sx.button} color="primary">
          Do Not Change Password
        </Button>
        <Button sx={sx.button} color="secondary">
          Yes, Change My Password
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Confirmation
