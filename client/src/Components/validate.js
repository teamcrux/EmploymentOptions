const validate = values => {
  const errors = {}
  if (!values.fname) {
    errors.fname = '* Required'
  }
  if (!values.lname) {
    errors.lname = '* Required'
  }
  return errors
}

export default validate
