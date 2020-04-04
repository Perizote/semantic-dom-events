import { getByText, getByLabelText } from '@testing-library/dom'
import { mount } from './mount'
import { type, submit } from '../src'

const Form = container => {
  container.innerHTML = `
    <form>
      <label for="address">Address</label>
      <input name="address" id="address" type="text" />
      <button type="submit">Send</button>
    </form>
    <p></p>
  `

  const form = container.querySelector('form')
  const feedback = container.querySelector('p')

  form.addEventListener('submit', onSubmit)

  function onSubmit(event) {
    event.preventDefault()
    feedback.textContent = event.target.address.value
  }

  return container
}

it('should submit the vanillajs form', () => {
  const container = mount(Form)

  const feedbackBeforeSaving = container.querySelector('p')
  expect(feedbackBeforeSaving.textContent).toBe('')

  const input = getByLabelText(container, 'Address')
  type('Rodrigo de Pertegas').in(input)

  const button = getByText(container, 'Send')
  submit(button)

  const feedbackAfterSaving = container.querySelector('p')
  expect(feedbackAfterSaving).toHaveTextContent('Rodrigo de Pertegas')
})
