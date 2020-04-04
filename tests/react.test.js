import React, { Fragment, useState } from 'react'
import { render, cleanup } from '@testing-library/react'
import { userInteraction } from '../src'

const ReactForm = () => {
  const [feedback, setFeedback] = useState('')
  const onSubmit = event => {
    event.preventDefault()
    setFeedback(event.target.address.value)
  }

  return (
    <Fragment>
      <form onSubmit={ onSubmit }>
        <label htmlFor="address">Address</label>
        <input id="address" name="address" type="text" />
        <button type="submit">Send</button>
      </form>
      <p>{feedback}</p>
    </Fragment>
  )
}

afterEach(cleanup)

it('should submit the form', () => {
  const { container, getByLabelText, getByText } = render(<ReactForm />)

  const feedbackBeforeSaving = container.querySelector('p')
  expect(feedbackBeforeSaving.textContent).toBe('')

  const input = getByLabelText('Address')
  userInteraction.type('Rodrigo de Pertegas').in(input)

  const button = getByText('Send')
  userInteraction.click(button)

  const feedbackAfterSaving = container.querySelector('p')
  expect(feedbackAfterSaving).toHaveTextContent('Rodrigo de Pertegas')
})
