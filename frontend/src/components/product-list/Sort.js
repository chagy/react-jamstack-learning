import React from "react"
import clsx from "clsx"
import {
  Grid,
  IconButton,
  Chip,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core"

import sort from "../../images/sort.svg"
import close from "../../images/close-outline.svg"

const useStyles = makeStyles(theme => ({
  chipContainer: {
    [theme.breakpoints.down("md")]: {
      margin: "0.5rem",
    },
  },
  notActive: {
    backgroundColor: theme.palette.primary.main,
  },
}))

export default function Sort({ setOption, sortOptions, setSortOptions }) {
  const classes = useStyles()
  const matchesXS = useMediaQuery(theme => theme.breakpoints.down("xs"))

  const handleSort = i => {
    const newOptions = [...sortOptions]

    newOptions.map(option => (option.active = false))

    newOptions[i].active = true

    setSortOptions(newOptions)
  }

  return (
    <Grid item container justify="space-between" alignItems="center">
      <Grid item>
        <IconButton onClick={() => setOption(null)}>
          <img src={sort} alt="sort" />
        </IconButton>
      </Grid>
      <Grid item xs>
        <Grid
          container
          justify="space-around"
          direction={matchesXS ? "column" : "row"}
          alignItems={matchesXS ? "center" : undefined}
        >
          {sortOptions.map((option, i) => (
            <Grid
              classes={{ root: classes.chipContainer }}
              item
              key={option.label}
            >
              <Chip
                label={option.label}
                onClick={() => handleSort(i)}
                color={option.active !== true ? "primary" : "secondary"}
                classes={{
                  root: clsx({ [classes.notActive]: option.active !== true }),
                }}
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
