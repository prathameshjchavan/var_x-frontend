import React, { useState, Fragment } from "react"
import {
  Grid,
  Dialog,
  Chip,
  Button,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import QtyButton from "../product-list/QtyButton"
import { CartContext } from "../../contexts"
import SubscriptionIcon from "../../images/Subscription"

const Subscription = ({ size }) => {
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  // sx prop
  const sx = {
    row: {
      height: "4rem",
    },
    dark: {
      backgroundColor: theme.palette.secondary.main,
    },
    light: {
      backgroundColor: theme.palette.primary.main,
    },
    cartButton: {
      height: "8rem",
      borderRadius: 0,
      width: "100%",
    },
    cartText: {
      color: "#fff",
      fontSize: "4rem",
    },
    dialog: {
      "& .MuiPaper-root": { borderRadius: 0 },
    },
  }

  // styled components
  const IconWrapper = styled("span")(() => ({
    height: `${size || 2}rem`,
    width: `${size || 2}rem`,
  }))

  return (
    <Fragment>
      <IconButton onClick={() => setOpen(true)}>
        <IconWrapper>
          <SubscriptionIcon />
        </IconWrapper>
      </IconButton>
      <Dialog
        fullWidth
        maxWidth="md"
        sx={sx.dialog}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Grid container direction="column">
          <Grid
            item
            container
            justifyContent="space-between"
            sx={{ ...sx.row, ...sx.dark }}
          >
            <Grid item>
              <Typography variant="h4">Quantity</Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            justifyContent="space-between"
            sx={{ ...sx.row, ...sx.light }}
          >
            <Grid item>
              <Typography variant="h4">Deliver Every</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" sx={sx.cartButton}>
              <Typography variant="h1" sx={sx.cartText}>
                Add Subscription To Cart
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </Fragment>
  )
}

export default Subscription
