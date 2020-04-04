const type = value => ({
  in: element => {
    const event = new Event('change', { bubbles: true })
    setNativeValue(element, value)
    element.dispatchEvent(event)
  },
})

const setNativeValue = (element, value) => element.value = value

export { type }