import React, { useState } from "react"
import { Grid, Typography, makeStyles, Chip } from "@material-ui/core"

import Fields from "../auth/Fields"
import Slots from "./Slots"

import localtionIcon from "../../images/location.svg"
import streetAdornment from "../../images/street-adornment.svg"
import zipAdornment from "../../images/zip-adornment.svg"

const useStyles = makeStyles(theme => ({
  icon: {
    marginBottom: "3rem",
  },
  chipWrapper: {
    marginTop: "2rem",
    marginBottom: "3rem",
  },
  fieldContainer: {
    "& > :not(:first-child)": {
      marginTop: "2rem",
    },
  },
  slotContainer: {
    position: "absolute",
    bottom: 0,
  },
  locationContainer: {
    position: "relative",
  },
}))

export default function Location() {
  const classes = useStyles()
  const [values, setValues] = useState({ street: "", zip: "" })
  const [errors, setErrors] = useState({})

  const fields = {
    street: {
      placeholder: "Street",
      helperText: "invalid address",
      startAdornment: <img src={streetAdornment} alt="street" />,
    },
    zip: {
      placeholder: "Zip Code",
      helperText: "invalid zip code",
      startAdornment: <img src={zipAdornment} alt="zip code" />,
    },
  }

  return (
    <Grid
      item
      container
      direction="column"
      xs={6}
      alignItems="center"
      justifyContent="center"
      classes={{ root: classes.locationContainer }}
    >
      <Grid item>
        <img
          src={localtionIcon}
          alt="location settings"
          className={classes.icon}
        />
      </Grid>
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        classes={{ root: classes.fieldContainer }}
      >
        <Fields
          fields={fields}
          values={values}
          setValues={setValues}
          errors={errors}
          setErrors={setErrors}
          isWhite
        />
      </Grid>
      <Grid item classes={{ root: classes.chipWrapper }}>
        <Chip label="City,State" />
      </Grid>
      <Grid item container classes={{ root: classes.slotContainer }}>
        <Slots />
      </Grid>
    </Grid>
  )
}
