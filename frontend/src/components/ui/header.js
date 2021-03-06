import React, { useState, useContext } from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import {
  useMediaQuery,
  Hidden,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  Badge,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core"
import { Link, navigate } from "gatsby"

import { CartContext } from "../../contexts"

import search from "../../images/search.svg"
import cartIcon from "../../images/cart.svg"
import account from "../../images/account-header.svg"
import menu from "../../images/menu.svg"

const useStyles = makeStyles(theme => ({
  colorIndecator: {
    backgroundColor: "#fff",
  },
  logoText: {
    color: theme.palette.common.black,
  },
  logo: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "3rem",
    },
  },
  logoContainer: {
    [theme.breakpoints.down("md")]: {
      marginRight: "auto",
    },
  },
  tab: {
    ...theme.typography.body1,
    fontWeight: 600,
  },
  tabs: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  icon: {
    height: "3rem",
    width: "3rem",
    [theme.breakpoints.down("xs")]: {
      height: "2rem",
      width: "2rem",
    },
  },
  drawer: {
    backgroundColor: theme.palette.primary.main,
  },
  listItemText: {
    color: "#FFF",
  },
  badge: {
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: theme.palette.secondary.main,
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.75rem",
      height: "1.1rem",
      width: "1.1rem",
      minWidth: 0,
    },
  },
}))

export default function Header({ categories }) {
  const classes = useStyles()
  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))
  const { cart } = useContext(CartContext)

  const [drawerOpen, setDrawerOpen] = useState(false)

  // const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)

  const routes = [
    ...categories,
    { node: { name: "Contact Us", strapiId: "contactus", link: "/contact" } },
  ]

  const activeIndex = () => {
    const found = routes.indexOf(
      routes.filter(
        ({ node: { name, link } }) =>
          (link || `/${name.toLowerCase()}`) ===
          `/${window.location.pathname.split("/")[1]}`
      )[0]
    )

    return found === -1 ? false : found
  }

  const tabs = (
    <Tabs
      value={activeIndex()}
      classes={{
        indicator: classes.colorIndecator,
        root: classes.tabs,
      }}
    >
      {routes.map(route => (
        <Tab
          component={Link}
          to={route.node.link || `/${route.node.name.toLowerCase()}`}
          classes={{ root: classes.tab }}
          label={route.node.name}
          key={route.node.strapiId}
        />
      ))}
    </Tabs>
  )

  const drawer = (
    <SwipeableDrawer
      open={drawerOpen}
      onOpen={() => setDrawerOpen(true)}
      onClose={() => setDrawerOpen(false)}
      // disableBackdropTransition={!iOS}
      // disableDiscovery={iOS}
      classes={{ paper: classes.drawer }}
    >
      <List disablePadding>
        {routes.map((route, i) => (
          <ListItem
            selected={activeIndex() === i}
            component={Link}
            to={route.node.link || `/${route.node.name.toLowerCase()}`}
            divider
            button
            key={route.node.strapiId}
          >
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary={route.node.name}
            />
          </ListItem>
        ))}
      </List>
    </SwipeableDrawer>
  )

  const actions = [
    { icon: search, alt: "search", visible: true },
    { icon: cartIcon, alt: "cart", visible: true, link: "/cart" },
    { icon: account, alt: "account", visible: !matchesMD, link: "/account" },
    {
      icon: menu,
      alt: "menu",
      visible: matchesMD,
      onClick: () => setDrawerOpen(true),
    },
  ]

  return (
    <AppBar color="transparent" elevation={0} position="static">
      <Toolbar disableGutters>
        <Button
          classes={{ root: classes.logoContainer }}
          component={Link}
          to="/"
        >
          <Typography variant="h1" classes={{ root: classes.logo }}>
            <span className={classes.logoText}>VAR</span> X
          </Typography>
        </Button>
        {matchesMD ? drawer : tabs}
        {actions.map(action => {
          const image = (
            <img className={classes.icon} src={action.icon} alt={action.alt} />
          )
          if (action.visible) {
            return (
              <IconButton
                onClick={action.onClick}
                component={action.onClick ? undefined : Link}
                to={action.onClick ? undefined : action.link}
                key={action.alt}
              >
                {action.alt === "cart" ? (
                  <Badge
                    overlap="circle"
                    badgeContent={cart.length}
                    classes={{ badge: classes.badge }}
                  >
                    {image}
                  </Badge>
                ) : (
                  image
                )}
              </IconButton>
            )
          }
        })}
      </Toolbar>
    </AppBar>
  )
}
