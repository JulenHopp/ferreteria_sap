const hana = require('@sap/hana-client');

function conectarHana() {
  return new Promise((resolve, reject) => {
    const conn = hana.createConnection();

    conn.connect({
      serverNode: process.env.HANA_HOST,
      uid: process.env.HANA_USER,
      pwd: process.env.HANA_PASSWORD,
      sslValidateCertificate: 'false'
    }, (err) => {
      if (err) {
        console.error('❌ Error conectando a SAP HANA:', err);
        reject(err);
      } else {
        console.log('✅ Conexión a SAP HANA exitosa');
        resolve(conn);
      }
    });
  });
}

module.exports = conectarHana;