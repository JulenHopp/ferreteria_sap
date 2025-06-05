require('dotenv').config();
const conectarHana = require('./db');
const { faker } = require('@faker-js/faker');

let conn; // global para acceso dentro de funciones

function obtenerPreciosProductos() {
  return new Promise((resolve, reject) => {
    const query = 'SELECT id, precio_unitario FROM productos';
    console.log('Ejecutando query:', query);
    
    conn.exec(query, (err, result) => {
      if (err) {
        console.error('❌ Error al ejecutar SELECT:', err);
        return reject(err);
      }

      const precios = {};
      result.forEach(row => {
        const id = Number(row.ID ?? row.id);
        const precio = parseFloat(row.PRECIO_UNITARIO ?? row.precio_unitario);
        precios[id] = precio;
      });
      resolve(precios);
    });
  });
}

// Insertar una venta, formateando fecha como string
function insertarVenta(producto_id, cantidad, precio_unitario, fecha_creacion) {
  return new Promise((resolve, reject) => {
    const total = cantidad * precio_unitario;
    const sql = `
      INSERT INTO ventas (producto_id, cantidad, precio_unitario, total, creada_en)
      VALUES (?, ?, ?, ?, ?)
    `;
    const params = [producto_id, cantidad, precio_unitario, total, fecha_creacion];
    conn.exec(sql, params, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

// Generador de fechas
function* diasDelUltimoAno() {
  const hoy = new Date();
  const inicio = new Date();
  inicio.setFullYear(hoy.getFullYear() - 1);
  for (let d = new Date(inicio); d <= hoy; d.setDate(d.getDate() + 1)) {
    yield new Date(d);
  }
}

function formatearFecha(fecha) {
  return fecha.toISOString().slice(0, 19).replace('T', ' ');
}

async function generarVentasDiarias() {
  try {
    conn = await conectarHana(); // Esperar conexión
    const precios = await obtenerPreciosProductos();
    const producto_ids = Object.keys(precios);
    let totalVentas = 0;

    for (const dia of diasDelUltimoAno()) {
      const ventasDelDia = faker.number.int({ min: 5, max: 15 });

      for (let i = 0; i < ventasDelDia; i++) {
        const producto_id = parseInt(faker.helpers.arrayElement(producto_ids));
        const cantidad = faker.number.int({ min: 1, max: 10 });
        const precio_unitario = precios[producto_id];

        const hora = faker.date.between({
          from: new Date(dia.setHours(8, 0, 0)),
          to: new Date(dia.setHours(20, 59, 59))
        });

        const fechaFormateada = formatearFecha(hora);
        await insertarVenta(producto_id, cantidad, precio_unitario, fechaFormateada);
        totalVentas++;
      }

      console.log(`🗓️ ${dia.toISOString().slice(0, 10)}: ${ventasDelDia} ventas insertadas`);
    }

    console.log(`✅ Se generaron ${totalVentas} ventas en total.`);
    conn.disconnect();
  } catch (err) {
    console.error('❌ Error al generar ventas:', err);
    if (conn) conn.disconnect();
  }
}

generarVentasDiarias();