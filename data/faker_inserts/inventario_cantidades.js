require('dotenv').config();
const conectarHana = require('./db');
const { faker } = require('@faker-js/faker');

let conn;

// Función para obtener productos duplicados por PRODUCTO_ID
async function obtenerProductosDuplicados() {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT PRODUCTO_ID, COUNT(*) as count
      FROM Inventario
      GROUP BY PRODUCTO_ID
      HAVING COUNT(*) > 1
    `;

    conn.exec(sql, async (err, results) => {
      if (err) return reject(err);

      const duplicadosConIds = [];
      for (const dup of results) {
        const idsSql = `
          SELECT ID
          FROM Inventario
          WHERE PRODUCTO_ID = ?
          ORDER BY ID
        `;

        const ids = await new Promise((resolveIds, rejectIds) => {
          conn.exec(idsSql, [dup.PRODUCTO_ID], (err, idsResult) => {
            if (err) return rejectIds(err);
            resolveIds(idsResult);
          });
        });

        duplicadosConIds.push({
          PRODUCTO_ID: dup.PRODUCTO_ID,
          ids: ids.map(row => row.ID)
        });
      }

      resolve(duplicadosConIds);
    });
  });
}

// Función para eliminar productos duplicados (manteniendo el primer ID)
async function eliminarDuplicados(ids) {
  return new Promise((resolve, reject) => {
    // Mantener solo el primer ID y eliminar el resto
    const idsAEliminar = ids.slice(1);
    if (idsAEliminar.length === 0) {
      console.log('  No hay IDs para eliminar para este grupo.');
      resolve();
      return;
    }

    console.log(`  IDs a eliminar: [${idsAEliminar.join(', ')}]`);
    const sql = `
      DELETE FROM Inventario
      WHERE ID IN (${idsAEliminar.join(',')})
    `;

    conn.exec(sql, (err) => {
      if (err) {
        console.error('  ❌ Error al eliminar duplicados:', err);
        return reject(err);
      }
      console.log('  ✅ Duplicados eliminados exitosamente.');
      resolve();
    });
  });
}

// Función para obtener todos los productos únicos después de la limpieza
async function obtenerProductosUnicos() {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT I.ID, I.PRODUCTO_ID, IVD.NOMBRE_PRODUCTO
      FROM Inventario I
      JOIN Inventario_with_details IVD ON I.ID = IVD.ID
      ORDER BY I.ID
    `;

    conn.exec(sql, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

// Función para cambiar la cantidad
function cambiarCantidad(id, cantidad) {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE Inventario
        SET CANTIDAD = ?
        WHERE ID = ?
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

    // Primero, manejar duplicados
    console.log('🔎 Buscando y eliminando productos duplicados por PRODUCTO_ID...');
    const duplicados = await obtenerProductosDuplicados();
    for (const dup of duplicados) {
      console.log(`🔄 Procesando duplicados para PRODUCTO_ID: ${dup.PRODUCTO_ID} (IDs: ${dup.ids.join(', ')})`);
      await eliminarDuplicados(dup.ids);

      // Verificar que solo quede 1 entrada para este PRODUCTO_ID después de la eliminación
      const remainingSql = `SELECT COUNT(*) as count FROM Inventario WHERE PRODUCTO_ID = ?`;
      const remainingResult = await new Promise((res, rej) => {
        conn.exec(remainingSql, [dup.PRODUCTO_ID], (err, result) => {
          if (err) return rej(err);
          res(result[0].COUNT); // Asumiendo que el nombre de la columna es COUNT o similar
        });
      });

      if (remainingResult !== 1) {
        console.error(`🚨 ERROR: Después de la eliminación, PRODUCTO_ID ${dup.PRODUCTO_ID} todavía tiene ${remainingResult} entradas.`);
      } else {
        console.log(`✅ Verificado: PRODUCTO_ID ${dup.PRODUCTO_ID} tiene 1 entrada después de la limpieza.`);
      }
    }
    console.log('✅ Eliminación de duplicados completada.');

    // Obtener productos únicos existentes después de la limpieza
    const productosUnicos = await obtenerProductosUnicos();
    console.log(`📦 Encontrados ${productosUnicos.length} productos únicos para actualizar.`);

    // Actualizar cantidades para cada producto único existente
    for (const producto of productosUnicos) {
      const nuevaCantidad = faker.number.int({ min: 1, max: 367 });
      await cambiarCantidad(producto.ID, nuevaCantidad);
      console.log(`✅ Actualizando cantidad ${nuevaCantidad} para ${producto.NOMBRE_PRODUCTO} (ID: ${producto.ID}, PRODUCTO_ID: ${producto.PRODUCTO_ID}, PROVEEDOR_ID: ${producto.PROVEEDOR_ID || 'N/A'})`);
    }

    console.log('✨ Proceso completado exitosamente');
    conn.disconnect();
  } catch (err) {
    console.error('❌ Error al generar órdenes:', err);
    if (conn) conn.disconnect();
  }
}

generarOrdenesDiarias();