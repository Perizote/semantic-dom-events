import { getByLabelText } from '@testing-library/dom'
import { mount, unmount } from './mount'
import { userInteraction } from '../src'

const Form = container => {
  container.innerHTML = `
    <form>
      <label for="address">Address</label>
      <input name="address" id="address" type="text" />
      <button type="submit">Send</button>
    </form>
  `

  const input = container.querySelector('input')
  input.addEventListener('change', onChange)

  function onChange(event) {
    input.value = event.target.value.toUpperCase()
  }

  return container
}

afterEach(unmount)

it('should fire change event when typing', () => {
  const container = mount(Form)

  const input = getByLabelText(container, 'Address')
  userInteraction.type('Rodrigo de Pertegas').in(input)

  expect(input.value).toBe('RODRIGO DE PERTEGAS')
})
