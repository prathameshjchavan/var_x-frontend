import { graphql, useStaticQuery } from "gatsby"
import React, { Fragment } from "react"

import Header from "./header"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query GetCategories {
      allStrapiCategory {
        edges {
          node {
            name
            strapi_id
          }
        }
      }
    }
  `)

  return (
    <Fragment>
      <Header categories={data.allStrapiCategory.edges} />
      <div
        style={{
          margin: `0 auto`,
        }}
      >
        <main>{children}</main>
      </div>
    </Fragment>
  )
}

export default Layout
