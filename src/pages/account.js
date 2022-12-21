import React, { useContext } from "react"
import AuthPortal from "../components/auth/AuthPortal"
import SettingsPortal from "../components/settings/SettingsPortal"
import Layout from "../components/ui/layout"
import { UserContext } from "../contexts"

const Account = () => {
  const { user } = useContext(UserContext)

  return (
    <Layout>
      {user.jwt && user.onboarding ? <SettingsPortal /> : <AuthPortal />}
    </Layout>
  )
}

export default Account
