import React, { useState } from "react"
import { Grid, Typography, makeStyles } from "@material-ui/core"
import QuickView from "./QuickView"
import frame from "../../images/product-frame-grid.svg"

const useStyles = makeStyles(theme => ({
  frame: {
    backgroundImage: `url(${frame})`,
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    height: "25rem",
    width: "25rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  product: {
    height: "20rem",
    width: "20rem",
  },
  title: {
    backgroundColor: theme.palette.primary.main,
    height: "5rem",
    width: "25rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "-0.1rem",
  },
}))

export default function ProductFrameGrid({ product, variant }) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const imgURL = process.env.GATSBY_STRAPI_URL + variant.images[0].url

  return (
    <Grid item>
      <Grid container direction="column" onClick={() => setOpen(true)}>
        <Grid item classes={{ root: classes.frame }}>
          <img
            src={imgURL}
            alt={product.node.name}
            className={classes.product}
          />
        </Grid>
        <Grid item classes={{ root: classes.title }}>
          <Typography variant="h5">
            {product.node.name.split(" ")[0]}
          </Typography>
        </Grid>
      </Grid>
      <QuickView open={open} setOpen={setOpen} url={imgURL} />
    </Grid>
  )
}