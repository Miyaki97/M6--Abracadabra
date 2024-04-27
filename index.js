
import express from 'express';
import path from 'path'

const app = express();


const __dirname = import.meta.dirname;

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
});


const capturarUsuario = (req, res, next) => {
    const nombreUsuario = req.params.usuario;
    console.log('Nombre de usuario capturado:', nombreUsuario);
    req.nombreUsuario = nombreUsuario; // Almacenamos el nombre de usuario en el objeto 'req' para que esté disponible en otras rutas
    next(); 
};


const usuarios = [
    { id: 1, nombre_usuario: 'Millaray' },
    { id: 2, nombre_usuario: 'Jacinta' }
];

app.get('/abracadabra/usuarios', (req, res) => {
    res.json(usuarios);
});

app.get('/abracadabra/juego/:usuario', capturarUsuario, (req, res) => {
    const nombreUsuario = req.nombreUsuario;
    const usuarioEncontrado = usuarios.find(user => user.nombre_usuario === nombreUsuario);

    const who = '/public/assets/img/who.jpeg';

    if (usuarioEncontrado) {
        res.send("Usuario existe en la base de datos");
    } else {
        res.sendFile(path.join(__dirname, '/public/assets/img/who.jpeg'));
        console.log(path.join(__dirname, '/public/assets/img/who.jpeg'))
    }
});


app.get('/abracadabra/conejo/:n',  (req, res) => {
    const numeroConejo = req.params.n;
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
      }

    if (getRandomIntInclusive(1,4) === parseInt(numeroConejo)) {
        res.sendFile(path.join(__dirname, '/public/assets/img/conejito.jpg'))
    } else {
        res.sendFile(path.join(__dirname, '/public/assets/img/voldemort.jpg'))

    }
});


app.use((req, res, next) => {
    res.status(404).send("Esta página no existe");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto http://localhost:${PORT}`);
});