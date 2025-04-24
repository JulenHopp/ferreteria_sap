const hana = require('@sap/hana-client');

const conn = hana.createConnection();

conn.connect({
  serverNode: process.env.HANA_HOST,
  uid: process.env.HANA_USER,
  pwd: process.env.HANA_PASSWORD,
  sslValidateCertificate: 'false'
}, (err) => {
  if (err) {
    console.error('Error conectando a SAP HANA:', err);
    process.exit(1);
  } else {
    console.log('Conexión a SAP HANA exitosa');
  }
});

module.exports = conn;