
// Seguridad implementada con JWT firmado, guardado en cookie firmada httpOnly

import express      from 'express'
import cookieParser from 'cookie-parser'

import rutasLibros         from './modulos/libros/rutas.libros.mjs'
import rutasAutenticacion  from './modulos/autenticacion/rutas.autenticacion.mjs'
import { verificarAcceso } from './modulos/autenticacion/middleware.autenticacion.mjs'

const PUERTO = process.env.PUERTO || 3000
const app = express()

// --- Middlewares globales ---
// express.json() permite leer el body en formato JSON (peticiones fetch del frontend)
// cookieParser con COOKIE_FIRMA permite leer y verificar cookies firmadas con req.signedCookies
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_FIRMA))

// --- Rutas públicas ---
// Accesibles sin autenticación
app.use(rutasAutenticacion)
app.use('/login', express.static('./fronts/front-login'))

// --- Rutas protegidas ---
// verificarAcceso se ejecuta antes de servir cualquier recurso o endpoint del área admin
// Si el token no es válido --> redirige a /login 
app.use('/admin', verificarAcceso, express.static('./fronts/front-admin'))
app.use(verificarAcceso, rutasLibros)

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`)
})

