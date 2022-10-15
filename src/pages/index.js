import React from "react"
import Layout from "../components/ui/layout"
import "../components/index.module.css"
import HeroBlock from "../components/home/heroBlock"
import PromotionalProducts from "../components/home/PromotionalProducts"

const IndexPage = () => (
  <Layout>
    <HeroBlock />
    <PromotionalProducts />
  </Layout>
)

export default IndexPage
