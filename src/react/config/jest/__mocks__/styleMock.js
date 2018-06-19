export default new Proxy({}, {
  get: (target, name) => {
    return name;
  },
  set: (target, property, value, reciever) => {throw new Error(`Attempted to set style by CSS. Property: ${property}`)}
})