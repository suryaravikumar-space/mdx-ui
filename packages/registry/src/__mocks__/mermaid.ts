import { jest } from "@jest/globals";

const mermaid = {
  initialize: jest.fn(),
  render: jest
    .fn<() => Promise<{ svg: string }>>()
    .mockResolvedValue({ svg: "<svg>mock diagram</svg>" }),
};

export default mermaid;
