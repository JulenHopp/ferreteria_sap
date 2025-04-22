const hana = require('@sap/hana-client');
require('dotenv').config();

const conn = hana.createConnection();

function connectToHana() {
  return new Promise((resolve, reject) => {
    conn.connect({
      serverNode: process.env.HANA_HOST,
      uid: process.env.HANA_USER,
      pwd: process.env.HANA_PASSWORD,
    }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(conn);
      }
    });
  });
}

module.exports = connectToHana;