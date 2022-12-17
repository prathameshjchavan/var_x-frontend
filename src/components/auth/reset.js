import React, { useMemo, useState } from "react"
import { getEmailPasswordFields } from "./Login"

const Reset = () => {
  const [visible, setVisible] = useState(false)

  const fields = useMemo(
    () => getEmailPasswordFields(true, false, visible, setVisible),
    [visible, setVisible]
  )

  return <div>reset</div>
}

export default Reset
