const express = require('express');
const app = express();
const morgan = require('morgan');
const router = require('./src/routes/index')
const errorHandler = require('./src/utils/middlewares/errorHandler')
const setHeaders = require('./src/utils/middlewares/setHeaders')
const { conn } = require('./src/models/index')
const { port } = require('./src/utils/config/index')

/// HEADERS
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(morgan('dev'));
app.use(setHeaders)

app.use('/api',router)
app.use(errorHandler)

conn.sync({force:false})
.then(()=>{
    console.log('ya hay conexion a la base de datos')
    app.listen(port,()=>{
        console.log(`escuchando en el puerto ${port}`);
    })
}) 