import React, { useReducer, createContext, useEffect } from "react"
import userReducer from "../reducers/user-reducer"
import axios from "axios"
import { setUser } from "../actions"

export const UserContext = createContext()
const UserProvider = UserContext.Provider

export function UserWrapper({ children }) {
  const defaultUser = { username: "Guest" }
  const storedUser = JSON.parse(localStorage.getItem("user"))
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
            dispatchUser(setUser({ ...response.data, jwt: storedUser.jwt }))
          })
          .catch(error => {
            console.error(error)
            dispatchUser(setUser(defaultUser))
          })
      }, 3000)
    }
  }, [])

  return (
    <UserProvider value={{ user, dispatchUser, defaultUser }}>
      {children}
    </UserProvider>
  )
}
