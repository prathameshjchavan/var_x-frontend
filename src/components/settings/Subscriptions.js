import React, { useState, useEffect, useContext } from "react"
import { Grid } from "@mui/material"
import axios from "axios"
import { UserContext, FeedbackContext } from "../../contexts"
import { setSnackbar } from "../../contexts/actions"
import SettingsGrid from "./SettingsGrid"

const Subscriptions = ({ setSelectedSetting }) => {
  const { user } = useContext(UserContext)
  const { dispatchFeedback } = useContext(FeedbackContext)
  const [subscriptions, setSubscriptions] = useState([])

  // sx prop
  const sx = {}

  // data
  const columns = [
    { field: "details", headerName: "Details", width: 250, sortable: false },
    { field: "item", headerName: "Item", width: 250, sortable: false },
    { field: "quantity", headerName: "Quantity", width: 250, sortable: false },
    {
      field: "frequency",
      headerName: "Frequency",
      width: 250,
      sortable: false,
    },
    { field: "next order", headerName: "Next Order", width: 250 },
    { field: "total", headerName: "Total", width: 250 },
    { field: "", width: 250, sortable: false },
  ]

  // useEffects
  useEffect(() => {
    axios
      .get(`${process.env.STRAPI_API_URL}/api/subscriptions/me`, {
        headers: { Authorization: `Bearer ${user.jwt}` },
      })
      .then(response => {
        setSubscriptions(response.data)
      })
      .catch(error => {
        console.error(error)
        dispatchFeedback(
          setSnackbar({
            status: "error",
            message:
              "There was a problem retrieving your subscriptions. Please try again.",
          })
        )
      })
  }, [])

  return (
    <SettingsGrid
      setSelectedSetting={setSelectedSetting}
      rows={[]}
      columns={columns}
      rowsPerPage={3}
    />
  )
}

export default Subscriptions
