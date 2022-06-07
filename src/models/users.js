// definicion de modelo de contenido
const {DataTypes} = require('sequelize')
module.exports = function (sequelize) {
   return sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
          },
        password:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        admin:{
            type: DataTypes.BOOLEAN,
            allowNull:false,
        }      
    },{ timestamps:false,})
}