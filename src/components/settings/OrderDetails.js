import React from "react"
import {
  Grid,
  SwipeableDrawer,
  Chip,
  Typography,
  useTheme,
} from "@mui/material"

const OrderDetails = ({ orders, open, setOpen }) => {
  const theme = useTheme()
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)
  const order = orders.find(order => order.id === open)

  // sx prop
  const sx = {
    drawer: {
      "& .MuiPaper-root": {
        height: "100%",
        width: "30rem",
        backgroundColor: theme.palette.primary.main,
      },
    },
    id: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    chip: {
      "& .MuiChip-label": {
        fontWeight: 600,
      },
    },
    date: {
      fontWeight: 600,
      marginLeft: "1rem",
    },
  }

  return (
    <SwipeableDrawer
      open={!!open}
      onOpen={() => null}
      onClose={() => setOpen(null)}
      sx={sx.drawer}
      anchor="right"
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
    >
      <Grid container direction="column">
        <Grid item>
          <Typography align="center" variant="h2" sx={sx.id}>
            Order #{order?.id}
          </Typography>
        </Grid>
        <Grid item container>
          <Grid item>
            <Chip label={order?.status} color="secondary" sx={sx.chip} />
          </Grid>
          <Grid item>
            <Typography variant="body2" sx={sx.date}>{`${
              order?.createdAt.split("-")[1]
            }/${order?.createdAt.split("-")[2].split("T")[0]}/${
              order?.createdAt.split("-")[0]
            }`}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </SwipeableDrawer>
  )
}

export default OrderDetails
