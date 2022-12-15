import React, { useReducer, createContext, useMemo, Fragment } from "react"
import Snackbar from "@mui/material/Snackbar"
import { setSnackbar } from "../actions"
import feedbackReducer from "../reducers/feedback-reducer"

export const FeedbackContext = createContext()
const FeedbackProvider = FeedbackContext.Provider

export function FeedbackWrapper({ children }) {
  const defaultFeedback = useMemo(
    () => ({
      open: false,
      backgroundColor: "",
      message: "",
    }),
    []
  )
  const [feedback, dispatchFeedback] = useReducer(
    feedbackReducer,
    defaultFeedback
  )

  return (
    <Fragment>
      <FeedbackProvider value={{ feedback, dispatchFeedback }}>
        {children}
      </FeedbackProvider>
      <Snackbar
        open={feedback.open}
        message={feedback.message}
        ContentProps={{
          style: {
            backgroundColor: feedback.backgroundColor,
            fontSize: "1.25rem",
          },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={() => dispatchFeedback(setSnackbar({ open: false }))}
      />
    </Fragment>
  )
}
