export function parentFunc () {
  try {
    throw new Error()
  } catch (e) {
    const stack = e.stack.match(/(\w+)@|at (\w+) \(/g).map(f => f.replace(/@|at |[(\s]|\)/g, ''))
    return stack[2] ?? null
  }
}
