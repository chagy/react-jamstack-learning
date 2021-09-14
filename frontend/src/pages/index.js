import * as React from "react"

import Layout from "../components/ui/layout"
import HeroBlock from "../components/home/Heroblock"
import PromotionalProducts from "../components/home/PromotionalProduct"
import FeaturedProducts from "../components/home/FeaturedProducts"
import MarketingButtons from "../components/home/MarketingButtons"
import CallToAction from "../components/home/CallToAction"

const IndexPage = () => (
  <Layout>
    <HeroBlock />
    <PromotionalProducts />
    <FeaturedProducts />
    <MarketingButtons />
    <CallToAction />
  </Layout>
)

export default IndexPage
