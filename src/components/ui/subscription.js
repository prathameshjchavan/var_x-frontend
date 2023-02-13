import React, { useState, useMemo, Fragment, useContext } from "react"
import {
  Grid,
  Dialog,
  Chip,
  Button,
  IconButton,
  Typography,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import QtyButton from "../product-list/QtyButton"
import SubscriptionIcon from "../../images/Subscription"
import { CartContext, FeedbackContext } from "../../contexts"
import { setSnackbar, addToCart } from "../../contexts/actions"

const Subscription = ({ size, stock, variant, name }) => {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [frequency, setFrequency] = useState("Month")
  const [qty, setQty] = useState(1)
  const { dispatchFeedback } = useContext(FeedbackContext)
  const { dispatchCart } = useContext(CartContext)
  const matches700 = useMediaQuery("(max-width: 700px)")
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))
  const matches500 = useMediaQuery("(max-width: 500px)")

  // sx prop
  const sx = {
    row: {
      height: matches500 ? "auto" : "4rem",
      padding: "0 0.5rem",
    },
    dark: {
      backgroundColor: theme.palette.secondary.main,
    },
    light: {
      backgroundColor: theme.palette.primary.main,
    },
    cartButton: {
      minHeight: matchesSM ? "auto" : "8rem",
      borderRadius: 0,
      width: "100%",
    },
    cartText: {
      color: "#fff",
      fontSize: matches500 ? "2.5rem" : matches700 ? "3.25rem" : "4rem",
    },
    dialog: {
      "& .MuiPaper-root": {
        borderRadius: 0,
        backgroundColor: theme.palette.primary.main,
      },
    },
    chip: {
      backgroundColor: "#fff",
      height: "3rem",
      borderRadius: "50px",
      "& .MuiChip-label": {
        color: theme.palette.secondary.main,
      },
      "&:hover": {
        cursor: "pointer",
      },
    },
    select: {
      "& .MuiInputBase-input": {
        padding: 0,
      },
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
      "& .MuiSelect-select": {
        padding: "0 !important",
      },
    },
    menu: {
      "& .MuiPaper-root": {
        backgroundColor: theme.palette.primary.main,
      },
    },
    menuItem: {
      color: "#fff",
    },
    frequency: {
      marginBottom: matches500 ? "1rem" : undefined,
    },
    buttonWrapper: {
      width: "100%",
    },
  }

  // functions
  const handleCart = () => {
    dispatchCart(
      addToCart(variant, qty, name, stock.attributes.quantity, frequency)
    )
    setOpen(false)
    dispatchFeedback(
      setSnackbar({
        status: "success",
        message: "Subscription Add To Cart.",
      })
    )
  }

  // data
  const frequencies = useMemo(
    () => ["Week", "Two Weeks", "Month", "Three Months", "Six Months", "Year"],
    []
  )

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
        fullScreen={matches500}
        maxWidth="md"
        sx={sx.dialog}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Grid container direction="column" alignItems="center">
          <Grid
            item
            container
            justifyContent="space-between"
            alignItems="center"
            sx={{ ...sx.row, ...sx.dark }}
          >
            <Grid item>
              <Typography variant="h4">Quantity</Typography>
            </Grid>
            <Grid item>
              <QtyButton
                stock={{ attributes: { quantity: stock } }}
                override={{ value: qty, setValue: setQty }}
                variant={variant}
                white
                hideCartButton
                round
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            justifyContent="space-between"
            alignItems={matches500 ? "flex-start" : "center"}
            direction={matches500 ? "column" : "row"}
            sx={{ ...sx.row, ...sx.light }}
          >
            <Grid item>
              <Typography variant="h4">Deliver Every</Typography>
            </Grid>
            <Grid item>
              <Select
                sx={{ ...sx.select, ...sx.frequency }}
                IconComponent={() => null}
                MenuProps={{ sx: sx.menu }}
                value={frequency}
                onChange={event => setFrequency(event.target.value)}
                renderValue={selected => <Chip label={selected} sx={sx.chip} />}
              >
                {frequencies.map(frequency => (
                  <MenuItem key={frequency} sx={sx.menuItem} value={frequency}>
                    {frequency}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Grid item sx={sx.buttonWrapper}>
            <Button
              onClick={handleCart}
              variant="contained"
              color="secondary"
              sx={sx.cartButton}
            >
              <Typography variant="h1" sx={sx.cartText}>
                Add Subscription To Cart
              </Typography>
            </Button>
          </Grid>
          {matches500 && (
            <Grid item>
              <Button onClick={() => setOpen(false)}>
                <Typography variant="body2">Cancel</Typography>
              </Button>
            </Grid>
          )}
        </Grid>
      </Dialog>
    </Fragment>
  )
}

export default Subscription
