import { getByText, getByLabelText } from '@testing-library/dom'
import { mount } from './mount'
import { userInteraction } from '../src'

const Form = container => {
  container.innerHTML = `
    <form>
      <label for="address">Address</label>
      <input name="address" id="address" type="text" />
      <button type="submit">Send</button>
    </form>
    <p>Last address saved: none</p>
    <span>Last MouseEvent: none<span>
  `

  const form = container.querySelector('form')
  const button = container.querySelector('button')
  const feedback = container.querySelector('p')
  const lastEvent = container.querySelector('span')

  form.addEventListener('submit', onSubmit)
  button.addEventListener('click', onClick)

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