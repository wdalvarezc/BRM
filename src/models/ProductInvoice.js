const { DataTypes } = require('sequelize')
module.exports = function (sequelize) {
    return sequelize.define('ProductInvoices', {

        cantidad: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        }
    }, {
        timestamps: false,
    })
}