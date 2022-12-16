import { Button } from "@mui/material"
import React, { useCallback, useContext } from "react"
import AuthPortal from "../components/auth/AuthPortal"
import Layout from "../components/ui/layout"
import { UserContext } from "../contexts"
import { setUser } from "../contexts/actions"

const Account = () => {
  const { user, dispatchUser, defaultUser } = useContext(UserContext)

  // functions
  const handleLogout = useCallback(() => {
    dispatchUser(setUser(defaultUser))
  }, [dispatchUser, defaultUser])

  return (
    <Layout>
      {user.jwt ? (
        <Button variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <AuthPortal />
      )}
    </Layout>
  )
}

export default Account
