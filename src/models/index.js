'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db.Seccion.hasMany(db.SeccionClase, {
//   foreignKey: 'seccionid',
//   as: "seccionclases"
// });
// db.SeccionClase.belongsTo(db.Seccion, {
//   foreignKey: 'id',
//   as: 'seccions'
// });
// db.Estudiante.hasMany(db.EstudiantePersonas);
// db.EstudiantePersonas.belongsTo(db.Estudiante);

// db.Estudiante.hasMany(db.EstudianteDetalles);
// db.EstudianteDetalles.belongsTo(db.Estudiante);

//////terceros////
// db.ClasificacionTercero.hasMany(db.Tercero, { foreignKey: 'clasificacionid' });
// db.Tercero.belongsTo(db.ClasificacionTercero, { foreignKey: 'clasificacionid' });
// db.Vendedor.hasMany(db.Tercero);
// db.Tercero.belongsTo(db.Vendedor);
// db.Cobrador.hasMany(db.Tercero);
// db.Tercero.belongsTo(db.Cobrador);
// db.RubroTercero.hasMany(db.Tercero, { foreignKey: 'rubroid' });
// db.Tercero.belongsTo(db.RubroTercero, { foreignKey: 'rubroid' });
// db.ListaPrecios.hasMany(db.Tercero);
// db.Tercero.belongsTo(db.ListaPrecios);
// db.Descuento.hasMany(db.Tercero);
// db.Tercero.belongsTo(db.Descuento);

//inventario
// db.Categorias.hasMany(db.Inventario);
// db.Inventario.belongsTo(db.Categorias);
// db.Impuestos.hasMany(db.Inventario);
// db.Inventario.belongsTo(db.Impuestos);
// db.Marcas.hasMany(db.Inventario);
// db.Inventario.belongsTo(db.Marcas);
// db.Descuento.hasMany(db.Inventario);
// db.Inventario.belongsTo(db.Descuento);

//inventariosku
// db.Inventario.hasMany(db.InventarioSku);
// db.InventarioSku.belongsTo(db.Inventario);

//transaccion detalle
// db.Transacciones.hasMany(db.TransaccionesDetalle, { foreignKey: 'transaccionid' });
// db.TransaccionesDetalle.belongsTo(db.Transacciones, { foreignKey: 'transaccionid' });
// db.Inventario.hasMany(db.TransaccionesDetalle);
// db.TransaccionesDetalle.belongsTo(db.Inventario);
// db.Bodegas.hasMany(db.TransaccionesDetalle);
// db.TransaccionesDetalle.belongsTo(db.Bodegas);
// db.Vendedor.hasMany(db.TransaccionesDetalle);
// db.TransaccionesDetalle.belongsTo(db.Vendedor);
// db.Unidades.hasMany(db.TransaccionesDetalle, { foreignKey: 'unidadid' });
// db.TransaccionesDetalle.belongsTo(db.Unidades, { foreignKey: 'unidadid' });

//transacciones
// db.TipoTransaccion.hasMany(db.Transacciones);
// db.Transacciones.belongsTo(db.TipoTransaccion);
// db.Sucursal.hasMany(db.Transacciones);
// db.Transacciones.belongsTo(db.Sucursal);
// db.Tercero.hasMany(db.Transacciones);
// db.Transacciones.belongsTo(db.Tercero);
// db.Asiento.hasMany(db.Transacciones);
// db.Transacciones.belongsTo(db.Asiento);
// db.CentroCosto.hasMany(db.Transacciones, { foreignKey: 'centrocostosid' });
// db.Transacciones.belongsTo(db.CentroCosto, { foreignKey: 'centrocostosid' });
// db.Vendedor.hasMany(db.Transacciones);
// db.Transacciones.belongsTo(db.Vendedor);
// db.SucursalDocumento.hasMany(db.Transacciones);
// db.Transacciones.belongsTo(db.SucursalDocumento);
// db.Caja.hasMany(db.Transacciones);
// db.Transacciones.belongsTo(db.Caja);
// db.Conductor.hasMany(db.Transacciones);
// db.Transacciones.belongsTo(db.Conductor);
// db.Vehiculo.hasMany(db.Transacciones);
// db.Transacciones.belongsTo(db.Vehiculo);

//asiento detalle
// db.Cuenta.hasMany(db.AsientoDetalle, { foreignKey: 'cuentaid' });
// db.AsientoDetalle.belongsTo(db.Cuenta, { foreignKey: 'cuentaid' });
// db.Vendedor.hasMany(db.AsientoDetalle);
// db.AsientoDetalle.belongsTo(db.Vendedor);
// db.Cobrador.hasMany(db.AsientoDetalle);
// db.AsientoDetalle.belongsTo(db.Cobrador);
// db.CentroCosto.hasMany(db.AsientoDetalle);
// db.AsientoDetalle.belongsTo(db.CentroCosto);
// db.Tercero.hasMany(db.AsientoDetalle);
// db.AsientoDetalle.belongsTo(db.Tercero);

//Asientos
// db.OrigenPartida.hasMany(db.Asiento, { foreignKey: 'tipopartidaid' });
// db.Asiento.belongsTo(db.OrigenPartida, { foreignKey: 'tipopartidaid' });

//sucursal documento falta origen partida
// db.Sucursal.hasMany(db.SucursalDocumento);
// db.SucursalDocumento.belongsTo(db.Sucursal);
// db.DocumentosFiscales.hasMany(db.SucursalDocumento, { foreignKey: 'documentofiscalid' });
// db.SucursalDocumento.belongsTo(db.DocumentosFiscales, { foreignKey: 'documentofiscalid' });
// db.OrigenPartida.hasMany(db.SucursalDocumento);
// db.SucursalDocumento.belongsTo(db.OrigenPartida);
// db.Cobrador.hasMany(db.Tercero);
// db.Tercero.belongsTo(db.Cobrador);

//inventario lista de precios
// db.Inventario.hasMany(db.InventarioListaPrecios);
// db.InventarioListaPrecios.belongsTo(db.Inventario);
// db.ListaPrecios.hasMany(db.InventarioListaPrecios);
// db.InventarioListaPrecios.belongsTo(db.ListaPrecios);

// db.Modalidad.hasMany(db.Grado);
// db.Grado.belongsTo(db.Modalidad);


///console.log(db);
module.exports = db;