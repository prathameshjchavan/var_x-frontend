import { styled } from "@mui/material/styles"
import { graphql, useStaticQuery } from "gatsby"
import React, { Fragment } from "react"
import Footer from "./footer"
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

  const Seperator = styled("div")(({ theme }) => ({
    marginBottom: "10rem",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2rem",
    },
    [theme.breakpoints.down("lg")]: {
      marginBottom: "5rem",
    },
  }))

  return (
    <Fragment>
      <Header categories={data.allStrapiCategory.edges} />
      <Seperator />
      <main>{children}</main>
      <Footer />
    </Fragment>
  )
}

export default Layout
