import React, { useState, useContext, useEffect } from "react"
import { Grid, Typography, makeStyles, Paper } from "@material-ui/core"

import Login from "./Login"
import SignUp from "./SignUp"
import Complete from "./Complete"
import { UserContext, FeedbackContext } from "../../contexts"

const useStyles = makeStyles(theme => ({
  paper: {
    border: `2rem solid ${theme.palette.secondary.main}`,
    width: "50rem",
    height: "40rem",
    borderRadius: 0,
  },
  inner: {
    height: "40rem",
    width: "100%",
    border: `2rem solid ${theme.palette.primary.main}`,
  },
  container: {
    marginBottom: "8rem",
  },
  "@global": {
    ".MuiInput-underline:before, .MuiInput-underline:hover:not(.Mui-disabled):before":
      {
        borderBottom: `2px solid ${theme.palette.primary.main}`,
      },
    ".MuiInput-underline:after": {
      borderBottom: `2px solid ${theme.palette.secondary.main}`,
    },
  },
}))

export default function AuthPortal() {
  const classes = useStyles()
  const [selectedStep, setSelectedStep] = useState(0)
  const { user, dispatchUser } = useContext(UserContext)
  const { feedback, dispatchFeedback } = useContext(FeedbackContext)

  const steps = [
    { component: Login, label: "Login" },
    { component: SignUp, label: "Sign Up" },
    { component: Complete, label: "Complete" },
    { component: Reset, label: "Reset" },
  ]

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get("code")

    if (code) {
      const resetStep = steps.find(step => step.label === "Reset")
      setSelectedStep(steps.indexOf(resetStep))
    }
  }, [])

  return (
    <Grid
      container
      justifyContent="center"
      classes={{ root: classes.container }}
    >
      <Grid item>
        <Paper classes={{ root: classes.paper }}>
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            classes={{ root: classes.inner }}
          >
            {steps.map((Step, i) =>
              selectedStep === i ? (
                <Step.component
                  setSelectedStep={setSelectedStep}
                  steps={steps}
                  user={user}
                  dispatchUser={dispatchUser}
                  feedback={feedback}
                  dispatchFeedback={dispatchFeedback}
                  key={Step.label}
                />
              ) : null
            )}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}
