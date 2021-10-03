import React, { useState } from "react"
import { Grid, makeStyles, Button, useMediaQuery } from "@material-ui/core"

import ProductFrameGrid from "../product-list/ProductFrameGrid"

const useStyles = makeStyles(theme => ({
  recentContainer: {
    margin: "10rem 0",
    "& > :not(:last-child)": {
      marginRight: "2rem",
    },
  },
  arrow: {
    minWidth: 0,
    height: "4rem",
    width: "4rem",
    fontSize: "4rem",
    color: theme.palette.primary.main,
    borderRadius: 50,
    [theme.breakpoints.down("xs")]: {
      height: "1rem",
      width: "1rem",
    },
  },
}))

export default function RecentlyViewed({ products }) {
  const classes = useStyles()
  const [firstIndex, setFirstIndex] = useState(0)

  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))
  const matchesSM = useMediaQuery(theme => theme.breakpoints.down("SM"))

  const displayNum = matchesSM ? 1 : matchesMD ? 2 : 4

  const handleNavigation = direction => {
    if (firstIndex === 0 && direction === "backward") return null
    if (firstIndex + displayNum === products.length && direction === "forward")
      return null
    setFirstIndex(direction === "forward" ? firstIndex + 1 : firstIndex - 1)
  }

  return (
    <Grid
      item
      container
      justify="center"
      alignItems="center"
      classes={{ root: classes.recentContainer }}
    >
      <Grid item>
        <Button
          onClick={() => handleNavigation("beakword")}
          classes={{ root: classes.arrow }}
        >
          {"<"}
        </Button>
      </Grid>
      {products
        ? products.slice(firstIndex, firstIndex + displayNum).map(product => {
            const hasStyles = product.node.variants.some(
              variant => variant.style !== null
            )
            return (
              <ProductFrameGrid
                key={product.node.variants[product.selectedVariant].id}
                product={product}
                variant={product.node.variants[product.selectedVariant]}
                disableQuickView
                small
                hasStyles={hasStyles}
              />
            )
          })
        : null}
      <Grid item>
        <Button
          onClick={() => handleNavigation("forward")}
          classes={{ root: classes.arrow }}
        >
          {">"}
        </Button>
      </Grid>
    </Grid>
  )
}
