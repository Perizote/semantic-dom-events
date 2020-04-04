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
    .reduce((values, { name, value }) => ({ ...values, [name]: { value } }), {})

  Object.assign(form, formValues)
}

const isFormControl = ({ type }) => type != 'submit'

export { click }