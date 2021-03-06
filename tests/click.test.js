import { getByText, getByLabelText, getByTestId } from '@testing-library/dom'
import { mount, unmount } from './mount'
import { userInteraction } from '../src'

const Form = container => {
  container.innerHTML = `
    <form data-testid="address-form">
      <label for="address">Address</label>
      <input name="address" id="address" type="text" />
      <button type="submit">Send</button>
    </form>
    <p>Last address saved: none</p>
    <span>Last MouseEvent: none<span>
    <button type="button">Button outside a form</button>
  `

  const form = container.querySelector('form')
  const submitButton = container.querySelector('button[type="submit"]')
  const buttonOutside = container.querySelector('button[type="button"]')
  const feedback = container.querySelector('p')
  const lastEvent = container.querySelector('span')

  form.addEventListener('submit', onSubmit)
  submitButton.addEventListener('click', onClick)
  buttonOutside.addEventListener('click', onClick)

  function onSubmit(event) {
    event.preventDefault()
    if (!event.target.address) { return }
    feedback.textContent = `Last address saved: ${ event.target.address.value }`
  }

  function onClick(event) {
    lastEvent.textContent = `Last MouseEvent: ${ event.type }`
  }

  return container
}

afterEach(unmount)

it('should fire click event when button listens to clicks', () => {
  const container = mount(Form)
  expect(container).toHaveTextContent('Last MouseEvent: none')

  userInteraction.click(getByText(container, 'Send'))

  expect(container).toHaveTextContent('Last MouseEvent: click')
})

it('should submit the form by clicking the submit button', () => {
  const container = mount(Form)
  expect(container).toHaveTextContent('Last address saved: none')

  userInteraction.type('Rodrigo de Pertegas').in(getByLabelText(container, 'Address'))
  userInteraction.click(getByText(container, 'Send'))

  expect(container).toHaveTextContent('Last address saved: Rodrigo de Pertegas')
})

it('should submit the form by clicking the submit input', () => {
  const container = mount(Form)
  const form = getByTestId(container, 'address-form')
  form.removeChild(getByText(container, 'Send'))
  const sendButton = document.createElement('input')
  sendButton.type = 'submit'
  sendButton.value = 'Send'
  form.appendChild(sendButton)
  expect(container).toHaveTextContent('Last address saved: none')

  userInteraction.type('Rodrigo de Pertegas').in(getByLabelText(container, 'Address'))
  userInteraction.click(sendButton)

  expect(container).toHaveTextContent('Last address saved: Rodrigo de Pertegas')
})

it('should not submit the form when the button is not of type submit', () => {
  const container = mount(Form)
  const sendButton = getByText(container, 'Send')
  sendButton.setAttribute('type', 'button')

  userInteraction.type('Rodrigo de Pertegas').in(getByLabelText(container, 'Address'))
  userInteraction.click(sendButton)

  expect(container).toHaveTextContent('Last address saved: none')
})

it('should not try to update the form values when the button is not wrapped by a form', () => {
  const container = mount(Form)

  userInteraction.click(getByText(container, 'Button outside a form'))

  expect(container).toHaveTextContent('Last MouseEvent: click')
  expect(getByTestId(container, 'address-form')).toHaveFormValues({ address: '' })
})

it('should not update the form with the submit button value when submitting a form', () => {
  const container = mount(Form)
  const form = getByTestId(container, 'address-form')
  form.removeChild(getByText(container, 'Send'))
  const sendButton = document.createElement('input')
  sendButton.type = 'submit'
  sendButton.value = 'Send'
  sendButton.name = 'submitbutton'
  form.appendChild(sendButton)

  userInteraction.click(sendButton)

  expect(form.submitbutton).not.toBeDefined()
})

it('should update the form values when it has more than one form control', () => {
  const container = mount(Form)
  const form = getByTestId(container, 'address-form')
  const zipCodeInput = document.createElement('input')
  zipCodeInput.type = 'number'
  zipCodeInput.name = 'zipcode'
  form.appendChild(zipCodeInput)
  expect(container).toHaveTextContent('Last address saved: none')

  userInteraction.type('Rodrigo de Pertegas').in(getByLabelText(container, 'Address'))
  userInteraction.type(46023).in(zipCodeInput)
  userInteraction.click(getByText(container, 'Send'))

  expect(form).toHaveFormValues({ address: 'Rodrigo de Pertegas', zipcode: 46023 })
})

it('should update the form values by the form controls id attribute if name is not present', () => {
  const container = mount(Form)
  expect(container).toHaveTextContent('Last address saved: none')
  const addressInput = getByLabelText(container, 'Address')
  addressInput.removeAttribute('name')

  userInteraction.type('Rodrigo de Pertegas').in(addressInput)
  userInteraction.click(getByText(container, 'Send'))

  expect(addressInput.name).toBe('')
  expect(addressInput.id).toBe('address')
  expect(container).toHaveTextContent('Last address saved: Rodrigo de Pertegas')
})

it('should not update the form values when form control does not have id or name', () => {
  const container = mount(Form)
  const addressInput = getByLabelText(container, 'Address')
  addressInput.removeAttribute('name')
  addressInput.removeAttribute('id')

  userInteraction.type('Rodrigo de Pertegas').in(addressInput)
  userInteraction.click(getByText(container, 'Send'))

  expect(addressInput.name).toBe('')
  expect(addressInput.id).toBe('')
  expect(getByTestId(container, 'address-form')).toHaveFormValues({})
  expect(getByTestId(container, 'address-form')['']).not.toBeDefined()
})