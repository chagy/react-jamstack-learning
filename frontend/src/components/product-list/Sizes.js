import React from "react"
import clsx from "clsx"
import { Grid, Typography, makeStyles, Button } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  size: {
    color: "#fff",
  },
  button: {
    border: "3px solid #fff",
    borderRadius: 50,
    height: "3rem",
    width: "3rem",
    minWidth: 0,
  },
  selected: {
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}))

export default function Sizes({ sizes, selectedSize, setSelectedSize }) {
  const classes = useStyles()

  const possibleSizes = ["S", "M", "L"]
  // const possibleExtraSizes = ["S","M","L","XL"]
  // const possibleShoeSizes = [8,9,10]
  var actualSizes = []

  if (possibleSizes.every(size => sizes.includes(size))) {
    actualSizes = possibleSizes
  }

  return (
    <Grid item container justify="space-between">
      {actualSizes.map(size => (
        <Grid item key={size}>
          <Button
            onClick={() => setSelectedSize(size)}
            classes={{
              root: clsx(classes.button, {
                [classes.selected]: selectedSize === size,
              }),
            }}
          >
            <Typography variant="h3" classes={{ root: classes.size }}>
              {size}
            </Typography>
          </Button>
        </Grid>
      ))}
    </Grid>
  )
}
