// Rutas del módulo libros
// Vincula cada endpoint con su función del controlador

import { Router } from 'express'
import * as controlador from './controlador.libros.mjs'

const rutasLibros = new Router()

rutasLibros.get('/api/v1/libros', controlador.obtenerTodos)

// Va ANTES de /:id para que Express no interprete "promedio" como un id
rutasLibros.get('/api/v1/libros/promedio/paginas', controlador.calcularPromedioPaginas)

rutasLibros.get('/api/v1/libros/:id', controlador.obtenerUno)

export default rutasLibros
