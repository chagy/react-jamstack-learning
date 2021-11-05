import React from "react"
import {
  Grid,
  Typography,
  makeStyles,
  Button,
  useMediaQuery,
} from "@material-ui/core"
import { Link } from "gatsby"

import complete from "../../images/order-placed.svg"

const useStyles = makeStyles(theme => ({
  detailButton: {
    padding: "0.25rem 0",
    textTransform: "none",
  },
  detailsText: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    },
  },
  order: {
    fontWeight: 600,
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
  shopText: {
    fontSize: "2rem",
    fontWeight: 600,
    textTransform: "none",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
  container: {
    height: "100%",
    position: "relative",
  },
  shopWrapper: {
    position: "absolute",
    bottom: "1rem",
    right: "1rem",
  },
  icon: {
    marginTop: "-3rem",
  },
}))

export default function ThankYou({ selectedShipping, order }) {
  const classes = useStyles()
  const matchesXS = useMediaQuery(theme => theme.breakpoints.down("xs"))

  const addToDate = days => {
    var date = new Date()

    date.setDate(date.getDate() + days)

    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    return `${month}/${day}/${year}`
  }

  const getExpected = () => {
    switch (selectedShipping) {
      case "2-DAY SHIPPING":
        return addToDate(2)
      case "OVERNIGHT SHIPPING":
        return addToDate(1)
      default:
        return addToDate(14)
    }
  }

  return (
    <Grid
      item
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      classes={{ root: classes.container }}
    >
      <Grid item>
        <img src={complete} alt="order placed" className={classes.icon} />
      </Grid>
      <Grid item>
        <Typography variant="h4" align="center">
          Expected by {getExpected()}
        </Typography>
        <Grid
          item
          container
          justifyContent={matchesXS ? "space-around" : "space-between"}
          alignItems="center"
        >
          <Grid item>
            <Typography variant="body2" classes={{ root: classes.order }}>
              Order #{order.id.slice(order.id.length - 10, order.id.length)}
            </Typography>
          </Grid>
          <Grid item>
            <Button classes={{ root: classes.detailButton }}>
              <Typography
                variant="body2"
                classes={{ root: classes.detailsText }}
              >
                Details {`>`}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item classes={{ root: classes.shopWrapper }}>
        <Button component={Link} to="/hats">
          <Typography variant="body2" classes={{ root: classes.shopText }}>
            Shop {`>`}
          </Typography>
        </Button>
      </Grid>
    </Grid>
  )
}
