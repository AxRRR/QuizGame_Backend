const express = require('express')

const app = express();

app.get('/', (req, res) => {
    res.json({
        respuesta: "hola"
    })
});

app.listen( 4000, () => {
    console.log('Sevidor corriendo en el puerto 4000')
})