import * as React from "react"
import Layout from "../components/ui/layout"
import Seo from "../components/ui/seo"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
  </Layout>
)

export const Head = () => <Seo title="Home" />

export default IndexPage
