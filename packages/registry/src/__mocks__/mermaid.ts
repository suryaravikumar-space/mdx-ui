const mermaid = {
  initialize: jest.fn(),
  render: jest.fn().mockResolvedValue({ svg: "<svg>mock diagram</svg>" }),
}

export default mermaid
