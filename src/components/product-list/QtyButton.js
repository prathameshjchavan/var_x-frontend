import { Badge, Button, Grid, Typography, useTheme } from "@mui/material"
import Cart from "../../images/Cart"
import React, { useEffect, useState, useContext, useCallback } from "react"
import { CartContext } from "../../contexts"
import { addToCart } from "../../contexts/actions"

const QtyButton = ({ variant, stock, name }) => {
  const theme = useTheme()
  const [qty, setQty] = useState(1)
  const [success, setSuccess] = useState(false)
  const { dispatchCart } = useContext(CartContext)

  // sx prop
  const sx = {
    mainContainer: {
      height: "3rem",
    },
    buttonContainer: {
      width: "fit-content",
      border: `3px solid ${theme.palette.secondary.light}`,
      borderRadius: 50,
    },
    button: {
      background: theme.palette.secondary.main,
      border: "none !important",
      borderRadius: 0,
    },
    editButtonContainer: {
      "& :first-of-type .MuiButton-root": {
        height: "25.5px",
        borderBottom: "3px solid #fff !important",
      },
      "& :last-of-type .MuiButton-root > .MuiTypography-root": {
        marginTop: "-0.3rem",
      },
      borderWidth: "0 3px 0 3px",
      borderStyle: "solid",
      borderColor: "#fff",
      width: "3.5rem",
    },
    editButton: {
      height: "22.5px",
      padding: 0,
      minWidth: 0,
      width: "100%",
    },
    qtyButton: {
      borderRadius: "50px 0 0 50px",
      width: "3rem",
      minWidth: 0,
      height: "3rem",
      "& .MuiTypography-root": {
        marginRight: "-0.3rem",
      },
      "&:hover": { backgroundColor: theme.palette.secondary.main },
    },
    cartButton: {
      borderRadius: "0 50px 50px 0",
      overflow: "hidden",
      height: "3rem",
      transition: "background-color 1s ease",
      "&:hover .MuiBadge-badge": {
        backgroundColor: theme.palette.primary.main,
      },
    },
    qtyText: {
      color: "#fff",
    },
    badge: {
      "& .MuiBadge-badge": {
        fontSize: "1.5rem",
        padding: 0,
      },
    },
    success: {
      backgroundColor: success ? theme.palette.success.main : undefined,
      "&:hover": {
        backgroundColor: success ? theme.palette.success.main : undefined,
      },
    },
  }

  // functions
  const handleChange = useCallback(
    direction => {
      if (qty === stock.attributes.quantity && direction === "up") return null
      if (qty === 1 && direction === "down") return null
      const newQty = direction === "up" ? qty + 1 : qty - 1
      setQty(newQty)
    },
    [qty, stock.attributes.quantity]
  )

  const handleCart = useCallback(() => {
    setSuccess(true)
    dispatchCart(addToCart(variant, qty, name, stock.attributes.quantity))
  }, [dispatchCart, variant, qty, name, stock.attributes.quantity])

  // useEffects
  useEffect(() => {
    if (stock === -1) return undefined
    if (qty > stock.attributes.quantity) setQty(stock.attributes.quantity)
  }, [stock, qty])

  useEffect(() => {
    let timer

    if (success) {
      timer = setTimeout(() => setSuccess(false), 1500)
    }

    return () => clearTimeout(timer)
  }, [success])

  return (
    <Grid item sx={sx.mainContainer}>
      <Grid container sx={sx.buttonContainer}>
        <Grid item>
          <Button disableRipple sx={{ ...sx.button, ...sx.qtyButton }}>
            <Typography variant="h3" sx={sx.qtyText}>
              {qty}
            </Typography>
          </Button>
        </Grid>
        <Grid item>
          <Grid container direction="column" sx={sx.editButtonContainer}>
            <Grid item>
              <Button
                disableRipple
                onClick={() => handleChange("up")}
                sx={{ ...sx.button, ...sx.editButton }}
              >
                <Typography variant="h3" sx={sx.qtyText}>
                  +
                </Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button
                disableRipple
                onClick={() => handleChange("down")}
                sx={{ ...sx.button, ...sx.editButton }}
              >
                <Typography variant="h3" sx={sx.qtyText}>
                  -
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            onClick={handleCart}
            disableRipple
            sx={{ ...sx.button, ...sx.cartButton, ...sx.success }}
          >
            {success ? (
              <Typography variant="h3" sx={sx.qtyText}>
                ✓
              </Typography>
            ) : (
              <Badge
                color="secondary"
                sx={sx.badge}
                overlap="circular"
                badgeContent="+"
              >
                <Cart color="#fff" />
              </Badge>
            )}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default QtyButton
