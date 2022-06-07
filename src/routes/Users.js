const { Router } = require('express');
const { User, Product, Invoice, ProductInvoice } = require('../models/index');
const { Op } = require("sequelize");
const router = Router();

router.get('/', async (req, res, next) => {
    await User.findAll()
        .then((respuesta) => res.status(200).send(respuesta))
})

router.get('/:email', async (req, res, next) => {
    const { email } = req.body
    await User.findOne({ where: { email: email }, include: { all: true } })
        .then((respuesta) => res.status(200).send(respuesta))
        .catch((error) => next(error.message = 'error al consultar user'))
})
router.post('/', async (req, res, next) => {

    await User.create(req.body)
        .then((respuesta) => res.status(200).send(respuesta))
        .catch((error) => next(error.message = 'ya existe este usuario'))
})
router.get('/clientes/:email', async (req, res, next) => {
    const { email } = req.params
    await User.findOne({
        where: {
            [Op.and]: [{ email }, { admin: true }]
        }
    })
        .then((Contenido) => {
            if (Contenido === null) {
                res.status(500).send('no eres administrador')
            }
            else {
                User.findAll({ where: { admin: false },include:{all:true}})
                    .then((result)=>res.status(200).send(result))

                
            }
        })
        .catch((error) => next(error.message = 'error en la ruta clientes'))
})

router.post('/adquirirProducto', async (req, res, next) => {
    const { email, productos } = req.body
    const usuario = await User.findOne({ where: { [Op.and]: [{ email }, { admin: false }] } })
    if (usuario) {
        await usuario.getInvoices()
            .then(async (resp) => {
                if (resp.length === 0) {
                    await Invoice.create({ user: usuario.email })
                        .then((Factura) => {
                            Factura.addUser(usuario);
                            productos.map((e) => {
                                Product.findOne({ where: { numLote: e.numLote } })
                                    .then((producto) => {
                                        producto.addInvoice(Factura, { through: { cantidad: e.cantidad } })
                                        Factura.total = e.cantidad * producto.precio
                                        Factura.save()
                                        producto.cantDisponible = producto.cantDisponible - e.cantidad
                                        producto.save()

                                    })
                            })
                            res.status(200).send('productos adquiridos')
                        })

                }
                else {
                    factActual = resp.filter((e) => e.pago === false)
                    productos.map(async (e) => {
                        let cantFactAct = await ProductInvoice.findOne({ where: { [Op.and]: [{ InvoiceId: factActual[0].id }, { ProductNumLote: e.numLote }] } })
                        console.log(cantFactAct)
                        cantFactAct ? cantFactAct = cantFactAct.cantidad : cantFactAct = 0
                        Product.findOne({ where: { numLote: e.numLote } })
                            .then((response) => {
                                response.addInvoice(factActual, { through: { cantidad: e.cantidad + cantFactAct } })
                                response.cantDisponible = response.cantDisponible - e.cantidad
                                factActual[0].total = factActual[0].total + (response.precio * e.cantidad)
                                console.log(factActual[0].total)
                                console.log(response.precio * e.cantidad)

                                factActual[0].save()
                                response.save()
                            })
                    })
                    res.status(200).send('productos adquiridos y agnadidos a factura')
                }
            })
    } else {
        res.status(500).send("no eres usuario cliente")
    }

})

router.post('/generaFactura', async (req, res, next) => {
    const { email } = req.body
    const factporpagar = await Invoice.findOne({ where: { [Op.and]: [{ user: email }, { pago: false }] }, include: Product })
    console.log(factporpagar)
    const respuesta = {
        usuario: factporpagar.user,
        totalAPagar: factporpagar.total,
        fechaCompra: factporpagar.fechaCompra,
        productosAdquiridos: factporpagar.Products.map((e) => {
            return {
                codigo: e.numLote,
                producto: e.nombre,
                precioUnidad: e.precio,
                cantidadAdquirida: e.ProductInvoices.cantidad,
                cantidadDisponible: e.cantDisponible,
                precioTotalProducto: this.cantidadAdquirida * this.precioUnidad
            }
        })
    }
    res.send(respuesta)

})


module.exports = router;