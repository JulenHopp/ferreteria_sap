require('dotenv').config();
const conectarHana = require('./db');
const { faker } = require('@faker-js/faker');

let conn;

// Función para cambiar la cantidad
function cambiarCantidad(id, cantidad) {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE Inventario
        SET cantidad = ?
        WHERE id = ?
    `;
    const params = [cantidad, id];

    conn.exec(sql, params, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

// Función principal para generar órdenes
async function generarOrdenesDiarias() {
  try {
    conn = await conectarHana();

    for (let i = 1; i <= 71; i++) {
      const nuevaCantidad = faker.number.int({ min: 1, max: 367 });
      await cambiarCantidad(i, nuevaCantidad); // 👈 await aquí es clave
      console.log("✅ Insertando cantidad", nuevaCantidad, "al id", i);
    }

    conn.disconnect();
  } catch (err) {
    console.error('❌ Error al generar órdenes:', err);
    if (conn) conn.disconnect();
  }
}

generarOrdenesDiarias();