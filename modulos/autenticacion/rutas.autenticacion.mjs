// Rutas de autenticación — login y logout

import { Router } from 'express'
import * as controlador from './controlador.autenticacion.mjs'

const rutasAutenticacion = new Router()

rutasAutenticacion.post('/autenticar', controlador.autenticar)
rutasAutenticacion.get('/cerrar-sesion', controlador.cerrarSesion)

export default rutasAutenticacion
