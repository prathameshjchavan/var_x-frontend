import { Button, Grid, Typography } from "@mui/material"
import completeIcon from "../../images/order-placed.svg"
import React, { useCallback } from "react"

const Thankyou = ({ selectedShipping, order }) => {
  const addToDate = useCallback(days => {
    let date = new Date()

    date.setDate(date.getDate() + days)

    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    return `${month}/${day}/${year}`
  }, [])

  const getExpected = useCallback(() => {
    switch (selectedShipping) {
      case "2-DAY SHIPPING":
        return addToDate(2)
      case "OVERNIGHT SHIPPING":
        return addToDate(1)
      default:
        return addToDate(14)
    }
  }, [selectedShipping, addToDate])

  return (
    <Grid
      item
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <img src={completeIcon} alt="order placed" />
      </Grid>
      <Grid item>
        <Typography variant="h4">Expected by {getExpected()}</Typography>
      </Grid>
      <Grid item container>
        <Grid item>
          <Typography variant="body2">Order #{order.id}</Typography>
        </Grid>
        <Grid item>
          <Button>
            <Typography variant="body2">Details &gt;</Typography>
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <Button>
          <Typography variant="body2">Shop &gt;</Typography>
        </Button>
      </Grid>
    </Grid>
  )
}

export default Thankyou
