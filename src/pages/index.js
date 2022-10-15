import React from "react"
import Layout from "../components/ui/layout"
import "../components/index.module.css"
import HeroBlock from "../components/home/heroBlock"
import PromotionalProducts from "../components/home/PromotionalProducts"
import FeaturedProducts from "../components/home/FeaturedProducts"

const IndexPage = () => (
  <Layout>
    <HeroBlock />
    <PromotionalProducts />
    <FeaturedProducts />
  </Layout>
)

export default IndexPage
