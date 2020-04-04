const mount = component =>
  component(document.body.appendChild(document.createElement('div')))

export { mount }