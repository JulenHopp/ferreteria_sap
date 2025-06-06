// Mock the SAP HANA client
const mockConnect = jest.fn((config, callback) => {
  // Simulate successful connection
  callback(null);
});

const mockCreateConnection = jest.fn(() => ({
  connect: mockConnect
}));

jest.mock('@sap/hana-client', () => ({
  createConnection: () => mockCreateConnection()
}));

// Mock environment variables
process.env.HANA_HOST = 'test-host';
process.env.HANA_USER = 'test-user';
process.env.HANA_PASSWORD = 'test-password';

describe('Database Connection', () => {
  it('should create a connection with correct configuration', () => {
    // Import the db module after mocking
    require('../src/config/db');
    
    // Verify that connect was called with correct config
    expect(mockConnect).toHaveBeenCalledWith(
      {
        serverNode: 'test-host',
        uid: 'test-user',
        pwd: 'test-password',
        sslValidateCertificate: 'false'
      },
      expect.any(Function)
    );
  });
}); 