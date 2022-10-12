import React, { Fragment } from "react"

import Header from "./header"

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header />
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
