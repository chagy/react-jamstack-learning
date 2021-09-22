import React from "react"
import { Grid } from "@material-ui/core"
import { graphql } from "gatsby"

import Layout from "../components/ui/layout"
import DynamicToolbar from "../components/product-list/DynamicToolbar"
import ListOfProducts from "../components/product-list/ListOfProducts"

export default function ProductList({
  pageContext: { filterOptions, name, description },
  data: {
    allStrapiProduct: { edges: products },
  },
}) {
  return (
    <Layout>
      <Grid container direction="column" alignItems="center">
        <DynamicToolbar
          filterOptions={filterOptions}
          name={name}
          description={description}
        />
        <ListOfProducts products={products} />
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query GetCategoryProduct($id: String!) {
    allStrapiProduct(filter: { category: { id: { eq: $id } } }) {
      edges {
        node {
          strapiId
          name
          variants {
            color
            id
            size
            style
            images {
              url
            }
          }
        }
      }
    }
  }
`