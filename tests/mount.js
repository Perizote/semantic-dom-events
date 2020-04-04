const mountedComponents = new Set()

const mount = component => {
  const container = document.body.appendChild(document.createElement('div'))
  mountedComponents.add(container)

  return component(container)
}

const unmount = () => {
  mountedComponents.forEach(component => {
    if (document.body.contains(component)) {
      document.body.removeChild(component)
    }

    mountedComponents.delete(component)
  })
}

export { mount, unmount }