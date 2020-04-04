import { getByText, getByLabelText, getByTestId } from '@testing-library/dom'
import { mount } from './mount'
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
    feedback.textContent = `Last address saved: ${ event.target.address.value }`
  }

  function onClick(event) {
    lastEvent.textContent = `Last MouseEvent: ${ event.type }`
  }

  return container
}

it('should submit the form', () => {
  const container = mount(Form)
  expect(container).toHaveTextContent('Last address saved: none')

  userInteraction.type('Rodrigo de Pertegas').in(getByLabelText(container, 'Address'))
  userInteraction.click(getByText(container, 'Send'))

  expect(container).toHaveTextContent('Last address saved: Rodrigo de Pertegas')
  document.body.removeChild(container)
})

it('should fire click event when button listens to clicks', () => {
  const container = mount(Form)
  expect(container).toHaveTextContent('Last MouseEvent: none')

  userInteraction.click(getByText(container, 'Send'))

  expect(container).toHaveTextContent('Last MouseEvent: click')
  document.body.removeChild(container)
})

it('should not submit the form when the button is not of type submit', () => {
  const container = mount(Form)
  const sendButton = getByText(container, 'Send')
  sendButton.setAttribute('type', 'button')

  userInteraction.type('Rodrigo de Pertegas').in(getByLabelText(container, 'Address'))
  userInteraction.click(sendButton)

  expect(container).toHaveTextContent('Last address saved: none')
  document.body.removeChild(container)
})

it('should not try to update the form values when the button is not wrapped by a form', () => {
  const container = mount(Form)

  userInteraction.click(getByText(container, 'Button outside a form'))

  expect(container).toHaveTextContent('Last MouseEvent: click')
  expect(getByTestId(container, 'address-form')).toHaveFormValues({ address: '' })
  document.body.removeChild(container)
})
