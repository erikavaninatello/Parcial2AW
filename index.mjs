// Punto de entrada del servidor — Parcial 2 AW2
// Patrón MVC: el código está organizado en módulos separados por funcionalidad
// Seguridad implementada con JWT firmado, guardado en cookie httpOnly

import 'dotenv/config'
import express      from 'express'
import cookieParser from 'cookie-parser'

import rutasLibros         from './modulos/libros/rutas.libros.mjs'
import rutasAutenticacion  from './modulos/autenticacion/rutas.autenticacion.mjs'
import { verificarAcceso } from './modulos/autenticacion/middleware.autenticacion.mjs'

const PUERTO = process.env.PUERTO || 3000
const app = express()

// --- Middlewares globales ---
// express.json() permite leer el body en formato JSON (peticiones fetch del frontend)
// express.urlencoded() permite leer formularios HTML tradicionales
// cookieParser() permite leer las cookies enviadas por el navegador
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// --- Rutas públicas ---
// Accesibles sin autenticación: login y sus recursos estáticos
app.use(rutasAutenticacion)
app.use('/login', express.static('./fronts/front-login'))

// --- Rutas protegidas ---
// verificarAcceso se ejecuta antes de servir cualquier recurso o endpoint del área admin
// Si el token no es válido - - redirige a /login (páginas) o responde 401 (API)
app.use('/admin', verificarAcceso, express.static('./fronts/front-admin'))
app.use(verificarAcceso, rutasLibros)

app.listen(PUERTO, () => {
    console.log(`Servidor en http://localhost:${PUERTO}`)
})