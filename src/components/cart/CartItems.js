import { Grid } from "@mui/material"
import React, { useContext } from "react"
import { CartContext } from "../../contexts"
import Item from "./Item"

const CartItems = () => {
  const { cart } = useContext(CartContext)

  return (
    <Grid item container direction="column" xs={6}>
      {cart.map(item => (
        <Item key={item.variant.id} item={item} />
      ))}
    </Grid>
  )
}

export default CartItems
