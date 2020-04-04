import { getByLabelText } from '@testing-library/dom'
import { mount } from './mount'
import { type } from '../src'

const Form = container => {
  container.innerHTML = `
    <form>
      <label for="address">Address</label>
      <input name="address" id="address" type="text" />
      <button type="submit">Send</button>
    </form>
  `

  const input = container.querySelector('input')
  const feedback = container.querySelector('p')

  input.addEventListener('change', onChange)

  function onChange(event) {
    input.value = event.target.value.toUpperCase()
  }

  return container
}

it('should fire change event when typing', () => {
  const container = mount(Form)

  const input = getByLabelText(container, 'Address')
  type('Rodrigo de Pertegas').in(input)

  expect(input.value).toBe('RODRIGO DE PERTEGAS')
})
