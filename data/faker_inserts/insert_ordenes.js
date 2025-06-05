require('dotenv').config();
const conectarHana = require('./db');
const { faker } = require('@faker-js/faker');

let conn;

function formatearFecha(fecha) {
  return fecha.toISOString().slice(0, 19).replace('T', ' ');
}

function* diasDelUltimoAno() {
  const hoy = new Date();
  const inicio = new Date();
  inicio.setFullYear(hoy.getFullYear() - 1);
  for (let d = new Date(inicio); d <= hoy; d.setDate(d.getDate() + 1)) {
    yield new Date(d);
  }
}

// Reutilizar la función para obtener precios por producto
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

// INSERT para ordenes
function insertarOrden(
  usuario_id,
  estado_id,
  proveedor_id,
  producto_id,
  cantidad,
  precio_unitario,
  costo_total,
  sugerida_por_ia,
  creada_en
) {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO ordenes 
      (usuario_id, estado_id, proveedor_id, producto_id, cantidad, precio_unitario, costo_total, sugerida_por_ia, creado_en)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      usuario_id,
      estado_id,
      proveedor_id,
      producto_id,
      cantidad,
      precio_unitario,
      costo_total,
      sugerida_por_ia ? 1 : 0,
      creada_en,
    ];

    conn.exec(sql, params, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

async function generarOrdenesDiarias() {
  try {
    conn = await conectarHana();
    const precios = await obtenerPreciosProductos();
    const producto_ids = Object.keys(precios);
    let totalOrdenes = 0;

    for (const dia of diasDelUltimoAno()) {
      if (Math.random() > 0.5) {
        const ordenesDelDia = faker.number.int({ min: 1, max: 4 });

        for (let i = 0; i < ordenesDelDia; i++) {
            const usuario_id = faker.number.int({ min: 1, max: 3 });
            const estado_id = faker.number.int({ min: 1, max: 3 });
            const proveedor_id = faker.number.int({ min: 1, max: 10 });
            const producto_id = parseInt(faker.helpers.arrayElement(producto_ids));
            const cantidad = faker.number.int({ min: 1, max: 50 });
            const precio_unitario = precios[producto_id];
            const costo_total = cantidad * precio_unitario;
            const sugerida_por_ia = faker.datatype.boolean();

            const hora = faker.date.between({
            from: new Date(dia.setHours(7, 0, 0)),
            to: new Date(dia.setHours(19, 59, 59)),
            });

            const fechaFormateada = formatearFecha(hora);

            await insertarOrden(
            usuario_id,
            estado_id,
            proveedor_id,
            producto_id,
            cantidad,
            precio_unitario,
            costo_total,
            sugerida_por_ia,
            fechaFormateada
            );

            totalOrdenes++;
        }

        console.log(`📦 ${dia.toISOString().slice(0, 10)}: ${ordenesDelDia} órdenes insertadas`);
      }  
    }

    console.log(`✅ Se generaron ${totalOrdenes} órdenes en total.`);
    conn.disconnect();
  } catch (err) {
    console.error('❌ Error al generar órdenes:', err);
    if (conn) conn.disconnect();
  }
}

generarOrdenesDiarias();