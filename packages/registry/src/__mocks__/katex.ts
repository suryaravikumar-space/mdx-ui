const katex = {
  renderToString: jest.fn((expression: string, options?: { displayMode?: boolean }) => {
    return `<span class="katex${options?.displayMode ? "-display" : ""}">${expression}</span>`
  }),
}

export default katex
