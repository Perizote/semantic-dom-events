const click = element => {
  const isTheFormSubmitButton = !!element.form
  if (isTheFormSubmitButton) {
    updateFormBeforeSubmitting(element.form)
  }

  const event = new MouseEvent('click', { bubbles: true, cancelable: true })
  element.dispatchEvent(event)
}

const updateFormBeforeSubmitting = form => {
  const formValues = Object
    .values(form.elements)
    .filter(isFormControl)
    .reduce((values, { name, id, value }) => {
      return {
        ...values,
        [getFormControlKey(name, id)]: { value },
      }
    }, {})

  Object.assign(form, formValues)
}

const isFormControl = ({ type }) => type != 'submit'

const getFormControlKey = (name, id) => {
  const hasName = name && name.length > 0
  if (!hasName) {
    return id
  }

  return name
}

export { click }