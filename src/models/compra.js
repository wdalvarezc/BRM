const { DataTypes } = require('sequelize')
module.exports = function (sequelize) {
    return sequelize.define('Invoice', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        user: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        total: {
            type: DataTypes.DOUBLE,
            defaultValue: 0,
            allowNull: false,
        },  
        pago: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },  
        fechaCompra: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },        

    }, {
        timestamps: false,
    })
}