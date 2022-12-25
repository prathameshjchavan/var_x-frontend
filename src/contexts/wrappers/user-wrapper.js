import React, { useReducer, createContext, useEffect, useMemo } from "react"
import userReducer from "../reducers/user-reducer"
import axios from "axios"
import { setUser } from "../actions"

export const UserContext = createContext()
const UserProvider = UserContext.Provider

export function UserWrapper({ children }) {
  const defaultUser = useMemo(() => ({ name: "Guest" }), [])
  const storedUser = useMemo(() => JSON.parse(localStorage.getItem("user")), [])
  const [user, dispatchUser] = useReducer(
    userReducer,
    storedUser || defaultUser
  )

  // Verifying the stored used by getting a fresh user object
  useEffect(() => {
    if (storedUser) {
      setTimeout(() => {
        axios
          .get(`${process.env.STRAPI_API_URL}/api/users/me`, {
            headers: {
              Authorization: `Bearer ${storedUser.jwt}`,
            },
          })
          .then(response => {
            dispatchUser(
              setUser({
                ...response.data,
                jwt: storedUser.jwt,
                onboarding: true,
              })
            )
          })
          .catch(error => {
            console.error(error)
            dispatchUser(setUser(defaultUser))
          })
      }, 3000)
    }
  }, [defaultUser, storedUser])

  return (
    <UserProvider value={{ user, dispatchUser, defaultUser }}>
      {children}
    </UserProvider>
  )
}
