//importamos la libreria
import express from 'express';
import dotenv from 'dotenv';
import gruposroutes from './routes/gruposroutes.js'
import productosroutes from './routes/productos.routes.js'



//crear el objeto de express para nuestra alicacion
const app=express();

//configuramos el acceso al archivo , .env
dotenv.config()

//definimos nuestro puerto  //sugierto 
const port= process.env.PORT || 3000

//definimos una peticion al servidor
// definimos un midlewere para poder implementar jaason en nuestra apo
app.use(express.json())

// defonimos las rutas que voy a implementar
app.use('/api/grupos', gruposroutes)

app.use('/api/productos', productosroutes);


app.get('/', (req, res)=>{
    res.send("Esta es mi primera vez se gentil")
})

export default app; //AGREGADO PARA DESPLIEGUE

if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log("Aplicacion corriendo en el puerto: " + port)
    })
}
//app.listen(port, ()=>{
  //  console.log("Aplicacion corriendo en el puerto: "+port)
  
//})