// Punto de entrada del servidor
// Patrón MVC: cada módulo tiene su modelo, controlador y rutas
// Seguridad implementada con JWT guardado en cookie httpOnly

import 'dotenv/config'
import express      from 'express'
import cookieParser from 'cookie-parser'

import rutasLibros         from './modulos/libros/rutas.libros.mjs'
import rutasAutenticacion  from './modulos/autenticacion/rutas.autenticacion.mjs'
import { verificarAcceso } from './modulos/autenticacion/middleware.autenticacion.mjs'

const PUERTO = process.env.PUERTO || 3000
const app = express()

// Middlewares globales
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Rutas públicas
app.use(rutasAutenticacion)
app.use('/login', express.static('./fronts/front-login'))

// Rutas protegidas — requieren token JWT válido
app.use('/admin', verificarAcceso, express.static('./fronts/front-admin'))
app.use(verificarAcceso, rutasLibros)

app.listen(PUERTO, () => {
    console.log(`Servidor en http://localhost:${PUERTO}`)
})