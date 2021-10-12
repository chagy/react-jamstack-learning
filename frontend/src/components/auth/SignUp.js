import React, { useState } from "react"
import clsx from "clsx"
import {
  Grid,
  Typography,
  makeStyles,
  TextField,
  InputAdornment,
  Button,
  IconButton,
} from "@material-ui/core"
import axios from "axios"

import Fields from "./Fields"
import { EmailPassword } from "./Login"
import { setUser } from "../../contexts/actions"

import addUserIcon from "../../images/add-user.svg"
import nameAdornment from "../../images/name-adornment.svg"
import forward from "../../images/forward-outline.svg"
import backward from "../../images/backwards-outline.svg"

const useStyles = makeStyles(theme => ({
  addUserIcon: {
    height: "10rem",
    width: "11rem",
  },
  textField: {
    width: "20rem",
  },
  input: {
    color: theme.palette.secondary.main,
  },
  facebookSignUp: {
    width: "20rem",
    borderRadius: 50,
    marginTop: "-3rem",
  },
  facebookText: {
    textTransform: "none",
    fontSize: "1.5rem",
  },
  navigation: {
    width: "4rem",
    height: "4rem",
  },
  visibleIcon: {
    padding: 0,
  },
  emailAdornment: {
    height: 17,
    width: 22,
    marginBottom: 10,
  },
  removeButtonMargin: {
    marginTop: 0,
  },
}))

export default function SignUp({ steps, setSelectedStep, user, dispatchUser }) {
  const classes = useStyles()
  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
  })

  const [errors, setErrors] = useState({})
  const [visible, setVisible] = useState(false)
  const [info, setInfo] = useState(false)

  const handleNavigate = direction => {
    if (direction === "forward") {
      setInfo(true)
    } else {
      if (info) {
        setInfo(false)
      } else {
        const login = steps.find(step => step.label === "Login")
        setSelectedStep(steps.indexOf(login))
      }
    }
  }

  const handleComplete = () => {
    axios
      .post(process.env.GATSBY_STRAPI_URL + "/auth/local/register", {
        username: values.name,
        email: values.email,
        password: values.password,
      })
      .then(response => {
        // console.log("User Profile", response.data.user)
        // console.log("JWT", response.data.jwt)

        dispatchUser(setUser({ ...response.data.user, jwt: response.data.jwt }))

        const complete = steps.find(step => step.label === "Complete")

        setSelectedStep(steps.indexOf(complete))
      })
      .catch(error => {
        console.error(error)
      })
  }

  const nameField = {
    name: {
      helperText: "you must enter a name",
      placeholder: "Name",
      startAdornment: <img src={nameAdornment} alt="name" />,
    },
  }

  const fields = info
    ? EmailPassword(classes, false, false, visible, setVisible)
    : nameField

  const disabled =
    Object.keys(errors).some(error => errors[error] === true) ||
    Object.keys(errors).length !== Object.keys(values).length

  return (
    <>
      <Grid item>
        <img src={addUserIcon} alt="new user" className={classes.addUserIcon} />
      </Grid>
      <Fields
        fields={fields}
        errors={errors}
        setErrors={setErrors}
        values={values}
        setValues={setValues}
      />
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          disabled={info && disabled}
          onClick={() => (info ? handleComplete() : null)}
          classes={{
            root: clsx(classes.facebookSignUp, {
              [classes.removeButtonMargin]: info,
            }),
          }}
        >
          <Typography variant="h5" classes={{ root: classes.facebookText }}>
            Sign up {info ? "" : " with Facebook"}
          </Typography>
        </Button>
      </Grid>
      <Grid item container justifyContent="space-between">
        <Grid item>
          <IconButton onClick={() => handleNavigate("backward")}>
            <img
              src={backward}
              alt="back to login"
              classNam={classes.navigation}
            />
          </IconButton>
        </Grid>
        {info ? null : (
          <Grid item>
            <IconButton onClick={() => handleNavigate("forward")}>
              <img
                src={forward}
                alt="continue registration"
                classNam={classes.navigation}
              />
            </IconButton>
          </Grid>
        )}
      </Grid>
    </>
  )
}
