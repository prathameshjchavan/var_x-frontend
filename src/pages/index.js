import React from "react"
import Layout from "../components/ui/layout"
import "../components/index.module.css"
import HeroBlock from "../components/home/heroBlock"
import PromotionalProducts from "../components/home/PromotionalProducts"
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
