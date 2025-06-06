// Mock console.error and console.log
const originalConsoleError = console.error;
const originalConsoleLog = console.log;

beforeAll(() => {
  console.error = jest.fn();
  console.log = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
  console.log = originalConsoleLog;
});

describe('Database Connection', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('should connect successfully with valid credentials', () => {
    // Mock successful connection
    const mockConnect = jest.fn((config, callback) => callback(null));
    jest.mock('@sap/hana-client', () => ({
      createConnection: () => ({
        connect: mockConnect
      })
    }));

    // Set environment variables
    process.env.HANA_HOST = 'test-host';
    process.env.HANA_USER = 'test-user';
    process.env.HANA_PASSWORD = 'test-password';

    // Import the module
    require('../../src/config/db');

    // Verify successful connection
    expect(console.log).toHaveBeenCalledWith('Conexión a SAP HANA exitosa');
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should handle connection error', () => {
    // Mock connection error
    const mockError = new Error('Connection failed');
    const mockConnect = jest.fn((config, callback) => callback(mockError));
    jest.mock('@sap/hana-client', () => ({
      createConnection: () => ({
        connect: mockConnect
      })
    }));

    // Set environment variables
    process.env.HANA_HOST = 'test-host';
    process.env.HANA_USER = 'test-user';
    process.env.HANA_PASSWORD = 'test-password';

    // Mock process.exit
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});

    // Import the module
    require('../../src/config/db');

    // Verify error handling
    expect(console.error).toHaveBeenCalledWith('Error conectando a SAP HANA:', mockError);
    expect(mockExit).toHaveBeenCalledWith(1);
    expect(console.log).not.toHaveBeenCalled();

    // Restore process.exit
    mockExit.mockRestore();
  });
}); 