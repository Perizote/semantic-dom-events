import { getByLabelText } from '@testing-library/dom'
import { mount, unmount } from './mount'
import { userInteraction } from '../src'

const Form = container => {
  container.innerHTML = `
    <label for="address">Address</label>
    <input id="address" type="text" />
    <label for="comments">Comments</label>
    <textarea id="comments"></textarea>
    <p></p>
  `

  const feedback = container.querySelector('p')
  const input = container.querySelector('input')
  const textarea = container.querySelector('textarea')
  input.addEventListener('change', onChange)
  textarea.addEventListener('change', onChange)

  function onChange(event) {
    feedback.textContent = event.target.value.toUpperCase()
  }

  return container
}

afterEach(unmount)

it('should fire change event when typing in input elements', () => {
  const container = mount(Form)

  const input = getByLabelText(container, 'Address')
  userInteraction.type('Rodrigo de Pertegas').in(input)

  expect(container).toHaveTextContent('RODRIGO DE PERTEGAS')
})

it('should fire change event when typing in textarea elements', () => {
  const container = mount(Form)

  const textarea = getByLabelText(container, 'Comments')
  userInteraction.type('Last floor').in(textarea)

  expect(container).toHaveTextContent('LAST FLOOR')
})
