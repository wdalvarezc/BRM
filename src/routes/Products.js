const { Router } = require('express');
const { User, Product } = require('../models/index')
const { Op } = require("sequelize");
const router = Router();

router.get('/', async (req, res, next) => {

    await Product.findAll()
        .then((Contenido) => res.status(200).send(Contenido))
        .catch((error) => next(error.message = "error el obtener todos los poductos"))
})
router.get('/:numLote', async (req, res, next) => {
    const { numLote } = req.params
    await Product.findOne({ where: { numLote } })
        .then((Contenido) => res.status(200).send(Contenido))
        .catch((error) => next(error.message = "error el obtener los poductos por numero"))
})

router.post('/', async (req, res, next) => {

    await Product.create(req.body)
        .then((Contenido) => res.status(200).send(Contenido))
        .catch((error) => next(error.message = "error al crear producto o ya fue creado"))
})

router.delete('/eliminarProducto', async (req, res, next) => {

    const { email, numLote } = req.body
    await User.findOne({
        where: {
            [Op.and]: [{ email }, { admin: true }]
        }
    })
        .then((respuesta) => {
            if (respuesta !== null) {
                Product.destroy({ where: { numLote } })
                    .then(() => {
                        res.status(200).send(`Producto eliminado: ${numLote}`)
                    })
            } else {
                res.status(500).send('no eres administrador')
            }
        })
        .catch((error) => next(error.message = "no eres administrador"))

})

router.put('/modificarProducto', async (req, res, next) => {
    const {email, numLote, nombre, precio, cantDisponible } = req.body
    await User.findOne({
        where: {
            [Op.and]: [{ email }, { admin: true }]
        }
    }) 
    .then((respuesta) => {
        if (respuesta !== null) {
            
             Product.update({ nombre, precio, cantDisponible }, { where: { numLote } })
                .then((respuesta) => {
                    respuesta == 1 ?
                        res.status(200).send(`Pruducto Actualizado :${numLote}`):
                        res.status(500).send(`nose puede actualizar Producto o no existe`)
                })
                .catch((error) => next(error.message = "error al actualizar"))
        }
        else{
            res.status(500).send('no eres administrador')
        }
    })
})

// router.get('/:id', async (req, res, next) => {
//    
//     const { id } = req.params
//     await Product.findAll({ where: { ThemeId: id } })
//         .then((Contenido) => res.status(200).send(Contenido))
// })
// router.post('/', async (req, res, next) => {
//    
//     await Product.create(req.body)
//         .then((r) => res.status(200).send(r))
//         .catch((err{ SystemId: idSistema }or) => next(error))
// })
// router.post('/asociartema', async (req, res, next) => {
//     
//     const { idTema, idContenido } = req.body
//     if (idTema && idContenido) {router.get('/:id', async (req, res, next) => {
//    
//     const { id } = req.params
//     await Product.findAll({ where: { ThemeId: id } })
//         .then((Contenido) => res.status(200).send(Contenido))
// })
// router.post('/', async (req, res, next) => {
//    
//     await Product.create(req.body)
//         .then((r) => res.status(200).send(r))
//         .catch((error) => next(error))
// })
// router.post('/asociartema', async (req, res, next) => {
//     
//     const { idTema, idContenido } = req.body
//     if (idTema && idContenido) {

//         const resContenido = await Product.findOne({ where: { id: idContenido } }).catch(error => next(error))
//         const resTema = await Temas.findOne({ where: { id: idTema } }).catch(error => next(error))
//         await resTema.addContent(resContenido)
//             .then(() => {
//                 res.status(200).send('hemos asociado correctamente')
//             })
//             .catch(error => next(error))
//     } else {
//         res.send('error en el body verifique parametros')
//     }

// })
// router.delete('/eliminarContenido', async (req, res, next) => {
//     const { idContenido } = req.body
//     await Product.destroy({
//         where:{
//             id: idContenido
//         }
//     })
//     .then(()=>(res.status(200).send('contenido eliminado')))
//     .catch((error)=>next(error))
// })

//         const resContenido = await Product.findOne({ where: { id: idContenido } }).catch(error => next(error))
//         const resTema = await Temas.findOne({ where: { id: idTema } }).catch(error => next(error))
//         await resTema.addContent(resContenido)
//             .then(() => {
//                 res.status(200).send('hemos asociado correctamente')
//             })
//             .catch(error => next(error))
//     } else {
//         res.send('error en el body verifique parametros')
//     }

// })
// router.delete('/eliminarContenido', async (req, res, next) => {
//     const { idContenido } = req.body
//     await Product.destroy({
//         where:{
//             id: idContenido
//         }
//     })
//     .then(()=>(res.status(200).send('contenido eliminado')))
//     .catch((error)=>next(error))
// })


module.exports = router;