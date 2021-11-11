import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import {
  Grid,
  Typography,
  makeStyles,
  Chip,
  IconButton,
} from "@material-ui/core"
import { DataGrid } from "@material-ui/data-grid"

import OrderDetails from "./OrderDetails"
import SettingsGrid from "./SettingsGrid"

import BackwardsIcon from "../../images/BackwardsOutline"
import detailsIcon from "../../images/details.svg"

import { UserContext } from "../../contexts"

const useStyles = makeStyles(theme => ({
  item: {
    height: "100%",
    width: "100%",
  },
  chipLabel: {
    fontWeight: 600,
  },
}))

export default function OrderHistory({ setSelectedSetting }) {
  const classes = useStyles()
  const [orders, setOrders] = useState([])
  const [open, setOpen] = useState(null)
  const { user } = useContext(UserContext)

  useEffect(() => {
    axios
      .get(process.env.GATSBY_STRAPI_URL + "/orders/history", {
        headers: { Authorization: `Bearer ${user.jwt}` },
      })
      .then(response => {
        setOrders(response.data.orders)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  const createData = data =>
    data.map(item => ({
      shipping: `${item.shippingInfo.name}\n${item.shippingAddress.street}\n${item.shippingAddress.city}, ${item.shippingAddress.state} ${item.shippingAddress.zip}`,
      order: `#${item.id
        .slice(item.id.length - 10, item.id.length)
        .toUpperCase()}`,
      status: item.status,
      date: `${item.createdAt.split("-")[1]}/${
        item.createdAt.split("-")[2].split("T")[0]
      }/${item.createdAt.split("-")[0]}`,
      total: item.total,
      id: item.id,
    }))

  const columns = [
    { field: "shipping", headerName: "Shipping", width: 350, sortable: false },
    { field: "order", headerName: "Order", width: 250 },
    {
      field: "status",
      headerName: "Status",
      width: 250,
      renderCell: ({ value }) => (
        <Chip label={value} classes={{ label: classes.chipLabel }} />
      ),
    },
    { field: "date", headerName: "Date", width: 250, type: "date" },
    {
      field: "total",
      headerName: "Total",
      width: 250,
      renderCell: ({ value }) => (
        <Chip label={`$${value}`} classes={{ label: classes.chipLabel }} />
      ),
    },
    {
      field: "",
      width: 350,
      sortable: false,
      disableColumnMenu: true,
      renderCell: () => (
        <IconButton>
          <img src={detailsIcon} alt="order details" />
        </IconButton>
      ),
    },
  ]

  const rows = createData(orders)

  return (
    <Grid item container classes={{ root: classes.item }}>
      <SettingsGrid
        setOpen={setOpen}
        setSelectedSetting={setSelectedSetting}
        rows={rows}
        columns={columns}
      />
      <OrderDetails open={open} setOpen={setOpen} orders={orders} />
    </Grid>
  )
}
