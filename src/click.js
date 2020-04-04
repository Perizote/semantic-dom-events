const click = element => {
  const formValues = Object.values(element.form.elements).reduce((values, { name, value }) => {
    return {
      ...values,
      [name]: { value },
    }
  }, {})
  Object.assign(element.form, formValues)

  const event = new MouseEvent('click', { bubbles: true, cancelable: true })
  element.dispatchEvent(event)
}

export { click }