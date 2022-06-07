# William David Alvarez Chia
### Full Stack Developer
#### Javascript | React | Redux | NodeJs | SQL | Sequelize | Postgresql | PHP | Java
### Prueba Brm 
para iniciar edita los datos en el archivo .env 
coloca los datos solicitados de la base de datos
el programa usa postgres como motor de DB

para iniciar el proyecto debe ejecutar el comando "npm init" y posterior "npm run dev"

para que el codigo funcione es necesario tener en cuenta las siguientes rutas 


## rutas
 copia las rutas en el programa de testing de back donde puedas enviar datos por json a las rutas
###### GET http://localhost:3001/api/Users 
esta ruta no recibe ningun dato y muestra todos los usuarios

###### GET http://localhost:3001/api/Users/aca tu correo

cambia el correo por uno creado y mostrara el detalle

###### POSt http://localhost:3001/api/Users
esta ruta recibe por medio de body un json para crear usuarios
{
    "email": "correo@prueba.com",
    "password": "PASSword",
    "admin": "true" o false si es cliente
}

###### GET http://localhost:3001/api/Products
muestra todos los productos creados


######  POST http://localhost:3001/api/Products
 crea los productos recibe un json por body ej:
 {
    "numLote": 500,
    "nombre": "q",
    "precio": 1,
    "cantDisponible": 300
}
###### PUT http://localhost:3001/api/Products/modificarProducto

modifica el producto teniendo en cuenta como llave primaria el numLote, recibe un json por body 

{
    "email":"prueba@prueba.com",
    "numLote": "400",
    "nombre": "queso Cheddar",
    "precio": "5900",
    "cantDisponible": "200"
}
###### DELETE http://localhost:3001/api/Products/eliminarProducto

elimina el producto teniendo en cuenta que el email sea de un admin de lo contrario no lo hara recibe un json con el email y el numLote del producto a eliminar

{
    "email":"prueba@prueba.com",
    "numLote":"400"
}

######  GET http://localhost:3001/api/Users/clientes/prueba@prueba.com

obtiene todos los usuarios clientes si el correo dentro de la ruta es de un admin


###### POST http://localhost:3001/api/Users/adquirirProducto

agrega productos a la factura del usuario recibe un json por body y un array de los elementos a comprar indicando cantidad y numLote

ej:

{
    "email": "prueba@prueba.com",
    "productos": [
        {
            "numLote": 500,
            "cantidad": 2
        },
        {
            "numLote": 400,
            "cantidad": 3
        }
    ]
}

###### POST http://localhost:3001/api/Users/generaFactura

recibe por body un json con un email y genera la factura de dicho usuario

{
    "email": "prueba@prueba.com"
}


############################## recomendaciones

crear usuarios admin y cliente 

crear productos

modificar o eliminar productos 

adquirir productos 

generar factura 

ver clientes
