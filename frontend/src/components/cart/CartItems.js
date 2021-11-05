import React, { useContext } from "react"
import { Grid, Typography, makeStyles } from "@material-ui/core"

import Item from "./Item"

import { CartContext } from "../../contexts"

const useStyles = makeStyles(theme => ({}))

export default function CartItems() {
  const classes = useStyles()
  const { cart } = useContext(CartContext)

  return (
    <Grid item container direction="column" lg={6}>
      {cart.map(item => (
        <Item item={item} key={item.variant.id} />
      ))}
    </Grid>
  )
}
