export const bcryptMock = {
  compareSync: jest.fn(),
  hashSync: jest.fn(),
};

export const bcryptModuleMockFactory = () => bcryptMock;
