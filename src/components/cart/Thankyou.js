import { Button, Grid, Typography } from "@mui/material"
import completeIcon from "../../images/order-placed.svg"
import { Link } from "gatsby"
import React, { useCallback } from "react"

const Thankyou = ({ selectedShipping, order }) => {
  // sx prop
  const sx = {
    container: {
      height: "100%",
      position: "relative",
    },
    icon: { marginTop: "-3rem" },
    order: {
      fontWeight: 600,
    },
    detailsButton: {
      padding: "0.25rem 0",
      textTransform: "none",
    },
    shopWrapper: {
      position: "absolute",
      right: "1rem",
      bottom: "1rem",
    },
    shopText: {
      fontSize: "2rem",
      fontWeight: 600,
      textTransform: "none",
    },
  }

  // funtions
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
      sx={sx.container}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item sx={sx.icon}>
        <img src={completeIcon} alt="order placed" />
      </Grid>
      <Grid item>
        <Typography variant="h4">Expected by {getExpected()}</Typography>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography sx={sx.order} variant="body2">
              Order #{order.id}
            </Typography>
          </Grid>
          <Grid item>
            <Button sx={sx.detailsButton}>
              <Typography variant="body2">Details &gt;</Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sx={sx.shopWrapper}>
        <Button component={Link} to="/hats">
          <Typography sx={sx.shopText} variant="body2">
            Shop &gt;
          </Typography>
        </Button>
      </Grid>
    </Grid>
  )
}

export default Thankyou
