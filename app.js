require('dotenv').config();
const express = require("express");
const mustacheExpress = require('mustache-express');
const cookieParser = require('cookie-parser');
const path = require("path");

const usuarioRoutes = require('./src/routes/usuarioRoutes');
const ingressoRoutes = require('./src/routes/ingressoRoutes');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'src/views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require('./src/helpers/mongo'));

app.use('/usuarios', usuarioRoutes);
app.use('/ingressos', ingressoRoutes);

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/cadastro', (req, res) => {
    res.render('cadastro')
});
app.get('/ingressos', (req, res) => {
    res.render('ingressos')
});
app.get('/detalhes-ingresso', (req, res) => {
    res.render('detalhes_ingresso')
});
app.get('/comprar-ingresso', (req, res) => {
    res.render('comprar_ingresso')
});


app.listen(3000, () => {
    console.log("Listenning...");
})