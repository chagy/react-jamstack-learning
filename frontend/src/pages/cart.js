import React, { useContext } from "react"
import { Grid, Typography, makeStyles } from "@material-ui/core"

import Layout from "../components/ui/layout"
import CheckoutPortal from "../components/cart/CheckoutPortal"
import CartItems from "../components/cart/CartItems"

import { UserContext } from "../contexts"

const useStyles = makeStyles(theme => ({
  cartContainer: {
    minHeight: "70vh",
  },
}))

export default function QuickView() {
  const classes = useStyles()
  const { user } = useContext(UserContext)

  return (
    <Layout>
      <Grid
        container
        direction="column"
        alignItems="center"
        classes={{ root: classes.cartContainer }}
      >
        <Grid item>
          <Typography variant="h1" align="center">
            {user.username}'s Cart
          </Typography>
        </Grid>
        <Grid item container>
          <CartItems />
          <CheckoutPortal user={user} />
        </Grid>
      </Grid>
    </Layout>
  )
}
