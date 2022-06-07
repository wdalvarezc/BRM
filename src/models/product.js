// definicion de modelo de temas 
const { DataTypes } = require('sequelize')
module.exports = function (sequelize) {
    return sequelize.define('Product', {
        numLote: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        precio: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        cantDisponible: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },    
        fechaIngreso: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        

    }, {
        timestamps: false,
    })
}