import React, { Fragment, useState } from 'react'
import { render, cleanup } from '@testing-library/react'
import { type, submit } from '../src'

const ReactForm = () => {
  const [feedback, setFeedback] = useState('')
  const onSubmit = event => {
    event.preventDefault()
    setFeedback(event.target.address.value)
  }

  return (
    <Fragment>
      <form onSubmit={ onSubmit }>
        <label htmlFor="address">AddressB</label>
        <input id="address" name="address" type="text" />
        <button type="submit">SendB</button>
      </form>
      <p>{feedback}</p>
    </Fragment>
  )
}

afterEach(cleanup)

it('should submit the react form', () => {
  const { container, getByLabelText, getByText } = render(<ReactForm />)

  const feedbackBeforeSaving = container.querySelector('p')
  expect(feedbackBeforeSaving.textContent).toBe('')

  const input = getByLabelText('AddressB')
  type('Rodrigo de Pertegas').in(input)

  const button = getByText('SendB')
  submit(button)

  const feedbackAfterSaving = container.querySelector('p')
  expect(feedbackAfterSaving).toHaveTextContent('Rodrigo de Pertegas')
})
