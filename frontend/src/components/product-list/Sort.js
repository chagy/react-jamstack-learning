import React from "react"
import {
  Grid,
  Typography,
  makeStyles,
  IconButton,
  Chip,
} from "@material-ui/core"

import sort from "../../images/sort.svg"
import close from "../../images/close-outline.svg"

const useStyles = makeStyles(theme => ({
  chipRoot: {
    backgroundColor: theme.palette.secondary.main,
  },
  chipLabel: {
    ...theme.typography.body1,
    color: "#fff",
    fontWeight: 500,
  },
}))

export default function Sort({ setOption }) {
  const classes = useStyles()

  const sortOptions = [
    { label: "A-Z" },
    { label: "Z-A" },
    { label: "NEWEST" },
    { label: "OLDEST" },
    { label: "PRICE ->" },
    { label: "PRICE <-" },
    { label: "REVIEWS" },
  ]

  return (
    <Grid item container justify="space-between" alignItems="center">
      <Grid item>
        <IconButton onClick={() => setOption(null)}>
          <img src={sort} alt="sort" />
        </IconButton>
      </Grid>
      <Grid item xs>
        <Grid container justify="space-around">
          {sortOptions.map(option => (
            <Grid item key={option.label}>
              <Chip
                label={option.label}
                classes={{ root: classes.chipRoot, label: classes.chipLabel }}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item>
        <IconButton onClick={() => setOption(null)}>
          <img src={close} alt="close" />
        </IconButton>
      </Grid>
    </Grid>
  )
}
