import * as React from "react"

import Layout from "../components/ui/layout"
import HeroBlock from "../components/home/Heroblock"
import PromotionalProducts from "../components/home/PromotionalProduct"
import FeaturedProducts from "../components/home/FeaturedProducts"

const IndexPage = () => (
  <Layout>
    <HeroBlock />
    <PromotionalProducts />
    <FeaturedProducts />
  </Layout>
)

export default IndexPage
