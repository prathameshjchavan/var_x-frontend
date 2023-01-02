import React, { useCallback, useMemo, useState } from "react"
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
  CircularProgress,
} from "@mui/material"
import { getEmailPasswordFields } from "../auth/Login"
import Fields from "../auth/Fields"

const Confirmation = ({
  dialogOpen,
  setDialogOpen,
  user,
  dispatchFeedback,
  setSnackbar,
}) => {
  const theme = useTheme()
  const [values, setValues] = useState({ password: "", confirmation: "" })
  const [errors, setErrors] = useState({})
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const fields = useMemo(() => {
    const { password } = getEmailPasswordFields(
      true,
      false,
      visible,
      setVisible
    )
    return {
      password: { ...password, placeholder: "Old Password" },
      confirmation: { ...password, placeholder: "New Password" },
    }
  }, [visible, setVisible])

  // sx prop
  const sx = {
    title: {
      color: theme.palette.error.main,
    },
    button: {
      fontFamily: "Montserrat",
    },
  }

  // functions
  const handleConfirm = useCallback(() => {
    setLoading(true)

    // Logic
  }, [])

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
        <Fields
          fields={fields}
          values={values}
          setValues={setValues}
          errors={errors}
          setErrors={setErrors}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setDialogOpen(false)}
          sx={sx.button}
          color="primary"
        >
          Do Not Change Password
        </Button>
        <Button onClick={handleConfirm} sx={sx.button} color="secondary">
          Yes, Change My Password
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Confirmation
