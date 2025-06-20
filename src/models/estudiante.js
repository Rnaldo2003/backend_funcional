'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estudiante extends Model {
    static associate(models) {
      // Aquí puedes definir relaciones en el futuro
    }
  }
  Estudiante.init({
    firstName: DataTypes.STRING,
    rango: DataTypes.STRING,
    tipoSangre: DataTypes.STRING,
    telefono: DataTypes.STRING,
    emergencia: DataTypes.STRING,
    edad: DataTypes.INTEGER,
    jornada: DataTypes.STRING,
    profile_picture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Estudiante',
  });
  return Estudiante;
};