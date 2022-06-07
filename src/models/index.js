// este index lleva las relaciones de las tablas y la connexion a la base de datos inicializando sequelize
const { Sequelize } = require('sequelize')
const { dbUser, dbName, dbPassword,host } = require('../utils/config/index')
const ProductFactory = require('./product');
const UserFactory = require('./users');
const InvoiceFactory = require('./compra')
const ProductInvoiceFactory = require('./ProductInvoice')

const sequelize = new Sequelize(`postgres://${dbUser}:${dbPassword}@${host}/${dbName}`, {
  logging: false, 
  native: false, 
});

const User = UserFactory(sequelize);
const Product = ProductFactory (sequelize);
const Invoice = InvoiceFactory (sequelize);
const ProductInvoice = ProductInvoiceFactory (sequelize);

User.belongsToMany(Invoice, { through: 'UserInvoice', timestamps:false});
Invoice.belongsToMany(User, { through: 'UserInvoice' , timestamps:false});
Invoice.belongsToMany(Product, { through: 'ProductInvoices' , timestamps:false});
Product.belongsToMany(Invoice, { through: 'ProductInvoices' , timestamps:false});

module.exports = {
  conn: sequelize,
  User,
  Product,
  Invoice,
  ProductInvoice 
}