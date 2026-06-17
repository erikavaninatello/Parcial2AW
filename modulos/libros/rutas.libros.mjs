// Rutas del módulo libros
// Vincula cada endpoint con su función del controlador
// El middleware validarId es un middleware PROPIO de la aplicación (no de Express)
// que valida que el parámetro :id sea un número entero positivo antes de llegar al controlador

import { Router } from 'express'
import * as controlador from './controlador.libros.mjs'
import { validarId }    from './middleware.libros.mjs'

const rutasLibros = new Router()

// GET /api/v1/libros — devuelve todos los libros
rutasLibros.get('/api/v1/libros', controlador.obtenerTodos)

// Va ANTES de /:id para que Express no interprete "promedio" como un id
// Este endpoint está por fuera de los principios REST porque responde a un procedimiento
// y no a la obtención de un recurso identificable
rutasLibros.get('/api/v1/libros/promedio/paginas', controlador.calcularPromedioPaginas)

// GET /api/v1/libros/:id — devuelve un libro por su id
// validarId se ejecuta antes del controlador para verificar que :id sea válido
rutasLibros.get('/api/v1/libros/:id', validarId, controlador.obtenerUno)

export default rutasLibros