import React from "react"
import {
  Grid,
  Typography,
  Button,
  IconButton,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core"
import { Link } from "gatsby"

import cta from "../../images/cta.svg"

const useStyles = makeStyles(theme => ({
  account: {
    color: "#fff",
    marginLeft: "3rem",
  },
  body: {
    maxWidth: "45rem",
    [theme.breakpoints.down("md")]: {
      padding: "0 1rem",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0",
    },
  },
  container: {
    marginBottom: "15rem",
  },
  buttonContainer: {
    marginTop: "3rem",
  },
  headingContainer: {
    [theme.breakpoints.down("md")]: {
      padding: "0 1rem",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0",
    },
  },
  icon: {
    [theme.breakpoints.down("xs")]: {
      height: "18rem",
      width: "20rem",
    },
  },
}))

export default function CallToAction() {
  const classes = useStyles()
  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))

  return (
    <Grid
      container
      justify="space-around"
      classes={{ root: classes.container }}
      alignItems="center"
      direction={matchesMD ? "column" : "row"}
    >
      <Grid item>
        <img src={cta} className={classes.icon} alt="quality committed" />
      </Grid>
      <Grid item>
        <Grid container direction="column">
          <Grid item classes={{ root: classes.headingContainer }}>
            <Typography variant="h1" align={matchesMD ? "center" : undefined}>
              Committed To Quality
            </Typography>
          </Grid>
          <Grid item classes={{ root: classes.body }}>
            <Typography
              variant="body1"
              align={matchesMD ? "center" : undefined}
            >
              JMA publication of 6 chapters outlining the use of satellite
              imagery (English) The publication, “Analysis and Use of
              Meteorological Satellite Images” has just been issued by the staff
              members of Analysis Division of MSC through the preparation for
              several years. This publication is based on the effort of the
              previous publications but refreshed to provide new imagery and the
              latest knowledge and to be used as a reference book for satellite
              image analysis. This publication was initially intended for the
              use in the Analysis Division, to improve satellite image analysis
              techniques, but the authors would be pleased if it can contribute
              to the use of satellite images in the weather forecasting
              operations at the meteorological and hydrological services.
            </Typography>
          </Grid>
          <Grid
            item
            container
            classes={{ root: classes.buttonContainer }}
            justify={matchesMD ? "center" : undefined}
          >
            <Grid item>
              <Button
                component={Link}
                to="/contact"
                variant="outlined"
                color="primary"
              >
                Contact Us
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/account"
                classes={{ root: classes.account }}
              >
                Create Account
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
