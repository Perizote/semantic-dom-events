const submit = submitButton => {
  const formValues = Object.values(submitButton.form.elements).reduce((values, { name, value }) => {
    return {
      ...values,
      [name]: { value },
    }
  }, {})
  Object.assign(submitButton.form, formValues)

  const event = new MouseEvent('click', { bubbles: true, cancelable: true })
  submitButton.dispatchEvent(event)
}

export { submit }