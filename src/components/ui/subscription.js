import React, { useState, useMemo, Fragment } from "react"
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
} from "@mui/material"
import { styled } from "@mui/material/styles"
import QtyButton from "../product-list/QtyButton"
import { CartContext } from "../../contexts"
import SubscriptionIcon from "../../images/Subscription"

const Subscription = ({ size, stock, variant }) => {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [frequency, setFrequency] = useState("Month")

  // sx prop
  const sx = {
    row: {
      height: "4rem",
      padding: "0 0.5rem",
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
            alignItems="center"
            sx={{ ...sx.row, ...sx.dark }}
          >
            <Grid item>
              <Typography variant="h4">Quantity</Typography>
            </Grid>
            <Grid item>
              <QtyButton
                stock={{ attributes: { quantity: stock } }}
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
            alignItems="center"
            sx={{ ...sx.row, ...sx.light }}
          >
            <Grid item>
              <Typography variant="h4">Deliver Every</Typography>
            </Grid>
            <Grid item>
              <Select
                sx={sx.select}
                IconComponent={() => null}
                MenuProps={{ sx: sx.menu }}
                value={frequency}
                onChange={event => setFrequency(event.target.value)}
                renderValue={selected => <Chip label={selected} sx={sx.chip} />}
                disableUnderline
              >
                {frequencies.map(frequency => (
                  <MenuItem key={frequency} sx={sx.menuItem} value={frequency}>
                    {frequency}
                  </MenuItem>
                ))}
              </Select>
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
