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
  useMediaQuery,
} from "@mui/material"
import { getEmailPasswordFields } from "../auth/Login"
import Fields from "../auth/Fields"

const Confirmation = ({
  dialogOpen,
  setDialogOpen,
  user,
  dispatchFeedback,
  setSnackbar,
  detailValues,
  setDetailValues,
}) => {
  const theme = useTheme()
  const [values, setValues] = useState({ password: "", confirmation: "" })
  const [errors, setErrors] = useState({})
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))
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
  const disabled = useMemo(
    () =>
      Object.keys(errors).some(error => errors[error] === true) ||
      Object.keys(errors).length !== Object.keys(values).length,
    [errors, values]
  )

  // sx prop
  const sx = {
    title: {
      color: theme.palette.error.main,
    },
    contentText: {
      marginBottom: matchesSM ? "1rem" : undefined,
    },
    button: {
      fontFamily: "Montserrat",
    },
  }

  // functions
  const handleConfirm = useCallback(() => {
    setLoading(true)

    axios
      .post(
        `${process.env.STRAPI_API_URL}/api/auth/change-password`,
        {
          currentPassword: values.password,
          password: detailValues.password,
          passwordConfirmation: values.confirmation,
        },
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      )
      .then(response => {
        dispatchFeedback(
          setSnackbar({
            status: "success",
            message: "Password Changed Successfully",
          })
        )
      })
      .catch(error => {
        console.error(error)
        setDetailValues(values => ({ ...values, password: "********" }))
        setValues({ password: "", confirmation: "" })
        if (
          error.response.data.error.message ===
          "The provided current password is invalid"
        ) {
          dispatchFeedback(
            setSnackbar({ status: "error", message: "Old Password Invalid." })
          )
        } else if (
          error.response.data.error.message === "Passwords do not match"
        ) {
          dispatchFeedback(
            setSnackbar({ status: "error", message: "Passwords do not match." })
          )
        } else {
          dispatchFeedback(
            setSnackbar({
              status: "error",
              message:
                "There was a problem changing your password, please try again.",
            })
          )
        }
      })
      .finally(() => {
        setLoading(false)
        setDialogOpen(false)
        setValues({ password: "", confirmation: "" })
      })
  }, [
    dispatchFeedback,
    setSnackbar,
    user,
    values,
    setDialogOpen,
    detailValues,
    setDetailValues,
  ])

  const handleCancel = useCallback(() => {
    setDialogOpen(false)
    setDetailValues(values => ({ ...values, password: "********" }))
    setValues({ password: "", confirmation: "" })
    dispatchFeedback(
      setSnackbar({
        status: "error",
        message: "Your password has NOT been changed.",
      })
    )
  }, [dispatchFeedback, setDetailValues, setDialogOpen, setSnackbar])

  return (
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
      <DialogTitle disableTypography>
        <Typography
          align={matchesSM ? "center" : "inherit"}
          variant="h3"
          sx={sx.title}
        >
          Change Password
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={sx.contentText}
          align={matchesSM ? "center" : undefined}
        >
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
          onClick={handleCancel}
          disabled={loading}
          sx={sx.button}
          color="primary"
        >
          Do Not Change Password
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={loading || disabled}
          sx={sx.button}
          color="secondary"
        >
          {loading ? <CircularProgress /> : "Yes, Change My Password"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Confirmation
