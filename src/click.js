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
    .filter(isFormControlWithProperAttributes)
    .reduce((values, { name, id, value }) => ({
      ...values,
      [getFormControlKey(name, id)]: { value },
    }), {})

  Object.assign(form, formValues)
}

const isFormControlWithProperAttributes = ({ type, id, name }) => {
  const isFormControl = type != 'submit'
  const hasId = id && id.length > 0
  const hasName = name && name.length > 0
  const hasProperAttributes = hasId || hasName

  return isFormControl && hasProperAttributes
}

const getFormControlKey = (name, id) => {
  const hasName = name && name.length > 0
  if (!hasName) {
    return id
  }

  return name
}

export { click }