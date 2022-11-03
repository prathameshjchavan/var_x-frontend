import React, { useMemo } from "react"

function useValidate(values) {
  const [valid, setValid] = useState({})
  const validators = useMemo(
    () => ({
      email: value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value),
      phone: value =>
        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value),
      name: value => value.length > 3,
      message: value => value.length > 3,
    }),
    []
  )

  const validFields = Object.keys(values).map(
    field => (valid.field = validators.field(values.field))
  )
  setValid(validFields)

  return valid
}

export default useValidate
