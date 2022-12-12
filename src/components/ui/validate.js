export default function validate(values) {
  const validators = {
    email: value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value),
    phone: value =>
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value),
    name: value => value.length > 3,
    message: value => value.length > 3,
    password: value =>
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
        value
      ),
  }

  const valid = {}

  Object.keys(values).map(
    field => (valid[field] = validators[field](values[field]))
  )

  return valid
}
