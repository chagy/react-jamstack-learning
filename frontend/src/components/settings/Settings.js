import React, { useContext, useState, useEffect } from "react"
import clsx from "clsx"
import { Grid, Typography, makeStyles } from "@material-ui/core"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

import Details from "./Details"
import Payments from "./Payments"
import Location from "./Location"
import Edit from "./Edit"

import { UserContext } from "../../contexts"

const useStyles = makeStyles(theme => ({
  bottomRow: {
    borderTop: "4px solid #fff",
  },
  sectionContainer: {
    height: "50%",
  },
}))

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PK)

export default function Settings({ setSelectedSetting }) {
  const classes = useStyles()
  const { user, dispatchUser } = useContext(UserContext)
  const [edit, setEdit] = useState(false)
  const [changesMade, setChangesMade] = useState(false)

  const [detailValues, setDetailValues] = useState({
    name: "",
    phone: "",
    email: "",
    password: "********",
  })
  const [detailSlot, setDetailSlot] = useState(0)
  const [detailErrors, setDetailErrors] = useState({})

  const [locationValues, setLocationValues] = useState({
    street: "",
    zip: "",
    city: "",
    state: "",
  })

  const [locationSlot, setLocationSlot] = useState(0)
  const [locationErrors, setLocationErrors] = useState({})

  const [billingSlot, setBillingSlot] = useState(0)

  const allErrors = { ...detailErrors, ...locationErrors }
  const isError = Object.keys(allErrors).some(
    error => allErrors[error] === true
  )

  useEffect(() => {
    setDetailErrors({})
  }, [detailSlot])

  useEffect(() => {
    setLocationErrors({})
  }, [locationSlot])

  return (
    <>
      <Grid container classes={{ root: classes.sectionContainer }}>
        <Details
          user={user}
          edit={edit}
          setChangesMade={setChangesMade}
          values={detailValues}
          setValues={setDetailValues}
          errors={detailErrors}
          setErrors={setDetailErrors}
          slot={detailSlot}
          setSlot={setDetailSlot}
        />
        <Elements stripe={stripePromise}>
          <Payments
            user={user}
            edit={edit}
            slot={billingSlot}
            setSlot={setBillingSlot}
          />
        </Elements>
      </Grid>
      <Grid
        container
        classes={{ root: clsx(classes.bottomRow, classes.sectionContainer) }}
      >
        <Location
          user={user}
          edit={edit}
          setChangesMade={setChangesMade}
          values={locationValues}
          setValues={setLocationValues}
          errors={locationErrors}
          setErrors={setLocationErrors}
          slot={locationSlot}
          setSlot={setLocationSlot}
        />
        <Edit
          user={user}
          dispatchUser={dispatchUser}
          edit={edit}
          setEdit={setEdit}
          setSelectedSetting={setSelectedSetting}
          changesMade={changesMade}
          details={detailValues}
          locations={locationValues}
          detailSlot={detailSlot}
          locationSlot={locationSlot}
          isError={isError}
        />
      </Grid>
    </>
  )
}
